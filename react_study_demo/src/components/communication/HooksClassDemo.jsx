/**
 * Hooks 组件与 Class 组件互操作演示
 * 
 * React 支持 Hooks 组件和 Class 组件混合使用
 * 它们可以互相调用、传值、嵌套
 * 
 * 主要场景：
 * 1. Hooks 组件调用 Class 组件
 * 2. Class 组件调用 Hooks 组件
 * 3. 互相传值和通信
 * 4. 使用 ref 获取组件实例
 */

import { 
  useState, 
  useRef, 
  useCallback, 
  forwardRef, 
  useImperativeHandle,
  Component,
  createRef
} from 'react'

// ==================== Class 组件定义 ====================

/**
 * Class 组件：计数器
 * 暴露方法给父组件（通过 ref）
 */
class ClassCounter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.initialValue || 0
    }
  }
  
  // 暴露给外部的方法
  increment = () => {
    this.setState(state => ({ count: state.count + 1 }))
    this.props.onChange?.(this.state.count + 1)
  }
  
  decrement = () => {
    this.setState(state => ({ count: state.count - 1 }))
    this.props.onChange?.(this.state.count - 1)
  }
  
  reset = () => {
    const initialValue = this.props.initialValue || 0
    this.setState({ count: initialValue })
    this.props.onChange?.(initialValue)
  }
  
  getCount = () => {
    return this.state.count
  }
  
  setCount = (value) => {
    this.setState({ count: value })
    this.props.onChange?.(value)
  }
  
  render() {
    const { title = 'Class 计数器' } = this.props
    
    return (
      <div className="component-box child" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
        <span className="component-label" style={{ backgroundColor: '#ef4444' }}>
          {title}（Class 组件）
        </span>
        
        <div className="result-value" style={{ margin: '12px 0' }}>
          {this.state.count}
        </div>
        
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Class 组件内部按钮:
        </p>
        
        <div className="button-group">
          <button onClick={this.decrement}>-1</button>
          <button onClick={this.increment}>+1</button>
          <button onClick={this.reset} className="btn-secondary">重置</button>
        </div>
      </div>
    )
  }
}

/**
 * Class 组件：表单
 */
class ClassForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.defaultName || '',
      email: props.defaultEmail || ''
    }
  }
  
  handleChange = (field) => (e) => {
    this.setState({ [field]: e.target.value })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit?.(this.state)
  }
  
  // 暴露方法
  getValues = () => this.state
  
  setValues = (values) => {
    this.setState(values)
  }
  
  reset = () => {
    this.setState({
      name: this.props.defaultName || '',
      email: this.props.defaultEmail || ''
    })
  }
  
  render() {
    return (
      <div className="component-box child" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
        <span className="component-label" style={{ backgroundColor: '#ef4444' }}>
          Class 表单组件
        </span>
        
        <form onSubmit={this.handleSubmit} style={{ marginTop: '12px' }}>
          <div style={{ marginBottom: '8px' }}>
            <input 
              type="text"
              value={this.state.name}
              onChange={this.handleChange('name')}
              placeholder="姓名"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <input 
              type="email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              placeholder="邮箱"
              style={{ width: '100%' }}
            />
          </div>
          <button type="submit">提交（Class 内部）</button>
        </form>
      </div>
    )
  }
}

// ==================== Hooks 组件定义 ====================

/**
 * Hooks 组件：计数器（使用 forwardRef 暴露方法）
 */
const HooksCounter = forwardRef(function HooksCounter({ 
  initialValue = 0, 
  onChange,
  title = 'Hooks 计数器'
}, ref) {
  const [count, setCount] = useState(initialValue)
  
  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    increment() {
      setCount(c => {
        const newValue = c + 1
        onChange?.(newValue)
        return newValue
      })
    },
    decrement() {
      setCount(c => {
        const newValue = c - 1
        onChange?.(newValue)
        return newValue
      })
    },
    reset() {
      setCount(initialValue)
      onChange?.(initialValue)
    },
    getCount() {
      return count
    },
    setCount(value) {
      setCount(value)
      onChange?.(value)
    }
  }), [count, initialValue, onChange])
  
  return (
    <div className="component-box child" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
      <span className="component-label" style={{ backgroundColor: '#3b82f6' }}>
        {title}（Hooks 组件）
      </span>
      
      <div className="result-value" style={{ margin: '12px 0' }}>
        {count}
      </div>
      
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
        Hooks 组件内部按钮:
      </p>
      
      <div className="button-group">
        <button onClick={() => setCount(c => c - 1)}>-1</button>
        <button onClick={() => setCount(c => c + 1)}>+1</button>
        <button onClick={() => setCount(initialValue)} className="btn-secondary">重置</button>
      </div>
    </div>
  )
})

/**
 * Hooks 组件：表单
 */
const HooksForm = forwardRef(function HooksForm({ 
  defaultName = '', 
  defaultEmail = '',
  onSubmit 
}, ref) {
  const [name, setName] = useState(defaultName)
  const [email, setEmail] = useState(defaultEmail)
  
  useImperativeHandle(ref, () => ({
    getValues() {
      return { name, email }
    },
    setValues({ name: newName, email: newEmail }) {
      if (newName !== undefined) setName(newName)
      if (newEmail !== undefined) setEmail(newEmail)
    },
    reset() {
      setName(defaultName)
      setEmail(defaultEmail)
    }
  }), [name, email, defaultName, defaultEmail])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ name, email })
  }
  
  return (
    <div className="component-box child" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
      <span className="component-label" style={{ backgroundColor: '#3b82f6' }}>
        Hooks 表单组件
      </span>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
        <div style={{ marginBottom: '8px' }}>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="姓名"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="邮箱"
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">提交（Hooks 内部）</button>
      </form>
    </div>
  )
})

// ==================== 互操作演示组件 ====================

/**
 * 演示1：Hooks 组件调用 Class 组件
 */
function HooksCallsClassDemo() {
  // 使用 useRef 获取 Class 组件实例
  const classCounterRef = useRef(null)
  const classFormRef = useRef(null)
  const [lastValue, setLastValue] = useState(null)
  const [formData, setFormData] = useState(null)
  
  const handleCounterChange = useCallback((value) => {
    setLastValue(value)
  }, [])
  
  const handleFormSubmit = useCallback((data) => {
    setFormData(data)
  }, [])
  
  return (
    <div className="demo-area">
      <h4>1. Hooks 组件调用 Class 组件</h4>
      
      <div className="description">
        <p>Hooks 组件可以直接使用 Class 组件</p>
        <p>通过 ref 可以访问 Class 组件的实例方法</p>
      </div>
      
      <div className="code-block">
{`// Hooks 组件中使用 Class 组件
function HooksComponent() {
  const classRef = useRef(null)
  
  return (
    <>
      <ClassComponent ref={classRef} />
      <button onClick={() => classRef.current.someMethod()}>
        调用 Class 方法
      </button>
    </>
  )
}`}
      </div>
      
      <div className="component-box parent" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <span className="component-label" style={{ backgroundColor: '#3b82f6' }}>
          父组件（Hooks）
        </span>
        
        <p style={{ marginTop: '12px', marginBottom: '12px' }}>
          通过 ref 控制 Class 子组件:
        </p>
        
        <div className="button-group" style={{ marginBottom: '16px' }}>
          <button onClick={() => classCounterRef.current?.increment()}>
            Class +1
          </button>
          <button onClick={() => classCounterRef.current?.decrement()}>
            Class -1
          </button>
          <button onClick={() => classCounterRef.current?.setCount(50)}>
            设为 50
          </button>
          <button onClick={() => classCounterRef.current?.reset()} className="btn-secondary">
            重置
          </button>
        </div>
        
        {lastValue !== null && (
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>
            Class 组件回调: <strong>{lastValue}</strong>
          </p>
        )}
        
        <ClassCounter 
          ref={classCounterRef}
          initialValue={10}
          onChange={handleCounterChange}
          title="Class 计数器"
        />
        
        <div style={{ marginTop: '16px' }}>
          <div className="button-group" style={{ marginBottom: '12px' }}>
            <button onClick={() => {
              classFormRef.current?.setValues({ 
                name: '张三', 
                email: 'zhangsan@example.com' 
              })
            }}>
              填充 Class 表单
            </button>
            <button onClick={() => classFormRef.current?.reset()} className="btn-secondary">
              重置表单
            </button>
          </div>
          
          {formData && (
            <p style={{ fontSize: '14px', marginBottom: '12px' }}>
              Class 表单提交: <code>{JSON.stringify(formData)}</code>
            </p>
          )}
          
          <ClassForm 
            ref={classFormRef}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * 演示2：Class 组件调用 Hooks 组件
 */
class ClassCallsHooksDemo extends Component {
  constructor(props) {
    super(props)
    this.hooksCounterRef = createRef()
    this.hooksFormRef = createRef()
    this.state = {
      lastValue: null,
      formData: null
    }
  }
  
  handleCounterChange = (value) => {
    this.setState({ lastValue: value })
  }
  
  handleFormSubmit = (data) => {
    this.setState({ formData: data })
  }
  
  render() {
    return (
      <div className="demo-area">
        <h4>2. Class 组件调用 Hooks 组件</h4>
        
        <div className="description">
          <p>Class 组件可以直接使用 Hooks 组件</p>
          <p>Hooks 组件需要使用 forwardRef + useImperativeHandle 暴露方法</p>
        </div>
        
        <div className="code-block">
{`// Class 组件中使用 Hooks 组件
class ClassComponent extends Component {
  constructor(props) {
    super(props)
    this.hooksRef = createRef()
  }
  
  render() {
    return (
      <>
        <HooksComponent ref={this.hooksRef} />
        <button onClick={() => this.hooksRef.current?.someMethod()}>
          调用 Hooks 方法
        </button>
      </>
    )
  }
}`}
        </div>
        
        <div className="component-box parent" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <span className="component-label" style={{ backgroundColor: '#ef4444' }}>
            父组件（Class）
          </span>
          
          <p style={{ marginTop: '12px', marginBottom: '12px' }}>
            通过 ref 控制 Hooks 子组件:
          </p>
          
          <div className="button-group" style={{ marginBottom: '16px' }}>
            <button onClick={() => this.hooksCounterRef.current?.increment()}>
              Hooks +1
            </button>
            <button onClick={() => this.hooksCounterRef.current?.decrement()}>
              Hooks -1
            </button>
            <button onClick={() => this.hooksCounterRef.current?.setCount(100)}>
              设为 100
            </button>
            <button onClick={() => this.hooksCounterRef.current?.reset()} className="btn-secondary">
              重置
            </button>
          </div>
          
          {this.state.lastValue !== null && (
            <p style={{ fontSize: '14px', marginBottom: '12px' }}>
              Hooks 组件回调: <strong>{this.state.lastValue}</strong>
            </p>
          )}
          
          <HooksCounter 
            ref={this.hooksCounterRef}
            initialValue={20}
            onChange={this.handleCounterChange}
            title="Hooks 计数器"
          />
          
          <div style={{ marginTop: '16px' }}>
            <div className="button-group" style={{ marginBottom: '12px' }}>
              <button onClick={() => {
                this.hooksFormRef.current?.setValues({ 
                  name: '李四', 
                  email: 'lisi@example.com' 
                })
              }}>
                填充 Hooks 表单
              </button>
              <button onClick={() => this.hooksFormRef.current?.reset()} className="btn-secondary">
                重置表单
              </button>
            </div>
            
            {this.state.formData && (
              <p style={{ fontSize: '14px', marginBottom: '12px' }}>
                Hooks 表单提交: <code>{JSON.stringify(this.state.formData)}</code>
              </p>
            )}
            
            <HooksForm 
              ref={this.hooksFormRef}
              onSubmit={this.handleFormSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 演示3：混合使用
 */
function MixedUsageDemo() {
  const hooksCounterRef = useRef(null)
  const classCounterRef = useRef(null)
  const [total, setTotal] = useState(0)
  
  const updateTotal = useCallback(() => {
    const hooksValue = hooksCounterRef.current?.getCount() || 0
    const classValue = classCounterRef.current?.getCount() || 0
    setTotal(hooksValue + classValue)
  }, [])
  
  const syncCounters = useCallback(() => {
    const avg = Math.floor(total / 2)
    hooksCounterRef.current?.setCount(avg)
    classCounterRef.current?.setCount(avg)
    updateTotal()
  }, [total, updateTotal])
  
  return (
    <div className="demo-area">
      <h4>3. Hooks 和 Class 组件混合使用</h4>
      
      <div className="description">
        <p>Hooks 组件和 Class 组件可以自由混合使用</p>
        <p>它们可以互相嵌套、传值、通过 ref 互相调用</p>
      </div>
      
      <div className="component-box parent">
        <span className="component-label parent">混合容器</span>
        
        <div style={{ marginTop: '12px', marginBottom: '16px' }}>
          <p>总计: <strong style={{ fontSize: '24px' }}>{total}</strong></p>
          <div className="button-group" style={{ marginTop: '8px' }}>
            <button onClick={updateTotal}>计算总和</button>
            <button onClick={syncCounters} className="btn-secondary">同步两个计数器</button>
            <button onClick={() => {
              hooksCounterRef.current?.reset()
              classCounterRef.current?.reset()
              setTotal(0)
            }} className="btn-danger">
              全部重置
            </button>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <HooksCounter 
            ref={hooksCounterRef}
            initialValue={0}
            onChange={updateTotal}
          />
          <ClassCounter 
            ref={classCounterRef}
            initialValue={0}
            onChange={updateTotal}
          />
        </div>
      </div>
    </div>
  )
}

// ==================== 主组件 ====================

function HooksClassDemo() {
  return (
    <div className="demo-card">
      <h3>Hooks 组件与 Class 组件互操作</h3>
      
      <div className="demo-area">
        <h4>互操作说明</h4>
        <div className="info-box tip">
          <p><strong>✅ 可以做的事情：</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>Hooks 组件可以渲染 Class 组件</li>
            <li>Class 组件可以渲染 Hooks 组件</li>
            <li>可以通过 props 互相传值</li>
            <li>可以通过 ref 调用对方暴露的方法</li>
            <li>可以自由嵌套和组合</li>
          </ul>
        </div>
        <div className="info-box warning">
          <p><strong>⚠️ 注意事项：</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>Hooks 只能在函数组件或自定义 Hook 中使用</li>
            <li>Class 组件无法直接使用 Hooks</li>
            <li>推荐新项目使用 Hooks，保持代码风格一致</li>
            <li>渐进式迁移：可以逐步将 Class 组件改写为 Hooks</li>
          </ul>
        </div>
      </div>
      
      <HooksCallsClassDemo />
      <ClassCallsHooksDemo />
      <MixedUsageDemo />
    </div>
  )
}

export default HooksClassDemo
export { ClassCounter, ClassForm, HooksCounter, HooksForm }

