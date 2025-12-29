/**
 * 首页 - Next.js App Router 入口
 * 
 * 【page.jsx 的作用】
 * 1. 这是路由的页面组件，对应 URL 路径 /
 * 2. 在 App Router 中，每个路由目录都需要一个 page.jsx
 * 3. 默认是服务端组件（Server Component）
 * 
 * 【Next.js 13+ App Router vs Pages Router】
 * - App Router: app/page.jsx → /
 * - Pages Router: pages/index.jsx → /（旧版）
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">👋 欢迎来到 Next.js 教学项目</h1>
        <p className="page-header__subtitle">
          系统学习 Next.js App Router 的核心概念和最佳实践
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 简介卡片 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🚀</span>
              什么是 Next.js？
            </h2>
          </div>
          <div className="card__content">
            <p>
              Next.js 是一个基于 React 的全栈框架，由 Vercel 开发维护。
              它提供了开箱即用的服务端渲染（SSR）、静态站点生成（SSG）、
              API 路由等功能，让你可以快速构建高性能的 Web 应用。
            </p>
            
            <div className="tip-box tip-box--info" style={{ marginTop: '16px' }}>
              💡 <strong>提示：</strong>本项目使用 Next.js 14 和 App Router，
              这是 Next.js 推荐的现代路由方案。
            </div>
          </div>
        </div>
        
        {/* Next.js vs 手搓 SSR 对比 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">⚖️</span>
              Next.js vs 手搓 SSR
            </h2>
            <p className="card__subtitle">对比之前手动实现的 SSR 项目</p>
          </div>
          <div className="card__content">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>特性</th>
                  <th>手搓 SSR</th>
                  <th>Next.js</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>服务端渲染</td>
                  <td>手动调用 renderToString</td>
                  <td>自动处理，开箱即用</td>
                </tr>
                <tr>
                  <td>客户端水合</td>
                  <td>手动调用 hydrateRoot</td>
                  <td>自动处理</td>
                </tr>
                <tr>
                  <td>路由系统</td>
                  <td>需要配置 React Router</td>
                  <td>基于文件系统的路由</td>
                </tr>
                <tr>
                  <td>代码分割</td>
                  <td>需要手动配置 Webpack</td>
                  <td>自动优化</td>
                </tr>
                <tr>
                  <td>构建配置</td>
                  <td>需要配置两套 Webpack</td>
                  <td>零配置</td>
                </tr>
                <tr>
                  <td>数据预取</td>
                  <td>需要手动实现</td>
                  <td>内置 getServerSideProps 等</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 核心特性 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">✨</span>
              Next.js 核心特性
            </h2>
          </div>
          <div className="card__content">
            <div className="grid grid--2">
              <div className="feature-list__item">
                <span className="feature-list__icon">📁</span>
                <div>
                  <strong>基于文件的路由</strong>
                  <br />
                  创建文件即创建路由，无需配置
                </div>
              </div>
              
              <div className="feature-list__item">
                <span className="feature-list__icon">⚙️</span>
                <div>
                  <strong>Server Components</strong>
                  <br />
                  组件默认在服务端渲染，减少客户端 JS
                </div>
              </div>
              
              <div className="feature-list__item">
                <span className="feature-list__icon">📡</span>
                <div>
                  <strong>多种数据获取方式</strong>
                  <br />
                  SSR、SSG、ISR 灵活选择
                </div>
              </div>
              
              <div className="feature-list__item">
                <span className="feature-list__icon">🔌</span>
                <div>
                  <strong>API Routes</strong>
                  <br />
                  内置 API 路由，无需单独后端
                </div>
              </div>
              
              <div className="feature-list__item">
                <span className="feature-list__icon">🖼️</span>
                <div>
                  <strong>图片优化</strong>
                  <br />
                  自动优化图片，支持懒加载
                </div>
              </div>
              
              <div className="feature-list__item">
                <span className="feature-list__icon">⚡</span>
                <div>
                  <strong>自动代码分割</strong>
                  <br />
                  按页面自动分割，优化加载性能
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 学习路径 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🎯</span>
              本项目学习路径
            </h2>
          </div>
          <div className="card__content">
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">1️⃣</span>
                <div>
                  <strong>Next.js 简介</strong> - 了解框架基本概念
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">2️⃣</span>
                <div>
                  <strong>路由系统</strong> - 基础路由、动态路由、嵌套路由
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">3️⃣</span>
                <div>
                  <strong>数据获取</strong> - 服务端获取 vs 客户端获取
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">4️⃣</span>
                <div>
                  <strong>组件类型</strong> - Server Components vs Client Components
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">5️⃣</span>
                <div>
                  <strong>API Routes</strong> - 构建后端 API
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">6️⃣</span>
                <div>
                  <strong>对比学习</strong> - Next.js vs 手搓 SSR
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <Link href="/introduction" className="btn btn--primary">
                开始学习 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

