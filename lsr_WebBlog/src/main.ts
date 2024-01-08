import { createApp } from 'vue'
import router from './router/router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import dayjs from 'dayjs'

const app = createApp(App);
let pinia=createPinia();
pinia.use(piniaPluginPersist)

app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.use(Antd)
app.mount('#app')
app.config.globalProperties.$dayjs = dayjs
