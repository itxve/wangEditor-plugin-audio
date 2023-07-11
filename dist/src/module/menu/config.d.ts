/**
 * @description menu config
 * @author itxve
 */
import { IUploadConfig } from '@wangeditor/editor';
import { UppyFile } from '@uppy/core';
import { AudioElement } from '../custom-types';
export declare type InsertAudioFn = (link: string) => void;
export declare type IUploadConfigForAudio = IUploadConfig & {
    allowedFileTypes?: string[];
    customInsert?: (res: any, file: UppyFile, insertFn: InsertAudioFn) => void;
    customUpload?: (files: File, insertFn: InsertAudioFn) => void;
    customBrowseAndUpload?: (insertFn: InsertAudioFn) => void;
};
export declare type InsertConfigForAudio = {
    /**
     * 检查Audio信息，支持 async fn
     * @param src audio src
     */
    checkAudio(src: string): boolean | string | undefined;
    /**
     * format audio src
     * @param src audio src
     * @returns new src
     */
    formatAudioSrc(src: string): string;
    /**
     * 插入之后
     * inserted
     */
    onInsertedAudio(audioNode: AudioElement): void;
};
export declare function genUploadAudioMenuConfig(): IUploadConfigForAudio;
export declare function genInsertAudioMenuConfig(): InsertConfigForAudio;
