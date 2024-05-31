import { createApp } from 'vue'
import { ViewTransitionsPlugin } from 'vue-view-transitions'
import App from './App.vue'
import router from './router'

import './globals.css'

const app = createApp(App)
app.use(router)
app.use(ViewTransitionsPlugin())
app.mount('#app')
