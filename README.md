<p align="center">
    <a href="https://admin.makeit.vip/">
        <img width="200" src="https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png">
    </a>
</p>

<h1 align="center" color="green">
    <a href="https://admin.makeit.vip/components/search" target="_blank" style="color: #41b995">
        Makeit Search
    </a>
</h1>

<div align="center">

基于 Vue3 + Vite 开发的搜索组件

[![npm package](https://img.shields.io/npm/v/makeit-search.svg?style=flat-square)](https://www.npmjs.org/package/makeit-search)
[![npm_downloads](http://img.shields.io/npm/dm/makeit-search.svg?style=flat-square)](http://www.npmtrends.com/makeit-search)
![MIT](https://img.shields.io/badge/license-MIT-ff69b4.svg)
![webpack](https://img.shields.io/badge/webpack-5.14.0-orange.svg)
![vue](https://img.shields.io/badge/vue-3.0.5-green.svg)
![vite](https://img.shields.io/badge/vite-1.0.0-yellow.svg)
![axios](https://img.shields.io/badge/axios-0.21.1-red.svg)
</div>

## 关于

> Makeit Search 搜索组件，是基于 Vue3.0.5 + Vite 开发，默认根据本地数据进行数据筛选，支持远程搜索，同时也支持搜索结果分页配置，自定义结果列表中每一项的点击事件等。

## 安装

```bash
npm i makeit-captcha
```

## 使用
```ts
import { createApp } from 'vue'
import MakeitSearch from 'makeit-search'
import 'makeit-search/dist/search.min.css'
import App from './app.vue'

const app = createApp(App)
app.use(MakeitSearch)
app.mount('#app')
```

## 示例
```vue
<!-- 基础效果 -->
<template>
    <mi-search :data="data" search-key="title"></mi-search>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        data() {
            return {
                data: [
                    {title: '麦可易特网 - 登录页面'},
                    {title: '麦可易特网 - 滑块验证'},
                    {title: '麦可易特网 - 气泡提示'},
                    {title: '麦可易特网 - 菜单选项'},
                    {title: '麦可易特网 - 注册页面'},
                    {title: '麦可易特网 - 弹窗动效'}
                ]
            }
        }
    })
</script>
```

## 更多
> 更多定制化内容及使用请查看在线示例：[https://admin.makeit.vip/components/search](https://admin.makeit.vip/components/search)