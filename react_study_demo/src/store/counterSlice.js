/**
 * Counter Slice - 计数器状态管理
 * 
 * Slice 是 Redux Toolkit 的核心概念
 * 包含了 reducer 和 action creators
 * 
 * createSlice 自动生成：
 * - Action types
 * - Action creators
 * - Reducer
 */

import { createSlice } from '@reduxjs/toolkit'

/**
 * 初始状态
 */
const initialState = {
  value: 0,
  // 记录操作历史
  history: [],
  // 步长
  step: 1
}

/**
 * 创建 Counter Slice
 */
const counterSlice = createSlice({
  // Slice 名称，用于生成 action type
  // 如：counter/increment
  name: 'counter',
  
  // 初始状态
  initialState,
  
  // Reducers 定义
  // Redux Toolkit 使用 Immer，可以直接"修改"状态
  reducers: {
    /**
     * 增加计数
     * 使用 Immer，可以直接修改 state
     */
    increment: (state) => {
      state.value += state.step
      state.history.push({
        action: 'increment',
        value: state.value,
        timestamp: Date.now()
      })
    },
    
    /**
     * 减少计数
     */
    decrement: (state) => {
      state.value -= state.step
      state.history.push({
        action: 'decrement',
        value: state.value,
        timestamp: Date.now()
      })
    },
    
    /**
     * 增加指定数值
     * action.payload 包含传入的参数
     */
    incrementByAmount: (state, action) => {
      state.value += action.payload
      state.history.push({
        action: `incrementByAmount(${action.payload})`,
        value: state.value,
        timestamp: Date.now()
      })
    },
    
    /**
     * 设置具体值
     */
    setValue: (state, action) => {
      state.value = action.payload
      state.history.push({
        action: `setValue(${action.payload})`,
        value: state.value,
        timestamp: Date.now()
      })
    },
    
    /**
     * 设置步长
     */
    setStep: (state, action) => {
      state.step = action.payload
    },
    
    /**
     * 重置
     */
    reset: (state) => {
      state.value = 0
      state.history = []
      state.step = 1
    },
    
    /**
     * 清空历史
     */
    clearHistory: (state) => {
      state.history = []
    }
  }
})

// 导出 action creators
// createSlice 自动生成的
export const { 
  increment, 
  decrement, 
  incrementByAmount, 
  setValue, 
  setStep,
  reset,
  clearHistory
} = counterSlice.actions

// 导出 Selector（用于从 state 中选择数据）
export const selectCount = (state) => state.counter.value
export const selectStep = (state) => state.counter.step
export const selectHistory = (state) => state.counter.history

// 导出 reducer
export default counterSlice.reducer

