/**
 * @description plugin test
 * @author itxve
 */

import createEditor from '../utils/create-editor'
import withAttachment from '../../src/module/plugin'
import { AudioElement } from '../../src/index'

describe('attachment plugin', () => {
  const editor = withAttachment(createEditor())
  const elem: AudioElement = {
    type: 'audio',
    src: 'x',
    children: [{ text: '' }],
  }

  it('isInline', () => {
    expect(editor.isInline(elem)).toBe(true)
  })

  it('isVoid', () => {
    expect(editor.isVoid(elem)).toBe(true)
  })
})
