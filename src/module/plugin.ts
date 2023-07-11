/**
 * @description attachment plugin
 * @author itxve
 */

import { DomEditor, IDomEditor } from '@wangeditor/editor'
import { uploadAudio } from './menu/helper/upload-audio'

function withAudio<T extends IDomEditor>(editor: T) {
  const { isInline, isVoid, insertData } = editor
  const newEditor = editor

  // 重写 isInline
  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'audio') {
      return true
    }

    return isInline(elem)
  }

  // 重写 isVoid
  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'audio') {
      return true
    }

    return isVoid(elem)
  }

  // 重写 insertData
  newEditor.insertData = (data: DataTransfer) => {
    // 如有 text ，则优先粘贴 text
    const text = data.getData('text/plain')
    if (text) {
      insertData(data)
      return
    }

    // 获取文件
    const { files } = data
    if (files.length <= 0) {
      insertData(data)
      return
    }

    // 判断是否有图片文件（可能是其他类型的文件）
    const fileList = Array.prototype.slice.call(files)
    let _hasAudioFiles = fileList.some(file => {
      const [mime] = file.type.split('/')
      return mime === 'audio'
    })

    if (_hasAudioFiles) {
      // 有音频文件，则上传音频
      uploadAudio(editor, files)
    } else {
      // 如果没有， 则继续 insertData
      insertData(data)
    }
  }

  return newEditor
}

export default withAudio
