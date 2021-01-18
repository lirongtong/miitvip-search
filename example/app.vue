<template>
    <mi-search :data="data" search-key="title"></mi-search>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        data() {
            return {
                data: [{
                    title: '麦可易特网 - 登录页面麦可易特网 - 登录页面麦可易特网 - 登录页面',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 滑块验证',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 气泡提示',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 菜单选项',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 注册页面',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 弹窗动效',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 按需加载',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 基础布局',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 密码设置',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 下拉菜单',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }, {
                    title: '麦可易特网 - 消息中心',
                    avatar: 'https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png'
                }]
            }
        },
        methods: {
            handleItemClick(data) {
                console.log(data)
            }
        }
    })
</script>
