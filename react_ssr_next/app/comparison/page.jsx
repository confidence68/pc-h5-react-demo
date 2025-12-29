/**
 * Next.js vs 手搓 SSR 对比页面
 * 
 * 【本页面教学内容】
 * 1. 详细对比两种实现方式
 * 2. 代码对比
 * 3. 各自的优缺点
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Next.js vs 手搓 SSR',
  description: '对比 Next.js 和手动实现 SSR 的区别',
};

export default function ComparisonPage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">⚖️ Next.js vs 手搓 SSR</h1>
        <p className="page-header__subtitle">
          对比 Next.js 框架和手动实现 React SSR 的区别
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 总览对比 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📊</span>
              总体对比
            </h2>
          </div>
          <div className="card__content">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>方面</th>
                  <th>手搓 SSR (react_ssr)</th>
                  <th>Next.js (react_ssr_next)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>配置复杂度</td>
                  <td>需要配置 Webpack、Babel、Express</td>
                  <td>零配置，开箱即用</td>
                </tr>
                <tr>
                  <td>学习曲线</td>
                  <td>需要理解底层原理</td>
                  <td>更易上手</td>
                </tr>
                <tr>
                  <td>路由系统</td>
                  <td>手动配置 React Router</td>
                  <td>基于文件的自动路由</td>
                </tr>
                <tr>
                  <td>数据获取</td>
                  <td>需要自己实现</td>
                  <td>内置多种方式</td>
                </tr>
                <tr>
                  <td>代码分割</td>
                  <td>需要手动配置</td>
                  <td>自动优化</td>
                </tr>
                <tr>
                  <td>生产部署</td>
                  <td>需要额外配置</td>
                  <td>一键部署（Vercel）</td>
                </tr>
                <tr>
                  <td>灵活性</td>
                  <td>完全自定义</td>
                  <td>框架约定优先</td>
                </tr>
                <tr>
                  <td>适用场景</td>
                  <td>学习原理、特殊需求</td>
                  <td>生产项目</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 服务端渲染对比 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🖥️</span>
              服务端渲染实现对比
            </h2>
          </div>
          <div className="card__content">
            <div className="grid grid--2">
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                  🔧 手搓 SSR
                </h4>
                <CodeBlock filename="server/index.js">
{`import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../shared/App';
import template from './template';

const app = express();

// 静态资源
app.use(express.static('dist/public'));

// SSR 处理
app.get('*', (req, res) => {
  // 手动调用 renderToString
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  
  // 手动嵌入模板
  res.send(template(html));
});

app.listen(3000);`}
                </CodeBlock>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                  ⚡ Next.js
                </h4>
                <CodeBlock filename="app/page.jsx">
{`// 不需要配置服务器！
// 不需要手动调用 renderToString！
// Next.js 自动处理一切

export default async function Page() {
  // 可以直接 async
  const data = await fetchData();
  
  return (
    <div>
      <h1>Hello World</h1>
      <p>{data.message}</p>
    </div>
  );
}

// Next.js 自动：
// 1. 服务端渲染组件
// 2. 生成 HTML
// 3. 发送给客户端
// 4. 客户端水合`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
        
        {/* 客户端水合对比 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">💧</span>
              客户端水合对比
            </h2>
          </div>
          <div className="card__content">
            <div className="grid grid--2">
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                  🔧 手搓 SSR
                </h4>
                <CodeBlock filename="client/index.jsx">
{`import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';

// 手动调用 hydrateRoot
hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`}
                </CodeBlock>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                  ⚡ Next.js
                </h4>
                <CodeBlock filename="无需配置">
{`// Next.js 自动处理水合！
// 不需要写任何客户端入口代码

// 只需要在需要交互的组件中
// 添加 'use client' 指令：

'use client'

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  );
}`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
        
        {/* 路由对比 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🛤️</span>
              路由系统对比
            </h2>
          </div>
          <div className="card__content">
            <div className="grid grid--2">
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                  🔧 手搓 SSR (React Router)
                </h4>
                <CodeBlock filename="shared/App.jsx">
{`import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Counter from './pages/Counter';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/counter" element={<Counter />} />
    </Routes>
  );
}`}
                </CodeBlock>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                  ⚡ Next.js (文件路由)
                </h4>
                <CodeBlock filename="app/ 目录结构">
{`app/
├── page.jsx        → /
├── about/
│   └── page.jsx    → /about
├── counter/
│   └── page.jsx    → /counter
└── blog/
    └── [slug]/
        └── page.jsx → /blog/:slug

// 无需配置路由！
// 创建文件 = 创建路由`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
        
        {/* 构建配置对比 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📦</span>
              构建配置对比
            </h2>
          </div>
          <div className="card__content">
            <div className="grid grid--2">
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                  🔧 手搓 SSR
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  需要配置两套 Webpack：
                </p>
                <CodeBlock filename="配置文件">
{`// 需要的配置文件：
- webpack.client.js  // 客户端构建
- webpack.server.js  // 服务端构建
- babel.config.js    // Babel 配置
- package.json       // 脚本配置

// 构建命令：
npm run build:client
npm run build:server`}
                </CodeBlock>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                  ⚡ Next.js
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  零配置：
                </p>
                <CodeBlock filename="配置文件">
{`// 可选配置文件：
- next.config.js  // 仅在需要时

// 构建命令：
npm run build

// Next.js 自动：
// - 编译客户端和服务端代码
// - 代码分割
// - 压缩优化
// - 静态资源处理`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
        
        {/* 核心原理回顾 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🧠</span>
              核心原理（两者相同）
            </h2>
          </div>
          <div className="card__content">
            <p>
              虽然使用方式不同，但底层原理是相同的：
            </p>
            
            <div className="feature-list" style={{ marginTop: '16px' }}>
              <div className="feature-list__item">
                <span className="feature-list__icon">1️⃣</span>
                <div>
                  <strong>服务端渲染</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    使用 <code>renderToString</code> 或 <code>renderToPipeableStream</code> 将 React 组件转为 HTML
                  </span>
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">2️⃣</span>
                <div>
                  <strong>HTML 传输</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    将渲染结果嵌入 HTML 模板，发送给客户端
                  </span>
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">3️⃣</span>
                <div>
                  <strong>客户端水合</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    使用 <code>hydrateRoot</code> 绑定事件，使页面可交互
                  </span>
                </div>
              </div>
            </div>
            
            <div className="tip-box tip-box--success" style={{ marginTop: '16px' }}>
              ✅ <strong>学习建议：</strong>先理解手搓 SSR 的原理，
              再使用 Next.js 会更得心应手，遇到问题也更容易排查。
            </div>
          </div>
        </div>
        
        {/* 选择建议 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">💡</span>
              何时选择哪种方案？
            </h2>
          </div>
          <div className="card__content">
            <div className="grid grid--2">
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--primary-color)' }}>
                  选择手搓 SSR 当：
                </h4>
                <div className="feature-list">
                  <div className="feature-list__item">
                    <span className="feature-list__icon">📚</span>
                    <span>学习 SSR 原理</span>
                  </div>
                  <div className="feature-list__item">
                    <span className="feature-list__icon">🔧</span>
                    <span>需要完全自定义控制</span>
                  </div>
                  <div className="feature-list__item">
                    <span className="feature-list__icon">⚙️</span>
                    <span>已有 Express/Koa 项目</span>
                  </div>
                  <div className="feature-list__item">
                    <span className="feature-list__icon">🎯</span>
                    <span>特殊的服务端需求</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--primary-color)' }}>
                  选择 Next.js 当：
                </h4>
                <div className="feature-list">
                  <div className="feature-list__item">
                    <span className="feature-list__icon">🚀</span>
                    <span>快速开发生产项目</span>
                  </div>
                  <div className="feature-list__item">
                    <span className="feature-list__icon">📦</span>
                    <span>需要开箱即用的功能</span>
                  </div>
                  <div className="feature-list__item">
                    <span className="feature-list__icon">🌐</span>
                    <span>需要 Vercel 一键部署</span>
                  </div>
                  <div className="feature-list__item">
                    <span className="feature-list__icon">👥</span>
                    <span>团队协作开发</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 导航 */}
        <div className="card fade-in">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <Link href="/api-routes" className="btn btn--secondary">
              ← API Routes
            </Link>
            <Link href="/" className="btn btn--primary">
              返回首页 →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

