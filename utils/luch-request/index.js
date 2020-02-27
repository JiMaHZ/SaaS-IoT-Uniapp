import Request from './request'

const test = new Request()
test.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'http://localhost:38080'
  config.header = {
    ...config.header,
    // a: 1,
    // b: 2
  }
  // config.custom = { auth: true }
  return config
})

// try {
//     let token1 = uni.getStorageSync('storage_key')?uni.getStorageSync('storage_key'):' ';
// 	console.log(token1)
// } catch (e) {
//     // error
// 	console.log('校验失败')
// }

test.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
    // a: 3
  }
  // if(token1 !== undefined){
  // 	 config.header['Blade-Auth'] = 'bearer '+ token1;
  // }
  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
test.validateStatus = (statusCode) => {
  return statusCode === 200
}

test.interceptor.response((response) => { /* 请求之后拦截器 */
  return response
}, (response) => { // 请求错误做点什么
  return response
})

const http = new Request()


http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'http://localhost:38080/api' /* 根域名不同 */
  // config.baseUrl = 'http://140.143.23.199:38080' /* 根域名不同 */
  // config.baseUrl = 'http://www.linkwireless.cn:38080/api' /* 根域名不同 */
  config.header = {
    ...config.header,
	// Authorization:'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
	// 'Blade-Auth': 'bearer '+ token1,
    // a: 1,
    // b: 2
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200
}



http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
	// Access-Control-Allow-Origin: *,
	Authorization:'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
    // b: 1
  }
  // if(token1){
	 // config.header['Blade-Auth'] = 'bearer '+ token1;
  // }
  console.log(config.header)
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
  // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  return response
}, (response) => { // 请求错误做点什么
  return response
})

export {
  http,
  test
}
