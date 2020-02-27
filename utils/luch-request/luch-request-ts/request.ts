/**
 * Request 1.0.5
 * @Class Request
 * @description luch-request 1.0.4 http请求插件
 * @Author lu-ch
 * @Date 2019-12-12
 * @Email webwork.s@qq.com
 * http://ext.dcloud.net.cn/plugin?id=392
 */
interface header { // header 接口
  'content-type'?: string,
  [propName: string]: any
}

interface config { // init 全局config接口
  baseUrl: string,
  header: header,
  method: string,
  dataType: string,
  // #ifndef MP-ALIPAY || APP-PLUS
  responseType: string,
  // #endif
  custom: object,
  // #ifdef APP-PLUS
  sslVerify: boolean,
  // #endif
  // #ifdef MP-ALIPAY
  timeout: number
  // #endif
}

interface interceptor { // init 拦截器接口
  request: Function,
  response: Function
}

interface options { // request 方法配置参数（public）
  url: string,
  dataType?: string,
  data?: object,
  params?: object,
  header?: header,
  method?: string,
  responseType?: string,
  custom?: anyObj,
  // #ifdef APP-PLUS
  sslVerify?: boolean,
  // #endif
  // #ifdef MP-ALIPAY
  timeout?: number
  // #endif
}

interface handleOptions { // get/post 方法配置参数（public）
  header?: header,
  params?: object,
  dataType?: string,
  responseType?: string
}

interface newOptions { // 定义新的配置接口
  baseUrl: string
  url: string,
  dataType: string,
  data: object,
  params: object,
  header: header,
  method: string,
  complete?: Function,
  responseType: string,
  custom: anyObj,
  // #ifdef APP-PLUS
  sslVerify: boolean,
  // #endif
  // #ifdef MP-ALIPAY
  timeout: number
  // #endif
}

interface requestCb { // 请求拦截器回调
  (x: object, y: Function): object
}

interface responseCb { // 相应拦截器回调
  (x: object): object
}

interface response { // 响应体 (public)
  statusCode?: number,
  config: Object,
  errMsg: string,
  [propName: string]: any
}

interface requestConfig { // 请求之前参数配置项 (public)
  readonly baseUrl: string
  url: string,
  dataType: string,
  data: object,
  params: object,
  header: header,
  method: string,
  readonly complete: Function,
  responseType: string
}

interface params {
  [propName: string]: any
}

interface anyObj {
  [propName: string]: any
}

export default class Request {
  config: config = {
    baseUrl: '',
    header: {
      'content-type': 'application/json;charset=UTF-8'
    },
    method: 'GET',
    dataType: 'json',
    // #ifndef MP-ALIPAY || APP-PLUS
    responseType: 'text',
    // #endif
    custom: {},
    // #ifdef APP-PLUS
    sslVerify: true,
    // #endif
    // #ifdef MP-ALIPAY
    timeout: 30000
    // #endif
  }

  static posUrl (url: string): boolean { /* 判断url是否为绝对路径 */
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  static addQueryString (params: params): string {
    let paramsData = ''
    Object.keys(params).forEach(function (key) {
      paramsData += key + '=' + encodeURIComponent(params[key]) + '&'
    })
    return paramsData.substring(0, paramsData.length - 1)
  }

  interceptor: interceptor = {
    request: (f: requestCb) => {
      if (f) {
        this.requestBeforeFun = f
      }
    },
    response: (cb: responseCb, ecb: responseCb) => {
      if (cb && ecb) {
        this.requestComFun = cb
        this.requestComFail = ecb
      }
    }
  }

  private requestBeforeFun (config: object, cancel?: Function): object {
    return config
  }

  private requestComFun (response: object): object {
    return response
  }

  private requestComFail (response: object): object {
    return response
  }

  /**
   * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
   * @param { Number } statusCode - 请求响应体statusCode（只读）
   * @return { Boolean } 如果为true,则 resolve, 否则 reject
   */
  validateStatus (statusCode: Number) {
    return statusCode === 200
  }

  set setConfig (f: Function) {
    this.config = f(this.config)
  }

  async request (options: options) {
    const _options: newOptions = {
      baseUrl: this.config.baseUrl,
      dataType: options.dataType || this.config.dataType,
      url: options.url || '',
      data: options.data || {},
      params: options.params || {},
      header: options.header || this.config.header,
      method: options.method || this.config.method,
      custom: { ...this.config.custom, ...(options.custom || {}) },
      // #ifndef MP-ALIPAY || APP-PLUS
      responseType: options.responseType || this.config.responseType,
      // #endif
      // #ifdef MP-ALIPAY
      timeout: options.timeout || this.config.timeout,
      // #endif
      // #ifdef APP-PLUS
      sslVerify: options.sslVerify === undefined ? this.config.sslVerify : options.sslVerify
      // #endif
    }
    // @ts-ignore
    return new Promise((resolve: Function, reject: Function) => {
      let next: boolean = true
      let handleRe: anyObj = {}
      _options.complete = (response: response) => {
        response.config = handleRe
        if (this.validateStatus(response.statusCode)) { // 成功
          resolve(this.requestComFun(response))
        } else {
          reject(this.requestComFail(response))
        }
      }
      const cancel = (t = 'handle cancel', config = _options): void => {
        const err = {
          errMsg: t,
          config: config
        }
        reject(err)
        next = false
      }
      handleRe = { ...this.requestBeforeFun(_options, cancel) }
      const _config: anyObj = { ...handleRe }
      if (!next) return
      let mergeUrl = Request.posUrl(_config.url) ? _config.url : (_config.baseUrl + _config.url)
      if (JSON.stringify(_config.params) !== '{}') {
        const paramsH = Request.addQueryString(_config.params)
        mergeUrl += mergeUrl.indexOf('?') === -1 ? `?${paramsH}` : `&${paramsH}`
      }
      _config.url = mergeUrl
      uni.request(_config)
    })
  }

  get (url: string, options: handleOptions = {}) {
    return this.request({
      url,
      method: 'GET',
      ...options
    })
  }

  post (url: string, data: object = {}, options: handleOptions = {}) {
    return this.request({
      url,
      data,
      method: 'POST',
      ...options
    })
  }

  // #ifndef MP-ALIPAY
  put (url: string, data: object = {}, options: handleOptions = {}) {
    return this.request({
      url,
      data,
      method: 'PUT',
      ...options
    })
  }
  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  delete (url: string, data: object = {}, options: handleOptions = {}) {
    return this.request({
      url,
      data,
      method: 'DELETE',
      ...options
    })
  }
  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN
  connect (url: string, data: object = {}, options: handleOptions = {}) {
    return this.request({
      url,
      data,
      method: 'CONNECT',
      ...options
    })
  }
  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  head (url: string, data: object = {}, options: handleOptions = {}) {
    return this.request({
      url,
      data,
      method: 'HEAD',
      ...options
    })
  }
  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  options (url: string, data: object = {}, options: handleOptions = {}) {
    return this.request({
      url,
      data,
      method: 'OPTIONS',
      ...options
    })
  }
  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN
  trace (url: string, data: object = {}, options: handleOptions = {}) {
    return this.request({
      url,
      data,
      method: 'TRACE',
      ...options
    })
  }
  // #endif

  upload (url: string, {
    // #ifdef APP-PLUS
    files,
    // #endif
    // #ifdef MP-ALIPAY
    fileType,
    // #endif
    filePath,
    name,
    header,
    formData,
    custom
  }: {
    // #ifdef APP-PLUS
    files?: string[],
    // #endif
    // #ifdef MP-ALIPAY
    fileType: 'image' | 'video' | 'audio',
    // #endif
    filePath: string,
    name: string,
    header?: header,
    formData?: any,
    custom?: anyObj
  }) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
      let next = true
      let handleRe = {}
      const globalHeader = { ...this.config.header }
      delete globalHeader['content-type']
      const pubConfig = {
        baseUrl: this.config.baseUrl,
        url,
        // #ifdef APP-PLUS
        files,
        // #endif
        // #ifdef MP-ALIPAY
        fileType,
        // #endif
        filePath,
        method: 'UPLOAD',
        name,
        header: header || globalHeader,
        formData,
        custom: { ...this.config.custom, ...(custom || {}) },
        complete: (response) => {
          response.config = handleRe
          if (response.statusCode === 200) { // 成功
            response = this.requestComFun(response)
            resolve(response)
          } else {
            response = this.requestComFail(response)
            reject(response)
          }
        }
      }
      const cancel = (t = 'handle cancel', config = pubConfig) => {
        const err = {
          errMsg: t,
          config: config
        }
        reject(err)
        next = false
      }

      handleRe = { ...this.requestBeforeFun(pubConfig, cancel) }
      const _config: anyObj = { ...handleRe }
      if (!next) return
      delete _config.custom
      _config.url = Request.posUrl(_config.url) ? _config.url : (_config.baseUrl + _config.url)
      uni.uploadFile(_config)
    })
  }
}

export {
  options,
  handleOptions,
  config,
  requestConfig,
  response
}
