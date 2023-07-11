/**
 * @description parse elem html
 * @author itxve
 */

import $, { DOMElement } from '../utils/dom'
import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
import { AudioElement } from './custom-types'
// 将html转换为VNode
function parseHtml(
  elem: DOMElement,
  children: SlateDescendant[],
  editor: IDomEditor
): SlateElement {
  const $elem = $(elem)

  // <audio> 形式
  const $audio = $elem.find('audio')
  let src = $audio.attr('src') || ''

  return {
    type: 'audio',
    src,
    children: [{ text: '' }], // void node 必须有一个空白 text
  } as AudioElement
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="audio"]',
  parseElemHtml: parseHtml,
}

export default parseHtmlConf
