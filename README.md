# Uniapp 请求脚手架

这是一个为 Uniapp 项目设计的请求脚手架，集成了 HTTP 请求封装、Token 管理和 Vuex 状态管理，提供了简洁的 API 调用方式。

## 功能特性

- ✅ 统一的请求封装，支持所有 HTTP 方法
- ✅ 自动 Token 管理（存储、携带、清除）
- ✅ 多端兼容（小程序、H5、App）
- ✅ 国际化支持（自动携带语言标识）
- ✅ 灵活的鉴权控制
- ✅ 响应状态码处理
- ✅ 本地数据持久化

## 安装与配置

### 1. 环境配置
在项目根目录创建 `config/app.js` 配置文件：

```javascript
module.exports = {
// 小程序配置
// #ifdef MP || APP-PLUS
HTTP_REQUEST_URL: `你的接口地址`,
// #endif

// H5配置
// #ifdef H5
HTTP_REQUEST_URL: window.location.protocol + "//" + window.location.host,
// HTTP_REQUEST_URL: `http://接口地址`,
// #endif

HEADER: {
'content-type': 'application/json',
// H5端微信浏览器识别
//#ifdef H5
'Form-type': navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ? 'wechat' : 'h5',
//#endif
},
TOKENNAME: 'token', // 请勿修改此配置
}
```

### 2. 文件结构
```
src/
├── utils/
│└── request.js# 请求封装
├── store/
│└── index.js# Vuex 状态管理
├── config/
│└── app.js# 配置文件
└── api/
└── demo.js# API 接口文件
```

## 使用方法

### 基本请求

```javascript
import request from "@/utils/request.js";

// GET 请求（带鉴权）
export function getUserInfo() {
return request.get("user/info");
}

// POST 请求（带鉴权）
export function updateUser(data) {
return request.post("user/update", data);
}

// 无鉴权请求
export function test() {
return request.get("test", {}, {
noAuth: true,
});
}
```

### 支持的 HTTP 方法
脚手架支持以下所有 HTTP 方法：
- `options`, `get`, `post`, `put`, `head`, `delete`, `trace`, `connect`

### API 接口使用

```javascript
import { getUserInfo, updateUser, test } from '@/api/demo.js';

// 调用 API
async function fetchData() {
try {
// 无鉴权请求
const testResult = await test();

// 有鉴权请求
const userInfo = await getUserInfo();

// POST 请求
const updateResult = await updateUser({ name: '张三' });

console.log('请求成功:', userInfo);
} catch (error) {
console.error('请求失败:', error);
}
}
```

## Vuex 状态管理

### 状态结构
```javascript
state: {
app: {
userInfo: {},// 用户信息
token: '',// 认证令牌
}
}
```

### 可用方法

#### 设置用户信息
```javascript
store.commit('setUserInfo', userData);
```

#### 设置 Token
```javascript
store.commit('setToken', tokenString);
```

#### 初始化状态（从本地存储恢复）
```javascript
store.commit('init');
```

#### 清除用户数据
```javascript
store.commit('clear');
```

## 响应处理

### 响应码说明
- `code == 1`: 请求成功，返回 `reslove(res.data, res)`
- `code == 4000`: Token 失效，自动清除登录状态
- 其他 `code`: 请求失败，返回 `reject(res.data)`

### 错误处理
```javascript
request.get("api/path")
.then(res => {
console.log('成功:', res);
})
.catch(error => {
if (error === "未登录") {
// 跳转到登录页面
uni.navigateTo({ url: '/pages/login/login' });
} else {
uni.showToast({
title: error.info || '请求失败',
icon: 'none'
});
}
});
```

## 注意事项

1. **Token 自动管理**：只要存在 `store.state.token`，请求时会自动添加到请求头
2. **本地存储**：用户信息和 Token 会自动持久化到本地存储
3. **鉴权控制**：使用 `noAuth: true` 参数可以跳过鉴权检查
4. **多端兼容**：配置文件根据平台自动切换请求地址
5. **状态码 4000**：当收到此状态码时，会自动清除用户登录状态

## 示例配置

### 完整 API 文件示例
```javascript
import request from "@/utils/request.js";

// 用户相关接口
export const userApi = {
// 登录
login: (data) => request.post("user/login", data, { noAuth: true }),

// 注册
register: (data) => request.post("user/register", data, { noAuth: true }),

// 获取用户信息
getInfo: () => request.get("user/info"),

// 更新用户信息
updateInfo: (data) => request.post("user/update", data),

// 退出登录
logout: () => request.post("user/logout"),
};

// 商品相关接口
export const productApi = {
// 获取商品列表
getList: (params) => request.get("product/list", params),

// 获取商品详情
getDetail: (id) => request.get(`product/detail/${id}`),

// 创建商品
create: (data) => request.post("product/create", data),
};
```

## 更新日志

### v1.0.0
- 初始版本发布
- 基础请求封装
- Vuex 状态管理
- Token 自动管理
- 多端兼容配置

## 许可证

MIT License