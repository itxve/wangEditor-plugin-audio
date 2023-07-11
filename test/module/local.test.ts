/**
 * @description attachment local test
 * @author itxve
 */

import '../../src/module/local'
import { i18nChangeLanguage, t } from '@wangeditor/editor'

describe('local', () => {
  it('zh-CN', () => {
    expect(t('audio.upload')).toBe('上传音频')
  })
  it('en', () => {
    i18nChangeLanguage('en')
    expect(t('audio.upload')).toBe('Upload Audio')
  })
})
