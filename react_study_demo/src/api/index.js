/**
 * API 请求模块入口
 * 
 * 这个文件负责：
 * 1. 读取 API 配置
 * 2. 动态生成请求方法
 * 3. 导出统一的 request 对象
 * 
 * 使用方式：
 * import { request } from '@/api'
 * 
 * // 调用接口
 * const user = await request.getUser()
 * const article = await request.getArticleDetail({ id: 1 })
 * 
 * // 使用缓存
 * const products = await request.getProductList({}, { useCache: true })
 */

import { useState, useCallback } from 'react'
import { apiConfigs } from './config.js'
import { createRequest, createCancelableRequest, clearCache, axiosInstance } from './request.js'

// ================================
// 动态生成 request 对象
// ================================
// 遍历所有 API 配置，为每个接口创建对应的请求方法
const request = apiConfigs.reduce((acc, config) => {
  // 使用配置的 name 作为方法名
  // 例如：{ name: 'getUser', ... } => request.getUser()
  acc[config.name] = createRequest(config)
  return acc
}, {})

// ================================
// 动态生成可取消的请求对象
// ================================
// 适用于需要取消之前请求的场景（如搜索防抖）
const cancelableRequest = apiConfigs.reduce((acc, config) => {
  acc[config.name] = createCancelableRequest(config)
  return acc
}, {})

// ================================
// 使用示例
// ================================
/*
// 基础使用
import { request } from '@/api'

// GET 请求
const user = await request.getUser()
const userById = await request.getUserById({ id: 123 })
const articles = await request.getArticleList({ page: 1, pageSize: 10 })

// POST 请求
const result = await request.createArticle({ 
  title: '文章标题', 
  content: '文章内容' 
})

// DELETE 请求（带 URL 参数）
await request.deleteUser({ id: 123 })

// 使用缓存
const products = await request.getProductList({}, { useCache: true })

// 可取消的请求
import { cancelableRequest } from '@/api'

// 发送请求（会自动取消之前的请求）
cancelableRequest.getArticleList.send({ keyword: '搜索词' })

// 手动取消
cancelableRequest.getArticleList.cancel()
*/

// ================================
// 自定义 Hooks - useRequest
// ================================
// 可以在 React 组件中更方便地使用
export const createUseRequest = (requestFn) => {
  return () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const run = async (params, options) => {
      setLoading(true)
      setError(null)
      try {
        const result = await requestFn(params, options)
        setData(result)
        return result
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    }
    
    return { data, loading, error, run }
  }
}

/**
 * useRequest Hook - 在 React 组件中使用请求
 * 
 * @param {Function} requestFn - 请求函数
 * @param {Object} options - 配置选项
 * @param {boolean} options.manual - 是否手动触发，默认 true
 * @param {any} options.defaultParams - 默认参数
 * @param {Function} options.onSuccess - 成功回调
 * @param {Function} options.onError - 失败回调
 * @returns {Object} { data, loading, error, run, refresh }
 */
export const useRequest = (requestFn, options = {}) => {
  const { manual = true, defaultParams, onSuccess, onError } = options
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useState(defaultParams)
  
  // 执行请求
  const run = useCallback(async (runParams = params, runOptions = {}) => {
    setLoading(true)
    setError(null)
    setParams(runParams)
    
    try {
      const result = await requestFn(runParams, runOptions)
      setData(result)
      onSuccess?.(result, runParams)
      return result
    } catch (err) {
      setError(err)
      onError?.(err, runParams)
      throw err
    } finally {
      setLoading(false)
    }
  }, [requestFn, params, onSuccess, onError])
  
  // 刷新（使用上次的参数）
  const refresh = useCallback(() => {
    return run(params)
  }, [run, params])
  
  // 重置状态
  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
  }, [])
  
  return { data, loading, error, run, refresh, reset, params }
}

// ================================
// 导出
// ================================
export {
  request,           // 主要使用的请求对象
  cancelableRequest, // 可取消的请求对象
  clearCache,        // 清除缓存方法
  axiosInstance,     // axios 实例（特殊场景使用）
  apiConfigs,        // API 配置（供调试使用）
}

// 默认导出 request
export default request
