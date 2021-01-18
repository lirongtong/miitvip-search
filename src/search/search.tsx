import { defineComponent } from 'vue'
import PropTypes, { tuple } from '../utils/props'
import tools from '../utils/tools'

export default defineComponent({
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
        searchTime: PropTypes.oneOf(
            tuple('change', 'blur')
        ).def('change'),
        searchKey: PropTypes.string,
        searchDelay: PropTypes.number,
        data: PropTypes.array,
        listHeight: PropTypes.number,
        listRadius: PropTypes.number,
        listNoDataText: PropTypes.string.def('暂无符合条件的数据'),
        onChange: PropTypes.func,
        onInput: PropTypes.func,
        onPressEnter: PropTypes.func,
        onKeydown: PropTypes.func,
        onKeyup: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        'onUpdate:value': PropTypes.func
    },
    data() {
        return {
            prefixCls: 'mi-search',
            loading: false,
            keyword: '',
            isFocused: false,
            modal: false,
            list: []
        }
    },
    methods: {
        handleOnInput(e: Event) {
            this.keyword = (e.target as HTMLInputElement).value
            if (this.keyword) this.loading = true
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
        getSearchListElem() {
            const style = {
                height: this.listHeight ? `${tools.pxToRem(this.listHeight)}rem` : null,
                top: this.height ? `${tools.pxToRem(this.height)}rem` : null,
                borderColor: this.borderColor ?? null,
                borderRadius: this.listRadius ? `${tools.pxToRem(this.listRadius)}rem` : null
            }
            const cls = `${this.prefixCls}-list${this.list.length <= 0 ? ` ${this.prefixCls}-no-data` : null}`
            const noData = this.list.length <= 0 && !this.loading ? (
                <p>{ this.listNoDataText }</p>
            ) : null
            return (
                <div class={cls} style={style}>
                    { noData }
                    { this.getLoadingElem() }
                </div>
            )
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