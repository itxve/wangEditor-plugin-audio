/**
 * @description helper fns
 * @author itxve
 */
import { IDomEditor } from '@wangeditor/editor';
export declare function audioIsDisabled(editor: IDomEditor): boolean;
/**
 * 上传附件文件
 * @param editor editor
 * @param files files
 */
export declare function uploadAudio(editor: IDomEditor, files: FileList | null): Promise<void>;
