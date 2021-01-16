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
            keyword: '',
            isFocused: false
        }
    },
    methods: {
        handleOnInput(e: Event) {
            this.keyword = (e.target as HTMLInputElement).value
            this.$emit('update:value', this.keyword)
            this.$emit('input', e)
            this.$emit('change', e)
        },
        handleOnFocus(e: Event) {
            this.isFocused = true
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
        </div>
    }
})