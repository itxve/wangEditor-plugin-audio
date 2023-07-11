import { IDomEditor, SlateNode } from '@wangeditor/editor';
import { IModalMenu } from '@wangeditor/editor';
import { DOMElement } from '../../utils/dom';
declare class EditAudioMenu implements IModalMenu {
    hotkey?: string | undefined;
    alwaysEnable?: boolean | undefined;
    width?: number | undefined;
    readonly title: string;
    readonly iconSvg = "";
    readonly tag = "button";
    readonly showModal = true;
    readonly modalWidth = 300;
    private $content;
    private readonly srcInputId;
    private readonly buttonId;
    private getSelectedAudioNode;
    getValue(editor: IDomEditor): string | boolean;
    isActive(editor: IDomEditor): boolean;
    exec(editor: IDomEditor, value: string | boolean): void;
    isDisabled(editor: IDomEditor): boolean;
    getModalPositionNode(editor: IDomEditor): SlateNode | null;
    getModalContentElem(editor: IDomEditor): DOMElement;
}
export default EditAudioMenu;
