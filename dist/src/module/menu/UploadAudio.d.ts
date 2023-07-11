/**
 * @description upload attachment menu
 * @author itxve
 */
import { IDomEditor } from '@wangeditor/editor';
import { IButtonMenu } from '@wangeditor/editor';
declare class UploadAudioMenu implements IButtonMenu {
    readonly title: string;
    readonly iconSvg = "\n<svg width=\"800px\" height=\"800px\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#000000\">\n <g>\n  <title>Layer 1</title>\n  <path fill-rule=\"evenodd\" d=\"m11.73823,2.33898c0.42227,0 0.7646,0.44393 0.7646,0.99153l0,17.84746c0,0.5476 -0.34232,0.99153 -0.7646,0.99153c-0.42227,0 -0.7646,-0.44393 -0.7646,-0.99153l0,-17.84746c0,-0.5476 0.34232,-0.99153 0.7646,-0.99153zm9.17514,1.98305c0.42227,0 0.7646,0.44393 0.7646,0.99153l0,13.88136c0,0.5476 -0.34232,0.99153 -0.7646,0.99153c-0.42227,0 -0.7646,-0.44393 -0.7646,-0.99153l0,-13.88136c0,-0.5476 0.34232,-0.99153 0.7646,-0.99153zm-6.11676,1.98305c0.42227,0 0.7646,0.44393 0.7646,0.99153l0,9.91525c0,0.5476 -0.34232,0.99153 -0.7646,0.99153c-0.42227,0 -0.7646,-0.44393 -0.7646,-0.99153l0,-9.91525c0,-0.5476 0.34232,-0.99153 0.7646,-0.99153zm-6.11676,2.97458c0.42227,0 0.7646,0.44393 0.7646,0.99153l0,3.9661c0,0.5476 -0.34232,0.99153 -0.7646,0.99153c-0.42227,0 -0.7646,-0.44393 -0.7646,-0.99153l0,-3.9661c0,-0.5476 0.34232,-0.99153 0.7646,-0.99153zm9.17514,0.99153c0.42227,0 0.7646,0.44393 0.7646,0.99153l0,1.98305c0,0.5476 -0.34232,0.99153 -0.7646,0.99153c-0.42227,0 -0.7646,-0.44393 -0.7646,-0.99153l0,-1.98305c0,-0.5476 0.34232,-0.99153 0.7646,-0.99153z\" id=\"svg_1\" stroke=\"null\"/>\n  <path fill=\"#619E73\" d=\"m1.40554,11.71254l2.28814,-9.89146l2.28814,9.89146l-1.14407,0l0,9.93905l-2.28814,0l0,-9.93905l-1.14407,0z\" id=\"svg_9\" stroke=\"null\"/>\n </g>\n\n</svg>";
    readonly tag = "button";
    getValue(editor: IDomEditor): string | boolean;
    isActive(editor: IDomEditor): boolean;
    exec(editor: IDomEditor, value: string | boolean): void;
    isDisabled(editor: IDomEditor): boolean;
    private getMenuConfig;
}
export default UploadAudioMenu;
