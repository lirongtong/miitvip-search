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
    },
    data() {
        return {
            prefixCls: 'mi-search'
        }
    },
    methods: {
        change(e: any) {
            this.$emit('change', e)
        }
    },
    mounted() {
        const elem = this.$refs[this.prefixCls]
        if (elem) {
            tools.on(elem, 'input', this.change)
            if (this.searchTime === 'blur') tools.on(elem, 'blur', this.change)
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
                ref={this.prefixCls} />
        </div>
    }
})