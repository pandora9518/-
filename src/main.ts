import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
const app = createApp(App)
//引入element插件
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入清除默认scss样式
import '@/styles/index.scss'
//引入暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'
//注册全局has指令
import { isHasButton } from '@/directive/has'
//注册模板路由路由
import router from '@/router'
app.use(router)
//引入大菠萝插件创建根仓库
import store from '@/store'
app.use(store)
isHasButton(app)
//应用全局鉴权
import './permission.ts'
//定义自定义插件
import globalComponent from '@/components'
app.use(globalComponent)
app.use(ElementPlus, {
  locale: zhCn,
})
// import axios from 'axios'
// axios({
//     url: '/api/user/login',
//     method: 'post',
//     data: {
//         username: 'admin',
//         password: '111111'
//     }
// })
app.mount('#app')
