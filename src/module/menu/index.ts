/**
 * @description menu entry
 * @author itxve
 */

import UploadAudio from './UploadAudio'
import InsertAudio from './InsertAudio'
import EditAudio from './EditAudio'

import { genUploadAudioMenuConfig, genInsertAudioMenuConfig } from './config'

export const uploadAudioMenuConf = {
  key: 'uploadAudio', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new UploadAudio()
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
  config: genUploadAudioMenuConfig(),
}

export const insertAudioMenuConf = {
  key: 'insertAudio',
  factory() {
    return new InsertAudio()
  },

  config: genInsertAudioMenuConfig(),
  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
}

export const editAudioMenuConf = {
  key: 'editAudio',
  factory() {
    return new EditAudio()
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
}
