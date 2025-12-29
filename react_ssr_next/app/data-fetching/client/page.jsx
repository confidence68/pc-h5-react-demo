/**
 * 客户端数据获取详解页面
 * 
 * 【本页面教学内容】
 * 1. Client Component 数据获取
 * 2. useEffect + useState 模式
 * 3. 加载状态处理
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import ClientFetchDemo from '@/components/ClientFetchDemo';

export const metadata = {
  title: '客户端数据获取',
  description: '学习在 Client Component 中获取数据',
};

export default function ClientDataFetchingPage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">🌐 客户端数据获取</h1>
        <p className="page-header__subtitle">
          在 Client Component 中使用 useEffect 获取数据
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 何时使用客户端获取 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🤔</span>
              何时使用客户端获取？
            </h2>
          </div>
          <div className="card__content">
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">👆</span>
                <div>
                  <strong>用户交互触发</strong> - 点击按钮后加载数据
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">⏱️</span>
                <div>
                  <strong>实时数据</strong> - 需要频繁更新的数据（股票价格、聊天消息）
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">👤</span>
                <div>
                  <strong>用户特定数据</strong> - 登录后才能获取的个人数据
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🔄</span>
                <div>
                  <strong>无限滚动</strong> - 滚动加载更多内容
                </div>
              </div>
            </div>
            
            <div className="tip-box tip-box--warning" style={{ marginTop: '16px' }}>
              ⚠️ <strong>注意：</strong>客户端获取的数据不利于 SEO，
              如果需要搜索引擎抓取，应使用服务端获取。
            </div>
          </div>
        </div>
        
        {/* 实时演示 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🎬</span>
              实时演示
            </h2>
            <p className="card__subtitle">点击按钮体验客户端数据获取</p>
          </div>
          <div className="card__content">
            {/* 客户端组件演示 */}
            <ClientFetchDemo />
          </div>
        </div>
        
        {/* 基本模式 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📝</span>
              基本模式：useEffect + useState
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="components/UserList.jsx">
{`'use client'

import { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch('/api/users');
        
        if (!res.ok) {
          throw new Error('获取用户失败');
        }
        
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 点击加载 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">👆</span>
              点击触发加载
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="components/LoadMoreButton.jsx">
{`'use client'

import { useState } from 'react';

export default function LoadMoreButton() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const loadMore = async () => {
    setLoading(true);
    
    const res = await fetch(\`/api/items?page=\${page}\`);
    const newItems = await res.json();
    
    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setLoading(false);
  };
  
  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      
      <button onClick={loadMore} disabled={loading}>
        {loading ? '加载中...' : '加载更多'}
      </button>
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 使用 SWR */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🔄</span>
              推荐：使用 SWR
            </h2>
            <p className="card__subtitle">Vercel 出品的数据获取库</p>
          </div>
          <div className="card__content">
            <p>
              <code>SWR</code> 是 Vercel 开发的 React Hooks 数据获取库，
              提供缓存、重新验证、错误重试等功能：
            </p>
            
            <CodeBlock filename="使用 SWR">
{`'use client'

import useSWR from 'swr';

// fetcher 函数
const fetcher = url => fetch(url).then(res => res.json());

export default function UserProfile({ userId }) {
  const { data, error, isLoading } = useSWR(
    \`/api/users/\${userId}\`,
    fetcher
  );
  
  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>加载失败</div>;
  
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </div>
  );
}

// SWR 的优势：
// ✅ 自动缓存和重用数据
// ✅ 焦点时自动重新验证
// ✅ 网络恢复时自动重试
// ✅ 优化的请求去重
// ✅ TypeScript 支持`}
            </CodeBlock>
            
            <div className="tip-box tip-box--success" style={{ marginTop: '16px' }}>
              ✅ <strong>最佳实践：</strong>对于客户端数据获取，
              推荐使用 SWR 或 React Query 等库，它们提供了更好的缓存和错误处理。
            </div>
          </div>
        </div>
        
        {/* 导航 */}
        <div className="card fade-in">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <Link href="/data-fetching/server" className="btn btn--secondary">
              ← 服务端获取
            </Link>
            <Link href="/components/server" className="btn btn--primary">
              Server Components →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

