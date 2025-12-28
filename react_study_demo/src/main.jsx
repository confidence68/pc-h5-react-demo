/**
 * React 应用入口文件
 * 
 * 这是整个应用的起点，负责：
 * 1. 导入 React 和 ReactDOM
 * 2. 导入根组件 App
 * 3. 导入全局样式
 * 4. 将 React 应用挂载到 DOM 上
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import App from './App.jsx'
import './index.css'

/**
 * React 18 的新渲染 API
 * 
 * createRoot 是 React 18 引入的新 API，替代了之前的 ReactDOM.render
 * 它启用了 React 18 的新特性，如：
 * - 自动批处理 (Automatic Batching)
 * - 并发特性 (Concurrent Features)
 * - Suspense 改进
 */
const root = ReactDOM.createRoot(document.getElementById('root'))

/**
 * 渲染应用
 * 
 * 应用被多层 Provider 包裹：
 * 1. React.StrictMode - 开发模式下的严格检查
 * 2. Provider - Redux 状态管理的提供者
 * 3. BrowserRouter - React Router 的路由提供者
 */
root.render(
  // StrictMode 会在开发模式下进行额外检查：
  // - 检测不安全的生命周期方法
  // - 检测过时的 API 使用
  // - 检测意外的副作用（会双重调用某些函数）
  <React.StrictMode>
    {/* Provider 使 Redux store 对整个应用可用 */}
    <Provider store={store}>
      {/* BrowserRouter 提供路由功能，使用 HTML5 History API */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)


