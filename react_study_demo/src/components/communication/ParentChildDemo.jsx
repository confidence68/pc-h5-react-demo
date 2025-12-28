/**
 * 父子组件通信演示
 * 
 * React 中父子组件通信的主要方式：
 * 
 * 1. 父 -> 子：通过 props 传递数据
 * 2. 子 -> 父：通过回调函数（callback props）
 * 3. 父 -> 子（命令式）：通过 ref 调用子组件方法
 * 
 * 数据流是单向的：父组件传数据给子组件，子组件通过回调通知父组件
 */

import { 
  useState, 
  useCallback, 
  forwardRef, 
  useImperativeHandle, 
  useRef,
  memo
} from 'react'

// ==================== 方式1：Props 传递 + 回调函数 ====================

/**
 * 子组件：接收 props 和回调函数
 */
const ChildComponent = memo(function ChildComponent({ 
  value,           // 从父组件接收的数据
  onChange,        // 数据变化时的回调
  onSubmit,        // 提交时的回调
  title = '子组件'  // 带默认值的 prop
}) {
  console.log('ChildComponent 渲染')
  
  const [localInput, setLocalInput] = useState('')
  
  // 处理输入变化，通知父组件
  const handleInputChange = (e) => {
    const newValue = e.target.value
    setLocalInput(newValue)
    onChange?.(newValue)
  }
  
  // 处理提交
  const handleSubmit = () => {
    onSubmit?.(localInput)
    setLocalInput('')
  }
  
  return (
    <div className="component-box child">
      <span className="component-label child">{title}</span>
      
      <div style={{ marginTop: '12px' }}>
        <p>从父组件接收的值: <strong>{value}</strong></p>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <input 
            type="text"
            value={localInput}
            onChange={handleInputChange}
            placeholder="输入内容传给父组件"
            style={{ flex: 1 }}
          />
          <button onClick={handleSubmit}>提交给父组件</button>
        </div>
      </div>
    </div>
  )
})

/**
 * 父组件：管理状态并传递给子组件
 */
function ParentChildBasicDemo() {
  const [messageFromChild, setMessageFromChild] = useState('')
  const [submittedMessages, setSubmittedMessages] = useState([])
  const [parentValue, setParentValue] = useState('Hello from Parent!')
  
  // 子组件输入变化时的回调
  const handleChildChange = useCallback((value) => {
    setMessageFromChild(value)
  }, [])
  
  // 子组件提交时的回调
  const handleChildSubmit = useCallback((message) => {
    if (message.trim()) {
      setSubmittedMessages(prev => [...prev, {
        id: Date.now(),
        text: message
      }])
    }
  }, [])
  
  return (
    <div className="demo-area">
      <h4>1. Props 传递 + 回调函数（最常用）</h4>
      
      <div className="description">
        <p><strong>父 → 子：</strong>通过 props 传递数据</p>
        <p><strong>子 → 父：</strong>通过回调函数（callback）通知父组件</p>
      </div>
      
      <div className="code-block">
{`// 父组件
<Child 
  value={parentValue}           // 父 -> 子
  onChange={handleChange}       // 子 -> 父
/>

// 子组件
function Child({ value, onChange }) {
  return (
    <div>
      <p>接收: {value}</p>
      <input onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}`}
      </div>
      
      <div className="component-box parent">
        <span className="component-label parent">父组件</span>
        
        <div style={{ marginTop: '12px' }}>
          <div style={{ marginBottom: '12px' }}>
            <label>父组件的值: </label>
            <input 
              type="text"
              value={parentValue}
              onChange={(e) => setParentValue(e.target.value)}
              style={{ marginLeft: '8px', width: '200px' }}
            />
          </div>
          
          <p>实时接收子组件输入: <code>{messageFromChild || '（等待输入...）'}</code></p>
          
          <div style={{ marginTop: '12px' }}>
            <p>已提交的消息:</p>
            <ul className="item-list" style={{ marginTop: '8px' }}>
              {submittedMessages.length === 0 ? (
                <li>暂无消息</li>
              ) : (
                submittedMessages.map(msg => (
                  <li key={msg.id}>{msg.text}</li>
                ))
              )}
            </ul>
          </div>
        </div>
        
        <ChildComponent 
          value={parentValue}
          onChange={handleChildChange}
          onSubmit={handleChildSubmit}
        />
      </div>
    </div>
  )
}

// ==================== 方式2：通过 Ref 调用子组件方法 ====================

/**
 * 子组件：暴露方法给父组件
 */
const ChildWithRef = forwardRef(function ChildWithRef({ onLog }, ref) {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState([])
  
  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    increment() {
      setCount(c => {
        const newValue = c + 1
        setHistory(h => [...h, `增加到 ${newValue}`])
        return newValue
      })
      onLog?.('increment 被调用')
    },
    decrement() {
      setCount(c => {
        const newValue = c - 1
        setHistory(h => [...h, `减少到 ${newValue}`])
        return newValue
      })
      onLog?.('decrement 被调用')
    },
    reset() {
      setCount(0)
      setHistory([])
      onLog?.('reset 被调用')
    },
    getValue() {
      return count
    },
    setValue(value) {
      setCount(value)
      setHistory(h => [...h, `设置为 ${value}`])
      onLog?.(`setValue(${value}) 被调用`)
    }
  }), [count, onLog])
  
  return (
    <div className="component-box child">
      <span className="component-label child">子组件（暴露方法）</span>
      
      <div className="result-value" style={{ margin: '12px 0' }}>{count}</div>
      
      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        操作历史:
      </p>
      <ul style={{ 
        fontSize: '12px', 
        maxHeight: '80px', 
        overflow: 'auto',
        backgroundColor: 'var(--bg-light)',
        padding: '8px',
        borderRadius: '4px',
        marginTop: '4px'
      }}>
        {history.length === 0 ? (
          <li>暂无操作</li>
        ) : (
          history.map((item, index) => <li key={index}>{item}</li>)
        )}
      </ul>
    </div>
  )
})

/**
 * 父组件：通过 ref 调用子组件方法
 */
function ParentChildRefDemo() {
  const childRef = useRef(null)
  const [logs, setLogs] = useState([])
  
  const handleLog = useCallback((message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }, [])
  
  return (
    <div className="demo-area">
      <h4>2. 通过 Ref 调用子组件方法（命令式）</h4>
      
      <div className="description">
        <p>使用 <code>forwardRef</code> + <code>useImperativeHandle</code></p>
        <p>父组件可以直接调用子组件暴露的方法</p>
      </div>
      
      <div className="code-block">
{`// 子组件
const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    someMethod() { ... }
  }))
  return <div>...</div>
})

// 父组件
const childRef = useRef()
<Child ref={childRef} />
childRef.current.someMethod()`}
      </div>
      
      <div className="component-box parent">
        <span className="component-label parent">父组件</span>
        
        <p style={{ marginTop: '12px', marginBottom: '12px' }}>
          通过 ref 控制子组件:
        </p>
        
        <div className="button-group">
          <button onClick={() => childRef.current?.increment()}>
            +1
          </button>
          <button onClick={() => childRef.current?.decrement()}>
            -1
          </button>
          <button onClick={() => childRef.current?.setValue(100)}>
            设为 100
          </button>
          <button onClick={() => childRef.current?.reset()} className="btn-secondary">
            重置
          </button>
          <button 
            onClick={() => alert(`当前值: ${childRef.current?.getValue()}`)}
            className="btn-secondary"
          >
            获取值
          </button>
        </div>
        
        <div style={{ marginTop: '12px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>调用日志:</p>
          <div style={{ 
            fontSize: '12px', 
            maxHeight: '60px', 
            overflow: 'auto',
            backgroundColor: 'var(--bg-light)',
            padding: '8px',
            borderRadius: '4px',
            marginTop: '4px'
          }}>
            {logs.length === 0 ? '暂无日志' : logs.join(' | ')}
          </div>
        </div>
        
        <ChildWithRef ref={childRef} onLog={handleLog} />
      </div>
      
      <div className="info-box warning" style={{ marginTop: '16px' }}>
        <strong>⚠️ 注意：</strong>
        命令式操作应该谨慎使用，大多数情况下 props + 回调 是更好的选择。
        只有在需要直接操作子组件（如聚焦、动画）时才使用 ref。
      </div>
    </div>
  )
}

// ==================== 方式3：children 和 render props ====================

/**
 * 容器组件：通过 children 传递数据
 */
function DataProvider({ children }) {
  const [data, setData] = useState({
    user: { name: '张三', age: 25 },
    theme: 'dark'
  })
  
  const updateUser = useCallback((updates) => {
    setData(prev => ({
      ...prev,
      user: { ...prev.user, ...updates }
    }))
  }, [])
  
  // 将数据和方法传递给 children
  return (
    <div className="component-box parent">
      <span className="component-label parent">DataProvider（容器）</span>
      {typeof children === 'function' 
        ? children({ data, updateUser }) 
        : children
      }
    </div>
  )
}

/**
 * 演示 children 和 render props 模式
 */
function ChildrenPropsDemo() {
  return (
    <div className="demo-area">
      <h4>3. Children 和 Render Props 模式</h4>
      
      <div className="description">
        <p><code>children</code> 可以是函数，实现更灵活的数据传递</p>
        <p>这种模式也称为 "render props" 或 "function as children"</p>
      </div>
      
      <div className="code-block">
{`// 容器组件
function DataProvider({ children }) {
  const [data, setData] = useState({...})
  return children({ data, setData })
}

// 使用
<DataProvider>
  {({ data, setData }) => (
    <div>{data.name}</div>
  )}
</DataProvider>`}
      </div>
      
      <DataProvider>
        {({ data, updateUser }) => (
          <div className="component-box child">
            <span className="component-label child">消费者组件</span>
            <div style={{ marginTop: '12px' }}>
              <p>用户名: <strong>{data.user.name}</strong></p>
              <p>年龄: <strong>{data.user.age}</strong></p>
              <p>主题: <strong>{data.theme}</strong></p>
              
              <div className="button-group" style={{ marginTop: '12px' }}>
                <button onClick={() => updateUser({ name: '李四' })}>
                  改名为李四
                </button>
                <button onClick={() => updateUser({ age: data.user.age + 1 })}>
                  年龄 +1
                </button>
              </div>
            </div>
          </div>
        )}
      </DataProvider>
    </div>
  )
}

// ==================== 主组件 ====================

function ParentChildDemo() {
  return (
    <div className="demo-card">
      <h3>父子组件通信</h3>
      
      <div className="demo-area">
        <h4>通信方式总结</h4>
        <div className="info-box tip">
          <table className="data-table">
            <thead>
              <tr>
                <th>方向</th>
                <th>方式</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>父 → 子</td>
                <td>props</td>
                <td>传递数据、配置</td>
              </tr>
              <tr>
                <td>子 → 父</td>
                <td>回调函数</td>
                <td>事件通知、数据更新</td>
              </tr>
              <tr>
                <td>父 → 子</td>
                <td>ref</td>
                <td>命令式操作（聚焦、动画）</td>
              </tr>
              <tr>
                <td>双向</td>
                <td>render props</td>
                <td>复杂逻辑复用</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <ParentChildBasicDemo />
      <ParentChildRefDemo />
      <ChildrenPropsDemo />
    </div>
  )
}

export default ParentChildDemo

