/* eslint-disable no-console */
import axios from 'axios'
// import router from '@/router/router.js'
// import { Notification, MessageBox } from 'element-ui'
//import store from '@/store/store.js'
import Vue from 'vue'
import {
	getToken,
	removeToken,
	removeUser
} from '@/utils/auth'
import Config from '@/config'
import i18n from '@/i18n/index.js'

if(process.env.NODE_ENV === 'development'){
	axios.defaults.baseURL = "https://j.tpsns.com/api"
}else{
	axios.defaults.baseURL = "https://j.tpsns.com/api"
}
Vue.prototype.apiHead = axios.defaults.baseURL //用于图片上传，注意开发环境和生产环境的区别

// 创建axios实例
const service = axios.create({
	timeout: Config.timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
	config => {
		if (getToken()) {
			config.headers['Authorization'] = 'Bearer' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
		}
		if (config.method === 'post') {
			config.headers['Content-Type'] = "application/json"
		}
		if (config.method === 'put') {
			config.headers['Content-Type'] = "application/json"
		}
		// config.headers['lang'] = i18n.locale
		return config
	},
	error => {
		// Do something with request error
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	res => {
		if (res.status != 200) {
			if (res.status == 400 || res.status == 401 || res.status == 402) { //token错误 清除登录信息
				//重新登录
				removeToken()
				removeUser()
				router.push({
					name: "login",
				})
			}

			if (res.status == 501) {
				var showMsg = (typeof res.data.msg == 'string') ? res.data.msg : '数据格式错误';
				return res.data
			}
			var showMsg = (typeof res.data.msg == 'string') ? res.data.msg : '数据格式错误';
			return res.data

		} else {
			if (res.data.status == -10000) {
				/*清除所有缓存*/
				removeToken()
				removeUser()
				router.push({
					name: "login",
				})
				return
			}
			// 未设置支付密码
			if (res.data.status == -10020) {}
			if (res.data.status < 1 && res.data.msg) {
				return res.data
			}
		}
		return res.data
	},
	error => {
		if (error && error.response && error.response.status) {
			if (error.response.status == 401) {
				removeToken()
				removeUser()
				router.push({
					name: "login",
				})
			}
		}
		return Promise.reject(error)
	}
)
export default service
