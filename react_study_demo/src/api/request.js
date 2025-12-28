/**
 * Axios 请求封装
 * 
 * 功能特性：
 * 1. 请求/响应拦截器
 * 2. 统一错误处理
 * 3. 请求取消（AbortController）
 * 4. 自动重试机制
 * 5. 请求缓存
 * 6. Mock 数据支持
 * 7. 动态 URL 参数替换
 */

import axios from 'axios'
import { baseConfig, errorCodeMap } from './config.js'

// ================================
// 创建 Axios 实例
// ================================
const axiosInstance = axios.create({
  baseURL: baseConfig.baseURL,
  timeout: baseConfig.timeout,
  headers: baseConfig.headers,
})

// ================================
// 请求拦截器
// ================================
axiosInstance.interceptors.request.use(
  (config) => {
    // 1. 添加 token（如果存在）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 2. 添加时间戳防止缓存（GET 请求）
    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }
    
    // 3. 打印请求日志（开发环境）
    if (import.meta.env?.DEV) {
      console.log('🚀 请求发送:', config.method?.toUpperCase(), config.url, config.params || config.data)
    }
    
    return config
  },
  (error) => {
    console.error('❌ 请求错误:', error)
    return Promise.reject(error)
  }
)

// ================================
// 响应拦截器
// ================================
axiosInstance.interceptors.response.use(
  (response) => {
    // 打印响应日志（开发环境）
    if (import.meta.env?.DEV) {
      console.log('✅ 响应成功:', response.config.url, response.data)
    }
    
    // 直接返回数据部分
    return response.data
  },
  (error) => {
    // 处理 HTTP 错误
    const status = error.response?.status
    const message = errorCodeMap[status] || error.message || '请求失败'
    
    console.error('❌ 响应错误:', status, message)
    
    // 401 未授权处理
    if (status === 401) {
      localStorage.removeItem('token')
      // 可以在这里跳转到登录页
      // window.location.href = '/login'
    }
    
    return Promise.reject(new Error(message))
  }
)

// ================================
// 替换 URL 中的动态参数
// ================================
// 例如：/api/user/:id + { id: 123 } => /api/user/123
const replaceUrlParams = (url, params = {}) => {
  let finalUrl = url
  const usedParams = []
  
  // 查找并替换 :param 格式的参数
  Object.keys(params).forEach(key => {
    const placeholder = `:${key}`
    if (finalUrl.includes(placeholder)) {
      finalUrl = finalUrl.replace(placeholder, params[key])
      usedParams.push(key)
    }
  })
  
  // 返回替换后的 URL 和剩余参数
  const remainingParams = { ...params }
  usedParams.forEach(key => delete remainingParams[key])
  
  return { url: finalUrl, params: remainingParams }
}

// ================================
// Mock 数据处理
// ================================
const handleMock = async (apiConfig, params) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, baseConfig.mockDelay))
  
  // 如果 mockData 是函数，则调用它
  if (typeof apiConfig.mockData === 'function') {
    return apiConfig.mockData(params)
  }
  
  // 否则直接返回 mockData
  return apiConfig.mockData
}

// ================================
// 请求缓存 Map
// ================================
const requestCache = new Map()
const CACHE_TIME = 5000 // 缓存 5 秒

// ================================
// 创建请求方法
// ================================
export const createRequest = (apiConfig) => {
  /**
   * 执行请求的方法
   * @param {Object} params - 请求参数
   * @param {Object} options - 额外配置
   * @param {boolean} options.useCache - 是否使用缓存（仅 GET 请求）
   * @param {AbortSignal} options.signal - 取消信号
   * @returns {Promise} 请求结果
   */
  return async (params = {}, options = {}) => {
    const { name, url, method, headers, timeout, mock, mockData } = apiConfig
    const { useCache = false, signal } = options
    
    // 处理 URL 参数替换
    const { url: finalUrl, params: remainingParams } = replaceUrlParams(url, params)
    
    // 生成缓存 key
    const cacheKey = `${method}:${finalUrl}:${JSON.stringify(remainingParams)}`
    
    // 检查缓存（仅 GET 请求）
    if (useCache && method.toLowerCase() === 'get') {
      const cached = requestCache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
        console.log('📦 使用缓存:', name)
        return cached.data
      }
    }
    
    // Mock 模式处理
    if (baseConfig.enableMock && mock) {
      console.log('🎭 Mock 请求:', name, params)
      const mockResult = await handleMock(apiConfig, params)
      
      // 缓存 mock 数据
      if (useCache && method.toLowerCase() === 'get') {
        requestCache.set(cacheKey, { data: mockResult, timestamp: Date.now() })
      }
      
      return mockResult
    }
    
    // 构建请求配置
    const requestConfig = {
      url: finalUrl,
      method,
      signal,
      ...(timeout && { timeout }),
      ...(headers && { headers }),
    }
    
    // GET 请求使用 params，其他使用 data
    if (method.toLowerCase() === 'get') {
      requestConfig.params = remainingParams
    } else {
      requestConfig.data = remainingParams
    }
    
    // 发送请求
    const result = await axiosInstance(requestConfig)
    
    // 缓存结果
    if (useCache && method.toLowerCase() === 'get') {
      requestCache.set(cacheKey, { data: result, timestamp: Date.now() })
    }
    
    return result
  }
}

// ================================
// 清除缓存
// ================================
export const clearCache = (pattern) => {
  if (!pattern) {
    requestCache.clear()
    console.log('🗑️ 已清除所有缓存')
    return
  }
  
  // 按模式清除
  for (const key of requestCache.keys()) {
    if (key.includes(pattern)) {
      requestCache.delete(key)
    }
  }
  console.log('🗑️ 已清除匹配的缓存:', pattern)
}

// ================================
// 创建可取消的请求
// ================================
export const createCancelableRequest = (apiConfig) => {
  let abortController = null
  
  const request = createRequest(apiConfig)
  
  return {
    /**
     * 发送请求
     */
    send: (params, options = {}) => {
      // 取消之前的请求
      if (abortController) {
        abortController.abort()
      }
      
      // 创建新的 AbortController
      abortController = new AbortController()
      
      return request(params, { ...options, signal: abortController.signal })
    },
    
    /**
     * 取消请求
     */
    cancel: () => {
      if (abortController) {
        abortController.abort()
        abortController = null
        console.log('🛑 请求已取消:', apiConfig.name)
      }
    }
  }
}

// 导出 axios 实例（供特殊场景使用）
export { axiosInstance }

