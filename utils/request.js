import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME
} from '@/config/app';
import store from '../store';

/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = false
}) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER;

	if (!noAuth) {
		if (!store.state.token) {
			return Promise.reject({
				info: "未登录"
			});
		}
	}
	if (store.state.token) header[TOKENNAME] = store.state.token;

	return new Promise((reslove, reject) => {
		uni.request({
			url: Url + '/api/' + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				if (res.data.code == 1)
					reslove(res.data, res);
				else if(res.data.code == 4000)
					store.commit('clear')
				else
					reject(res.data);
			},
			fail: (msg) => {
				reject(`请求失败`);
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});



export default request;
