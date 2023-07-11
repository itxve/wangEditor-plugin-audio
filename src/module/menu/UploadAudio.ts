/**
 * @description upload attachment menu
 * @author itxve
 */

import { DomEditor, IDomEditor, SlateRange, t } from '@wangeditor/editor'
import { IButtonMenu } from '@wangeditor/editor'
import { UPLOAD_AUDIO_SVG } from '../../constants/icon-svg'
import { IUploadConfigForAudio } from './config'
import $ from '../../utils/dom'
import { audioIsDisabled, uploadAudio } from './helper/upload-audio'
import insertAudio from './helper/insert-audio'

class UploadAudioMenu implements IButtonMenu {
  readonly title = t('audio.upload')
  readonly iconSvg = UPLOAD_AUDIO_SVG
  readonly tag = 'button'

  getValue(editor: IDomEditor): string | boolean {
    // 无需获取 val
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 任何时候，都不用激活 menu
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    const { allowedFileTypes = [], customBrowseAndUpload } = this.getMenuConfig(editor)

    // 自定义选择文件、并上传，如图床
    if (customBrowseAndUpload) {
      customBrowseAndUpload((link: string) => insertAudio(editor, link))
      return
    }

    // 设置选择文件的类型
    let acceptAttr = ''
    if (allowedFileTypes.length > 0) {
      acceptAttr = `accept="${allowedFileTypes.join(', ')}"`
    }

    // 添加 file input（每次重新创建 input）
    const $body = $('body')
    const $inputFile = $(`<input type="file" ${acceptAttr} multiple/>`)
    $inputFile.hide()
    $body.append($inputFile)
    $inputFile.click()
    // 选中文件
    $inputFile.on('change', () => {
      const files = ($inputFile[0] as HTMLInputElement).files
      uploadAudio(editor, files) // 上传文件
    })
  }

  isDisabled(editor: IDomEditor): boolean {
    return audioIsDisabled(editor)
  }

  private getMenuConfig(editor: IDomEditor): IUploadConfigForAudio {
    // 获取配置，见 `./config.js`
    return editor.getMenuConfig('uploadAudio') as IUploadConfigForAudio
  }
}

export default UploadAudioMenu
