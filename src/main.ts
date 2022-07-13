import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from './store'
import { router } from './router'

import './assets/styles/base.css'
import './assets/styles/chat.css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
