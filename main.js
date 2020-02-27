import Vue from 'vue'
import App from './App'

 import {http} from './utils/luch-request/index.js'
 Vue.prototype.$http = http

import home from './pages/home/home.vue'
Vue.component('home',home)

import gis from './pages/gis/gis.vue'
Vue.component('gis',gis)

import user from './pages/user/user.vue'
Vue.component('user',user)

Vue.config.productionTip = false

//设置全局Url
// Vue.prototype.$baseUrl = 'http://localhost:38080/api';   //测试
// Vue.prototype.$baseUrl = 'http://140.143.23.199:38080';   //上线
// Vue.prototype.$baseUrl = 'http://www.linkwireless.cn:38080';   //上线http://www.linkwireless.cn/

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
