/**
 * @description upload attachment menu test
 * @author itxve
 */

import { SlateEditor, IDomEditor } from '@wangeditor/editor'
import createEditor from '../../utils/create-editor'
import { AudioElement } from '../../../src/index'
import UploadAudioenu from '../../../src/module/menu/UploadAudio'
import withAudio from '../../../src/module/plugin'

describe('upload audio menu', () => {
  const editor = withAudio(createEditor())
  const menu = new UploadAudioenu()

  function getStartLocation(editor: IDomEditor) {
    return SlateEditor.start(editor, [])
  }

  function genAudioElem() {
    const audioElem: AudioElement = {
      type: 'audio',
      src: 'bbb',
      children: [{ text: '' }],
    }
    return audioElem
  }

  it('getValue', () => {
    expect(menu.getValue(editor)).toBe('')
  })

  it('isActive', () => {
    expect(menu.isActive(editor)).toBe(false)
  })

  it('isDisabled', () => {
    // 选中空编辑器
    editor.select(getStartLocation(editor))
    expect(menu.isDisabled(editor)).toBeFalsy()

    // 选中 audio 节点
    editor.insertNode(genAudioElem())
    editor.select({ path: [0, 1, 0], offset: 0 })
    expect(menu.isDisabled(editor)).toBeTruthy()
  })
})
