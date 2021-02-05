// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// import {
// 	getToken,
// 	setToken
// } from "@/utils/auth.js";
// import {
// 	getShopConfig
// } from "@/utils/api.js";
// const store = new Vuex.Store({
// 	state: {
// 		token: getToken(),
// 		shop_config: null,
// 		a:"111",
// 		shop_basic: null,
// 		shop_list:[],
// 		sellerUrl: process.env.VUE_APP_SELLER_NAME,
// 	},
// 	// getters: {
// 	// 	token: state => state.token || getToken(),
// 	// },
// 	mutations: {
// 		SET_TOKEN: (state, token) => {
// 			state.token = token
// 			setToken(token)
// 		},
// 		SET_SHOP_CONFIG: (state, config) => {
// 			state.shop_config = config
// 		},
// 		SET_TIP_CONFIG: (state, config) => {
// 			state.tip_config = config
// 		},
// 		SET_TAX_CONFIG: (state, config) => {
// 			state.tax_config = config
// 		},
// 		SET_SHOP_BASIC: (state, basic) => {
// 			state.shop_basic = basic
// 		},
// 		shopList(state,list){
// 			state.shop_list.push(list)
// 		},
// 	},
// 	actions: {
// 		shopConfig(ctx,item) {
// 			let that = this;
// 			getShopConfig({
// 				inc_type: "shop_info,basic,tip,tax"
// 			}).then(function(res) {
// 				var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
// 				link.type = 'image/x-icon';
// 				link.rel = 'shortcut icon';
// 				link.href = res.shop_info.store_ico;
// 				document.getElementsByTagName('head')[0].appendChild(link);
// 				ctx.commit('SET_SHOP_CONFIG', res.shop_info)
// 				ctx.commit('SET_SHOP_BASIC', res.basic)
// 				if (res.tip) {
// 					ctx.commit('SET_TIP_CONFIG', res.tip)
// 				}
// 				if (res.tax) {
// 					ctx.commit('SET_TAX_CONFIG', res.tax)
// 				}
// 			});
// 		},
// 		shopList(ctx,list){
// 			ctx.commit('shopList',list)
// 		},
// 	},
// 	// plugins: [createPersistedState()],
// })

// export default store


import {
	getToken,
	setToken
} from "@/utils/auth.js";
import {
	getShopConfig
} from "@/utils/api.js";
export const state = () => ({
	token: getToken(),
	shop_config: null,
	shop_basic: null,
	shop_list:[],
	sellerUrl: process.env.VUE_APP_SELLER_NAME,
})

export const getters = {
	token: state => state.token || getToken(),
}

export const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
		setToken(token)
	},
	SET_SHOP_CONFIG: (state, config) => {
		state.shop_config = config
	},
	SET_TIP_CONFIG: (state, config) => {
		state.tip_config = config
	},
	SET_TAX_CONFIG: (state, config) => {
		state.tax_config = config
	},
	SET_SHOP_BASIC: (state, basic) => {
		state.shop_basic = basic
	},
	shopList(state,list){
		state.shop_list.push(list)
	},
}

export const actions = {
	nuxtServerInit ({ commit }, { req }){
		console.log(commit)	
	},
	shopConfig(ctx,item) {
		let that = this;
		getShopConfig({
			inc_type: "shop_info,basic,tip,tax"
		}).then(function(res) {
			var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
			link.type = 'image/x-icon';
			link.rel = 'shortcut icon';
			link.href = res.shop_info.store_ico;
			document.getElementsByTagName('head')[0].appendChild(link);
			ctx.commit('SET_SHOP_CONFIG', res.shop_info)
			ctx.commit('SET_SHOP_BASIC', res.basic)
			if (res.tip) {
				ctx.commit('SET_TIP_CONFIG', res.tip)
			}
			if (res.tax) {
				ctx.commit('SET_TAX_CONFIG', res.tax)
			}
		});
	},
	shopList(ctx,list){
		ctx.commit('shopList',list)
	},
}



