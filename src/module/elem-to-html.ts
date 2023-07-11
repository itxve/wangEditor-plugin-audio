/**
 * @description elem to html
 * @author itxve
 */

import { SlateElement } from '@wangeditor/editor'
import { AudioElement } from './custom-types'

// 生成 html 的函数
function audioToHtml(elem: SlateElement, childrenHtml: string): string {
  const { src = '' } = elem as AudioElement

  return `<span data-w-e-type="audio" data-w-e-is-void data-w-e-is-inline ><audio controls src="${src}">audio not support </audio><span>`
}

// 配置
const conf = {
  type: 'audio', // 节点 type ，重要！！！
  elemToHtml: audioToHtml,
}

export default conf
