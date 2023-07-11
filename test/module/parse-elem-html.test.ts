/**
 * @description parse elem html test
 * @author itxve
 */

import createEditor from '../utils/create-editor'
import parseHtmlConf from '../../src/module/parse-elem-html'
import { AudioElement } from '../../src/index'

describe('parse elem html', () => {
  const editor = createEditor()

  it('selector', () => {
    expect(parseHtmlConf.selector).toBe('span[data-w-e-type="audio"]')
  })

  it('parse html', () => {
    const src = 'aaa'
    // elem-to-html 产出的 html 格式： <span data-w-e-type="audio"  data-w-e-is-void data-w-e-is-inline ><audio controls src="${src}">audio not support </audio><span>

    const spanElem = document.createElement('span')
    spanElem.setAttribute('data-w-e-type', 'audio')
    const audioElem = document.createElement('audio')
    audioElem.setAttribute('src', src)
    spanElem.appendChild(audioElem)

    const attachment = parseHtmlConf.parseElemHtml(spanElem, [], editor) as AudioElement
    expect(attachment.type).toBe('audio')
    expect(attachment.src).toBe(src)
  })
})
