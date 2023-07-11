/**
 * @description 多语言
 * @author itxve
 */

import { i18nAddResources } from '@wangeditor/editor'

i18nAddResources('en', {
  audio: {
    upload: 'Upload Audio',
    insert: 'Insert Audio',
    edit: 'Edit Link',
    src: 'Audio Link',
    srcPlaceHolder: 'Plase Input Audio Link',
  },
})

i18nAddResources('zh-CN', {
  audio: {
    upload: '上传音频',
    insert: '插入音频',
    edit: '编辑音频',
    src: '音频链接',
    srcPlaceHolder: '请输入音频链接',
  },
})
