import { App } from 'vue'
import { default as Captcha } from './search'

const install = (app: App) => {
    app.use(Captcha)
    return app
}

export { Captcha }

export default {
    version: '1.1.2',
    install
}
