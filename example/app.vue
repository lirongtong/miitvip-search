<template>
    <mi-search :data="data" search-key="title" @item-click="handleItemClick"></mi-search>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        data() {
            return {
                data: [{
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
                }, {
                    title: '麦可易特网 - 基础布局'
                }, {
                    title: '麦可易特网 - 密码设置'
                }, {
                    title: '麦可易特网 - 下拉菜单'
                }, {
                    title: '麦可易特网 - 消息中心'
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
