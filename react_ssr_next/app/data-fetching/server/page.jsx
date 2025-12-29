/**
 * 服务端数据获取详解页面
 * 
 * 【本页面教学内容】
 * 1. Server Component 数据获取
 * 2. 实际示例演示
 * 3. 缓存策略实践
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: '服务端数据获取',
  description: '学习在 Server Component 中获取数据',
};

/**
 * 模拟从 API 获取数据
 * 这个函数在服务端执行
 */
async function fetchServerTime() {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  return new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai'
  });
}

async function fetchPosts() {
  // 实际项目中这里会调用真实 API
  return [
    { id: 1, title: 'Next.js 14 新特性', views: 1234 },
    { id: 2, title: 'Server Components 详解', views: 856 },
    { id: 3, title: '数据获取最佳实践', views: 2341 },
  ];
}

export default async function ServerDataFetchingPage() {
  // 在 Server Component 中直接获取数据
  const serverTime = await fetchServerTime();
  const posts = await fetchPosts();
  
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">🖥️ 服务端数据获取</h1>
        <p className="page-header__subtitle">
          在 Server Component 中使用 async/await 获取数据
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 实时演示 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🎬</span>
              实时演示
            </h2>
            <p className="card__subtitle">这个数据是在服务端获取的</p>
          </div>
          <div className="card__content">
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">🕐</span>
                <div>
                  <strong>服务端渲染时间</strong>
                  <br />
                  <code>{serverTime}</code>
                </div>
              </div>
            </div>
            
            <div className="tip-box tip-box--info" style={{ marginTop: '16px' }}>
              💡 这个时间是在服务端生成的。刷新页面会看到时间更新。
              如果使用了缓存，时间可能不会立即更新。
            </div>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>📝 模拟文章列表</h4>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>标题</th>
                  <th>浏览量</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 代码解析 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📝</span>
              代码解析
            </h2>
          </div>
          <div className="card__content">
            <p>这个页面使用了以下技术：</p>
            
            <CodeBlock filename="app/data-fetching/server/page.jsx">
{`// 数据获取函数
async function fetchServerTime() {
  await new Promise(resolve => setTimeout(resolve, 100));
  return new Date().toLocaleString('zh-CN');
}

async function fetchPosts() {
  // 这里可以是真实的 API 调用
  // const res = await fetch('https://api.example.com/posts');
  // return res.json();
  
  return [
    { id: 1, title: 'Next.js 14 新特性', views: 1234 },
    // ...
  ];
}

// Server Component 可以直接 async
export default async function ServerDataFetchingPage() {
  // 直接 await 数据
  const serverTime = await fetchServerTime();
  const posts = await fetchPosts();
  
  return (
    <div>
      <p>服务端时间: {serverTime}</p>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 使用真实 API */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🌐</span>
              使用真实 API
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="调用外部 API">
{`// 调用外部 API
export default async function UsersPage() {
  // 默认会缓存结果（类似 SSG）
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 禁用缓存（类似 SSR）
const res = await fetch('https://api.example.com/realtime-data', {
  cache: 'no-store'
});

// 定时重新验证（ISR）
const res = await fetch('https://api.example.com/posts', {
  next: { revalidate: 3600 }  // 1小时
});`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>调用内部 API Route</h4>
            <CodeBlock filename="调用自己的 API">
{`// 调用同一项目的 API Route
export default async function Page() {
  // 在服务端可以直接调用内部 API
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store'
  });
  const posts = await res.json();
  
  return <PostList posts={posts} />;
}

// 或者直接调用数据库（推荐）
import { db } from '@/lib/db';

export default async function Page() {
  // 服务端组件可以直接访问数据库
  const posts = await db.post.findMany();
  return <PostList posts={posts} />;
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 错误处理 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">⚠️</span>
              错误处理
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="数据获取错误处理">
{`export default async function PostsPage() {
  try {
    const res = await fetch('https://api.example.com/posts');
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts = await res.json();
    return <PostList posts={posts} />;
    
  } catch (error) {
    // 可以返回错误 UI
    return <div>加载失败，请稍后重试</div>;
  }
}

// 或者使用 error.jsx 边界
// app/posts/error.jsx
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>出错了！</h2>
      <p>{error.message}</p>
      <button onClick={reset}>重试</button>
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 导航 */}
        <div className="card fade-in">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <Link href="/data-fetching" className="btn btn--secondary">
              ← 返回概述
            </Link>
            <Link href="/data-fetching/client" className="btn btn--primary">
              客户端获取 →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

