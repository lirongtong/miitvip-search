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
![vue](https://img.shields.io/badge/vue-3.2.37-green.svg)
![vite](https://img.shields.io/badge/vite-3.0.2-yellow.svg)
![axios](https://img.shields.io/badge/axios-0.27.2-red.svg)
</div>

## 关于

> Makeit Search 搜索组件，基于 Vue3.x + Vite3.x 开发，默认根据本地数据进行数据筛选，支持远程搜索，同时也支持搜索结果分页配置，自定义结果列表中每一项的点击事件等。

:white_check_mark: 默认根据本地数据进行过滤筛选

:white_check_mark: 支持配置远程接口获取待筛选数据

:white_check_mark: 支持远程搜索延迟

:white_check_mark: 支持自定义搜索框的外观（宽高、主题色、文本颜色等 ···）

:white_check_mark: 支持列表与结果的分页显示

:white_check_mark: 支持14种搜索框显示与隐藏的动画效果配置

:white_check_mark: 支持自定义点击选项的回调事件

:white_check_mark: 支持自定义搜索列表模板

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
<template>
    <!-- 基础效果 -->
    <mi-search :data="searchData" search-key="title" />

    <!-- 自定义模板 -->
    <mi-search :data="searchData"
        search-key="title"
        border-color="#2F9688"
        search-key-color="#2F9688"
        :radius="42"
        :pagination="true"
        :page-size="3">
        <template v-slot:itemTemplate>
            <div class="avatar">
                <mi-search-key type="image" tag="img" name="avatar" />
            </div>
            <div class="info">
                <div class="title">
                    <mi-search-key name="title" />
                </div>
                <div class="content">
                    <mi-search-key name="content" />
                </div>
            </div>
        </template>
    </mi-search>

    <!-- 支持远程搜索 / 搜索延迟 -->
    <mi-search search-key="title"
        border-color="#3399ff"
        search-key-color="#3399ff"
        search-action="v1/captcha/init"
        :search-delay=".3" />
</template>

<script steup>
    const searchData = [{
        title: '页面布局',
        content: '基于 Layout 组件的二次定制',
        avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
        link: '/layout',
        icon: LayoutOutlined
    }, {
        title: '登录页面',
        content: '快速构建精美「登录页面」',
        link: '/login',
        icon: LoginOutlined
    }, {
        title: '注册页面',
        content: '快速构建精美「注册页面」',
        link: '/register',
        icon: ScheduleOutlined
    }]
</script>
```

## 更多

> 更多定制化内容及使用请查看在线示例：[https://admin.makeit.vip/components/search](https://admin.makeit.vip/components/search)