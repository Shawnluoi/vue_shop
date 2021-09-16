import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'

// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
    // axios的请求拦截器（预处理请求头）
axios.interceptors.request.use(config => {
        console.log(config)
        config.headers.Authorization = window.sessionStorage.getItem('token')
            // 必须返回config
        return config
    })
    // axios挂载到vue原型对象
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')