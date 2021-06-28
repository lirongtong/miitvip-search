import { App } from 'vue'
import { version } from '../package.json'
import { default as Search } from './search'

const install = (app: App) => {
    app.use(Search)
    return app
}

export { Search }

export default {
    version,
    install
}