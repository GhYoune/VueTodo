import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { plugin, defaultConfig } from '@formkit/vue'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css"

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(autoAnimatePlugin)
app.use(createPinia())
app.use(Toast, {
  transition: 'Vue-Toastification__slideBlurred',
  maxToasts: 20,
  newestOnTop: true,
})
app.use(plugin, defaultConfig())
app.use(router)

app.mount('#app')
