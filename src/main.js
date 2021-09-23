import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

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
Vue.component('tree-table', TreeTable)
    // 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)
    // 全局时间过滤器dateFormat
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
        // padStart(2,'0')：两位，不足使用字符串零填充
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')