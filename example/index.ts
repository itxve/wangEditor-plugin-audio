/**
 * @description examples entry
 * @author itxve
 */

import { createEditor, createToolbar, Boot, IEditorConfig, t } from '@wangeditor/editor'
import module, { AUDIO_SVG } from '../src/index'

Boot.registerModule(module)

// i18nChangeLanguage('en')

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  onChange(editor) {
    const html = editor.getHtml()
    // @ts-ignore
    document.getElementById('text-html').value = html
    const contentStr = JSON.stringify(editor.children, null, 2)
    // @ts-ignore
    document.getElementById('text-json').value = contentStr
  },
  hoverbarKeys: {
    audio: {
      menuKeys: ['editAudio'], // “编辑音频”菜单
    },
  },
  MENU_CONF: {
    insertAudio: {
      parseAudioSrc: (src: string) => {
        console.log('src', src)
        return src
      },
    },
    // 上传附件的菜单配置
    uploadAudio: {
      // 用户自定义上传
      customUpload(file: File, insertFn: Function) {
        console.log('customUpload', file)
        debugger
        const form = new FormData()
        form.append('file', file)

        return fetch('http://127.0.0.1:3000/api/upload-img', {
          method: 'post',
          body: form,
        })
          .then(res => res.json())
          .then(res => {
            const data = res.data
            Array.from(data).forEach((it: any) => {
              insertFn(it.url)
            })
            console.log(res)
          })
      },

      // // 自定义选择
      // customBrowseAndUpload(insertFn: Function) {
      //   alert('自定义选择文件，如弹出图床')
      // // },

      // onInsertedAttachment(elem: AudioElement) {
      //   console.log('inserted attachment', elem)
      // },
    },
  },
}

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  // content: [
  //   {
  //     type: 'paragraph',
  //     children: [
  //       { text: 'hello world' },
  //       {图片地址

  //         // @ts-ignore
  //         type: 'audio',
  //         link: 'https://pan.baidu.com/',
  //         children: [{ text: '' }],
  //       },
  //     ],
  //   },

  //   {
  //     // @ts-ignore
  //     type: 'paragraph',
  //     children: [{ text: '选一个视频文件，作为附件上传：' }],
  //   },
  // ],
  html: `<p><span data-w-e-type="audio"  data-w-e-is-void data-w-e-is-inline ><audio controls src="http://127.0.0.1:3000/upload-files/aa.mp3">audio not support </audio><span></p>`,
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',

  config: {
    insertKeys: {
      index: -1,
      keys: [
        {
          key: 'group-audio',
          title: t('audio.insert'),
          iconSvg: AUDIO_SVG,
          menuKeys: ['insertAudio', 'uploadAudio'],
        },
      ], // “上传附件”菜单
    },
  },
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
