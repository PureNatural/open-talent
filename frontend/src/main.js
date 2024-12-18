import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import './assets/shared.css'
import * as echarts from 'echarts'

axios.defaults.baseURL = '/api'

Vue.prototype.$http=axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
