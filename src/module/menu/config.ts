/**
 * @description menu config
 * @author itxve
 */

import { IUploadConfig } from '@wangeditor/editor'
import { UppyFile } from '@uppy/core'
import { AudioElement } from '../custom-types'

export type InsertAudioFn = (link: string) => void

// 在通用 uploadConfig 上，扩展 audio 相关配置
export type IUploadConfigForAudio = IUploadConfig & {
  allowedFileTypes?: string[]
  // 用户自定义插入音频
  customInsert?: (res: any, file: UppyFile, insertFn: InsertAudioFn) => void
  // 用户自定义上传音频
  customUpload?: (files: File, insertFn: InsertAudioFn) => void
  // 自定义选择音频，如图床
  customBrowseAndUpload?: (insertFn: InsertAudioFn) => void
}

// 在通用 uploadConfig 上，扩展 audio 相关配置
export type InsertConfigForAudio = {
  /**
   * 检查Audio信息，支持 async fn
   * @param src audio src
   */
  checkAudio(src: string): boolean | string | undefined

  /**
   * format audio src
   * @param src audio src
   * @returns new src
   */
  formatAudioSrc(src: string): string

  /**
   * 插入之后
   * inserted
   */
  onInsertedAudio(audioNode: AudioElement): void
}

export function genUploadAudioMenuConfig(): IUploadConfigForAudio {
  return {
    server: '', // server API 地址，需用户配置

    fieldName: 'wangeditor-uploaded-audio', // formData 中，文件的 key
    maxFileSize: 10 * 1024 * 1024, // 10M
    maxNumberOfFiles: 5, // 最多上传 xx 个附件
    allowedFileTypes: ['audio/*'],
    meta: {
      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      // 例如：token: 'xxxxx', x: 100
    },
    metaWithUrl: false,
    // headers: {
    //   // 自定义 http headers
    //   // 例如：Accept: 'text/x-json', a: 100,
    // },
    withCredentials: false,
    timeout: 30 * 1000, // 30s

    onBeforeUpload: (files: any) => files, // 返回 false 则终止上传
    onProgress: (progress: number) => {
      /* on progress */
    },
    onSuccess: (file: any, res: any) => {
      /* on success */
    },
    onFailed: (file: any, res: any) => {
      /* on failed */
      console.error(`'${file.name}'audio upload failed`, res)
    },
    onError: (file: any, err: any, res: any) => {
      /* on error */
      /* on timeout */
      console.error(`'${file.name} audio upload error`, err, res)
    },
    // // 用户自定义插入音频
    // customInsert: (res: any, file: UppyFile, insertFn: InsertAudioFn) => {},
    // // 用户自定义上传音频
    // customUpload: (files: File, insertFn: InsertAudioFn) => {},
    // // 自定义选择音频，如图床
    // customBrowseAndUpload: (insertFn: InsertAudioFn) => {},
    // // 插入之后的回调
    // onInsertedAudio: (elem: AudioElement) => {},
  }
}

export function genInsertAudioMenuConfig() {
  return {
    /**
     * 检查Audio信息，支持 async fn
     * @param src audio src
     */
    checkAudio(src: string): boolean | string | undefined {
      // 1. 返回 true ，说明检查通过
      // 2. 返回一个字符串，说明检查未通过，编辑器会阻止图片插入。会 alert 出错误信息（即返回的字符串）
      // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止图片插入
      return true
    },

    /**
     * format audio src
     * @param src audio src
     * @returns new src
     */
    formatAudioSrc(src: string): string {
      return src
    },

    onInsertedAudio(audioNode: AudioElement): void {},
  } as InsertConfigForAudio
}
