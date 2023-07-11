/**
 *  @description elem to html test
 * @author itxve
 */

import elemToHtmlConf from '../../src/module/elem-to-html'
import { AudioElement } from '../../src/index'

describe('audio elem-to-html', () => {
  const src = 'https://pan.baidu.com/'
  const audioElem: AudioElement = {
    type: 'audio',
    src,
    children: [{ text: '' }],
  }

  it('type', () => {
    expect(elemToHtmlConf.type).toBe('audio')
  })

  it('elem to html', () => {
    const html = elemToHtmlConf.elemToHtml(audioElem, '')
    console.log('html:', html)
    expect(html).toBe(
      `<span data-w-e-type="audio" data-w-e-is-void data-w-e-is-inline ><audio controls src="${src}">audio not support </audio><span>`
    )
  })
})
