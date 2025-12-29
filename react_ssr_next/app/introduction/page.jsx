/**
 * Next.js 简介页面
 * 
 * 【本页面教学内容】
 * 1. Next.js 是什么
 * 2. 为什么选择 Next.js
 * 3. App Router vs Pages Router
 * 4. 项目结构介绍
 */

import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Next.js 简介',
  description: '了解 Next.js 框架的基本概念和特点',
};

export default function IntroductionPage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">📖 Next.js 简介</h1>
        <p className="page-header__subtitle">
          了解 Next.js 框架的基本概念和核心特点
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 什么是 Next.js */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🤔</span>
              什么是 Next.js？
            </h2>
          </div>
          <div className="card__content">
            <p>
              Next.js 是一个基于 React 的<strong>全栈 Web 框架</strong>，
              由 Vercel（前身 Zeit）开发和维护。它提供了构建现代 Web 应用所需的所有功能，
              包括服务端渲染、静态站点生成、API 路由等。
            </p>
            
            <div className="tip-box tip-box--info" style={{ marginTop: '16px' }}>
              💡 <strong>关键点：</strong>Next.js 不只是 SSR 框架，它是一个完整的 React 应用框架，
              让你可以选择最适合每个页面的渲染方式。
            </div>
          </div>
        </div>
        
        {/* 核心概念 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🔑</span>
              核心概念
            </h2>
          </div>
          <div className="card__content">
            <div className="grid grid--2">
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--primary-color)' }}>SSR (Server-Side Rendering)</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  每次请求时在服务器端渲染页面，适合需要实时数据的页面。
                </p>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--primary-color)' }}>SSG (Static Site Generation)</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  构建时生成静态 HTML，适合内容不经常变化的页面。
                </p>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--primary-color)' }}>ISR (Incremental Static Regeneration)</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  静态页面 + 按需更新，结合 SSG 和 SSR 的优点。
                </p>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--primary-color)' }}>CSR (Client-Side Rendering)</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  在浏览器端渲染，适合高度交互的部分。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* App Router vs Pages Router */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🛤️</span>
              App Router vs Pages Router
            </h2>
            <p className="card__subtitle">Next.js 13+ 引入了全新的 App Router</p>
          </div>
          <div className="card__content">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>特性</th>
                  <th>Pages Router (旧)</th>
                  <th>App Router (新) ✅</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>目录结构</td>
                  <td>pages/</td>
                  <td>app/</td>
                </tr>
                <tr>
                  <td>页面文件</td>
                  <td>index.jsx, about.jsx</td>
                  <td>page.jsx</td>
                </tr>
                <tr>
                  <td>布局</td>
                  <td>_app.jsx（全局）</td>
                  <td>layout.jsx（可嵌套）</td>
                </tr>
                <tr>
                  <td>数据获取</td>
                  <td>getServerSideProps 等</td>
                  <td>直接 async/await</td>
                </tr>
                <tr>
                  <td>组件类型</td>
                  <td>默认客户端组件</td>
                  <td>默认服务端组件</td>
                </tr>
                <tr>
                  <td>流式渲染</td>
                  <td>不支持</td>
                  <td>支持 Suspense</td>
                </tr>
              </tbody>
            </table>
            
            <div className="tip-box tip-box--success" style={{ marginTop: '16px' }}>
              ✅ <strong>本项目使用 App Router</strong>，这是 Next.js 推荐的现代方案，
              提供更好的性能和开发体验。
            </div>
          </div>
        </div>
        
        {/* 项目结构 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📁</span>
              App Router 项目结构
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="项目结构">
{`my-nextjs-app/
├── app/                    # App Router 目录
│   ├── layout.jsx         # 根布局（必需）
│   ├── page.jsx           # 首页 → /
│   ├── globals.css        # 全局样式
│   │
│   ├── about/             # /about 路由
│   │   └── page.jsx
│   │
│   ├── blog/              # /blog 路由
│   │   ├── page.jsx       # /blog
│   │   └── [slug]/        # 动态路由
│   │       └── page.jsx   # /blog/:slug
│   │
│   └── api/               # API 路由
│       └── hello/
│           └── route.js   # /api/hello
│
├── components/            # 共享组件
├── public/                # 静态资源
├── next.config.js         # Next.js 配置
└── package.json`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>特殊文件说明</h4>
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">📄</span>
                <div>
                  <strong>page.jsx</strong> - 定义路由的页面内容，只有这个文件才会创建可访问的路由
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🎨</span>
                <div>
                  <strong>layout.jsx</strong> - 定义布局，可以嵌套，子路由共享父布局
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">⏳</span>
                <div>
                  <strong>loading.jsx</strong> - 定义加载状态 UI，配合 Suspense 使用
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">❌</span>
                <div>
                  <strong>error.jsx</strong> - 定义错误边界，捕获子组件错误
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🚫</span>
                <div>
                  <strong>not-found.jsx</strong> - 定义 404 页面
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 为什么选择 Next.js */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">💪</span>
              为什么选择 Next.js？
            </h2>
          </div>
          <div className="card__content">
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">🚀</span>
                <div>
                  <strong>零配置</strong> - 开箱即用，无需配置 Webpack、Babel 等
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">⚡</span>
                <div>
                  <strong>极致性能</strong> - 自动代码分割、图片优化、字体优化
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🎯</span>
                <div>
                  <strong>SEO 友好</strong> - 服务端渲染让搜索引擎可以抓取完整内容
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🔧</span>
                <div>
                  <strong>开发体验</strong> - 快速刷新、TypeScript 支持、详细错误提示
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🌐</span>
                <div>
                  <strong>全栈能力</strong> - API Routes 让你可以构建完整的后端功能
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">📦</span>
                <div>
                  <strong>生态丰富</strong> - 大量官方和社区插件，Vercel 托管支持
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

