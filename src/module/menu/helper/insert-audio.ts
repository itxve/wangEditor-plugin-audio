/**
 * @description insert video
 * @author wangfupeng
 */

import { IDomEditor, SlateTransforms } from '@wangeditor/editor'
import { AudioElement } from '../../custom-types'
import { InsertConfigForAudio } from '../config'

function getInsertAudioMenuConfig(editor: IDomEditor) {
  // 获取配置，见 `./config.js`
  return editor.getMenuConfig('insertAudio') as InsertConfigForAudio
}

/**
 * 插入视频
 * @param editor editor
 * @param src video src
 * @param poster video poster
 */
export default async function (editor: IDomEditor, src: string) {
  if (!src) return

  // 还原选区
  editor.restoreSelection()

  // 校验
  const { checkAudio, formatAudioSrc, onInsertedAudio } = getInsertAudioMenuConfig(editor)
  const checkRes = await checkAudio(src)
  if (typeof checkRes === 'string') {
    // 校验失败，给出提示
    editor.alert(checkRes, 'error')
    return
  }
  if (checkRes == null) {
    // 校验失败，不给提示
    return
  }

  // 转换 src
  let formatedSrc = await formatAudioSrc(src)

  // 新建一个 audio node
  const audio: AudioElement = {
    type: 'audio',
    src: formatedSrc,
    children: [{ text: '' }], // 【注意】void node 需要一个空 text 作为 children
  }

  // 插入视频
  // 不使用此方式会比正常的选区选取先执行
  Promise.resolve().then(() => {
    SlateTransforms.insertNodes(editor, audio)
  })

  if (onInsertedAudio) {
    onInsertedAudio(audio)
  }
}
