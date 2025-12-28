/**
 * forwardRef 和 useImperativeHandle 演示组件
 * 
 * forwardRef：
 * - 允许组件将 ref 转发给子组件
 * - 使父组件能够访问子组件的 DOM 节点或实例
 * 
 * useImperativeHandle：
 * - 配合 forwardRef 使用
 * - 自定义暴露给父组件的实例值
 * - 可以限制父组件能访问的方法和属性
 */

import { 
  useRef, 
  useState, 
  forwardRef, 
  useImperativeHandle, 
  Component 
} from 'react'

// ==================== forwardRef 基础用法 ====================

/**
 * 自定义输入框组件 - 使用 forwardRef
 * 将 ref 转发给内部的 input 元素
 */
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const { label, ...inputProps } = props
  
  return (
    <div style={{ marginBottom: '12px' }}>
      {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
      <input 
        ref={ref}  // 将 ref 转发给 input
        {...inputProps}
        style={{
          padding: '8px 12px',
          border: '2px solid var(--primary-color)',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s',
          width: '100%'
        }}
      />
    </div>
  )
})

/**
 * 自定义按钮组件 - 使用 forwardRef
 */
const FancyButton = forwardRef(function FancyButton({ children, onClick, variant = 'primary' }, ref) {
  const styles = {
    primary: {
      backgroundColor: 'var(--primary-color)',
      color: 'white'
    },
    secondary: {
      backgroundColor: 'transparent',
      border: '2px solid var(--primary-color)',
      color: 'var(--primary-color)'
    }
  }
  
  return (
    <button 
      ref={ref}
      onClick={onClick}
      style={{
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s',
        ...styles[variant]
      }}
    >
      {children}
    </button>
  )
})

// ==================== useImperativeHandle 用法 ====================

/**
 * 自定义视频播放器组件
 * 使用 useImperativeHandle 暴露控制方法
 */
const VideoPlayer = forwardRef(function VideoPlayer(props, ref) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // 使用 useImperativeHandle 自定义暴露的方法
  useImperativeHandle(ref, () => ({
    // 只暴露必要的方法，而不是整个 video 元素
    play() {
      videoRef.current?.play()
      setIsPlaying(true)
    },
    pause() {
      videoRef.current?.pause()
      setIsPlaying(false)
    },
    toggle() {
      if (isPlaying) {
        this.pause()
      } else {
        this.play()
      }
    },
    getState() {
      return { isPlaying }
    }
  }), [isPlaying]) // 依赖 isPlaying
  
  return (
    <div style={{ position: 'relative' }}>
      {/* 由于没有实际视频，用一个模拟的播放器 */}
      <div 
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: 'var(--bg-light)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px'
        }}
      >
        {isPlaying ? '▶️ 播放中...' : '⏸️ 已暂停'}
      </div>
      <div style={{ 
        position: 'absolute', 
        bottom: '8px', 
        right: '8px',
        backgroundColor: isPlaying ? '#10b981' : '#6b7280',
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'white',
        fontSize: '12px'
      }}>
        {isPlaying ? '播放中' : '暂停'}
      </div>
    </div>
  )
})

/**
 * 自定义表单组件
 * 使用 useImperativeHandle 暴露表单操作方法
 */
const CustomForm = forwardRef(function CustomForm({ onSubmit }, ref) {
  const [values, setValues] = useState({
    username: '',
    email: '',
    message: ''
  })
  
  const usernameRef = useRef(null)
  
  // 暴露表单操作方法
  useImperativeHandle(ref, () => ({
    // 获取表单值
    getValues() {
      return values
    },
    // 设置表单值
    setValues(newValues) {
      setValues(prev => ({ ...prev, ...newValues }))
    },
    // 重置表单
    reset() {
      setValues({ username: '', email: '', message: '' })
    },
    // 验证表单
    validate() {
      const errors = {}
      if (!values.username) errors.username = '用户名不能为空'
      if (!values.email) errors.email = '邮箱不能为空'
      if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = '邮箱格式不正确'
      }
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      }
    },
    // 聚焦到用户名输入框
    focusUsername() {
      usernameRef.current?.focus()
    }
  }), [values])
  
  const handleChange = (field) => (e) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(values)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>用户名</label>
        <input 
          ref={usernameRef}
          type="text"
          value={values.username}
          onChange={handleChange('username')}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>邮箱</label>
        <input 
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>留言</label>
        <textarea 
          value={values.message}
          onChange={handleChange('message')}
          style={{ width: '100%' }}
          rows={3}
        />
      </div>
    </form>
  )
})

/**
 * 自定义计数器组件
 * 展示子组件暴露方法给父组件
 */
const Counter = forwardRef(function Counter({ initialValue = 0 }, ref) {
  const [count, setCount] = useState(initialValue)
  
  useImperativeHandle(ref, () => ({
    increment() {
      setCount(c => c + 1)
    },
    decrement() {
      setCount(c => c - 1)
    },
    reset() {
      setCount(initialValue)
    },
    getCount() {
      return count
    },
    setCount(value) {
      setCount(value)
    }
  }), [count, initialValue])
  
  return (
    <div className="component-box child">
      <span className="component-label child">Counter 子组件</span>
      <div className="result-value" style={{ marginTop: '8px' }}>{count}</div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
        （子组件内部按钮）
      </p>
      <div className="button-group" style={{ marginTop: '8px' }}>
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  )
})

// ==================== 主组件 ====================

function ForwardRefDemo() {
  // forwardRef 基础
  const inputRef = useRef(null)
  const buttonRef = useRef(null)
  
  // useImperativeHandle 示例
  const videoRef = useRef(null)
  const formRef = useRef(null)
  const counterRef = useRef(null)
  
  const [formResult, setFormResult] = useState(null)
  const [validationResult, setValidationResult] = useState(null)
  
  return (
    <div className="demo-card">
      <h3>forwardRef 和 useImperativeHandle 演示</h3>
      
      {/* forwardRef 基础 */}
      <div className="demo-area">
        <h4>1. forwardRef 基础用法</h4>
        <div className="description">
          <p><code>forwardRef</code> 允许组件将 ref 转发给子组件的 DOM 元素</p>
        </div>
        
        <div className="code-block">
{`const FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />
})

// 使用
const inputRef = useRef()
<FancyInput ref={inputRef} />
inputRef.current.focus()`}
        </div>
        
        <FancyInput 
          ref={inputRef}
          label="自定义输入框"
          placeholder="这是一个使用 forwardRef 的输入框"
        />
        
        <div className="button-group">
          <button onClick={() => inputRef.current?.focus()}>聚焦输入框</button>
          <button onClick={() => inputRef.current?.select()}>选中内容</button>
          <button onClick={() => alert(inputRef.current?.value)} className="btn-secondary">
            获取值
          </button>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <FancyButton ref={buttonRef} variant="secondary">
            自定义按钮
          </FancyButton>
          <button 
            onClick={() => {
              const rect = buttonRef.current?.getBoundingClientRect()
              if (rect) {
                alert(`按钮尺寸: ${rect.width}x${rect.height}`)
              }
            }}
            style={{ marginLeft: '8px' }}
          >
            获取按钮尺寸
          </button>
        </div>
      </div>
      
      {/* useImperativeHandle 基础 */}
      <div className="demo-area">
        <h4>2. useImperativeHandle - 视频播放器</h4>
        <div className="description">
          <p><code>useImperativeHandle</code> 自定义暴露给父组件的实例值</p>
          <p>可以限制父组件能访问的方法，而不是暴露整个 DOM</p>
        </div>
        
        <div className="code-block">
{`useImperativeHandle(ref, () => ({
  play() { ... },
  pause() { ... },
  toggle() { ... }
}), [dependencies])`}
        </div>
        
        <VideoPlayer ref={videoRef} />
        
        <div className="button-group" style={{ marginTop: '16px' }}>
          <button onClick={() => videoRef.current?.play()} className="btn-success">
            播放
          </button>
          <button onClick={() => videoRef.current?.pause()} className="btn-danger">
            暂停
          </button>
          <button onClick={() => videoRef.current?.toggle()}>
            切换
          </button>
          <button 
            onClick={() => {
              const state = videoRef.current?.getState()
              alert(`当前状态: ${state?.isPlaying ? '播放中' : '暂停'}`)
            }}
            className="btn-secondary"
          >
            获取状态
          </button>
        </div>
      </div>
      
      {/* useImperativeHandle 表单 */}
      <div className="demo-area">
        <h4>3. useImperativeHandle - 表单控制</h4>
        <div className="description">
          <p>父组件可以控制子组件的表单操作</p>
        </div>
        
        <div className="component-box parent">
          <span className="component-label parent">父组件控制区</span>
          <div className="button-group" style={{ marginBottom: '16px' }}>
            <button onClick={() => formRef.current?.focusUsername()}>
              聚焦用户名
            </button>
            <button 
              onClick={() => formRef.current?.setValues({ 
                username: 'admin', 
                email: 'admin@example.com',
                message: '这是自动填充的内容'
              })}
              className="btn-success"
            >
              自动填充
            </button>
            <button onClick={() => formRef.current?.reset()} className="btn-secondary">
              重置表单
            </button>
            <button 
              onClick={() => {
                const result = formRef.current?.validate()
                setValidationResult(result)
              }}
            >
              验证表单
            </button>
            <button 
              onClick={() => {
                const values = formRef.current?.getValues()
                setFormResult(values)
              }}
              className="btn-secondary"
            >
              获取值
            </button>
          </div>
          
          {validationResult && (
            <div className={`info-box ${validationResult.isValid ? 'success' : 'warning'}`}>
              {validationResult.isValid 
                ? '✅ 表单验证通过' 
                : `❌ 验证失败: ${Object.values(validationResult.errors).join(', ')}`
              }
            </div>
          )}
          
          {formResult && (
            <div className="result" style={{ marginTop: '12px' }}>
              <pre>{JSON.stringify(formResult, null, 2)}</pre>
            </div>
          )}
        </div>
        
        <div className="component-box child">
          <span className="component-label child">CustomForm 子组件</span>
          <CustomForm ref={formRef} />
        </div>
      </div>
      
      {/* useImperativeHandle 计数器 */}
      <div className="demo-area">
        <h4>4. useImperativeHandle - 父组件调用子组件方法</h4>
        <div className="description">
          <p>父组件可以通过 ref 调用子组件暴露的方法</p>
        </div>
        
        <div className="component-box parent">
          <span className="component-label parent">父组件</span>
          <p style={{ marginBottom: '12px' }}>通过 ref 控制子组件的计数器</p>
          <div className="button-group">
            <button onClick={() => counterRef.current?.increment()}>+1（父）</button>
            <button onClick={() => counterRef.current?.decrement()}>-1（父）</button>
            <button onClick={() => counterRef.current?.setCount(100)}>设为100</button>
            <button onClick={() => counterRef.current?.reset()} className="btn-secondary">
              重置
            </button>
            <button 
              onClick={() => alert(`当前计数: ${counterRef.current?.getCount()}`)}
              className="btn-secondary"
            >
              获取值
            </button>
          </div>
          
          <Counter ref={counterRef} initialValue={0} />
        </div>
      </div>
      
      {/* 最佳实践 */}
      <div className="demo-area">
        <h4>最佳实践</h4>
        <div className="info-box success">
          <p><strong>✅ 推荐做法：</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>使用 <code>forwardRef</code> 让组件可以接收 ref</li>
            <li>使用 <code>useImperativeHandle</code> 限制暴露的方法</li>
            <li>只暴露必要的操作，隐藏实现细节</li>
            <li>为暴露的方法提供清晰的命名</li>
          </ul>
        </div>
        <div className="info-box warning">
          <p><strong>⚠️ 注意事项：</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>避免过度使用命令式操作，优先使用 props 和 state</li>
            <li>ref 应该是 "逃生舱口"，用于必须的 DOM 操作</li>
            <li>不要滥用 useImperativeHandle 暴露过多方法</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ForwardRefDemo
export { FancyInput, FancyButton, VideoPlayer, CustomForm, Counter }

