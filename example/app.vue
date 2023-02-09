<template>
    <div class="mi-searchs">
        <div style="z-index: 20220720">
            <p>基础效果</p>
            <mi-search :data="base"
                search-key="title"
                :list-height="325"
                @item-click="itemClick" />
        </div>

        <div style="z-index: 20220719">
            <p>自定义主题色 / 头像 / 圆角 / 选中关键词的颜色</p>
            <mi-search :data="data"
                search-key="title"
                border-color="#be6be0"
                :radius="42"
                @item-click="itemClick"
                search-key-color="#be6be0" />
        </div>

        <div style="z-index: 20220718">
            <p>支持分页 / 选项文本颜色及点击事件 / 背景色 </p>
            <mi-search :data="data"
                search-key="title"
                background-color="linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%)"
                border-color="#ff9412"
                :pagination="true"
                :page-size="5"
                @item-click="itemClick"
                :list-radius="16"
                list-background="linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%)"
                item-border-bottom-color="#cfcfcf"
                page-color="#ff9412"
                page-border-top-color="#cfcfcf"
                item-color="#ff9412"
                item-content-color="#7b7b7b"
                search-key-color="#be6be0" />
        </div>

        <div style="z-index: 20220717">
            <p>自定义模板</p>
            <mi-search :data="data"
                search-key="title"
                border-color="#2F9688"
                search-key-color="#2F9688"
                :radius="42"
                @item-click="itemClick"
                :list-height="325"
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
        </div>

        <div style="z-index: 20220716">
            <p>支持远程搜索 / 搜索延迟</p>
            <mi-search search-key="title"
                border-color="#3399ff"
                search-key-color="#3399ff"
                search-action="v1/captcha/init"
                :list-height="325"
                :search-delay=".3" />
        </div>
    </div>
</template>

<script setup>
import { LayoutOutlined, LoginOutlined, ScheduleOutlined } from '@ant-design/icons-vue'

const base = [{
    title: '页面布局',
    content: '基于 Layout 组件的二次定制',
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

const itemClick = (data) => {
    console.log(data)
}

const data = [{
    title: '登录页面',
    avatar: 'https://file.makeit.vip/MIITVIP/M00/00/00/K4vDRGPcbmmAG8_sAAAtlj6Tt_s562.png',
    content: '登录页面封装了username / password等常用属性字段，若所需属性与自身需求不符的话，请自行定义整个form表单内容，暂不支持动态配置字段内容（若有需要，可后续集成）。'
}, {
    title: '滑块验证',
    avatar: 'https://file.makeit.vip/MIITVIP/M00/00/00/K4vDRGPcbmmAG8_sAAAtlj6Tt_s562.png',
    content: '滑块验证码组件常用于各种表单提交前的验证。'
}, {
    title: '菜单选项',
    avatar: 'https://file.makeit.vip/MIITVIP/M00/00/00/K4vDRGPcbmmAG8_sAAAtlj6Tt_s562.png',
    content: '左侧菜单默认为空，可通过全局变量 this.$g.menus.items 进行配置。'
}, {
    title: '注册页面',
    avatar: 'https://file.makeit.vip/MIITVIP/M00/00/00/K4vDRGPcbmmAG8_sAAAtlj6Tt_s562.png',
    content: '注册页面封装了基础的usernamepassword等属性，若属性与自己需求不符的话，需要自行定义整个form表单内容，暂不支持动态配置字段内容（若有需要，可后续集成）。'
}, {
    title: '弹窗动效',
    avatar: 'https://file.makeit.vip/MIITVIP/M00/00/00/K4vDRGPcbmmAG8_sAAAtlj6Tt_s562.png',
    content: '弹窗的作用在于，当前处理中的事务中包含与整体事务流程不相关，但又与某个事务节点存在关系的事务，当前情况下肯定不希望跳转页面来处理单个节点的事务而导致整个事务流程中断，此时Modal组件可以在当前页面打开一个浮层来处理事务节点，不影响整个事务的流程。'
}, {
    title: '基础布局',
    avatar: 'https://file.makeit.vip/MIITVIP/M00/00/00/K4vDRGPcbmmAG8_sAAAtlj6Tt_s562.png',
    content: '基于Ant Desing Vue的Layout布局组件，实现个性化的定制。'
}, {
    title: '密码设置',
    avatar: 'https://file.makeit.vip/MIITVIP/M00/00/00/K4vDRGPcbmmAG8_sAAAtlj6Tt_s562.png',
    content: '该组件作用于表单内，快速定义密码设定的相关内容及样式。'
}, {
    title: '下拉菜单',
    avatar: 'https://file.makeit.vip/MIITVIP/M00/00/00/K4vDRGPcbmmAG8_sAAAtlj6Tt_s562.png',
    content: '该组件封装了ADropdown及ADropdownItem组件，以便传入数据后快速生成定制化的菜单选项。'
}, {
    title: '消息中心',
    avatar: 'https://file.makeit.vip/MIITVIP/M00/00/00/K4vDRGPcbmmAG8_sAAAtlj6Tt_s562.png',
    content: '消息组件用于全局消息展示，以弹窗的形式的展示消息列表，支持多Tab切换展示。'
}]
</script>
