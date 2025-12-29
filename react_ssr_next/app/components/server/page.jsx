/**
 * Server Components 教学页面
 * 
 * 【本页面教学内容】
 * 1. 什么是 Server Components
 * 2. Server Components 的优势
 * 3. 使用场景和限制
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Server Components',
  description: '深入了解 React Server Components',
};

// 演示：这个组件在服务端渲染
async function ServerTime() {
  const time = new Date().toLocaleString('zh-CN');
  return (
    <div className="feature-list__item">
      <span className="feature-list__icon">🕐</span>
      <div>
        <strong>服务端渲染时间</strong>: {time}
      </div>
    </div>
  );
}

export default function ServerComponentsPage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">⚙️ Server Components</h1>
        <p className="page-header__subtitle">
          React 18 引入的全新组件类型，在服务端渲染
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 什么是 Server Components */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🤔</span>
              什么是 Server Components？
            </h2>
          </div>
          <div className="card__content">
            <p>
              Server Components 是 React 18 引入的新特性，
              这类组件<strong>只在服务端渲染</strong>，不会发送到客户端。
              在 Next.js App Router 中，<strong>所有组件默认都是 Server Components</strong>。
            </p>
            
            <div className="feature-list" style={{ marginTop: '16px' }}>
              <ServerTime />
            </div>
            
            <div className="tip-box tip-box--info" style={{ marginTop: '16px' }}>
              💡 上面的时间是在服务端生成的。组件代码不会发送到浏览器。
            </div>
          </div>
        </div>
        
        {/* 工作原理 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">⚡</span>
              工作原理
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="Server Component 示例">
{`// app/posts/page.jsx
// 这是一个 Server Component（默认）

// ✅ 可以直接访问数据库
import { db } from '@/lib/db';

// ✅ 可以使用服务端专用的包
import fs from 'fs';

// ✅ 可以 async/await
export default async function PostsPage() {
  // 直接查询数据库
  const posts = await db.post.findMany();
  
  // 读取文件系统
  const config = fs.readFileSync('./config.json');
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// 这个组件的代码不会发送到浏览器！
// 只有渲染结果（HTML）会发送给客户端`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 优势 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">✨</span>
              Server Components 的优势
            </h2>
          </div>
          <div className="card__content">
            <div className="grid grid--2">
              <div className="feature-list__item">
                <span className="feature-list__icon">📦</span>
                <div>
                  <strong>更小的 Bundle</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    服务端代码不会发送到客户端，减少 JavaScript 体积
                  </span>
                </div>
              </div>
              
              <div className="feature-list__item">
                <span className="feature-list__icon">🔐</span>
                <div>
                  <strong>更安全</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    API 密钥、数据库连接等不会暴露给客户端
                  </span>
                </div>
              </div>
              
              <div className="feature-list__item">
                <span className="feature-list__icon">⚡</span>
                <div>
                  <strong>更快的数据获取</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    直接访问数据库，无需 API 调用
                  </span>
                </div>
              </div>
              
              <div className="feature-list__item">
                <span className="feature-list__icon">🔍</span>
                <div>
                  <strong>更好的 SEO</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    完整的 HTML 发送给搜索引擎
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 限制 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🚫</span>
              Server Components 的限制
            </h2>
          </div>
          <div className="card__content">
            <p>Server Components 不能：</p>
            
            <CodeBlock filename="Server Component 限制">
{`// ❌ 不能使用 useState
import { useState } from 'react';
const [count, setCount] = useState(0); // 错误！

// ❌ 不能使用 useEffect
import { useEffect } from 'react';
useEffect(() => { ... }, []); // 错误！

// ❌ 不能使用事件处理器
<button onClick={handleClick}>点击</button> // 错误！

// ❌ 不能使用浏览器 API
const width = window.innerWidth; // 错误！
localStorage.getItem('key'); // 错误！

// 如果需要这些功能，使用 Client Component`}
            </CodeBlock>
            
            <div className="tip-box tip-box--warning" style={{ marginTop: '16px' }}>
              ⚠️ <strong>记住：</strong>如果需要交互性（状态、事件、浏览器 API），
              需要使用 Client Component。
            </div>
          </div>
        </div>
        
        {/* 何时使用 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🎯</span>
              何时使用 Server Components？
            </h2>
          </div>
          <div className="card__content">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>使用场景</th>
                  <th>推荐</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>获取数据</td>
                  <td><span className="tag tag--server">Server</span></td>
                </tr>
                <tr>
                  <td>访问后端资源（数据库、文件系统）</td>
                  <td><span className="tag tag--server">Server</span></td>
                </tr>
                <tr>
                  <td>使用敏感信息（API 密钥）</td>
                  <td><span className="tag tag--server">Server</span></td>
                </tr>
                <tr>
                  <td>大型依赖包（不需要交互的）</td>
                  <td><span className="tag tag--server">Server</span></td>
                </tr>
                <tr>
                  <td>添加交互性（onClick, onChange）</td>
                  <td><span className="tag tag--client">Client</span></td>
                </tr>
                <tr>
                  <td>使用状态（useState, useReducer）</td>
                  <td><span className="tag tag--client">Client</span></td>
                </tr>
                <tr>
                  <td>使用生命周期（useEffect）</td>
                  <td><span className="tag tag--client">Client</span></td>
                </tr>
                <tr>
                  <td>使用浏览器 API</td>
                  <td><span className="tag tag--client">Client</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 导航 */}
        <div className="card fade-in">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <Link href="/data-fetching/client" className="btn btn--secondary">
              ← 客户端获取
            </Link>
            <Link href="/components/client" className="btn btn--primary">
              Client Components →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

