/**
 * 首页组件
 * 展示项目概览和导航
 */

import { Link } from 'react-router-dom'

function Home() {
  const features = [
    {
      icon: '🪝',
      title: 'React Hooks',
      description: 'useState, useEffect, useCallback, useMemo, 自定义 Hook 等',
      path: '/hooks'
    },
    {
      icon: '🔗',
      title: 'Ref 用法',
      description: 'useRef, createRef, forwardRef, useImperativeHandle',
      path: '/ref'
    },
    {
      icon: '💬',
      title: '组件通信',
      description: '父子通信、兄弟通信、Hooks 与 Class 组件互操作',
      path: '/communication'
    },
    {
      icon: '📦',
      title: '状态管理',
      description: 'Redux Toolkit、createSlice、异步操作',
      path: '/store'
    },
    {
      icon: '🛤️',
      title: '路由演示',
      description: 'React Router v6、嵌套路由、路由参数',
      path: '/router'
    },
    {
      icon: '🌐',
      title: 'API 请求',
      description: '基于 Axios的请求封装方案，支持多种特性',
      path: '/api'
    }
  ]
  
  return (
    <div>
      <h1 className="page-title">React 学习 Demo</h1>
      
      <div className="demo-card">
        <h3>📚 项目介绍</h3>
        <p>
          这是一个用于学习 React 的演示项目，涵盖了 React 开发中的核心知识点。
          项目同时支持 Vite 和 Webpack 两种构建工具。
        </p>
        
        <div className="info-box tip" style={{ marginTop: '16px' }}>
          <strong>技术栈：</strong>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>React 18</li>
            <li>React Router v6</li>
            <li>Redux Toolkit</li>
            <li>Vite / Webpack</li>
          </ul>
        </div>
      </div>
      
      <div className="demo-card">
        <h3>🎯 知识点导航</h3>
        <p>点击下方卡片跳转到对应的演示页面</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          {features.map((feature) => (
            <Link 
              key={feature.path}
              to={feature.path}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                padding: '20px',
                backgroundColor: 'var(--bg-light)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-color)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                  {feature.icon}
                </div>
                <h4 style={{ 
                  color: 'var(--text-color)', 
                  marginBottom: '8px',
                  fontSize: '18px'
                }}>
                  {feature.title}
                </h4>
                <p style={{ 
                  color: 'var(--text-muted)', 
                  fontSize: '14px',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="demo-card">
        <h3>🚀 快速开始</h3>
        
        <div className="code-block">
{`# 安装依赖
npm install

# 使用 Vite 启动开发服务器（推荐）
npm run dev

# 使用 Webpack 启动开发服务器
npm run dev:webpack

# 使用 Vite 构建生产版本
npm run build

# 使用 Webpack 构建生产版本
npm run build:webpack`}
        </div>
      </div>
      
      <div className="demo-card">
        <h3>⚡ Vite vs Webpack</h3>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>特性</th>
              <th>Vite</th>
              <th>Webpack</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>开发启动速度</td>
              <td>⚡ 极快（毫秒级）</td>
              <td>较慢（需要打包）</td>
            </tr>
            <tr>
              <td>热更新速度</td>
              <td>⚡ 极快</td>
              <td>较慢</td>
            </tr>
            <tr>
              <td>配置复杂度</td>
              <td>简单</td>
              <td>复杂</td>
            </tr>
            <tr>
              <td>生态系统</td>
              <td>较新，快速发展</td>
              <td>成熟，插件丰富</td>
            </tr>
            <tr>
              <td>浏览器兼容性</td>
              <td>现代浏览器</td>
              <td>可配置</td>
            </tr>
            <tr>
              <td>生产构建</td>
              <td>Rollup</td>
              <td>Webpack</td>
            </tr>
          </tbody>
        </table>
        
        <div className="info-box tip" style={{ marginTop: '16px' }}>
          <strong>💡 建议：</strong>
          新项目推荐使用 Vite，开发体验更好。老项目或有特殊需求的项目可继续使用 Webpack。
        </div>
      </div>
    </div>
  )
}

export default Home

