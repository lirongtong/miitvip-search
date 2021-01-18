<template>
    <mi-search :data="data" search-key="title" search-key-color="#f6ca9d"></mi-search>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        data() {
            return {
                data: [{
                    title: '麦可易特网 - 登录页面'
                }, {
                    title: '麦可易特网 - 滑块验证码'
                }, {
                    title: '麦可易特网 - 气泡提示框'
                }, {
                    title: '麦可易特网 - 菜单选项'
                }, {
                    title: 'makeit-admin-pro'
                }]
            }
        }
    })
</script>
