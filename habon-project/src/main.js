import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios';

import "@/assets/fonts/BMEuljiro10yearslater.ttf";

axios.defaults.baseURL = 'http://localhost:8080'; 
axios.defaults.withCredentials = true;

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
