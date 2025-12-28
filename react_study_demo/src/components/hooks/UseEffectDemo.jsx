/**
 * useEffect Hook 演示组件
 * 
 * useEffect 用于处理副作用（Side Effects）
 * 副作用包括：数据获取、订阅、手动修改 DOM、定时器等
 * 
 * 语法：useEffect(callback, dependencies)
 * - callback: 副作用函数
 * - dependencies: 依赖数组（可选）
 * 
 * 依赖数组的三种情况：
 * 1. 不传：每次渲染后都执行
 * 2. 空数组 []：只在挂载时执行一次
 * 3. [dep1, dep2]：当依赖变化时执行
 */

import { useState, useEffect } from 'react'

function UseEffectDemo() {
  // ==================== 状态定义 ====================
  const [count, setCount] = useState(0)
  const [name, setName] = useState('React')
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(1)
  
  // ==================== 示例1：基础用法 ====================
  /**
   * 每次渲染后执行（不推荐在大多数情况下使用）
   * 没有依赖数组，每次组件更新都会执行
   */
  useEffect(() => {
    console.log('每次渲染后执行 - count:', count, 'name:', name)
  })
  
  // ==================== 示例2：只在挂载时执行 ====================
  /**
   * 空依赖数组：只在组件挂载时执行一次
   * 相当于 class 组件的 componentDidMount
   */
  useEffect(() => {
    console.log('组件已挂载 - componentDidMount')
    document.title = 'useEffect 演示'
    
    // 返回清理函数（可选）
    // 相当于 componentWillUnmount
    return () => {
      console.log('组件即将卸载 - componentWillUnmount')
      document.title = 'React App'
    }
  }, []) // 空数组表示没有依赖
  
  // ==================== 示例3：依赖特定值 ====================
  /**
   * 当 count 变化时执行
   * 相当于 class 组件的 componentDidUpdate（但只关心特定值）
   */
  useEffect(() => {
    console.log('count 发生变化:', count)
    
    // 更新页面标题
    document.title = `计数: ${count}`
    
    return () => {
      // 清理函数：在下次 effect 执行前调用
      console.log('清理上一次的 effect, 旧 count:', count)
    }
  }, [count]) // 只有 count 变化时才执行
  
  // ==================== 示例4：定时器（需要清理） ====================
  /**
   * 定时器示例
   * 展示 cleanup 函数的重要性
   */
  useEffect(() => {
    let intervalId = null
    
    if (isTimerRunning) {
      console.log('启动定时器')
      intervalId = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    
    // 清理函数：组件卸载或依赖变化时清除定时器
    return () => {
      if (intervalId) {
        console.log('清除定时器')
        clearInterval(intervalId)
      }
    }
  }, [isTimerRunning]) // 依赖 isTimerRunning
  
  // ==================== 示例5：监听窗口大小 ====================
  /**
   * 事件监听示例
   * 必须在清理函数中移除监听器，防止内存泄漏
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    // 添加事件监听
    window.addEventListener('resize', handleResize)
    console.log('添加 resize 监听器')
    
    // 清理函数：移除事件监听
    return () => {
      window.removeEventListener('resize', handleResize)
      console.log('移除 resize 监听器')
    }
  }, []) // 空数组：只在挂载/卸载时执行
  
  // ==================== 示例6：数据获取 ====================
  /**
   * 模拟 API 请求
   * 展示如何处理异步操作和竞态条件
   */
  useEffect(() => {
    // 用于取消过期的请求
    let cancelled = false
    
    const fetchUser = async () => {
      setLoading(true)
      console.log('开始获取用户数据, userId:', userId)
      
      try {
        // 模拟 API 请求
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 检查是否已取消（避免设置过期数据）
        if (!cancelled) {
          setUserData({
            id: userId,
            name: `用户 ${userId}`,
            email: `user${userId}@example.com`
          })
        }
      } catch (error) {
        if (!cancelled) {
          console.error('获取用户数据失败:', error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    fetchUser()
    
    // 清理函数：标记请求为已取消
    return () => {
      cancelled = true
      console.log('取消过期的请求')
    }
  }, [userId]) // 当 userId 变化时重新获取
  
  return (
    <div className="demo-card">
      <h3>useEffect Hook 演示</h3>
      
      {/* 依赖数组说明 */}
      <div className="demo-area">
        <h4>依赖数组说明</h4>
        <div className="description">
          <p><code>useEffect(fn)</code> - 每次渲染后执行</p>
          <p><code>useEffect(fn, [])</code> - 只在挂载时执行一次</p>
          <p><code>useEffect(fn, [a, b])</code> - 当 a 或 b 变化时执行</p>
        </div>
      </div>
      
      {/* 基础演示 */}
      <div className="demo-area">
        <h4>1. 监听状态变化</h4>
        <div className="result">
          <div className="result-label">计数（页面标题会同步更新）</div>
          <div className="result-value">{count}</div>
        </div>
        <div className="button-group">
          <button onClick={() => setCount(c => c + 1)}>增加计数</button>
          <button onClick={() => setCount(0)} className="btn-secondary">重置</button>
        </div>
        <div style={{ marginTop: '16px' }}>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入名称"
          />
          <span style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>
            当前名称: {name}
          </span>
        </div>
        <div className="info-box tip">
          <strong>💡 打开控制台查看 effect 的执行顺序</strong>
        </div>
      </div>
      
      {/* 定时器演示 */}
      <div className="demo-area">
        <h4>2. 定时器（需要清理）</h4>
        <div className="description">
          <p>定时器、事件监听等必须在清理函数中释放资源</p>
          <code>{`return () => clearInterval(intervalId)`}</code>
        </div>
        <div className="result">
          <div className="result-label">计时器</div>
          <div className="result-value">{timer} 秒</div>
        </div>
        <div className="button-group">
          <button 
            onClick={() => setIsTimerRunning(true)}
            disabled={isTimerRunning}
            className="btn-success"
          >
            开始
          </button>
          <button 
            onClick={() => setIsTimerRunning(false)}
            disabled={!isTimerRunning}
            className="btn-danger"
          >
            暂停
          </button>
          <button 
            onClick={() => { setIsTimerRunning(false); setTimer(0) }}
            className="btn-secondary"
          >
            重置
          </button>
        </div>
        <div className="info-box warning">
          <strong>⚠️ 重要：</strong>不清理定时器会导致内存泄漏，组件卸载后定时器仍在运行。
        </div>
      </div>
      
      {/* 窗口监听演示 */}
      <div className="demo-area">
        <h4>3. 事件监听（resize）</h4>
        <div className="description">
          <p>监听窗口大小变化，调整窗口试试</p>
        </div>
        <div className="result">
          <div className="result-label">窗口宽度</div>
          <div className="result-value">{windowWidth}px</div>
        </div>
        <div className="info-box tip">
          <strong>💡 提示：</strong>调整浏览器窗口大小，观察数值变化。
        </div>
      </div>
      
      {/* 数据获取演示 */}
      <div className="demo-area">
        <h4>4. 数据获取（异步操作）</h4>
        <div className="description">
          <p>模拟 API 请求，展示异步数据获取和竞态条件处理</p>
        </div>
        <div className="button-group">
          <button 
            onClick={() => setUserId(id => id - 1)} 
            disabled={userId <= 1 || loading}
          >
            上一个用户
          </button>
          <span style={{ padding: '8px 16px' }}>用户 ID: {userId}</span>
          <button 
            onClick={() => setUserId(id => id + 1)}
            disabled={loading}
          >
            下一个用户
          </button>
        </div>
        <div className="result">
          {loading ? (
            <p>加载中...</p>
          ) : userData ? (
            <div>
              <p><strong>ID:</strong> {userData.id}</p>
              <p><strong>姓名:</strong> {userData.name}</p>
              <p><strong>邮箱:</strong> {userData.email}</p>
            </div>
          ) : (
            <p>暂无数据</p>
          )}
        </div>
        <div className="info-box warning">
          <strong>⚠️ 竞态条件：</strong>快速切换用户时，旧请求的结果不应该覆盖新请求。
          使用 cancelled 标志或 AbortController 来处理。
        </div>
      </div>
      
      {/* 最佳实践 */}
      <div className="demo-area">
        <h4>5. useEffect 最佳实践</h4>
        <div className="info-box success">
          <p><strong>✅ 推荐做法：</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>始终提供清理函数来释放资源</li>
            <li>精确设置依赖数组，避免不必要的执行</li>
            <li>异步操作要处理竞态条件</li>
            <li>避免在 effect 中直接使用异步函数，而是在内部定义</li>
            <li>使用 ESLint 的 exhaustive-deps 规则检查依赖</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UseEffectDemo

