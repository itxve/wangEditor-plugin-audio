/**
 * @description attachment module entry
 * @author itxve
 */

import './local' // 多语言

import { IModuleConf } from '@wangeditor/editor'
import withAudio from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'
import parseHtmlConf from './parse-elem-html'
import { uploadAudioMenuConf, insertAudioMenuConf, editAudioMenuConf } from './menu/index'

const module: Partial<IModuleConf> = {
  editorPlugin: withAudio,
  renderElems: [renderElemConf],
  // renderStyle
  elemsToHtml: [elemToHtmlConf],
  parseElemsHtml: [parseHtmlConf],

  menus: [uploadAudioMenuConf, insertAudioMenuConf, editAudioMenuConf],
}

export default module
