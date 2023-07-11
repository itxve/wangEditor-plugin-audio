/**
 * @description elem to html
 * @author itxve
 */
import { SlateElement } from '@wangeditor/editor';
declare function audioToHtml(elem: SlateElement, childrenHtml: string): string;
declare const conf: {
    type: string;
    elemToHtml: typeof audioToHtml;
};
export default conf;
