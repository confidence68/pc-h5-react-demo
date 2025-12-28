/**
 * React Ref 演示组件
 * 
 * Ref 提供了一种方式，用于访问 DOM 节点或在渲染周期之间保持可变值
 * 
 * Ref 的主要用途：
 * 1. 访问 DOM 元素（获取焦点、测量尺寸、操作媒体播放等）
 * 2. 存储可变值（不触发重新渲染）
 * 3. 保存上一次的 props 或 state
 * 4. 保存定时器 ID 等
 * 
 * 创建 Ref 的方式：
 * - 函数组件：useRef()
 * - Class 组件：React.createRef()
 */

import { useRef, useState, useEffect, useCallback, Component, createRef } from 'react'

// ==================== 函数组件中使用 useRef ====================

/**
 * useRef 基础演示
 */
function UseRefBasicDemo() {
  // 创建 ref 用于访问 DOM
  const inputRef = useRef(null)
  const textareaRef = useRef(null)
  
  // 创建 ref 用于存储可变值
  const renderCountRef = useRef(0)
  const [, forceUpdate] = useState({})
  
  // 每次渲染时增加计数
  renderCountRef.current += 1
  
  // 聚焦输入框
  const focusInput = () => {
    inputRef.current?.focus()
  }
  
  // 选中文本
  const selectText = () => {
    textareaRef.current?.select()
  }
  
  // 获取输入框值
  const getInputValue = () => {
    alert(`输入框的值: ${inputRef.current?.value}`)
  }
  
  return (
    <div className="demo-area">
      <h4>1. useRef 基础用法</h4>
      
      <div className="description">
        <p><code>useRef(initialValue)</code> 返回一个可变的 ref 对象</p>
        <p>ref 对象的 <code>.current</code> 属性被初始化为传入的参数</p>
        <p>修改 <code>.current</code> 不会触发重新渲染</p>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <p>组件渲染次数: <strong>{renderCountRef.current}</strong></p>
        <button onClick={() => forceUpdate({})} className="btn-secondary" style={{ marginTop: '8px' }}>
          强制重新渲染
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="点击按钮聚焦此输入框"
            style={{ width: '300px', marginRight: '8px' }}
          />
          <button onClick={focusInput}>聚焦</button>
          <button onClick={getInputValue} style={{ marginLeft: '8px' }}>获取值</button>
        </div>
        
        <div>
          <textarea 
            ref={textareaRef}
            defaultValue="这是一段可选中的文本"
            style={{ width: '300px', marginRight: '8px' }}
            rows={3}
          />
          <button onClick={selectText}>选中文本</button>
        </div>
      </div>
      
      <div className="info-box tip" style={{ marginTop: '16px' }}>
        <strong>💡 注意：</strong>
        <code>useRef</code> 返回的对象在组件的整个生命周期内保持不变，
        修改 <code>.current</code> 不会触发重新渲染。
      </div>
    </div>
  )
}

/**
 * useRef 保存定时器 ID
 */
function UseRefTimerDemo() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)
  
  const start = () => {
    if (timerRef.current) return // 防止重复启动
    
    setIsRunning(true)
    timerRef.current = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
  }
  
  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
      setIsRunning(false)
    }
  }
  
  const reset = () => {
    stop()
    setCount(0)
  }
  
  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])
  
  return (
    <div className="demo-area">
      <h4>2. useRef 保存定时器 ID</h4>
      
      <div className="description">
        <p>使用 ref 保存定时器 ID，避免在 state 中存储非渲染相关的值</p>
      </div>
      
      <div className="result">
        <div className="result-label">计时器</div>
        <div className="result-value">{count} 秒</div>
      </div>
      
      <div className="button-group">
        <button onClick={start} disabled={isRunning} className="btn-success">开始</button>
        <button onClick={stop} disabled={!isRunning} className="btn-danger">停止</button>
        <button onClick={reset} className="btn-secondary">重置</button>
      </div>
    </div>
  )
}

/**
 * useRef 保存上一次的值
 */
function UseRefPreviousValueDemo() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef()
  
  // useEffect 在渲染后执行
  // 所以 prevCountRef.current 保存的是上一次渲染的值
  useEffect(() => {
    prevCountRef.current = count
  }, [count])
  
  return (
    <div className="demo-area">
      <h4>3. useRef 保存上一次的值</h4>
      
      <div className="description">
        <p>在 useEffect 中更新 ref，可以保存上一次渲染的值</p>
      </div>
      
      <div className="result">
        <p>当前值: <strong>{count}</strong></p>
        <p>上一次的值: <strong>{prevCountRef.current ?? '无'}</strong></p>
      </div>
      
      <div className="button-group">
        <button onClick={() => setCount(c => c - 1)}>减 1</button>
        <button onClick={() => setCount(c => c + 1)}>加 1</button>
        <button onClick={() => setCount(c => c + 5)}>加 5</button>
      </div>
    </div>
  )
}

/**
 * useRef 访问 DOM 元素
 */
function UseRefDOMDemo() {
  const boxRef = useRef(null)
  const [info, setInfo] = useState(null)
  
  const measureBox = () => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect()
      setInfo({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      })
    }
  }
  
  const scrollToBox = () => {
    boxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  
  const changeColor = () => {
    if (boxRef.current) {
      const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      boxRef.current.style.backgroundColor = randomColor
    }
  }
  
  return (
    <div className="demo-area">
      <h4>4. useRef 访问 DOM 元素</h4>
      
      <div className="description">
        <p>通过 ref 可以直接操作 DOM 元素</p>
      </div>
      
      <div 
        ref={boxRef}
        style={{
          width: '200px',
          height: '100px',
          backgroundColor: 'var(--primary-color)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          marginBottom: '16px',
          transition: 'background-color 0.3s'
        }}
      >
        目标元素
      </div>
      
      <div className="button-group">
        <button onClick={measureBox}>测量尺寸</button>
        <button onClick={scrollToBox}>滚动到视图</button>
        <button onClick={changeColor}>随机颜色</button>
      </div>
      
      {info && (
        <div className="result" style={{ marginTop: '16px' }}>
          <p>宽度: {info.width.toFixed(2)}px</p>
          <p>高度: {info.height.toFixed(2)}px</p>
          <p>顶部位置: {info.top.toFixed(2)}px</p>
          <p>左侧位置: {info.left.toFixed(2)}px</p>
        </div>
      )}
      
      <div className="info-box warning" style={{ marginTop: '16px' }}>
        <strong>⚠️ 注意：</strong>
        直接操作 DOM 应该是最后的手段，大多数情况下应该使用 React 的声明式方式。
      </div>
    </div>
  )
}

// ==================== Class 组件中使用 createRef ====================

/**
 * Class 组件 - 使用 createRef
 */
class CreateRefDemo extends Component {
  constructor(props) {
    super(props)
    // 在 Class 组件中使用 createRef
    this.inputRef = createRef()
    this.state = {
      message: ''
    }
  }
  
  focusInput = () => {
    this.inputRef.current?.focus()
  }
  
  clearInput = () => {
    if (this.inputRef.current) {
      this.inputRef.current.value = ''
      this.inputRef.current.focus()
    }
  }
  
  render() {
    return (
      <div className="demo-area">
        <h4>5. Class 组件使用 createRef</h4>
        
        <div className="description">
          <p>在 Class 组件中，使用 <code>React.createRef()</code> 创建 ref</p>
          <p>通常在构造函数中创建并赋值给实例属性</p>
        </div>
        
        <div className="code-block">
{`class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.inputRef = createRef()
  }
  
  render() {
    return <input ref={this.inputRef} />
  }
}`}
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <input 
            ref={this.inputRef}
            type="text" 
            placeholder="这是 Class 组件中的输入框"
            style={{ flex: 1 }}
          />
          <button onClick={this.focusInput}>聚焦</button>
          <button onClick={this.clearInput} className="btn-secondary">清空</button>
        </div>
      </div>
    )
  }
}

// ==================== 回调 Ref ====================

/**
 * 回调 Ref 演示
 */
function CallbackRefDemo() {
  const [height, setHeight] = useState(0)
  
  // 回调 ref：当 ref 被附加或分离时调用
  const measureRef = useCallback((node) => {
    if (node !== null) {
      // node 是 DOM 元素
      setHeight(node.getBoundingClientRect().height)
    }
  }, [])
  
  return (
    <div className="demo-area">
      <h4>6. 回调 Ref</h4>
      
      <div className="description">
        <p>传递一个函数给 ref 属性，React 会在挂载和卸载时调用它</p>
        <p>适用于需要在节点挂载后立即获取信息的场景</p>
      </div>
      
      <div className="code-block">
{`// 回调 ref 用法
const measureRef = useCallback((node) => {
  if (node !== null) {
    setHeight(node.getBoundingClientRect().height)
  }
}, [])

<div ref={measureRef}>...</div>`}
      </div>
      
      <div 
        ref={measureRef}
        style={{
          padding: '16px',
          backgroundColor: 'var(--bg-light)',
          borderRadius: '8px',
          marginTop: '16px'
        }}
      >
        <p>这个元素的高度会被自动测量</p>
        <p>测量结果: <strong>{height.toFixed(2)}px</strong></p>
      </div>
    </div>
  )
}

// ==================== 主组件 ====================
function RefDemo() {
  return (
    <div className="demo-card">
      <h3>React Ref 演示</h3>
      
      {/* 概念说明 */}
      <div className="demo-area">
        <h4>Ref 概述</h4>
        <div className="description">
          <p>Ref 提供了一种访问 DOM 节点或 React 元素的方式</p>
          <p><strong>函数组件:</strong> 使用 <code>useRef()</code></p>
          <p><strong>Class 组件:</strong> 使用 <code>React.createRef()</code></p>
        </div>
        <div className="info-box tip">
          <strong>💡 使用场景：</strong>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>管理焦点、文本选择或媒体播放</li>
            <li>触发强制动画</li>
            <li>集成第三方 DOM 库</li>
            <li>保存不需要触发渲染的可变值</li>
          </ul>
        </div>
      </div>
      
      <UseRefBasicDemo />
      <UseRefTimerDemo />
      <UseRefPreviousValueDemo />
      <UseRefDOMDemo />
      <CreateRefDemo />
      <CallbackRefDemo />
    </div>
  )
}

export default RefDemo

