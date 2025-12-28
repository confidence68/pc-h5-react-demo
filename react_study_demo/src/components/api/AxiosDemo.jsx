/**
 * Axios 封装演示组件
 * 
 * 本组件演示了 Axios 请求封装的各种用法：
 * 1. 基础请求调用
 * 2. 带参数的请求
 * 3. URL 动态参数替换
 * 4. 请求缓存
 * 5. 可取消的请求
 * 6. useRequest Hook 使用
 */

import { useState, useEffect } from 'react'
import { request, cancelableRequest, clearCache, useRequest, apiConfigs } from '../../api/index.js'

// ================================
// 基础请求演示
// ================================
function BasicRequestDemo() {
  // 存储请求结果
  const [result, setResult] = useState(null)
  // 加载状态
  const [loading, setLoading] = useState(false)
  // 错误信息
  const [error, setError] = useState(null)
  // 当前调用的接口名
  const [currentApi, setCurrentApi] = useState('')

  /**
   * 调用接口的通用方法
   * @param {string} apiName - 接口名称（如 'getUser'）
   * @param {Object} params - 请求参数
   */
  const callApi = async (apiName, params = {}) => {
    setLoading(true)
    setError(null)
    setCurrentApi(apiName)
    
    try {
      // 核心用法：request.接口名(参数)
      // 这里使用动态属性访问来调用对应的接口方法
      const data = await request[apiName](params)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="demo-section">
      <h3>1. 基础请求调用</h3>
      <p className="demo-desc">
        调用方式：<code>request.接口名(参数)</code>
      </p>
      
      {/* 操作按钮 */}
      <div className="demo-buttons">
        {/* GET 请求示例 */}
        <button onClick={() => callApi('getUser')}>
          获取用户信息（GET）
        </button>
        
        {/* 带 URL 参数的请求 */}
        <button onClick={() => callApi('getUserById', { id: 123 })}>
          根据ID获取用户（URL参数）
        </button>
        
        {/* POST 请求示例 */}
        <button onClick={() => callApi('login', { username: 'admin', password: '123456' })}>
          模拟登录（POST）
        </button>
        
        {/* 获取列表 */}
        <button onClick={() => callApi('getArticleList')}>
          获取文章列表
        </button>
        
        {/* 带参数的列表请求 */}
        <button onClick={() => callApi('getArticleDetail', { id: 1 })}>
          获取文章详情
        </button>
      </div>
      
      {/* 显示结果 */}
      <div className="demo-result">
        <h4>
          {currentApi && <span>调用: request.{currentApi}()</span>}
          {loading && <span className="loading">请求中...</span>}
        </h4>
        
        {error && (
          <div className="error-box">
            错误: {error}
          </div>
        )}
        
        {result && (
          <pre className="result-box">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
      
      {/* 代码示例 */}
      <div className="code-example">
        <h4>代码示例</h4>
        <pre>{`// 导入 request 对象
import { request } from '@/api'

// 基础调用
const user = await request.getUser()

// 带参数调用（URL 参数会自动替换）
// 配置: { url: '/api/user/:id', ... }
// 调用: request.getUserById({ id: 123 })
// 实际请求: GET /api/user/123
const user = await request.getUserById({ id: 123 })

// POST 请求
const result = await request.login({
  username: 'admin',
  password: '123456'
})`}</pre>
      </div>
    </div>
  )
}

// ================================
// 请求缓存演示
// ================================
function CacheDemo() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  /**
   * 演示缓存功能
   * 第一次请求会发送网络请求，第二次会使用缓存
   */
  const testCache = async () => {
    setLoading(true)
    setResults([])
    
    const newResults = []
    
    // 第一次请求（不使用缓存）
    const start1 = Date.now()
    await request.getProductList()
    newResults.push({
      time: Date.now() - start1,
      cached: false,
      message: '第1次请求（无缓存）'
    })
    
    // 第二次请求（使用缓存）
    const start2 = Date.now()
    await request.getProductList({}, { useCache: true })
    newResults.push({
      time: Date.now() - start2,
      cached: true,
      message: '第2次请求（使用缓存）'
    })
    
    // 第三次请求（使用缓存）
    const start3 = Date.now()
    await request.getProductList({}, { useCache: true })
    newResults.push({
      time: Date.now() - start3,
      cached: true,
      message: '第3次请求（使用缓存）'
    })
    
    setResults(newResults)
    setLoading(false)
  }

  /**
   * 清除缓存
   */
  const handleClearCache = () => {
    clearCache()
    setResults([])
    alert('缓存已清除')
  }

  return (
    <div className="demo-section">
      <h3>2. 请求缓存</h3>
      <p className="demo-desc">
        使用 <code>{'{ useCache: true }'}</code> 开启缓存，相同请求直接返回缓存数据
      </p>
      
      <div className="demo-buttons">
        <button onClick={testCache} disabled={loading}>
          {loading ? '请求中...' : '测试缓存效果'}
        </button>
        <button onClick={handleClearCache}>
          清除缓存
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="cache-results">
          {results.map((r, i) => (
            <div key={i} className={`cache-item ${r.cached ? 'cached' : ''}`}>
              <span>{r.message}</span>
              <span className="cache-time">耗时: {r.time}ms</span>
              <span className={`cache-tag ${r.cached ? 'hit' : 'miss'}`}>
                {r.cached ? '缓存命中' : '网络请求'}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className="code-example">
        <h4>代码示例</h4>
        <pre>{`// 开启缓存（第二个参数）
const data = await request.getProductList({}, { 
  useCache: true 
})

// 清除所有缓存
clearCache()

// 清除特定模式的缓存
clearCache('products')`}</pre>
      </div>
    </div>
  )
}

// ================================
// 可取消请求演示
// ================================
function CancelableDemo() {
  const [searchText, setSearchText] = useState('')
  const [results, setResults] = useState(null)
  const [requestCount, setRequestCount] = useState(0)

  /**
   * 搜索时自动取消之前的请求
   * 这在实时搜索场景非常有用，避免旧请求的响应覆盖新结果
   */
  const handleSearch = async (text) => {
    setSearchText(text)
    setRequestCount(prev => prev + 1)
    
    if (!text) {
      setResults(null)
      return
    }
    
    try {
      // 使用可取消的请求
      // 每次调用 send 会自动取消之前未完成的请求
      const data = await cancelableRequest.getArticleList.send({ 
        keyword: text 
      })
      setResults(data)
    } catch (err) {
      // 被取消的请求会抛出错误，这里可以忽略
      if (err.name !== 'AbortError') {
        console.error('搜索失败:', err)
      }
    }
  }

  /**
   * 手动取消请求
   */
  const handleCancel = () => {
    cancelableRequest.getArticleList.cancel()
    setResults(null)
  }

  return (
    <div className="demo-section">
      <h3>3. 可取消的请求</h3>
      <p className="demo-desc">
        使用 <code>cancelableRequest</code> 实现自动取消之前的请求，适用于搜索防抖等场景
      </p>
      
      <div className="search-demo">
        <input
          type="text"
          placeholder="输入搜索内容（快速输入会自动取消之前的请求）"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button onClick={handleCancel}>取消请求</button>
      </div>
      
      <div className="request-info">
        <span>已发送请求数: {requestCount}</span>
      </div>
      
      {results && (
        <pre className="result-box">
          {JSON.stringify(results, null, 2)}
        </pre>
      )}
      
      <div className="code-example">
        <h4>代码示例</h4>
        <pre>{`import { cancelableRequest } from '@/api'

// 发送请求（会自动取消之前的请求）
const data = await cancelableRequest.getArticleList.send({ 
  keyword: '搜索词' 
})

// 手动取消请求
cancelableRequest.getArticleList.cancel()`}</pre>
      </div>
    </div>
  )
}

// ================================
// useRequest Hook 演示
// ================================
function UseRequestDemo() {
  // 使用 useRequest Hook
  // 自动管理 loading、error、data 状态
  const { 
    data, 
    loading, 
    error, 
    run, 
    refresh,
    reset 
  } = useRequest(request.getProductList, {
    manual: true, // 手动触发
    onSuccess: (data) => {
      console.log('请求成功:', data)
    },
    onError: (err) => {
      console.error('请求失败:', err)
    }
  })

  return (
    <div className="demo-section">
      <h3>4. useRequest Hook</h3>
      <p className="demo-desc">
        使用自定义 Hook 简化请求状态管理，自动处理 loading、error、data
      </p>
      
      <div className="demo-buttons">
        <button onClick={() => run()} disabled={loading}>
          {loading ? '加载中...' : '发起请求'}
        </button>
        <button onClick={refresh} disabled={loading || !data}>
          刷新
        </button>
        <button onClick={reset}>
          重置
        </button>
      </div>
      
      <div className="hook-status">
        <div>loading: <code>{String(loading)}</code></div>
        <div>error: <code>{error ? error.message : 'null'}</code></div>
        <div>data: <code>{data ? '有数据' : 'null'}</code></div>
      </div>
      
      {data && (
        <pre className="result-box">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      
      <div className="code-example">
        <h4>代码示例</h4>
        <pre>{`import { useRequest, request } from '@/api'

function MyComponent() {
  const { 
    data,     // 响应数据
    loading,  // 加载状态
    error,    // 错误信息
    run,      // 执行请求
    refresh,  // 刷新（使用上次参数）
    reset     // 重置状态
  } = useRequest(request.getProductList, {
    manual: true,          // 手动触发
    onSuccess: (data) => { // 成功回调
      console.log('成功:', data)
    },
    onError: (err) => {    // 失败回调
      console.error('失败:', err)
    }
  })
  
  return (
    <button onClick={() => run()}>
      {loading ? '加载中...' : '获取数据'}
    </button>
  )
}`}</pre>
      </div>
    </div>
  )
}

// ================================
// API 配置查看器
// ================================
function ApiConfigViewer() {
  const [showConfig, setShowConfig] = useState(false)

  return (
    <div className="demo-section">
      <h3>5. API 配置一览</h3>
      <p className="demo-desc">
        所有 API 配置集中在 <code>src/api/config.js</code> 文件中管理
      </p>
      
      <button onClick={() => setShowConfig(!showConfig)}>
        {showConfig ? '隐藏配置' : '查看所有 API 配置'}
      </button>
      
      {showConfig && (
        <div className="api-config-list">
          <table>
            <thead>
              <tr>
                <th>接口名</th>
                <th>URL</th>
                <th>方法</th>
                <th>Mock</th>
              </tr>
            </thead>
            <tbody>
              {apiConfigs.map(config => (
                <tr key={config.name}>
                  <td><code>{config.name}</code></td>
                  <td><code>{config.url}</code></td>
                  <td className={`method ${config.method}`}>
                    {config.method.toUpperCase()}
                  </td>
                  <td>{config.mock ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="code-example">
        <h4>添加新接口</h4>
        <pre>{`// 在 src/api/config.js 中添加配置
export const apiConfigs = [
  // ... 其他配置
  
  // 新增接口只需添加一行
  { 
    name: 'getOrders',      // 方法名
    url: '/api/orders',     // 接口地址
    method: 'get',          // 请求方法
    mock: true,             // 是否使用 mock
    mockData: { list: [] }  // mock 数据
  },
]

// 使用
import { request } from '@/api'
const orders = await request.getOrders()`}</pre>
      </div>
    </div>
  )
}

// ================================
// 主组件
// ================================
export default function AxiosDemo() {
  return (
    <div className="axios-demo">
      <h2>📡 Axios 请求封装演示</h2>
      
      <div className="feature-list">
        <h3>封装特性</h3>
        <ul>
          <li>✅ <strong>配置化管理</strong> - 所有 API 集中配置，新增接口只需加一行</li>
          <li>✅ <strong>动态参数</strong> - 支持 URL 参数自动替换（如 <code>/user/:id</code>）</li>
          <li>✅ <strong>请求拦截</strong> - 自动添加 token、请求日志</li>
          <li>✅ <strong>响应拦截</strong> - 统一错误处理、响应数据提取</li>
          <li>✅ <strong>请求缓存</strong> - 相同请求复用结果，减少重复请求</li>
          <li>✅ <strong>请求取消</strong> - 支持取消之前的请求，适用于搜索场景</li>
          <li>✅ <strong>Mock 支持</strong> - 开发环境模拟数据，无需后端</li>
          <li>✅ <strong>useRequest Hook</strong> - React Hook 封装，简化状态管理</li>
        </ul>
      </div>
      
      <BasicRequestDemo />
      <CacheDemo />
      <CancelableDemo />
      <UseRequestDemo />
      <ApiConfigViewer />
      
      <style>{`
        .axios-demo {
          padding: 20px;
        }
        
        .axios-demo h2 {
          color: #1890ff;
          border-bottom: 2px solid #1890ff;
          padding-bottom: 10px;
        }
        
        .feature-list {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 24px;
        }
        
        .feature-list h3 {
          margin-top: 0;
        }
        
        .feature-list ul {
          margin: 0;
          padding-left: 20px;
        }
        
        .feature-list li {
          margin: 8px 0;
        }
        
        .feature-list code {
          background: rgba(255,255,255,0.2);
          padding: 2px 6px;
          border-radius: 4px;
        }
        
        .demo-section {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid #e9ecef;
        }
        
        .demo-section h3 {
          color: #495057;
          margin-top: 0;
          border-bottom: 1px solid #dee2e6;
          padding-bottom: 10px;
        }
        
        .demo-desc {
          color: #6c757d;
          margin-bottom: 16px;
        }
        
        .demo-desc code {
          background: #e9ecef;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .demo-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 16px;
        }
        
        .demo-buttons button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background: #1890ff;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .demo-buttons button:hover:not(:disabled) {
          background: #40a9ff;
        }
        
        .demo-buttons button:disabled {
          background: #bfbfbf;
          cursor: not-allowed;
        }
        
        .demo-result h4 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #495057;
        }
        
        .loading {
          color: #1890ff;
          font-size: 14px;
        }
        
        .error-box {
          background: #fff2f0;
          border: 1px solid #ffccc7;
          color: #ff4d4f;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 12px;
        }
        
        .result-box {
          background: #282c34;
          color: #abb2bf;
          padding: 16px;
          border-radius: 4px;
          overflow: auto;
          font-size: 13px;
          max-height: 300px;
        }
        
        .code-example {
          margin-top: 16px;
          border-top: 1px dashed #dee2e6;
          padding-top: 16px;
        }
        
        .code-example h4 {
          color: #6c757d;
          font-size: 14px;
          margin-bottom: 8px;
        }
        
        .code-example pre {
          background: #282c34;
          color: #abb2bf;
          padding: 12px;
          border-radius: 4px;
          font-size: 12px;
          overflow: auto;
        }
        
        .search-demo {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
        }
        
        .search-demo input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .search-demo button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background: #ff4d4f;
          color: white;
          cursor: pointer;
        }
        
        .request-info {
          background: #e6f7ff;
          padding: 8px 12px;
          border-radius: 4px;
          margin-bottom: 12px;
          color: #1890ff;
        }
        
        .cache-results {
          margin: 12px 0;
        }
        
        .cache-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .cache-item.cached {
          background: #f6ffed;
          border-color: #b7eb8f;
        }
        
        .cache-time {
          color: #8c8c8c;
          font-size: 13px;
        }
        
        .cache-tag {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          margin-left: auto;
        }
        
        .cache-tag.hit {
          background: #52c41a;
          color: white;
        }
        
        .cache-tag.miss {
          background: #faad14;
          color: white;
        }
        
        .hook-status {
          display: flex;
          gap: 20px;
          background: #fafafa;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 12px;
        }
        
        .hook-status code {
          color: #1890ff;
        }
        
        .api-config-list {
          margin-top: 16px;
          overflow: auto;
        }
        
        .api-config-list table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        
        .api-config-list th,
        .api-config-list td {
          padding: 10px;
          border: 1px solid #e8e8e8;
          text-align: left;
        }
        
        .api-config-list th {
          background: #fafafa;
          font-weight: 600;
        }
        
        .api-config-list .method {
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .api-config-list .method.get { color: #52c41a; }
        .api-config-list .method.post { color: #1890ff; }
        .api-config-list .method.put { color: #faad14; }
        .api-config-list .method.delete { color: #ff4d4f; }
      `}</style>
    </div>
  )
}

