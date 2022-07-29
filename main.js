import Vue from 'vue'
import App from './App'

//封装提示消息的方法
uni.$showMsg = function(){
	uni.showToast({
		title:'数据请求失败!',
		duration:1500,
		icon:'none'
	})
}

//引入第三方网络
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'http://api-hmugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'	

const app = new Vue({
	...App
})
app.$mount()
