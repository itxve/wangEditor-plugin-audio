import { DomEditor, IDomEditor, SlateRange, SlateEditor, t, SlateNode } from '@wangeditor/editor'
import { IModalMenu, genModalInputElems, genModalButtonElems } from '@wangeditor/editor'
import { AUDIO_SVG } from '../../constants/icon-svg'
import $, { Dom7Array, DOMElement } from '../../utils/dom'
import { genRandomStr } from '../../utils/util'
import insertAudio from './helper/insert-audio'
import { audioIsDisabled } from './helper/upload-audio'
/**
 * 生成唯一的 DOM ID
 */
function genDomID(): string {
  return genRandomStr('w-e-insert-audio')
}

class InsertAudioMenu implements IModalMenu {
  hotkey?: string | undefined
  alwaysEnable?: boolean | undefined
  width?: number | undefined
  readonly title = t('audio.insert')
  readonly iconSvg = AUDIO_SVG
  readonly tag = 'button'
  readonly showModal = true // 点击 button 时显示 modal
  readonly modalWidth = 300
  private $content: Dom7Array | null = null
  private readonly srcInputId = genDomID()
  private readonly buttonId = genDomID()

  getValue(editor: IDomEditor): string | boolean {
    // 插入菜单，不需要 value
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 任何时候，都不用激活 menu
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    // 点击菜单时，弹出 modal 之前，不需要执行其他代码
    // 此处空着即可
  }

  isDisabled(editor: IDomEditor): boolean {
    return audioIsDisabled(editor)
  }

  getModalPositionNode(editor: IDomEditor): SlateNode | null {
    return null // modal 依据选区定位
  }

  getModalContentElem(editor: IDomEditor): DOMElement {
    const { srcInputId, buttonId } = this

    // 获取 input button elem
    const [srcContainerElem, inputSrcElem] = genModalInputElems(
      t('audio.src'),
      srcInputId,
      t('audio.srcPlaceHolder')
    )

    const $inputSrc = $(inputSrcElem)
    const [buttonContainerElem] = genModalButtonElems(buttonId, t('common.ok'))

    if (this.$content == null) {
      // 第一次渲染
      const $content = $('<div></div>')

      // 绑定事件（第一次渲染时绑定，不要重复绑定）
      $content.on('click', `#${buttonId}`, async e => {
        e.preventDefault()
        const src = $content.find(`#${srcInputId}`).val().trim()
        insertAudio(editor, src)
        editor.hidePanelOrModal() // 隐藏 modal
      })

      // 记录属性，重要
      this.$content = $content
    }

    const $content = this.$content
    $content.empty() // 先清空内容

    // append inputs and button
    $content.append(srcContainerElem)
    $content.append(buttonContainerElem)

    // 设置 input val
    $inputSrc.val('')

    // focus 一个 input（异步，此时 DOM 尚未渲染）
    setTimeout(() => {
      $inputSrc.focus()
    })

    return $content[0]
  }
}

export default InsertAudioMenu
