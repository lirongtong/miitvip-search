import { createApp } from 'vue'
import MakeitSearch from 'makeit-search'
import App from './app.vue'
import 'makeit-search/style'
import './index.less'

const app = createApp(App)
app.use(MakeitSearch)
app.mount('#app')
