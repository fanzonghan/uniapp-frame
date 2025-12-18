module.exports = {
	// 小程序配置
	// #ifdef MP || APP-PLUS
	HTTP_REQUEST_URL: `接口地址`,
	// HTTP_REQUEST_URL: `http://接口地址`,
	// #endif
	
	// H5配置
	// #ifdef H5
	HTTP_REQUEST_URL: window.location.protocol + "//" + window.location.host,
	// HTTP_REQUEST_URL: `http://接口地址`,
	// #endif 
	HEADER: {
		'content-type': 'application/json',
		//#ifdef H5
		'Form-type': navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ? 'wechat' : 'h5',
		//#endif
	},
	// 回话密钥名称 请勿修改此配置
	TOKENNAME: 'token',
}