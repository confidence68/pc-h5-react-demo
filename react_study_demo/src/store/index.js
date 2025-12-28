/**
 * Redux Store 配置
 * 
 * 使用 Redux Toolkit 简化 Redux 的使用
 * 
 * Redux Toolkit 的优点：
 * 1. 简化 store 配置
 * 2. 内置 immer，可以直接"修改"状态
 * 3. 自动生成 action creators
 * 4. 内置 Redux Thunk 用于异步操作
 * 5. 开发者工具自动配置
 */

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice.js'
import todosReducer from './todosSlice.js'
import userReducer from './userSlice.js'

/**
 * 创建 Redux Store
 * 
 * configureStore 自动：
 * - 组合 reducers
 * - 添加 thunk 中间件
 * - 启用 Redux DevTools
 * - 添加开发环境检查中间件
 */
export const store = configureStore({
  // reducer 配置
  // 每个 key 对应状态树的一个分支
  reducer: {
    counter: counterReducer,  // state.counter
    todos: todosReducer,      // state.todos
    user: userReducer         // state.user
  },
  
  // 中间件配置（可选）
  // 默认包含 thunk 中间件
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 序列化检查配置
      serializableCheck: {
        // 忽略某些 action 类型的序列化检查
        ignoredActions: ['user/fetchUser/fulfilled']
      }
    }),
  
  // 开发者工具配置
  devTools: process.env.NODE_ENV !== 'production'
})

// 导出 RootState 类型（用于 TypeScript）
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

