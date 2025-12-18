import request from "@/utils/request.js";

// 无鉴权
// export function 方法名() {
// 	return request.get("接口路由", {}, {
// 		noAuth: true,
// 	});
// }

// get方式
// export function 方法名() {
// 	return request.get("接口路由");
// }

// export function 方法名(data) {
// 	return request.get("接口路由", data);
// }

// post方式
// export function 方法名(data) {
// 	return request.post("接口路由", data);
// }

export function test() {
	return request.get("test", {}, {
		noAuth: true,
	});
}