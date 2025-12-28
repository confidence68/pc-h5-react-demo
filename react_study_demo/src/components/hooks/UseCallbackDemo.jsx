/**
 * useCallback Hook 演示组件
 * 
 * useCallback 用于缓存函数引用
 * 当函数作为 props 传递给子组件时，使用 useCallback 可以避免子组件不必要的重新渲染
 * 
 * 语法：const memoizedCallback = useCallback(fn, dependencies)
 * - fn: 需要缓存的函数
 * - dependencies: 依赖数组，依赖变化时函数会重新创建
 * 
 * 使用场景：
 * 1. 将函数传递给使用 React.memo 优化的子组件
 * 2. 函数作为其他 Hook 的依赖项
 */

import { useState, useCallback, memo } from 'react'

// ==================== 子组件定义 ====================
/**
 * 使用 React.memo 优化的子组件
 * 只有 props 真正变化时才会重新渲染
 */
const ChildButton = memo(function ChildButton({ onClick, label, renderCount }) {
  console.log(`ChildButton "${label}" 渲染了`)
  
  return (
    <div className="component-box child" style={{ display: 'inline-block', margin: '8px' }}>
      <span className="component-label child">子组件</span>
      <p style={{ fontSize: '14px', marginBottom: '8px' }}>{label}</p>
      <button onClick={onClick}>{label}</button>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
        渲染次数: {renderCount}
      </p>
    </div>
  )
})

/**
 * 列表项组件
 * 接收 onClick 函数作为 props
 */
const ListItem = memo(function ListItem({ item, onDelete }) {
  console.log(`ListItem "${item.text}" 渲染了`)
  
  return (
    <li style={{ 
      padding: '8px 16px', 
      background: 'var(--bg-card)', 
      marginBottom: '4px',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{item.text}</span>
      <button 
        onClick={() => onDelete(item.id)}
        className="btn-danger"
        style={{ padding: '4px 8px', fontSize: '12px' }}
      >
        删除
      </button>
    </li>
  )
})

// ==================== 主组件 ====================
function UseCallbackDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [items, setItems] = useState([
    { id: 1, text: '项目 1' },
    { id: 2, text: '项目 2' },
    { id: 3, text: '项目 3' }
  ])
  
  // 用于追踪渲染次数
  const [renderCounts, setRenderCounts] = useState({
    withCallback: 0,
    withoutCallback: 0
  })
  
  // ==================== 未使用 useCallback ====================
  /**
   * 普通函数：每次父组件渲染都会创建新的函数实例
   * 导致使用此函数的子组件也会重新渲染
   */
  const handleClickWithoutCallback = () => {
    console.log('没有使用 useCallback 的函数被调用')
    setRenderCounts(prev => ({
      ...prev,
      withoutCallback: prev.withoutCallback + 1
    }))
  }
  
  // ==================== 使用 useCallback ====================
  /**
   * 使用 useCallback 缓存函数
   * 只有依赖项变化时才会创建新的函数实例
   */
  const handleClickWithCallback = useCallback(() => {
    console.log('使用 useCallback 的函数被调用')
    setRenderCounts(prev => ({
      ...prev,
      withCallback: prev.withCallback + 1
    }))
  }, []) // 空依赖数组：函数永远不变
  
  // ==================== 带依赖的 useCallback ====================
  /**
   * 带依赖项的 useCallback
   * 当 count 变化时，函数会重新创建
   */
  const handleShowCount = useCallback(() => {
    alert(`当前计数: ${count}`)
  }, [count]) // count 是依赖项
  
  // ==================== 删除列表项（带参数） ====================
  /**
   * 删除函数需要访问 setItems
   * 使用函数式更新，不需要将 items 加入依赖
   */
  const handleDelete = useCallback((id) => {
    console.log('删除项目, id:', id)
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }, []) // 不依赖 items，因为使用了函数式更新
  
  // ==================== 添加项目 ====================
  const handleAdd = useCallback(() => {
    if (!text.trim()) return
    setItems(prevItems => [
      ...prevItems,
      { id: Date.now(), text: text.trim() }
    ])
    setText('')
  }, [text]) // 依赖 text
  
  // 触发父组件渲染但不影响子组件
  const handleUpdateCount = () => {
    setCount(c => c + 1)
  }
  
  return (
    <div className="demo-card">
      <h3>useCallback Hook 演示</h3>
      
      {/* 概念说明 */}
      <div className="demo-area">
        <h4>概念说明</h4>
        <div className="description">
          <p><code>useCallback(fn, deps)</code> 返回一个 memoized 函数</p>
          <p>只有当依赖项变化时，才会返回新的函数引用</p>
          <p>配合 <code>React.memo</code> 使用，可以避免子组件不必要的重新渲染</p>
        </div>
      </div>
      
      {/* 对比演示 */}
      <div className="demo-area">
        <h4>1. useCallback vs 普通函数 对比</h4>
        <div className="description">
          <p>点击 "更新计数" 按钮，观察两个子组件的渲染情况</p>
        </div>
        
        <div className="component-box parent">
          <span className="component-label parent">父组件</span>
          <div className="result" style={{ marginBottom: '16px' }}>
            <div className="result-label">父组件渲染计数</div>
            <div className="result-value">{count}</div>
          </div>
          <button onClick={handleUpdateCount}>更新计数（触发父组件渲染）</button>
          
          <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap' }}>
            <ChildButton 
              onClick={handleClickWithoutCallback} 
              label="没有 useCallback"
              renderCount={renderCounts.withoutCallback}
            />
            <ChildButton 
              onClick={handleClickWithCallback} 
              label="使用 useCallback"
              renderCount={renderCounts.withCallback}
            />
          </div>
        </div>
        
        <div className="info-box tip">
          <strong>💡 观察控制台：</strong>
          每次点击 "更新计数"，没有使用 useCallback 的子组件会重新渲染，
          而使用了 useCallback 的子组件不会重新渲染。
        </div>
      </div>
      
      {/* 带依赖的 useCallback */}
      <div className="demo-area">
        <h4>2. 带依赖项的 useCallback</h4>
        <div className="description">
          <p>当 useCallback 的依赖变化时，函数会重新创建</p>
          <code>{`useCallback(() => alert(count), [count])`}</code>
        </div>
        <div className="button-group">
          <button onClick={() => setCount(c => c + 1)}>增加计数</button>
          <button onClick={handleShowCount}>显示当前计数</button>
        </div>
        <div className="info-box warning">
          <strong>⚠️ 注意：</strong>
          确保依赖数组包含函数中使用的所有外部变量，否则可能出现闭包陷阱。
        </div>
      </div>
      
      {/* 列表操作演示 */}
      <div className="demo-area">
        <h4>3. 列表操作（传递带参数的回调）</h4>
        <div className="description">
          <p>删除函数使用函数式更新，无需将 items 加入依赖</p>
          <code>{`const handleDelete = useCallback((id) => { setItems(prev => prev.filter(...)) }, [])`}</code>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入项目名称"
            style={{ flex: 1 }}
          />
          <button onClick={handleAdd} className="btn-success">添加</button>
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => (
            <ListItem 
              key={item.id} 
              item={item} 
              onDelete={handleDelete}
            />
          ))}
        </ul>
        
        <div className="info-box success">
          <strong>✅ 最佳实践：</strong>
          使用函数式更新 <code>setState(prev =&gt; ...)</code> 可以减少 useCallback 的依赖项，
          使函数更稳定。
        </div>
      </div>
      
      {/* 使用建议 */}
      <div className="demo-area">
        <h4>4. 何时使用 useCallback</h4>
        <div className="info-box tip">
          <p><strong>✅ 推荐使用的场景：</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>函数作为 props 传递给 React.memo 优化的子组件</li>
            <li>函数作为其他 Hook（如 useEffect）的依赖项</li>
            <li>函数被频繁传递且创建成本较高</li>
          </ul>
        </div>
        <div className="info-box warning">
          <p><strong>⚠️ 不需要使用的场景：</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>函数只在当前组件内使用，不传递给子组件</li>
            <li>子组件没有使用 React.memo 优化</li>
            <li>简单的事件处理函数（过度优化可能适得其反）</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UseCallbackDemo

