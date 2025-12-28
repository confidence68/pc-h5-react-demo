/**
 * Todos Slice - 待办事项状态管理
 * 
 * 演示更复杂的状态管理场景
 * 包含：数组操作、条件筛选、派生状态等
 */

import { createSlice, createSelector } from '@reduxjs/toolkit'

/**
 * 初始状态
 */
const initialState = {
  items: [
    { id: 1, text: '学习 React 基础', completed: true },
    { id: 2, text: '学习 React Hooks', completed: true },
    { id: 3, text: '学习 Redux', completed: false },
    { id: 4, text: '学习 React Router', completed: false }
  ],
  filter: 'all' // 'all' | 'active' | 'completed'
}

/**
 * 创建 Todos Slice
 */
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * 添加待办
     */
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      })
    },
    
    /**
     * 切换完成状态
     */
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    
    /**
     * 删除待办
     */
    removeTodo: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload)
      if (index !== -1) {
        state.items.splice(index, 1)
      }
    },
    
    /**
     * 编辑待办
     */
    editTodo: (state, action) => {
      const { id, text } = action.payload
      const todo = state.items.find(item => item.id === id)
      if (todo) {
        todo.text = text
      }
    },
    
    /**
     * 设置筛选条件
     */
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    
    /**
     * 全部标记为完成
     */
    markAllCompleted: (state) => {
      state.items.forEach(item => {
        item.completed = true
      })
    },
    
    /**
     * 清除已完成
     */
    clearCompleted: (state) => {
      state.items = state.items.filter(item => !item.completed)
    },
    
    /**
     * 重置
     */
    resetTodos: () => initialState
  }
})

// 导出 actions
export const {
  addTodo,
  toggleTodo,
  removeTodo,
  editTodo,
  setFilter,
  markAllCompleted,
  clearCompleted,
  resetTodos
} = todosSlice.actions

// ==================== Selectors ====================

/**
 * 基础 Selector
 */
export const selectTodos = (state) => state.todos.items
export const selectFilter = (state) => state.todos.filter

/**
 * 使用 createSelector 创建 Memoized Selector
 * 只有当依赖的数据变化时才重新计算
 */
export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }
)

/**
 * 统计数据 Selector
 */
export const selectTodoStats = createSelector(
  [selectTodos],
  (todos) => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  })
)

export default todosSlice.reducer

