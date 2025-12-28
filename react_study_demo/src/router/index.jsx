/**
 * React Router 路由配置
 * 
 * React Router v6 的主要特点：
 * 1. 使用 Routes 替代 Switch
 * 2. element 属性替代 component/render
 * 3. 相对路由路径
 * 4. 移除了 exact 属性（默认精确匹配）
 * 5. 支持嵌套路由
 * 
 * 主要组件：
 * - BrowserRouter: 使用 HTML5 History API 的路由器
 * - Routes: 路由容器
 * - Route: 单个路由配置
 * - Link/NavLink: 导航链接
 * - Outlet: 嵌套路由的出口
 * - Navigate: 重定向组件
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// ==================== 页面组件导入 ====================
// 使用 React.lazy 实现路由懒加载
const Home = lazy(() => import('../pages/Home.jsx'))
const HooksPage = lazy(() => import('../pages/HooksPage.jsx'))
const RefPage = lazy(() => import('../pages/RefPage.jsx'))
const CommunicationPage = lazy(() => import('../pages/CommunicationPage.jsx'))
const StorePage = lazy(() => import('../pages/StorePage.jsx'))
const RouterPage = lazy(() => import('../pages/RouterPage.jsx'))
const ApiPage = lazy(() => import('../pages/ApiPage.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))

/**
 * 加载中组件
 */
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      color: 'var(--text-muted)'
    }}>
      <p>加载中...</p>
    </div>
  )
}

/**
 * 路由配置组件
 */
function AppRoutes() {
  return (
    // Suspense 用于处理懒加载组件的加载状态
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* 首页 */}
        <Route path="/" element={<Home />} />
        
        {/* Hooks 演示页面 */}
        <Route path="/hooks" element={<HooksPage />} />
        
        {/* Ref 演示页面 */}
        <Route path="/ref" element={<RefPage />} />
        
        {/* 组件通信演示页面 */}
        <Route path="/communication" element={<CommunicationPage />} />
        
        {/* Store 状态管理演示页面 */}
        <Route path="/store" element={<StorePage />} />
        
        {/* 路由演示页面（嵌套路由） */}
        <Route path="/router/*" element={<RouterPage />} />
        
        {/* API 请求封装演示页面 */}
        <Route path="/api" element={<ApiPage />} />
        
        {/* 重定向示例 */}
        <Route path="/old-hooks" element={<Navigate to="/hooks" replace />} />
        
        {/* 404 页面 - 放在最后，匹配所有未定义的路由 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes

/**
 * 路由配置数据
 * 用于生成导航菜单
 */
export const routeConfig = [
  {
    path: '/',
    label: '首页',
    icon: '🏠'
  },
  {
    path: '/hooks',
    label: 'React Hooks',
    icon: '🪝'
  },
  {
    path: '/ref',
    label: 'Ref 用法',
    icon: '🔗'
  },
  {
    path: '/communication',
    label: '组件通信',
    icon: '💬'
  },
  {
    path: '/store',
    label: '状态管理',
    icon: '📦'
  },
  {
    path: '/router',
    label: '路由演示',
    icon: '🛤️'
  },
  {
    path: '/api',
    label: 'API 请求',
    icon: '🌐'
  }
]

