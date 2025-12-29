/**
 * 基础路由教学页面
 * 
 * 【本页面教学内容】
 * 1. Next.js 基于文件的路由系统
 * 2. 如何创建路由
 * 3. Link 组件的使用
 * 4. 导航方法
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: '基础路由',
  description: '学习 Next.js App Router 的基础路由系统',
};

export default function RoutingPage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">🛤️ 基础路由</h1>
        <p className="page-header__subtitle">
          了解 Next.js App Router 基于文件系统的路由机制
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 路由基础 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📁</span>
              基于文件的路由
            </h2>
          </div>
          <div className="card__content">
            <p>
              Next.js 使用<strong>基于文件系统的路由</strong>。
              在 <code>app</code> 目录下创建文件夹，并添加 <code>page.jsx</code> 文件，
              就自动创建了一个路由。
            </p>
            
            <CodeBlock filename="路由映射示例">
{`app/
├── page.jsx           → /
├── about/
│   └── page.jsx       → /about
├── blog/
│   └── page.jsx       → /blog
└── contact/
    └── page.jsx       → /contact`}
            </CodeBlock>
            
            <div className="tip-box tip-box--info">
              💡 <strong>关键点：</strong>只有包含 <code>page.jsx</code> 的目录才会成为可访问的路由。
              其他文件（如组件）放在同一目录不会创建路由。
            </div>
          </div>
        </div>
        
        {/* page.jsx 详解 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📄</span>
              page.jsx 组件
            </h2>
          </div>
          <div className="card__content">
            <p>每个路由需要一个 <code>page.jsx</code> 文件来定义页面内容：</p>
            
            <CodeBlock filename="app/about/page.jsx">
{`// 这个文件创建了 /about 路由

// 导出元数据（可选）
export const metadata = {
  title: '关于我们',
  description: '了解更多关于我们的信息',
};

// 默认导出页面组件
export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <p>这是关于页面的内容</p>
    </div>
  );
}`}
            </CodeBlock>
            
            <div className="feature-list" style={{ marginTop: '16px' }}>
              <div className="feature-list__item">
                <span className="feature-list__icon">✅</span>
                <div>
                  组件必须使用 <strong>默认导出</strong>（export default）
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">✅</span>
                <div>
                  默认是 <strong>Server Component</strong>，可以直接获取数据
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">✅</span>
                <div>
                  可以导出 <strong>metadata</strong> 对象设置页面元数据
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Link 组件 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🔗</span>
              Link 组件导航
            </h2>
          </div>
          <div className="card__content">
            <p>
              使用 Next.js 的 <code>Link</code> 组件进行客户端导航，
              比传统 <code>&lt;a&gt;</code> 标签更高效：
            </p>
            
            <CodeBlock filename="Link 组件使用">
{`import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* 基本用法 */}
      <Link href="/">首页</Link>
      
      {/* 带样式 */}
      <Link href="/about" className="nav-link">
        关于
      </Link>
      
      {/* 动态路由 */}
      <Link href="/blog/my-post">
        博客文章
      </Link>
      
      {/* 带查询参数 */}
      <Link href="/search?q=nextjs">
        搜索
      </Link>
      
      {/* 使用对象形式 */}
      <Link
        href={{
          pathname: '/blog/[slug]',
          query: { slug: 'hello-world' },
        }}
      >
        Hello World
      </Link>
    </nav>
  );
}`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Link 组件特点</h4>
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">⚡</span>
                <div>
                  <strong>预获取（Prefetch）</strong> - 链接进入视口时自动预加载目标页面
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🔄</span>
                <div>
                  <strong>客户端导航</strong> - 不会整页刷新，只更新变化的部分
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">📜</span>
                <div>
                  <strong>自动滚动</strong> - 导航到新页面时自动滚动到顶部
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* useRouter Hook */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🪝</span>
              编程式导航
            </h2>
          </div>
          <div className="card__content">
            <p>
              需要在事件处理器中导航时，使用 <code>useRouter</code> Hook：
            </p>
            
            <CodeBlock filename="useRouter 使用（客户端组件）">
{`'use client'; // 必须标记为客户端组件

import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();
  
  const handleLogin = async () => {
    // 执行登录逻辑...
    const success = await login();
    
    if (success) {
      // 编程式导航
      router.push('/dashboard');
    }
  };
  
  return (
    <button onClick={handleLogin}>
      登录
    </button>
  );
}

// useRouter 常用方法
// router.push('/path')     - 导航到指定路径
// router.replace('/path')  - 替换当前历史记录
// router.back()            - 返回上一页
// router.forward()         - 前进到下一页
// router.refresh()         - 刷新当前页面`}
            </CodeBlock>
            
            <div className="tip-box tip-box--warning" style={{ marginTop: '16px' }}>
              ⚠️ <strong>注意：</strong><code>useRouter</code> 只能在客户端组件中使用，
              需要添加 <code>'use client'</code> 指令。
            </div>
          </div>
        </div>
        
        {/* 路由示例导航 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🧭</span>
              路由导航示例
            </h2>
          </div>
          <div className="card__content">
            <p>点击下面的链接体验客户端导航：</p>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
              <Link href="/routing/dynamic" className="btn btn--primary">
                动态路由 →
              </Link>
              <Link href="/routing/nested" className="btn btn--secondary">
                嵌套路由 →
              </Link>
              <Link href="/" className="btn btn--secondary">
                ← 返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

