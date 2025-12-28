/**
 * 应用根组件
 * 
 * 包含：
 * 1. 侧边栏导航
 * 2. 主内容区
 * 3. 路由配置
 */

import { NavLink, useLocation } from 'react-router-dom'
import AppRoutes, { routeConfig } from './router/index.jsx'

/**
 * 侧边栏组件
 */
function Sidebar() {
  const location = useLocation()
  
  return (
    <aside className="sidebar">
      <h2>React 学习</h2>
      
      <nav>
        <ul>
          {routeConfig.map((route) => (
            <li key={route.path}>
              <NavLink 
                to={route.path}
                className={({ isActive }) => isActive ? 'active' : ''}
                end={route.path === '/'}
              >
                <span style={{ marginRight: '8px' }}>{route.icon}</span>
                {route.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={{ 
        marginTop: 'auto', 
        padding: '16px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <p>版本: 1.0.0</p>
        <p style={{ marginTop: '4px' }}>
          React: {/* React.version */}18.x
        </p>
        <p style={{ marginTop: '8px' }}>
          <a 
            href="https://react.dev" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            📚 React 文档
          </a>
        </p>
      </div>
    </aside>
  )
}

/**
 * 主应用组件
 */
function App() {
  return (
    <div className="app-container">
      {/* 侧边栏 */}
      <Sidebar />
      
      {/* 主内容区 */}
      <main className="main-content">
        <AppRoutes />
      </main>
    </div>
  )
}

export default App

