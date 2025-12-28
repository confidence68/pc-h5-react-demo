/**
 * 兄弟组件通信演示
 * 
 * 兄弟组件之间不能直接通信，需要通过以下方式：
 * 
 * 1. 状态提升（Lifting State Up）：将共享状态提升到共同的父组件
 * 2. Context API：跨层级共享数据
 * 3. 状态管理库：Redux、MobX、Zustand 等
 * 4. 事件总线（Event Bus）：发布订阅模式
 */

import { 
  useState, 
  useCallback, 
  createContext, 
  useContext, 
  useEffect,
  useRef
} from 'react'

// ==================== 方式1：状态提升 ====================

/**
 * 兄弟组件 A：发送消息
 */
function SiblingA({ onSend, messages }) {
  const [input, setInput] = useState('')
  
  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim(), 'A')
      setInput('')
    }
  }
  
  return (
    <div className="component-box sibling">
      <span className="component-label sibling">兄弟组件 A</span>
      
      <div style={{ marginTop: '12px' }}>
        <p>收到的消息数: <strong>{messages.filter(m => m.from === 'B').length}</strong></p>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息发给 B"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>发送给 B</button>
        </div>
        
        <div style={{ 
          marginTop: '8px', 
          maxHeight: '100px', 
          overflow: 'auto',
          backgroundColor: 'var(--bg-light)',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {messages.filter(m => m.from === 'B').map(m => (
            <p key={m.id}>B: {m.text}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * 兄弟组件 B：发送消息
 */
function SiblingB({ onSend, messages }) {
  const [input, setInput] = useState('')
  
  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim(), 'B')
      setInput('')
    }
  }
  
  return (
    <div className="component-box sibling">
      <span className="component-label sibling">兄弟组件 B</span>
      
      <div style={{ marginTop: '12px' }}>
        <p>收到的消息数: <strong>{messages.filter(m => m.from === 'A').length}</strong></p>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息发给 A"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>发送给 A</button>
        </div>
        
        <div style={{ 
          marginTop: '8px', 
          maxHeight: '100px', 
          overflow: 'auto',
          backgroundColor: 'var(--bg-light)',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {messages.filter(m => m.from === 'A').map(m => (
            <p key={m.id}>A: {m.text}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * 状态提升演示
 */
function LiftingStateDemo() {
  // 状态提升到父组件
  const [messages, setMessages] = useState([])
  
  // 统一的消息处理函数
  const handleSend = useCallback((text, from) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      from
    }])
  }, [])
  
  return (
    <div className="demo-area">
      <h4>1. 状态提升（Lifting State Up）</h4>
      
      <div className="description">
        <p>将共享状态提升到最近的共同父组件</p>
        <p>父组件管理状态，通过 props 传递给子组件</p>
      </div>
      
      <div className="code-block">
{`// 父组件管理共享状态
function Parent() {
  const [sharedState, setSharedState] = useState()
  
  return (
    <>
      <SiblingA state={sharedState} onChange={setSharedState} />
      <SiblingB state={sharedState} onChange={setSharedState} />
    </>
  )
}`}
      </div>
      
      <div className="component-box parent">
        <span className="component-label parent">父组件（状态管理）</span>
        <p style={{ marginTop: '12px' }}>总消息数: <strong>{messages.length}</strong></p>
        
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
          <SiblingA onSend={handleSend} messages={messages} />
          <SiblingB onSend={handleSend} messages={messages} />
        </div>
      </div>
    </div>
  )
}

// ==================== 方式2：Context API ====================

// 创建 Context
const MessageContext = createContext(null)

/**
 * Context Provider
 */
function MessageProvider({ children }) {
  const [messages, setMessages] = useState([])
  
  const sendMessage = useCallback((text, from) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      from,
      timestamp: new Date().toLocaleTimeString()
    }])
  }, [])
  
  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])
  
  return (
    <MessageContext.Provider value={{ messages, sendMessage, clearMessages }}>
      {children}
    </MessageContext.Provider>
  )
}

/**
 * 自定义 Hook 使用 Context
 */
function useMessages() {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('useMessages 必须在 MessageProvider 内使用')
  }
  return context
}

/**
 * Context 版兄弟组件
 */
function ContextSiblingA() {
  const { messages, sendMessage } = useMessages()
  const [input, setInput] = useState('')
  
  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim(), 'A')
      setInput('')
    }
  }
  
  const myMessages = messages.filter(m => m.from === 'B')
  
  return (
    <div className="component-box sibling">
      <span className="component-label sibling">Context 组件 A</span>
      <div style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="发送消息"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>发送</button>
        </div>
        <p style={{ fontSize: '12px', marginTop: '8px' }}>
          收到 {myMessages.length} 条来自 B 的消息
        </p>
      </div>
    </div>
  )
}

function ContextSiblingB() {
  const { messages, sendMessage } = useMessages()
  const [input, setInput] = useState('')
  
  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim(), 'B')
      setInput('')
    }
  }
  
  const myMessages = messages.filter(m => m.from === 'A')
  
  return (
    <div className="component-box sibling">
      <span className="component-label sibling">Context 组件 B</span>
      <div style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="发送消息"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>发送</button>
        </div>
        <p style={{ fontSize: '12px', marginTop: '8px' }}>
          收到 {myMessages.length} 条来自 A 的消息
        </p>
      </div>
    </div>
  )
}

function ContextControlPanel() {
  const { messages, clearMessages } = useMessages()
  
  return (
    <div style={{ marginTop: '16px' }}>
      <p>总消息数: <strong>{messages.length}</strong></p>
      <button onClick={clearMessages} className="btn-secondary" style={{ marginTop: '8px' }}>
        清空所有消息
      </button>
      <div style={{ 
        marginTop: '8px', 
        maxHeight: '100px', 
        overflow: 'auto',
        backgroundColor: 'var(--bg-light)',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        {messages.map(m => (
          <p key={m.id}>[{m.timestamp}] {m.from}: {m.text}</p>
        ))}
      </div>
    </div>
  )
}

function ContextDemo() {
  return (
    <div className="demo-area">
      <h4>2. Context API</h4>
      
      <div className="description">
        <p>使用 Context 在组件树中共享数据，无需逐层传递 props</p>
        <p>适合跨多层级的状态共享</p>
      </div>
      
      <div className="code-block">
{`// 创建 Context
const MyContext = createContext()

// Provider 提供数据
<MyContext.Provider value={{ data, setData }}>
  <App />
</MyContext.Provider>

// 消费数据
const { data, setData } = useContext(MyContext)`}
      </div>
      
      <MessageProvider>
        <div className="component-box parent">
          <span className="component-label parent">MessageProvider</span>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
            <ContextSiblingA />
            <ContextSiblingB />
          </div>
          
          <ContextControlPanel />
        </div>
      </MessageProvider>
    </div>
  )
}

// ==================== 方式3：事件总线（Event Bus） ====================

/**
 * 简单的事件总线实现
 */
function createEventBus() {
  const listeners = new Map()
  
  return {
    // 订阅事件
    on(event, callback) {
      if (!listeners.has(event)) {
        listeners.set(event, new Set())
      }
      listeners.get(event).add(callback)
      
      // 返回取消订阅函数
      return () => {
        listeners.get(event).delete(callback)
      }
    },
    
    // 发布事件
    emit(event, data) {
      if (listeners.has(event)) {
        listeners.get(event).forEach(callback => callback(data))
      }
    },
    
    // 移除所有监听
    clear() {
      listeners.clear()
    }
  }
}

// 创建全局事件总线
const eventBus = createEventBus()

/**
 * 事件总线版兄弟组件
 */
function EventBusSiblingA() {
  const [input, setInput] = useState('')
  const [receivedMessages, setReceivedMessages] = useState([])
  
  // 订阅来自 B 的消息
  useEffect(() => {
    const unsubscribe = eventBus.on('message_to_A', (data) => {
      setReceivedMessages(prev => [...prev, data])
    })
    
    return unsubscribe // 组件卸载时取消订阅
  }, [])
  
  const handleSend = () => {
    if (input.trim()) {
      // 发布消息给 B
      eventBus.emit('message_to_B', {
        id: Date.now(),
        text: input.trim(),
        from: 'A'
      })
      setInput('')
    }
  }
  
  return (
    <div className="component-box sibling">
      <span className="component-label sibling">EventBus 组件 A</span>
      <div style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="发送消息"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>发送</button>
        </div>
        <div style={{ 
          marginTop: '8px', 
          fontSize: '12px',
          backgroundColor: 'var(--bg-light)',
          padding: '8px',
          borderRadius: '4px',
          maxHeight: '80px',
          overflow: 'auto'
        }}>
          {receivedMessages.length === 0 ? (
            <p>等待消息...</p>
          ) : (
            receivedMessages.map(m => (
              <p key={m.id}>B: {m.text}</p>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function EventBusSiblingB() {
  const [input, setInput] = useState('')
  const [receivedMessages, setReceivedMessages] = useState([])
  
  // 订阅来自 A 的消息
  useEffect(() => {
    const unsubscribe = eventBus.on('message_to_B', (data) => {
      setReceivedMessages(prev => [...prev, data])
    })
    
    return unsubscribe
  }, [])
  
  const handleSend = () => {
    if (input.trim()) {
      eventBus.emit('message_to_A', {
        id: Date.now(),
        text: input.trim(),
        from: 'B'
      })
      setInput('')
    }
  }
  
  return (
    <div className="component-box sibling">
      <span className="component-label sibling">EventBus 组件 B</span>
      <div style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="发送消息"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>发送</button>
        </div>
        <div style={{ 
          marginTop: '8px', 
          fontSize: '12px',
          backgroundColor: 'var(--bg-light)',
          padding: '8px',
          borderRadius: '4px',
          maxHeight: '80px',
          overflow: 'auto'
        }}>
          {receivedMessages.length === 0 ? (
            <p>等待消息...</p>
          ) : (
            receivedMessages.map(m => (
              <p key={m.id}>A: {m.text}</p>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function EventBusDemo() {
  return (
    <div className="demo-area">
      <h4>3. 事件总线（Event Bus）</h4>
      
      <div className="description">
        <p>发布订阅模式，组件之间完全解耦</p>
        <p>适合复杂的跨组件通信，但要注意内存泄漏</p>
      </div>
      
      <div className="code-block">
{`// 创建事件总线
const eventBus = createEventBus()

// 订阅（在 useEffect 中）
useEffect(() => {
  const unsubscribe = eventBus.on('event', handler)
  return unsubscribe  // 清理
}, [])

// 发布
eventBus.emit('event', data)`}
      </div>
      
      <div className="component-box parent">
        <span className="component-label parent">事件总线模式</span>
        
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
          <EventBusSiblingA />
          <EventBusSiblingB />
        </div>
      </div>
      
      <div className="info-box warning" style={{ marginTop: '16px' }}>
        <strong>⚠️ 注意：</strong>
        <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
          <li>必须在组件卸载时取消订阅，防止内存泄漏</li>
          <li>事件总线使数据流变得难以追踪，谨慎使用</li>
          <li>推荐使用 Redux、Zustand 等状态管理库代替</li>
        </ul>
      </div>
    </div>
  )
}

// ==================== 主组件 ====================

function SiblingDemo() {
  return (
    <div className="demo-card">
      <h3>兄弟组件通信</h3>
      
      <div className="demo-area">
        <h4>通信方式对比</h4>
        <div className="info-box tip">
          <table className="data-table">
            <thead>
              <tr>
                <th>方式</th>
                <th>优点</th>
                <th>缺点</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>状态提升</td>
                <td>简单、直观</td>
                <td>多层传递繁琐</td>
                <td>简单的共享状态</td>
              </tr>
              <tr>
                <td>Context</td>
                <td>跨层级、避免 props drilling</td>
                <td>所有消费者重新渲染</td>
                <td>主题、用户信息等</td>
              </tr>
              <tr>
                <td>Event Bus</td>
                <td>完全解耦</td>
                <td>难以追踪数据流</td>
                <td>不推荐，用 Redux 代替</td>
              </tr>
              <tr>
                <td>Redux/Zustand</td>
                <td>可预测、可调试</td>
                <td>学习成本</td>
                <td>复杂应用状态管理</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <LiftingStateDemo />
      <ContextDemo />
      <EventBusDemo />
    </div>
  )
}

export default SiblingDemo

