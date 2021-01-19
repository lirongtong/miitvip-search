<template>
    <div class="mi-searchs">
        <p>基础效果</p>
        <mi-search :data="base" search-key="title"></mi-search>
        <p>自定义主题色 / 头像 / 圆角 / 选中关键词的颜色</p>
        <mi-search :data="data" search-key="title" border-color="#be6be0" :radius="42" search-key-color="#be6be0"></mi-search>
        <p>支持分页 / 选项文本颜色及点击事件 / 背景色 </p>
        <mi-search :data="data" search-key="title" border-color="#ff9412" :pagination="true" :page-size="5" @item-click="handleItemClick" :list-radius="16" list-background="#2F9688" page-color="#ff9412" item-color="#ff9412" search-key-color="#be6be0"></mi-search>
        <p>自定义模板</p>
        <mi-search :data="data" search-key="title" border-color="#2F9688" search-key-color="#2F9688" :radius="42" :pagination="true" :page-size="3">
            <template v-slot:itemTemplate>
                <div class="avatar">
                    <mi-search-key type="image" tag="img" name="avatar"></mi-search-key>
                </div>
                <div class="info">
                    <div class="title">
                        <mi-search-key name="title"></mi-search-key>
                    </div>
                    <div class="content">
                        <mi-search-key name="content"></mi-search-key>
                    </div>
                </div>
            </template>
        </mi-search>
        <p>支持远程搜索 / 搜索延迟</p>
        <mi-search search-key="title" border-color="#3399ff" search-key-color="#3399ff" search-action="v1/captcha/init" :search-delay=".3"></mi-search>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        data() {
            return {
                base: [{
                    title: '麦可易特网 - 登录页面'
                }, {
                    title: '麦可易特网 - 滑块验证'
                }, {
                    title: '麦可易特网 - 气泡提示'
                }, {
                    title: '麦可易特网 - 菜单选项'
                }, {
                    title: '麦可易特网 - 注册页面'
                }, {
                    title: '麦可易特网 - 弹窗动效'
                }, {
                    title: '麦可易特网 - 按需加载'
                }],
                data: [{
                    title: '麦可易特网 - 登录页面',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '登录页面封装了username / password等常用属性字段，若所需属性与自身需求不符的话，请自行定义整个form表单内容，暂不支持动态配置字段内容（若有需要，可后续集成）。'
                }, {
                    title: '麦可易特网 - 滑块验证',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '滑块验证码组件常用于各种表单提交前的验证。'
                }, {
                    title: '麦可易特网 - 气泡提示',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '气泡浮层，不承载复杂文本，可以替代系统默认的 title 显示的组件。'
                }, {
                    title: '麦可易特网 - 菜单选项',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '左侧菜单默认为空，可通过全局变量 this.$g.menus.items 进行配置。'
                }, {
                    title: '麦可易特网 - 注册页面',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '注册页面封装了基础的usernamepassword等属性，若属性与自己需求不符的话，需要自行定义整个form表单内容，暂不支持动态配置字段内容（若有需要，可后续集成）。'
                }, {
                    title: '麦可易特网 - 弹窗动效',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '弹窗的作用在于，当前处理中的事务中包含与整体事务流程不相关，但又与某个事务节点存在关系的事务，当前情况下肯定不希望跳转页面来处理单个节点的事务而导致整个事务流程中断，此时Modal组件可以在当前页面打开一个浮层来处理事务节点，不影响整个事务的流程。'
                }, {
                    title: '麦可易特网 - 按需加载',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '默认使用如下语句，将会引入makeit-admin-pro内的所有模块，虽然该组件框架打包压缩后的文件仅有126KB，Gzip压缩后更是仅有31KB，但如果能更精简的话，却是更加美好的选择。'
                }, {
                    title: '麦可易特网 - 基础布局',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '基于Ant Desing Vue的Layout布局组件，实现个性化的定制。'
                }, {
                    title: '麦可易特网 - 密码设置',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '该组件作用于表单内，快速定义密码设定的相关内容及样式。'
                }, {
                    title: '麦可易特网 - 下拉菜单',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '该组件封装了ADropdown及ADropdownItem组件，以便传入数据后快速生成定制化的菜单选项。'
                }, {
                    title: '麦可易特网 - 消息中心',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png',
                    content: '消息组件用于全局消息展示，以弹窗的形式的展示消息列表，支持多Tab切换展示。'
                }]
            }
        },
        methods: {
            handleItemClick(data) {
                alert(data.title)
            }
        }
    })
</script>
