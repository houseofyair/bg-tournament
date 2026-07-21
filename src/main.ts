import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useRegisterSW } from 'virtual:pwa-register/vue'

import './assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Automatically registers and updates the service worker
useRegisterSW({ immediate: true })
