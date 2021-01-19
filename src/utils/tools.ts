import { Fragment } from 'vue'

class MiTools {
    /**
     * Whether it is a mobile phone.
     * @returns {boolean}
     */
    isMobile(): boolean {
        const agent = navigator.userAgent,
            agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        let mobile = false
        for (let i = 0, len = agents.length; i < len; i++) {
            if (agent.indexOf(agents[i]) > 0) {
                mobile = true
                break
            }
        }
        return mobile
    }
    
    /**
     * Whether it is a number.
     * @param number
     */
    isNumber(number: any): boolean {
        return typeof number === 'number' && isFinite(number)
    }

    /**
     * Unit conversion.
     * @param value 
     */
    pxToRem(value: number) {
        return Math.round(value / 16 * 100) / 100
    }

    /**
     * Generate a random number within the specified range.
     * @param start
     * @param end
     * @returns {number}
     */
    randomNumberInRange(start: number, end: number): number {
        return Math.round(Math.random() * (end - start) + start)
    }

    /**
     * Event binding.
     * @param element
     * @param event
     * @param listener
     * @param useCapture
     */
    on(
        element: Window | HTMLElement,
        event: keyof HTMLElementEventMap,
        listener: (
            this: HTMLDivElement,
            evt: HTMLElementEventMap[keyof HTMLElementEventMap]
        ) => any,
        useCapture = false
    ) {
        if (!!document.addEventListener) {
            if (element && event && listener) element.addEventListener(event, listener, useCapture)
        } else {
            if (element && event && listener) (element as any).attachEvent(`on${event}`, listener)
        }
    }

    /**
     * Event unbind.
     * @param element
     * @param event
     * @param listener
     * @param useCapture
     */
    off(
        element: Window | HTMLElement,
        event: keyof HTMLElementEventMap,
        listener: (
            this: HTMLDivElement,
            evt: HTMLElementEventMap[keyof HTMLElementEventMap]
        ) => any,
        useCapture = false
    ) {
        if (!!document.addEventListener) {
            if (element && event && listener)
                element.removeEventListener(event, listener, useCapture)
        } else {
            if (element && event && listener) (element as any).detachEvent(`on${event}`, listener)
        }
    }

    findDOMNode(instance: any) {
        let node = instance && (instance.$el || instance)
        while (node && !node.tagName) node = node.nextSibling
        return node
    }

    /**
     * Whether the element is empty.
     * @param elem 
     */
    isEmptyElement(elem: any) {
        return (
            elem.type === Comment ||
            (elem.type === Fragment && elem.children.length === 0) ||
            (elem.type === Text && elem.children.trim() == '')
        )
    }

    /**
     * Whether the value is valid.
     * @param value 
     */
    isValid(value: any): boolean {
        return value !== undefined && value !== null && value !== ''
    }

    random(): string {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    /**
     * Generate unique string.
     * @param upper
     * @returns {string}
     */
    uid(upper = false, prefix?: string): string {
        let str = (
            this.random() +
            this.random() +
            this.random() +
            this.random() +
            this.random() +
            this.random() +
            this.random() +
            this.random()
        ).toLocaleUpperCase()
        if (prefix) str = prefix + str
        return upper ? str.toUpperCase() : str.toLowerCase()
    }

    /**
	 * convert color.
	 * @param color
	 * @param opacity
	 */
	colorHexToRgba(color: string, opacity = 1): string {
		const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
		if (reg.test(color)) {
			if (color.length === 4) {
				let newColor = '#'
				for (let i = 1; i < 4; i++) {
					newColor += color.slice(i, i + 1).concat(color.slice(i, i + 1))
				}
				color = newColor
			}
			const changeColor: number[] = []
			for (let i = 1; i < 7; i += 2) {
				changeColor.push(parseInt('0x' + color.slice(i, i + 2)))
			}
			return `rgba(${changeColor.join(',')}, ${opacity})`
		} else {
			return color
		}
    }
    
    /**
     * convert color.
     * @param color 
     */
    colorRgbToHex(color: string) {
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        if(/^(rgb|RGB)/.test(color)){
            var aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
            var strHex = '#'
            for (let i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16)
                if(hex === '0') hex += hex
                strHex += hex
            }
            if (strHex.length !== 7) strHex = color
            return strHex
        } else if (reg.test(color)) {
            var aNum = color.replace(/#/, '').split('')
            if (aNum.length === 6) {
                return color
            } else if (aNum.length === 3) {
                var numHex = '#'
                for (let i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i]+aNum[i])
                }
                return numHex
            }
        } else {
            return color
        }
    }

    /**
     * Transfer.
     * @param html 
     */
    htmlEncode(html: string) {
        let temp = document.createElement('div') as HTMLDivElement
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html)
        var output = temp.innerHTML
        temp = null
        return output
    }
}

export default new MiTools()