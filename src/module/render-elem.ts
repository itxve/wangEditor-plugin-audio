/**
 * @description render elem
 * @author itxve
 */

import { h, VNode } from 'snabbdom'
import { DomEditor, IDomEditor, SlateElement } from '@wangeditor/editor'
import { AudioElement } from './custom-types'

function renderAudio(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  const isDisabled = editor.isDisabled()

  // 当前节点是否选中
  const selected = DomEditor.isNodeSelected(editor, elem)

  // 构建 vnode
  const { src = '' } = elem as AudioElement

  const vnode = h(
    'span',
    {
      attrs: {
        'data-w-e-type': 'audio',
      },
      style: {
        display: 'inline-block', // inline
        marginLeft: '3px',
        marginRight: '3px',
        border:
          selected && !isDisabled
            ? '2px solid var(--w-e-audio-selected-border-color)' // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
            : '2px solid transparent',

        backgroundColor: '#f1f1f1',
        cursor: isDisabled ? 'pointer' : 'inherit',
      },
    },
    h('audio', {
      props: {
        src: src,
        controls: true,
      },
    })
  )

  return vnode
}

const conf = {
  type: 'audio', // 节点 type ，重要！！！
  renderElem: renderAudio,
}

export default conf
