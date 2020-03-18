import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'


import db from './datastore'//数据组

import '../../static/css/file.css'//通用样式数据

import tool from './assets/tool/js/common'
Vue.prototype.$tool=tool;


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
