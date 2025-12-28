/**
 * useState Hook 演示组件
 * 
 * useState 是 React 中最基础、最常用的 Hook
 * 用于在函数组件中添加状态管理能力
 * 
 * 语法：const [state, setState] = useState(initialValue)
 * - state: 当前状态值
 * - setState: 更新状态的函数
 * - initialValue: 状态的初始值
 */

import { useState } from 'react'

/**
 * useState 演示组件
 * 展示 useState 的各种用法
 */
function UseStateDemo() {
  // ==================== 基础用法 ====================
  /**
   * 示例1：简单计数器
   * useState 可以接收任何类型的初始值
   */
  const [count, setCount] = useState(0)
  
  // ==================== 对象状态 ====================
  /**
   * 示例2：对象类型状态
   * 注意：更新对象状态时需要创建新对象（不可变性原则）
   */
  const [user, setUser] = useState({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com'
  })
  
  // ==================== 数组状态 ====================
  /**
   * 示例3：数组类型状态
   * 常用于列表数据的管理
   */
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React', done: false },
    { id: 2, text: '学习 Hooks', done: false }
  ])
  const [newTodo, setNewTodo] = useState('')
  
  // ==================== 惰性初始化 ====================
  /**
   * 示例4：惰性初始化
   * 当初始值需要复杂计算时，可以传入函数
   * 该函数只在组件首次渲染时执行一次
   */
  const [expensiveValue] = useState(() => {
    console.log('惰性初始化：这个计算只执行一次')
    // 模拟复杂计算
    return Array.from({ length: 10 }, (_, i) => i * i)
  })
  
  // ==================== 函数式更新 ====================
  /**
   * 处理计数器增加
   * 使用函数式更新确保基于最新状态进行更新
   */
  const handleIncrement = () => {
    // 方式1：直接设置新值（可能有问题，在快速点击时）
    // setCount(count + 1)
    
    // 方式2：函数式更新（推荐）
    // 参数 prevCount 是最新的状态值
    setCount(prevCount => prevCount + 1)
  }
  
  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1)
  }
  
  // 批量增加演示
  const handleBatchIncrement = () => {
    // 错误示例：这样只会增加1，因为多次 setCount 都基于同一个 count 值
    // setCount(count + 1)
    // setCount(count + 1)
    // setCount(count + 1)
    
    // 正确示例：使用函数式更新，每次都基于最新状态
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
  }
  
  // ==================== 更新对象状态 ====================
  /**
   * 更新对象状态
   * 必须创建新对象，否则 React 不会检测到变化
   */
  const updateUserName = (newName) => {
    // 错误示例：直接修改（不会触发重新渲染）
    // user.name = newName
    // setUser(user)
    
    // 正确示例：创建新对象
    setUser(prevUser => ({
      ...prevUser,  // 展开旧对象的所有属性
      name: newName // 覆盖需要更新的属性
    }))
  }
  
  const updateUserAge = (newAge) => {
    setUser(prevUser => ({
      ...prevUser,
      age: parseInt(newAge) || 0
    }))
  }
  
  // ==================== 更新数组状态 ====================
  /**
   * 添加待办事项
   */
  const addTodo = () => {
    if (!newTodo.trim()) return
    
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        text: newTodo.trim(),
        done: false
      }
    ])
    setNewTodo('')
  }
  
  /**
   * 切换待办事项完成状态
   */
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    )
  }
  
  /**
   * 删除待办事项
   */
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }
  
  return (
    <div className="demo-card">
      <h3>useState Hook 演示</h3>
      
      {/* 基础计数器演示 */}
      <div className="demo-area">
        <h4>1. 基础用法 - 计数器</h4>
        <div className="description">
          <p>useState 返回一个数组：[当前值, 更新函数]</p>
          <code>const [count, setCount] = useState(0)</code>
        </div>
        <div className="result">
          <div className="result-label">当前计数</div>
          <div className="result-value">{count}</div>
        </div>
        <div className="button-group">
          <button onClick={handleDecrement}>减 1</button>
          <button onClick={handleIncrement}>加 1</button>
          <button onClick={handleBatchIncrement}>批量加 3</button>
          <button onClick={() => setCount(0)} className="btn-secondary">重置</button>
        </div>
        <div className="info-box tip">
          <strong>💡 提示：</strong>使用函数式更新 <code>setCount(prev =&gt; prev + 1)</code> 
          可以确保基于最新状态进行更新，避免闭包陷阱。
        </div>
      </div>
      
      {/* 对象状态演示 */}
      <div className="demo-area">
        <h4>2. 对象状态管理</h4>
        <div className="description">
          <p>更新对象时必须创建新对象，保持不可变性</p>
          <code>{`setUser(prev => ({ ...prev, name: newName }))`}</code>
        </div>
        <div className="result">
          <p><strong>姓名：</strong>{user.name}</p>
          <p><strong>年龄：</strong>{user.age}</p>
          <p><strong>邮箱：</strong>{user.email}</p>
        </div>
        <div className="button-group">
          <input 
            type="text" 
            placeholder="输入新姓名"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateUserName(e.target.value)
              }
            }}
          />
          <input 
            type="number" 
            placeholder="输入新年龄"
            onChange={(e) => updateUserAge(e.target.value)}
            style={{ width: '120px' }}
          />
        </div>
        <div className="info-box warning">
          <strong>⚠️ 注意：</strong>直接修改对象属性 <code>user.name = 'xxx'</code> 
          不会触发重新渲染，必须使用展开运算符创建新对象。
        </div>
      </div>
      
      {/* 数组状态演示 */}
      <div className="demo-area">
        <h4>3. 数组状态管理 - Todo List</h4>
        <div className="description">
          <p>数组更新同样需要创建新数组</p>
          <p>添加：<code>[...prev, newItem]</code></p>
          <p>删除：<code>prev.filter(item =&gt; item.id !== id)</code></p>
          <p>修改：<code>prev.map(item =&gt; item.id === id ? newItem : item)</code></p>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input 
            type="text" 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="输入待办事项"
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            style={{ flex: 1 }}
          />
          <button onClick={addTodo} className="btn-success">添加</button>
        </div>
        <ul className="item-list">
          {todos.map(todo => (
            <li key={todo.id} style={{ 
              textDecoration: todo.done ? 'line-through' : 'none',
              opacity: todo.done ? 0.6 : 1
            }}>
              <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>
                {todo.done ? '✅' : '⬜'} {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="btn-danger"
                style={{ padding: '4px 8px', fontSize: '12px' }}
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* 惰性初始化演示 */}
      <div className="demo-area">
        <h4>4. 惰性初始化</h4>
        <div className="description">
          <p>传入函数作为初始值，只在首次渲染时执行</p>
          <code>{`useState(() => computeExpensiveValue())`}</code>
        </div>
        <div className="result">
          <p><strong>计算结果：</strong>{expensiveValue.join(', ')}</p>
        </div>
        <div className="info-box success">
          <strong>✅ 最佳实践：</strong>当初始值需要复杂计算时，使用惰性初始化可以避免每次渲染都执行计算。
        </div>
      </div>
    </div>
  )
}

export default UseStateDemo

