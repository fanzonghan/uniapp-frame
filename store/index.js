//引用Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//实例store并导出
export default new Vuex.Store({
	state: {
		app: {
			userInfo:{},
			token: '',
		}
	},
	mutations: {
		setUserInfo(state, data){
			state.userInfo = data;
			uni.setStorageSync('userInfo', data);
		},
		setToken(state, token){
			state.token = token;
			uni.setStorageSync('token', token);
		},
		init(state) {
			if(!state.token){
				state.token = uni.getStorageSync('token');
			}
			if(!state.userInfo){
				state.userInfo = uni.getStorageSync('userInfo');
			}
		},
		clear(state){
			state.token = ''
			uni.setStorageSync('token','');
			state.userInfo = {}
			uni.setStorageSync('userInfo',{});
		}
	}
})

