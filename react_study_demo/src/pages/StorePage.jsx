/**
 * 状态管理演示页面
 * 展示 Redux Toolkit 的使用
 */

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Counter slice
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  setValue,
  setStep,
  reset,
  clearHistory,
  selectCount,
  selectStep,
  selectHistory
} from '../store/counterSlice.js'

// Todos slice
import {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
  markAllCompleted,
  clearCompleted,
  resetTodos,
  selectFilteredTodos,
  selectFilter,
  selectTodoStats
} from '../store/todosSlice.js'

// User slice
import {
  fetchUser,
  updateUser,
  clearUser,
  selectUser,
  selectUserLoading,
  selectUserError
} from '../store/userSlice.js'

// ==================== Counter 演示组件 ====================
function CounterDemo() {
  const count = useSelector(selectCount)
  const step = useSelector(selectStep)
  const history = useSelector(selectHistory)
  const dispatch = useDispatch()
  
  const [customAmount, setCustomAmount] = useState(10)
  const [customValue, setCustomValue] = useState(0)
  
  return (
    <div className="demo-card">
      <h3>1. 计数器（基础 Redux 操作）</h3>
      
      <div className="demo-area">
        <div className="description">
          <p>展示基本的 Redux 操作：dispatch action、select state</p>
        </div>
        
        <div className="code-block">
{`// 使用 useSelector 获取状态
const count = useSelector(state => state.counter.value)

// 使用 useDispatch 派发 action
const dispatch = useDispatch()
dispatch(increment())`}
        </div>
        
        <div className="result">
          <div className="result-label">当前计数</div>
          <div className="result-value">{count}</div>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <label>
            步长: 
            <input 
              type="number"
              value={step}
              onChange={(e) => dispatch(setStep(parseInt(e.target.value) || 1))}
              style={{ width: '60px', marginLeft: '8px' }}
            />
          </label>
        </div>
        
        <div className="button-group" style={{ marginTop: '16px' }}>
          <button onClick={() => dispatch(decrement())}>- {step}</button>
          <button onClick={() => dispatch(increment())}>+ {step}</button>
          <button onClick={() => dispatch(reset())} className="btn-secondary">重置</button>
        </div>
        
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input 
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(parseInt(e.target.value) || 0)}
              style={{ width: '80px' }}
            />
            <button onClick={() => dispatch(incrementByAmount(customAmount))}>
              增加 {customAmount}
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input 
              type="number"
              value={customValue}
              onChange={(e) => setCustomValue(parseInt(e.target.value) || 0)}
              style={{ width: '80px' }}
            />
            <button onClick={() => dispatch(setValue(customValue))}>
              设为 {customValue}
            </button>
          </div>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              操作历史 ({history.length})
            </p>
            <button 
              onClick={() => dispatch(clearHistory())} 
              className="btn-secondary"
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              清空
            </button>
          </div>
          <div style={{ 
            maxHeight: '100px', 
            overflow: 'auto',
            backgroundColor: 'var(--bg-light)',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px',
            marginTop: '8px'
          }}>
            {history.length === 0 ? (
              <p>暂无操作</p>
            ) : (
              history.map((item, index) => (
                <p key={index}>
                  {item.action} → {item.value}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== Todos 演示组件 ====================
function TodosDemo() {
  const filteredTodos = useSelector(selectFilteredTodos)
  const filter = useSelector(selectFilter)
  const stats = useSelector(selectTodoStats)
  const dispatch = useDispatch()
  
  const [newTodo, setNewTodo] = useState('')
  
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()))
      setNewTodo('')
    }
  }
  
  return (
    <div className="demo-card">
      <h3>2. Todo List（数组操作和 Selectors）</h3>
      
      <div className="demo-area">
        <div className="description">
          <p>展示复杂状态操作和 createSelector 的使用</p>
        </div>
        
        <div className="code-block">
{`// 使用 createSelector 创建 memoized selector
const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    // 只有 todos 或 filter 变化时才重新计算
    return todos.filter(...)
  }
)`}
        </div>
        
        {/* 添加待办 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input 
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="添加新待办..."
            style={{ flex: 1 }}
          />
          <button onClick={handleAddTodo} className="btn-success">添加</button>
        </div>
        
        {/* 筛选按钮 */}
        <div className="button-group" style={{ marginBottom: '16px' }}>
          {['all', 'active', 'completed'].map((f) => (
            <button 
              key={f}
              onClick={() => dispatch(setFilter(f))}
              className={filter === f ? '' : 'btn-secondary'}
            >
              {f === 'all' ? '全部' : f === 'active' ? '进行中' : '已完成'}
            </button>
          ))}
        </div>
        
        {/* 统计信息 */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '16px',
          fontSize: '14px',
          color: 'var(--text-muted)'
        }}>
          <span>总计: {stats.total}</span>
          <span>进行中: {stats.active}</span>
          <span>已完成: {stats.completed}</span>
        </div>
        
        {/* 待办列表 */}
        <ul className="item-list">
          {filteredTodos.map(todo => (
            <li key={todo.id} style={{ 
              opacity: todo.completed ? 0.6 : 1
            }}>
              <span 
                onClick={() => dispatch(toggleTodo(todo.id))}
                style={{ 
                  cursor: 'pointer',
                  textDecoration: todo.completed ? 'line-through' : 'none'
                }}
              >
                {todo.completed ? '✅' : '⬜'} {todo.text}
              </span>
              <button 
                onClick={() => dispatch(removeTodo(todo.id))}
                className="btn-danger"
                style={{ padding: '4px 8px', fontSize: '12px' }}
              >
                删除
              </button>
            </li>
          ))}
        </ul>
        
        {/* 批量操作 */}
        <div className="button-group" style={{ marginTop: '16px' }}>
          <button onClick={() => dispatch(markAllCompleted())}>全部完成</button>
          <button onClick={() => dispatch(clearCompleted())} className="btn-secondary">
            清除已完成
          </button>
          <button onClick={() => dispatch(resetTodos())} className="btn-danger">
            重置
          </button>
        </div>
      </div>
    </div>
  )
}

// ==================== User 演示组件（异步操作） ====================
function UserDemo() {
  const user = useSelector(selectUser)
  const loading = useSelector(selectUserLoading)
  const error = useSelector(selectUserError)
  const dispatch = useDispatch()
  
  const [userId, setUserId] = useState(1)
  const [editName, setEditName] = useState('')
  
  return (
    <div className="demo-card">
      <h3>3. 用户信息（异步操作 - createAsyncThunk）</h3>
      
      <div className="demo-area">
        <div className="description">
          <p>展示异步操作：createAsyncThunk 自动处理 pending/fulfilled/rejected 状态</p>
        </div>
        
        <div className="code-block">
{`// 创建异步 thunk
const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, { rejectWithValue }) => {
    const response = await api.getUser(userId)
    return response.data
  }
)

// 在 slice 中处理不同状态
extraReducers: (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.error = action.payload
    })
}`}
        </div>
        
        {/* 获取用户 */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
          <label>
            用户 ID:
            <input 
              type="number"
              value={userId}
              onChange={(e) => setUserId(parseInt(e.target.value) || 0)}
              style={{ width: '60px', marginLeft: '8px' }}
            />
          </label>
          <button 
            onClick={() => dispatch(fetchUser(userId))}
            disabled={loading}
          >
            {loading ? '加载中...' : '获取用户'}
          </button>
          <button 
            onClick={() => dispatch(clearUser())}
            className="btn-secondary"
          >
            清除
          </button>
        </div>
        
        {/* 错误提示 */}
        {error && (
          <div className="info-box warning" style={{ marginBottom: '16px' }}>
            <strong>❌ 错误：</strong>{error}
          </div>
        )}
        
        {/* 用户信息 */}
        {user && (
          <div className="result">
            <h4 style={{ marginBottom: '12px' }}>用户信息</h4>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>姓名:</strong> {user.name}</p>
            <p><strong>邮箱:</strong> {user.email}</p>
            <p><strong>角色:</strong> {user.role}</p>
            <p><strong>创建时间:</strong> {new Date(user.createdAt).toLocaleString()}</p>
            {user.updatedAt && (
              <p><strong>更新时间:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
            )}
            
            {/* 更新用户 */}
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <input 
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="新姓名"
              />
              <button 
                onClick={() => {
                  if (editName.trim()) {
                    dispatch(updateUser({ name: editName.trim() }))
                    setEditName('')
                  }
                }}
                disabled={loading}
              >
                更新姓名
              </button>
            </div>
          </div>
        )}
        
        <div className="info-box tip" style={{ marginTop: '16px' }}>
          <strong>💡 提示：</strong>
          尝试输入 ID 为 0 触发错误，观察错误处理流程。
        </div>
      </div>
    </div>
  )
}

// ==================== 主页面 ====================
function StorePage() {
  return (
    <div>
      <h1 className="page-title">状态管理演示（Redux Toolkit）</h1>
      
      {/* 概述 */}
      <div className="demo-card">
        <h3>📖 Redux Toolkit 概述</h3>
        <p>
          Redux Toolkit 是官方推荐的 Redux 写法，大大简化了 Redux 的使用。
        </p>
        
        <table className="data-table" style={{ marginTop: '16px' }}>
          <thead>
            <tr>
              <th>API</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>configureStore</code></td>
              <td>简化 store 配置，自动添加中间件和 DevTools</td>
            </tr>
            <tr>
              <td><code>createSlice</code></td>
              <td>自动生成 action creators 和 action types</td>
            </tr>
            <tr>
              <td><code>createAsyncThunk</code></td>
              <td>处理异步逻辑，自动管理 pending/fulfilled/rejected</td>
            </tr>
            <tr>
              <td><code>createSelector</code></td>
              <td>创建 memoized selector，避免重复计算</td>
            </tr>
          </tbody>
        </table>
        
        <div className="info-box success" style={{ marginTop: '16px' }}>
          <strong>✅ Redux Toolkit 优势：</strong>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>代码量减少 50%+</li>
            <li>内置 Immer，可以直接"修改"状态</li>
            <li>TypeScript 友好</li>
            <li>自动配置 Redux DevTools</li>
          </ul>
        </div>
      </div>
      
      <CounterDemo />
      <TodosDemo />
      <UserDemo />
    </div>
  )
}

export default StorePage

