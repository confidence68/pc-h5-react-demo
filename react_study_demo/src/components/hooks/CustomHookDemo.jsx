/**
 * 自定义 Hook 演示组件
 * 
 * 自定义 Hook 是一种复用状态逻辑的方式
 * 命名规范：以 use 开头
 * 
 * 自定义 Hook 的优点：
 * 1. 抽取重复的状态逻辑
 * 2. 使组件更简洁
 * 3. 逻辑和 UI 分离
 * 4. 易于测试
 */

import { useState, useEffect, useCallback, useRef } from 'react'

// ==================== 自定义 Hook 定义 ====================

/**
 * useCounter - 计数器 Hook
 * 封装计数器的常用操作
 * 
 * @param {number} initialValue - 初始值
 * @param {number} step - 步长
 * @returns {object} - 计数器状态和操作方法
 */
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    setCount(c => c + step)
  }, [step])
  
  const decrement = useCallback(() => {
    setCount(c => c - step)
  }, [step])
  
  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])
  
  const setTo = useCallback((value) => {
    setCount(value)
  }, [])
  
  return { count, increment, decrement, reset, setTo }
}

/**
 * useToggle - 开关切换 Hook
 * 
 * @param {boolean} initialValue - 初始值
 * @returns {[boolean, function, function]} - [状态, 切换函数, 设置函数]
 */
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])
  
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  
  return [value, toggle, { setTrue, setFalse, setValue }]
}

/**
 * useLocalStorage - 本地存储 Hook
 * 将状态同步到 localStorage
 * 
 * @param {string} key - 存储键名
 * @param {any} initialValue - 初始值
 * @returns {[any, function]} - [状态, 设置函数]
 */
function useLocalStorage(key, initialValue) {
  // 延迟初始化：从 localStorage 读取
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('读取 localStorage 失败:', error)
      return initialValue
    }
  })
  
  // 更新 state 同时更新 localStorage
  const setValue = useCallback((value) => {
    try {
      // 支持函数式更新
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('写入 localStorage 失败:', error)
    }
  }, [key, storedValue])
  
  return [storedValue, setValue]
}

/**
 * useFetch - 数据请求 Hook
 * 封装异步数据请求逻辑
 * 
 * @param {string} url - 请求地址
 * @param {object} options - 请求选项
 * @returns {object} - { data, loading, error, refetch }
 */
function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // 模拟 API 请求
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟数据
      const mockData = {
        users: [
          { id: 1, name: '张三', age: 25 },
          { id: 2, name: '李四', age: 30 },
          { id: 3, name: '王五', age: 28 }
        ]
      }
      
      setData(mockData)
    } catch (err) {
      setError(err.message || '请求失败')
    } finally {
      setLoading(false)
    }
  }, [url])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return { data, loading, error, refetch: fetchData }
}

/**
 * useDebounce - 防抖 Hook
 * 延迟更新值，常用于搜索输入
 * 
 * @param {any} value - 需要防抖的值
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {any} - 防抖后的值
 */
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  
  return debouncedValue
}

/**
 * usePrevious - 获取上一次的值
 * 
 * @param {any} value - 当前值
 * @returns {any} - 上一次的值
 */
function usePrevious(value) {
  const ref = useRef()
  
  useEffect(() => {
    ref.current = value
  }, [value])
  
  return ref.current
}

/**
 * useWindowSize - 窗口尺寸 Hook
 * 
 * @returns {object} - { width, height }
 */
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return size
}

// ==================== 主组件 ====================
function CustomHookDemo() {
  // 使用自定义 Hook
  const counter1 = useCounter(0, 1)
  const counter2 = useCounter(100, 10)
  const [isOpen, toggle, { setTrue, setFalse }] = useToggle(false)
  const [name, setName] = useLocalStorage('userName', '访客')
  const { data, loading, error, refetch } = useFetch('/api/users')
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const prevSearchTerm = usePrevious(searchTerm)
  const { width, height } = useWindowSize()
  
  return (
    <div className="demo-card">
      <h3>自定义 Hook 演示</h3>
      
      {/* 概念说明 */}
      <div className="demo-area">
        <h4>什么是自定义 Hook？</h4>
        <div className="description">
          <p>自定义 Hook 是一个以 <code>use</code> 开头的函数，可以调用其他 Hook</p>
          <p>用于复用状态逻辑，使组件更简洁、更易测试</p>
        </div>
        <div className="code-block">
{`// 自定义 Hook 示例
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    setCount(c => c + step)
  }, [step])
  
  return { count, increment, ... }
}`}
        </div>
      </div>
      
      {/* useCounter 演示 */}
      <div className="demo-area">
        <h4>1. useCounter - 计数器 Hook</h4>
        <div className="description">
          <p>封装计数器的增、减、重置等操作</p>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div className="component-box">
            <p style={{ marginBottom: '8px' }}>计数器1 (步长: 1)</p>
            <div className="result-value" style={{ marginBottom: '8px' }}>{counter1.count}</div>
            <div className="button-group">
              <button onClick={counter1.decrement}>-1</button>
              <button onClick={counter1.increment}>+1</button>
              <button onClick={counter1.reset} className="btn-secondary">重置</button>
            </div>
          </div>
          
          <div className="component-box">
            <p style={{ marginBottom: '8px' }}>计数器2 (步长: 10)</p>
            <div className="result-value" style={{ marginBottom: '8px' }}>{counter2.count}</div>
            <div className="button-group">
              <button onClick={counter2.decrement}>-10</button>
              <button onClick={counter2.increment}>+10</button>
              <button onClick={counter2.reset} className="btn-secondary">重置</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* useToggle 演示 */}
      <div className="demo-area">
        <h4>2. useToggle - 开关切换 Hook</h4>
        <div className="description">
          <p>用于布尔值切换，如弹窗显示/隐藏、开关状态等</p>
        </div>
        
        <div className="result" style={{ marginBottom: '16px' }}>
          <span>状态: </span>
          <span style={{ 
            color: isOpen ? '#10b981' : '#ef4444',
            fontWeight: 'bold'
          }}>
            {isOpen ? '开启' : '关闭'}
          </span>
        </div>
        
        <div className="button-group">
          <button onClick={toggle}>切换</button>
          <button onClick={setTrue} className="btn-success">开启</button>
          <button onClick={setFalse} className="btn-danger">关闭</button>
        </div>
      </div>
      
      {/* useLocalStorage 演示 */}
      <div className="demo-area">
        <h4>3. useLocalStorage - 本地存储 Hook</h4>
        <div className="description">
          <p>将状态自动同步到 localStorage，刷新页面数据不丢失</p>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入你的名字"
          />
          <span>你好, {name}!</span>
        </div>
        
        <div className="info-box tip" style={{ marginTop: '12px' }}>
          <strong>💡 提示：</strong>刷新页面，输入的名字会保留！
        </div>
      </div>
      
      {/* useFetch 演示 */}
      <div className="demo-area">
        <h4>4. useFetch - 数据请求 Hook</h4>
        <div className="description">
          <p>封装异步请求逻辑，包含 loading、error 状态管理</p>
        </div>
        
        <div className="button-group" style={{ marginBottom: '16px' }}>
          <button onClick={refetch} disabled={loading}>
            {loading ? '加载中...' : '重新请求'}
          </button>
        </div>
        
        {loading ? (
          <p>加载中...</p>
        ) : error ? (
          <p style={{ color: '#ef4444' }}>错误: {error}</p>
        ) : data ? (
          <ul className="item-list">
            {data.users.map(user => (
              <li key={user.id}>
                {user.name} - {user.age}岁
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      
      {/* useDebounce 演示 */}
      <div className="demo-area">
        <h4>5. useDebounce - 防抖 Hook</h4>
        <div className="description">
          <p>延迟更新值，避免频繁触发操作（如搜索请求）</p>
        </div>
        
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="输入搜索关键词"
          style={{ width: '100%', marginBottom: '12px' }}
        />
        
        <div className="result">
          <p>实时输入: <code>{searchTerm}</code></p>
          <p>防抖后 (500ms): <code>{debouncedSearch}</code></p>
          <p>上一次输入: <code>{prevSearchTerm || '无'}</code></p>
        </div>
        
        <div className="info-box success" style={{ marginTop: '12px' }}>
          <strong>✅ 应用场景：</strong>搜索建议、表单验证、窗口 resize 等
        </div>
      </div>
      
      {/* useWindowSize 演示 */}
      <div className="demo-area">
        <h4>6. useWindowSize - 窗口尺寸 Hook</h4>
        <div className="description">
          <p>实时获取窗口尺寸，用于响应式布局</p>
        </div>
        
        <div className="result">
          <p>窗口宽度: <strong>{width}px</strong></p>
          <p>窗口高度: <strong>{height}px</strong></p>
        </div>
      </div>
      
      {/* 自定义 Hook 最佳实践 */}
      <div className="demo-area">
        <h4>自定义 Hook 最佳实践</h4>
        <div className="info-box tip">
          <ul style={{ marginLeft: '20px' }}>
            <li>命名以 <code>use</code> 开头</li>
            <li>只在顶层调用 Hook，不要在循环、条件或嵌套函数中调用</li>
            <li>抽取可复用的逻辑，保持组件简洁</li>
            <li>返回必要的状态和方法，隐藏实现细节</li>
            <li>使用 TypeScript 定义类型，提高代码可读性</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// 导出自定义 Hook 供其他组件使用
export { 
  useCounter, 
  useToggle, 
  useLocalStorage, 
  useFetch, 
  useDebounce, 
  usePrevious, 
  useWindowSize 
}

export default CustomHookDemo

