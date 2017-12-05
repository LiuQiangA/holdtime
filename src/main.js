// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import './const'
import VueAMap from 'vue-amap'

Vue.use(ElementUI)
Vue.use(VueAMap)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
	// 申请的高德key
	key: '99ece22e7da83c0dcfc0f9b0e229f64f',
	// 插件集合
	plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.CitySearch', 'MarkerClusterer']
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})