/**
 * @description render-elem test
 * @author itxve
 */

import createEditor from '../utils/create-editor'
import renderElemConf from '../../src/module/render-elem'
import { AudioElement } from '../../src/index'

describe('audio render-elem', () => {
  const editor = createEditor()

  const audioElem: AudioElement = {
    type: 'audio',
    src: 'x',
    children: [{ text: '' }],
  }

  it('type', () => {
    expect(renderElemConf.type).toBe('audio')
  })

  it('render elem', () => {
    const vnode = renderElemConf.renderElem(audioElem, null, editor) as any
    expect(vnode.sel).toBe('span')
    expect(vnode.data.attrs['data-w-e-type']).toBe('audio')
  })
})
