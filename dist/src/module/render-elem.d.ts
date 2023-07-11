/**
 * @description render elem
 * @author itxve
 */
import { VNode } from 'snabbdom';
import { IDomEditor, SlateElement } from '@wangeditor/editor';
declare function renderAudio(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode;
declare const conf: {
    type: string;
    renderElem: typeof renderAudio;
};
export default conf;
