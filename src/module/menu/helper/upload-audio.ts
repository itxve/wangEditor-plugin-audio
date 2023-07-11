/**
 * @description helper fns
 * @author itxve
 */

import Uppy, { UppyFile } from '@uppy/core'
import { IDomEditor, SlateRange } from '@wangeditor/editor'
import { createUploader, DomEditor, SlateEditor } from '@wangeditor/editor'
import { IUploadConfigForAudio } from '../config'
import insertAudio from '../helper/insert-audio'

function getUploadAudioMenuConfig(editor: IDomEditor): IUploadConfigForAudio {
  // 获取配置，见 `./config.js`
  return editor.getMenuConfig('uploadAudio') as IUploadConfigForAudio
}

export function audioIsDisabled(editor: IDomEditor): boolean {
  const { selection } = editor
  if (selection == null) return true
  if (!SlateRange.isCollapsed(selection)) return true // 选区非折叠，禁用
  const [match] = SlateEditor.nodes(editor, {
    match: n => {
      const type = DomEditor.getNodeType(n)
      if (type === 'code') return true // 代码块
      if (type === 'pre') return true // 代码块
      if (type === 'link') return true // 链接
      if (type === 'list-item') return true // list
      if (type.startsWith('header')) return true // 标题
      if (type === 'blockquote') return true // 引用
      if (SlateEditor.isVoid(editor, n)) return true // void
      return false
    },
    universal: true,
  })
  if (match) {
    return true
  }
  return false
}

/**
 * 上传附件文件
 * @param editor editor
 * @param files files
 */
export async function uploadAudio(editor: IDomEditor, files: FileList | null) {
  if (files == null) return
  const fileList = Array.prototype.slice.call(files)

  // 获取菜单配置
  const { customUpload } = getUploadAudioMenuConfig(editor)
  debugger
  // 按顺序上传
  for await (const file of fileList) {
    // 上传
    if (customUpload) {
      // 自定义上传
      await customUpload(file, (link: string) => insertAudio(editor, link))
    } else {
      // 默认上传
      await uploadFile(editor, file)
    }
  }
}

/**
 * 上传文件
 * @param editor editor
 * @param file file
 */
async function uploadFile(editor: IDomEditor, file: File) {
  const uppy = getUppy(editor)

  const { name, type, size } = file
  uppy.addFile({
    name,
    type,
    size,
    data: file,
  })
  await uppy.upload()
}

// 存储 editor uppy 的关系 - 缓存 uppy ，不重复创建
const EDITOR_TO_UPPY_MAP = new WeakMap<IDomEditor, Uppy>()

/**
 * 获取 uppy 实例（并通过 editor 缓存）
 * @param editor editor
 */
function getUppy(editor: IDomEditor): Uppy {
  // 从缓存中获取
  let uppy = EDITOR_TO_UPPY_MAP.get(editor)
  if (uppy != null) return uppy

  const menuConfig = getUploadAudioMenuConfig(editor)
  const { onSuccess, onProgress, onFailed, customInsert, onError } = menuConfig

  // 上传完成之后
  const successHandler = (file: UppyFile, res: any) => {
    // 预期 res 格式：
    // 成功：{ errno: 0, data: { url } }
    // 失败：{ errno: !0, message: '失败信息' }

    if (customInsert) {
      // 用户自定义插入文件，此时 res 格式可能不符合预期
      customInsert(res, file, (link: string) => insertAudio(editor, link))
      return
    }

    const { errno = 1, data = {} } = res
    if (errno !== 0) {
      console.error(`'${file.name}' upload failed`, res)

      // failed 回调
      onFailed(file, res)
      return
    }

    const { url = '' } = data
    insertAudio(editor, url)

    // success 回调
    onSuccess(file, res)
  }

  // progress 显示进度条
  const progressHandler = (progress: number) => {
    editor.showProgressBar(progress)

    // 回调函数
    onProgress && onProgress(progress)
  }

  // onError 提示错误
  const errorHandler = (file: any, err: any, res: any) => {
    const fileName = file.name
    console.error(`'${fileName} upload error`, err, res)

    // 回调函数
    onError && onError(file, err, res)
  }

  // 创建 uppy
  uppy = createUploader({
    ...menuConfig,
    onProgress: progressHandler,
    onSuccess: successHandler,
    onError: errorHandler,
  })
  // 缓存 uppy
  EDITOR_TO_UPPY_MAP.set(editor, uppy)

  return uppy
}
