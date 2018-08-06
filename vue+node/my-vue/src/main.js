// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import axios from 'axios'
import {store} from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
//引入时间格式插件
import moment from 'moment'

import router from './router.js'


Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.filter('formatDate',function(value) {
	return moment(value).format('YYYY年MM月DD日 HH:mm:ss');
});

Vue.filter('splitContent',(value)=>{
	return value.slice(0,50)+'...'
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
