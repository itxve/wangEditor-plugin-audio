import { IDomEditor, SlateNode } from '@wangeditor/editor';
import { IModalMenu } from '@wangeditor/editor';
import { DOMElement } from '../../utils/dom';
declare class InsertAudioMenu implements IModalMenu {
    hotkey?: string | undefined;
    alwaysEnable?: boolean | undefined;
    width?: number | undefined;
    readonly title: string;
    readonly iconSvg = "<svg fill=\"#000000\" width=\"800px\" height=\"800px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" d=\"M8,2 C8.55228475,2 9,2.44771525 9,3 L9,21 C9,21.5522847 8.55228475,22 8,22 C7.44771525,22 7,21.5522847 7,21 L7,3 C7,2.44771525 7.44771525,2 8,2 Z M20,4 C20.5522847,4 21,4.44771525 21,5 L21,19 C21,19.5522847 20.5522847,20 20,20 C19.4477153,20 19,19.5522847 19,19 L19,5 C19,4.44771525 19.4477153,4 20,4 Z M12,6 C12.5522847,6 13,6.44771525 13,7 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,7 C11,6.44771525 11.4477153,6 12,6 Z M4,9 C4.55228475,9 5,9.44771525 5,10 L5,14 C5,14.5522847 4.55228475,15 4,15 C3.44771525,15 3,14.5522847 3,14 L3,10 C3,9.44771525 3.44771525,9 4,9 Z M16,10 C16.5522847,10 17,10.4477153 17,11 L17,13 C17,13.5522847 16.5522847,14 16,14 C15.4477153,14 15,13.5522847 15,13 L15,11 C15,10.4477153 15.4477153,10 16,10 Z\"/>\n</svg>";
    readonly tag = "button";
    readonly showModal = true;
    readonly modalWidth = 300;
    private $content;
    private readonly srcInputId;
    private readonly buttonId;
    getValue(editor: IDomEditor): string | boolean;
    isActive(editor: IDomEditor): boolean;
    exec(editor: IDomEditor, value: string | boolean): void;
    isDisabled(editor: IDomEditor): boolean;
    getModalPositionNode(editor: IDomEditor): SlateNode | null;
    getModalContentElem(editor: IDomEditor): DOMElement;
}
export default InsertAudioMenu;
