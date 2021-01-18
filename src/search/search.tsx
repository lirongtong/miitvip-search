import { defineComponent, isVNode, createVNode, VNode, cloneVNode } from 'vue'
import axios from 'axios'
import MiSearchKey from './key'
import PropTypes, { getSlotContent } from '../utils/props'
import tools from '../utils/tools'

const MiSearch = defineComponent({
    name: 'MiSearch',
    inheritAttrs: false,
    props: {
        width: PropTypes.number,
        height: PropTypes.number,
        radius: PropTypes.number,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        placeholder: PropTypes.string,
        borderColor: PropTypes.string,
        textColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        boxShadow: PropTypes.bool.def(false),
        boxShadowColor: PropTypes.string.def('#d9d9d9'),
        boxShadowBlur: PropTypes.number.def(6),
        searchAction: PropTypes.string,
        searchMethod: PropTypes.string.def('post'),
        searchParams: PropTypes.object.def({}),
        searchKey: PropTypes.string.isRequired,
        searchKeyColor: PropTypes.string,
        searchDelay: PropTypes.number,
        data: PropTypes.array,
        itemTemplate: PropTypes.any,
        itemColor: PropTypes.string,
        listHeight: PropTypes.number,
        listRadius: PropTypes.number,
        listBackground: PropTypes.string,
        listNoDataText: PropTypes.string.def('暂无符合条件的数据'),
        onChange: PropTypes.func,
        onInput: PropTypes.func,
        onPressEnter: PropTypes.func,
        onKeydown: PropTypes.func,
        onKeyup: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onItemClick: PropTypes.func,
        'onUpdate:value': PropTypes.func
    },
    data() {
        return {
            prefixCls: 'mi-search',
            prefixIndex: 'mi-index',
            loading: false,
            keyword: '',
            isFocused: false,
            modal: false,
            datas: this.$props.data,
            list: [],
            error: '',
            timer: null,
            clickOutside: null
        }
    },
    beforeUnmount() {
        this.loading = false
        this.modal = false
        this.error = ''
        this.clickOutside = null
        this.keyword = ''
        this.isFocused = false
    },
    mounted() {
        this.list = this.datas
        if (!this.clickOutside) this.clickOutside = tools.on(document.body, 'click', this.handleDocumentClick)
    },
    methods: {
        handleSearch() {
            const search = () => {
                if (this.searchAction) {
                    axios[this.searchMethod.toLowerCase()](this.searchAction, this.searchParams).then((res: any) => {
                        const response = res.data
                        this.loading = false
                        if (response.ret.code === 1) {
                            this.datas = response.data
                            this.handleSearchResult()
                        } else {
                            const errors = []
                            errors.push('<p>源数据获取失败，搜索失败 ...</p>')
                            errors.push(`<p>错误代码：${response.ret.code}</p>`)
                            errors.push(`<p>错误原因：${response.ret.message}</p>`)
                            this.error = errors.join('')
                        }
                    }).catch((err: any) => {
                        this.loading = false
                        this.error = `<p>接口请求失败</p><p>${err.message}</p>`
                    })
                } else {
                    this.loading = false
                    this.handleSearchResult()
                }
            }
            if (this.searchDelay) {
                if (this.timer) clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    search()
                }, this.searchDelay * 1000)
            } else search()
        },
        handleSearchResult() {
            const reg = new RegExp(this.keyword, 'ig')
            for (let i = 0, l = this.datas.length; i < l; i++) {
                const cur = this.datas[i]
                if (
                    cur[this.searchKey] &&
                    reg.test(cur[this.searchKey])
                ) {
                    const data = {...cur}
                    data[this.searchKey] = cur[this.searchKey].replace(
                        reg,
                        `<span class="${this.prefixCls}-key" style="color: ${this.searchKeyColor ?? null}">${this.keyword}</span>`
                    )
                    data[this.prefixIndex] = i
                    this.list.push(data)
                }
            }
        },
        handleItemClick(data: any, e?: any) {
            this.$emit('item-click', data, e)
        },
        handleOnInput(e: Event) {
            this.keyword = (e.target as HTMLInputElement).value
            this.list = []
            if (this.keyword) {
                this.loading = true
                this.handleSearch()
            } else {
                this.list = this.datas
                this.loading = false
                this.error = ''
            }
            this.$emit('update:value', this.keyword)
            this.$emit('input', e)
            this.$emit('change', e)
        },
        handleOnFocus(e: Event) {
            this.isFocused = true
            this.modal = true
            this.onFocus && this.onFocus(e)
        },
        handleOnBlur(e: Event) {
            this.isFocused = false
            this.onBlur && this.onBlur(e)
        },
        handleKeyDown(e: KeyboardEvent) {
            if (e.keyCode === 13) this.$emit('pressEnter', e)
            this.$emit('keydown', e)
        },
        handleKeyUp(e: KeyboardEvent) {
            this.$emit('keyup', e)
        },
        handleDocumentClick(e: any) {
            e.preventDefault()
            const target = e.target
            const root = tools.findDOMNode(this)
            if (root && !root.contains(target)) {
                this.modal = false
                this.isFocused = false
            }
        },
        getSearchListElem() {
            const style = {
                height: this.listHeight ? `${tools.pxToRem(this.listHeight)}rem` : null,
                top: this.height ? `${tools.pxToRem(this.height)}rem` : null,
                background: this.listBackground ?? null,
                borderColor: this.borderColor ?? null,
                borderRadius: this.listRadius ? `${tools.pxToRem(this.listRadius)}rem` : null
            }
            const cls = `${this.prefixCls}-list${this.list.length <= 0 ? ` ${this.prefixCls}-no-data` : ''}`
            const noData = this.list.length <= 0 &&
                !this.loading && !this.error ? (
                <p>{ this.listNoDataText }</p>
            ) : null
            const error = this.error ? <div class={`${this.prefixCls}-error`} innerHTML={this.error}></div> : null
            return (
                <div class={cls} style={style}>
                    { noData }
                    { error }
                    { this.getLoadingElem() }
                    { this.getListResultElem() }
                </div>
            )
        },
        getListResultElem() {
            let res = []
            const template = getSlotContent(this, 'itemTemplate')
            if (template) {
                const templates = isVNode(template) ? [template] : template
                for (let n = 0, len = this.list.length; n < len; n++) {
                    const item = {...this.list[n]}
                    const elems = []
                    for (let i = 0, l = templates.length; i < l; i++) {
                        const curTemplate = templates[i]
                        if (isVNode(curTemplate)) {
                            let elem = cloneVNode(curTemplate)
                            if ((curTemplate.type as any).name === MiSearchKey.name) {
                                const tag = curTemplate.props.tag
                                const name = curTemplate.props.name
                                const type = curTemplate.props.type
                                elem = createVNode(
                                    <MiSearchKey name={name}
                                        data={item[name]}
                                        tag={tag}
                                        type={type}>
                                    </MiSearchKey>
                                )
                            }
                            elem = this.getCustomItemDetailElem(elem, item)
                            elems.push(elem)
                        }
                    }
                    res.push(
                        <div class={`${this.prefixCls}-item`}
                            style={{color: this.itemColor ?? null}}
                            onClick={(e: any) => this.handleItemClick(this.datas[item[this.prefixIndex]] ?? item, e)}>
                            { elems }
                        </div>
                    )
                }
            } else {
                for (let i = 0, l = this.list.length; i < l; i++) {
                    const cur = this.list[i]
                    const avatar = cur.avatar ? `<div class="${this.prefixCls}-item-avatar">
                        <img src="${cur.avatar}" />
                    </div>` : ''
                    const width = this.width
                        ? (avatar ? `${tools.pxToRem(this.width < 260 ? 180 : this.width - 80)}rem` : null)
                        : null
                    const info = `<div class="${this.prefixCls}-item-info" style="width: ${width}">
                        ${cur[this.searchKey]}
                    </div>`
                    res.push(
                        <div class={`${this.prefixCls}-item`}
                            style={{color: this.itemColor ?? null}}
                            onClick={(e: any) => this.handleItemClick(this.datas[cur[this.prefixIndex]] ?? cur, e)}
                            innerHTML={avatar + info}>
                        </div>
                    )
                }
            }
            return res.length > 0 ? (
                <div class={`${this.prefixCls}-items`}>{ res }</div>
            ) : null
        },
        getCustomItemDetailElem(node: VNode, item: any) {
            if (
                node &&
                node.children &&
                node.children.length > 0
            ) {
                const data = {...item}
                const children = []
                for (let i = 0, l = node.children.length; i < l; i++) {
                    let child = cloneVNode(node.children[i])
                    if (isVNode(child)) {
                        if ((child.type as any).name === MiSearchKey.name) {
                            const tag = child.props.tag
                            const name = child.props.name
                            const type = child.props.type
                            children[i] = createVNode(
                                <MiSearchKey name={name}
                                    data={item[name]}
                                    tag={tag}
                                    type={type}>
                                </MiSearchKey>
                            )
                        }
                        child = this.getCustomItemDetailElem(child, data)
                    }
                }
                node.children = children
            }
            return node
        },
        getLoadingElem() {
            const loadingCls = `${this.prefixCls}-loading`
            const style1 = {borderColor: this.borderColor ?? null}
            const style2 = {background: this.borderColor ?? null}
            return this.loading ? (
                <div class={loadingCls}>
                    <div class={`${loadingCls}-spinner`}>
                        <div class="load">
                            <div>
                                <div>
                                    <div style={style1}></div>
                                    <div style={style2}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class={`${loadingCls}-tip`}>正在搜索</div>
                </div>
            ) : null
        }
    },
    render() {
        const size = {
            width: this.width ? `${tools.pxToRem(this.width)}rem` : null,
            height: this.height ? `${tools.pxToRem(this.height)}rem` : null
        }
        const style = {
            backgroundColor: this.backgroundColor ?? null,
            borderRadius: this.radius ? `${tools.pxToRem(this.radius)}rem` : null,
            borderColor: this.borderColor ?? null,
            color: this.textColor ?? null,
            boxShadow: this.boxShadow ? `0 0 ${tools.pxToRem(this.boxShadowBlur)}rem ${this.boxShadowColor}` : null
        }
        const modal = this.modal ? this.getSearchListElem() : null
        return <div class={this.prefixCls} style={size}>
            <input class={`${this.prefixCls}-input`}
                name={this.prefixCls}
                placeholder={this.placeholder}
                style={style}
                value={this.keyword}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
                onInput={this.handleOnInput}
                onKeydown={this.handleKeyDown}
                onKeyup={this.handleKeyUp}
                ref={this.prefixCls} />
            { modal }
        </div>
    }
})

MiSearch.Key = MiSearchKey
export default MiSearch as typeof MiSearch & {
    readonly Key: typeof MiSearchKey
}