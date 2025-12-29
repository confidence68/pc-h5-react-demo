/**
 * Client Components 教学页面
 * 
 * 【本页面教学内容】
 * 1. 什么是 Client Components
 * 2. 'use client' 指令
 * 3. 组件组合模式
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import CounterDemo from '@/components/CounterDemo';

export const metadata = {
  title: 'Client Components',
  description: '学习 React Client Components 的使用',
};

export default function ClientComponentsPage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">💻 Client Components</h1>
        <p className="page-header__subtitle">
          需要交互性的组件，在浏览器中渲染和执行
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 什么是 Client Components */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🤔</span>
              什么是 Client Components？
            </h2>
          </div>
          <div className="card__content">
            <p>
              Client Components 是在<strong>浏览器中渲染</strong>的组件。
              它们可以使用 React 的所有特性：状态、生命周期、事件处理等。
              使用 <code>'use client'</code> 指令标记。
            </p>
            
            <CodeBlock filename="'use client' 指令">
{`// 在文件顶部添加这个指令
'use client'

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      点击次数: {count}
    </button>
  );
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 实时演示 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🎬</span>
              实时演示：计数器
            </h2>
            <p className="card__subtitle">这是一个 Client Component，可以响应点击</p>
          </div>
          <div className="card__content">
            <CounterDemo />
            
            <div className="tip-box tip-box--success" style={{ marginTop: '16px' }}>
              ✅ 这个计数器使用了 <code>useState</code>，所以必须是 Client Component。
              点击按钮会更新状态并重新渲染。
            </div>
          </div>
        </div>
        
        {/* 何时使用 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🎯</span>
              何时需要 'use client'？
            </h2>
          </div>
          <div className="card__content">
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">🔄</span>
                <div>
                  <strong>使用状态</strong> - useState, useReducer
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">⚡</span>
                <div>
                  <strong>使用副作用</strong> - useEffect, useLayoutEffect
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">👆</span>
                <div>
                  <strong>事件处理</strong> - onClick, onChange, onSubmit 等
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🌐</span>
                <div>
                  <strong>浏览器 API</strong> - window, document, localStorage 等
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🪝</span>
                <div>
                  <strong>自定义 Hooks</strong> - 包含状态或副作用的 Hooks
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 组件组合 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🧩</span>
              组件组合模式
            </h2>
            <p className="card__subtitle">Server 和 Client Components 可以混合使用</p>
          </div>
          <div className="card__content">
            <CodeBlock filename="组合模式示例">
{`// app/page.jsx - Server Component（默认）
import ClientButton from '@/components/ClientButton';

export default function Page() {
  return (
    <div>
      {/* 服务端内容 */}
      <h1>欢迎</h1>
      
      {/* 嵌入客户端组件 */}
      <ClientButton />
    </div>
  );
}

// components/ClientButton.jsx - Client Component
'use client'

import { useState } from 'react';

export default function ClientButton() {
  const [liked, setLiked] = useState(false);
  
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️ 已喜欢' : '🤍 喜欢'}
    </button>
  );
}`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>组合规则</h4>
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">✅</span>
                <div>
                  Server Component 可以导入 Client Component
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">✅</span>
                <div>
                  Client Component 可以通过 props.children 接收 Server Component
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">❌</span>
                <div>
                  Client Component 不能直接导入 Server Component
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Children 模式 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">👶</span>
              Children 模式
            </h2>
          </div>
          <div className="card__content">
            <p>通过 children 在 Client Component 中使用 Server Component：</p>
            
            <CodeBlock filename="Children 模式">
{`// components/ClientWrapper.jsx
'use client'

import { useState } from 'react';

export default function ClientWrapper({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '收起' : '展开'}
      </button>
      
      {isOpen && (
        <div>
          {/* children 可以是 Server Component */}
          {children}
        </div>
      )}
    </div>
  );
}

// app/page.jsx - Server Component
import ClientWrapper from '@/components/ClientWrapper';
import ServerData from '@/components/ServerData';

export default function Page() {
  return (
    <ClientWrapper>
      {/* ServerData 是 Server Component */}
      <ServerData />
    </ClientWrapper>
  );
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 最佳实践 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">💡</span>
              最佳实践
            </h2>
          </div>
          <div className="card__content">
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">1️⃣</span>
                <div>
                  <strong>尽量使用 Server Components</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    默认使用 Server，只在需要时才添加 'use client'
                  </span>
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">2️⃣</span>
                <div>
                  <strong>将 Client 边界推到叶子节点</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    只标记真正需要交互的小组件
                  </span>
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">3️⃣</span>
                <div>
                  <strong>使用 Children 模式组合</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    保持 Server Component 在 Client Component 中
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 导航 */}
        <div className="card fade-in">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <Link href="/components/server" className="btn btn--secondary">
              ← Server Components
            </Link>
            <Link href="/api-routes" className="btn btn--primary">
              API Routes →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

