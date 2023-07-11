# wangEditor 上传音频 插件

[English Documentation](./README-en.md)

# 仅仅限于学习

## 介绍

[wangEditor](https://www.wangeditor.com/) 上传音频 插件。

![](./_img/demo.png)

## 安装

```shell
npm i itxve/wangeditor-plugin-audio
```

## 使用

【注意】该文档要求 `@wangeditor/editor` 版本 `>=5.1.16`

### 注册到编辑器

```js
import { Boot } from '@wangeditor/editor'
import audioModule from '@itxve/plugin-upload-audio'

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。

Boot.registerModule(audioModule)
```

### 配置

编辑器配置

```ts
import { IEditorConfig } from '@wangeditor/editor'

const editorConfig: Partial<IEditorConfig> = {
   // 在编辑器中，点击选中“附件”节点时，要弹出的菜单
  hoverbarKeys: {
    audio: {
      menuKeys: ['editAudio'], // “编辑音频”菜单
    },
  },
  MENU_CONF: {
    // “上传音频”菜单的配置
    uploadAudio: {
      server: '/api/upload', // 服务端地址
      timeout: 5 * 1000, // 5s

      fieldName: 'custom-fileName',
      meta: { token: 'xxx', a: 100 },//请求时附加的数据
      metaWithUrl: true,
      headers: { Accept: 'text/x-json' },

      maxFileSize: 10 * 1024 * 1024, // 10M

      onBeforeUpload(file: File) {
        console.log('onBeforeUpload', file)
        return file // 上传 file 文件
        // return false // 会阻止上传
      },
      onProgress(progress: number) {
        console.log('onProgress', progress)
      },
      onSuccess(file: File, res: any) {
        console.log('onSuccess', file, res)
      },
      onFailed(file: File, res: any) {
        alert(res.message)
        console.log('onFailed', file, res)
      },
      onError(file: File, err: Error, res: any) {
        alert(err.message)
        console.error('onError', file, err, res)
      },
      上传成功后，用户自定义插入文件
      // customInsert(res: any, file: File, insertFn: InsertAudioFn) {
      //   console.log('customInsert', res)
      //   const { url } = res.data || {}
      //   if (!url) throw new Error(`url is empty`)

      //   插入附件到编辑器
      //   insertFn(url)
      // },

      // 用户自定义上传
      // customUpload(file: File, insertFn: InsertAudioFn) {
      //   console.log('customUpload', file)
      //  插入一个文件，模拟异步 
      //   return new Promise(resolve => {
      //     setTimeout(() => {
      //       const src = `https://www.w3school.com.cn/i/movie.ogg`
      //       insertFn(src)
      //       resolve('ok')
      //     }, 500)
      //   })
      // },

      // 自定义选择 
      // customBrowseAndUpload(insertFn: InsertAudioFn) {
      //   alert('自定义选择文件，如弹出图床')
      //   // 自己上传文件
      //   // 上传之后用 insertFn(link) 插入到编辑器
      // },
    },
    insertAudio: {
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
     * 格式化 audio src
     * @param src audio src
     * @returns new src
     */
    formatAudioSrc(src: string): string {
      return src
    },
    onInsertedAudio(audioNode: AudioElement): void {},
    },
  },

  // others...
}
```

工具栏配置

```ts
import { IToolbarConfig } from '@wangeditor/editor'

const toolbarConfig: Partial<IToolbarConfig> = {
  // insert some menus in toolbar
  insertKeys: {
      index: -1, //较后位置
      keys: [
        {
          key: 'group-audio',
          title: t('audio.insert'),
          iconSvg: AUDIO_SVG, //
          menuKeys: ['insertAudio', 'uploadAudio'],
        },
      ], // “上传音频”菜单
    },
```

然后创建编辑器和工具栏，会用到 `editorConfig` 和 `toolbarConfig` 。具体查看 wangEditor 文档。

### 服务端返回格式

成功

```json
{
  "errno": 0,
  "data": {
    "url": "link of audio"
  }
}
```

失败（会触发 `onFailed` 函数）

```json
{
  "errno": 1,
  "message": "错误信息"
}
```

### 显示 HTML

附件节点获取的 HTML 格式如下，可以直接显示。

```html
<span data-w-e-type="audio"  data-w-e-is-void data-w-e-is-inline ><audio controls src="http://127.0.0.1:3000/upload-files/aa.mp3">audio not support </audio><span>
```

## 其他

支持 i18n 多语言
