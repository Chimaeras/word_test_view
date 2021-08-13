import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router'

import axios from 'axios'
import 'lib-flexible'
import './util/rem'


Vue.use ( ElementUI );
Vue.use ( VueRouter )

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost/:8081/';
// axios.defaults.baseURL = 'http://47.106.90.16/:8081/';
axios.defaults.headers.post[ 'Content-Type' ] = 'application/json;charset=UTF-8';

Vue.config.productionTip = false

new Vue ( {
	router ,
	render : h => h ( App ) ,
} ).$mount ( '#app' )
