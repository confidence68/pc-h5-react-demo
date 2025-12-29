/**
 * 嵌套路由教学页面
 * 
 * 【本页面教学内容】
 * 1. 嵌套路由的概念
 * 2. layout.jsx 的作用
 * 3. 路由组的使用
 * 4. 并行路由介绍
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: '嵌套路由',
  description: '学习 Next.js 嵌套路由和布局系统',
};

export default function NestedRoutingPage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">📁 嵌套路由与布局</h1>
        <p className="page-header__subtitle">
          学习 Next.js App Router 的嵌套路由和布局系统
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 嵌套布局 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🎨</span>
              嵌套布局 (Nested Layouts)
            </h2>
          </div>
          <div className="card__content">
            <p>
              在 App Router 中，布局可以嵌套。每个目录可以有自己的 <code>layout.jsx</code>，
              子路由会继承父级布局。
            </p>
            
            <CodeBlock filename="嵌套布局结构">
{`app/
├── layout.jsx          # 根布局（所有页面共享）
├── page.jsx            # 首页
│
└── dashboard/
    ├── layout.jsx      # Dashboard 布局（仅 dashboard 下页面共享）
    ├── page.jsx        # /dashboard
    │
    ├── settings/
    │   └── page.jsx    # /dashboard/settings
    │
    └── analytics/
        └── page.jsx    # /dashboard/analytics`}
            </CodeBlock>
            
            <CodeBlock filename="app/dashboard/layout.jsx">
{`// Dashboard 专属布局
// 只影响 /dashboard 下的所有页面

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      {/* Dashboard 侧边栏 */}
      <aside className="dashboard-sidebar">
        <nav>
          <a href="/dashboard">概览</a>
          <a href="/dashboard/settings">设置</a>
          <a href="/dashboard/analytics">分析</a>
        </nav>
      </aside>
      
      {/* 子页面内容 */}
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}`}
            </CodeBlock>
            
            <div className="tip-box tip-box--info" style={{ marginTop: '16px' }}>
              💡 <strong>布局保持状态：</strong>当在同一布局内的页面间导航时，
              布局组件不会重新挂载，状态会被保留。
            </div>
          </div>
        </div>
        
        {/* 路由组 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📦</span>
              路由组 (Route Groups)
            </h2>
          </div>
          <div className="card__content">
            <p>
              使用圆括号 <code>(folderName)</code> 创建路由组，
              可以在不影响 URL 的情况下组织文件：
            </p>
            
            <CodeBlock filename="路由组示例">
{`app/
├── (marketing)/        # 不会出现在 URL 中
│   ├── layout.jsx      # 营销页面专属布局
│   ├── page.jsx        # → /
│   ├── about/
│   │   └── page.jsx    # → /about
│   └── contact/
│       └── page.jsx    # → /contact
│
└── (shop)/             # 不会出现在 URL 中
    ├── layout.jsx      # 商城页面专属布局
    ├── products/
    │   └── page.jsx    # → /products
    └── cart/
        └── page.jsx    # → /cart`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>路由组的用途</h4>
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">1️⃣</span>
                <div>
                  <strong>组织代码</strong> - 按功能模块组织路由文件
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">2️⃣</span>
                <div>
                  <strong>分离布局</strong> - 不同路由组可以有不同布局
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">3️⃣</span>
                <div>
                  <strong>多个根布局</strong> - 可以创建多个 <code>app/(group)/layout.jsx</code>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 特殊文件 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📄</span>
              特殊文件
            </h2>
          </div>
          <div className="card__content">
            <p>App Router 支持多种特殊文件来定义路由行为：</p>
            
            <CodeBlock filename="特殊文件示例">
{`app/
└── dashboard/
    ├── layout.jsx      # 布局（包裹子页面）
    ├── page.jsx        # 页面内容
    ├── loading.jsx     # 加载状态 UI
    ├── error.jsx       # 错误边界（客户端组件）
    ├── not-found.jsx   # 404 页面
    └── template.jsx    # 模板（每次导航重新渲染）`}
            </CodeBlock>
            
            <div className="grid grid--2" style={{ marginTop: '16px' }}>
              <div>
                <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>loading.jsx</h4>
                <CodeBlock>
{`// 自动包裹在 Suspense 中
export default function Loading() {
  return <div>加载中...</div>
}`}
                </CodeBlock>
              </div>
              
              <div>
                <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>error.jsx</h4>
                <CodeBlock>
{`'use client' // 必须是客户端组件

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>出错了！</h2>
      <button onClick={reset}>重试</button>
    </div>
  )
}`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
        
        {/* 并行路由 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🔀</span>
              并行路由 (Parallel Routes)
            </h2>
          </div>
          <div className="card__content">
            <p>
              使用 <code>@folderName</code> 创建命名插槽，可以在同一布局中同时渲染多个页面：
            </p>
            
            <CodeBlock filename="并行路由结构">
{`app/
└── dashboard/
    ├── layout.jsx        # 接收多个 children
    ├── page.jsx
    ├── @analytics/       # 命名插槽
    │   └── page.jsx
    └── @team/            # 命名插槽
        └── page.jsx`}
            </CodeBlock>
            
            <CodeBlock filename="app/dashboard/layout.jsx">
{`// 并行路由布局
export default function DashboardLayout({
  children,    // 默认插槽
  analytics,   // @analytics 插槽
  team,        // @team 插槽
}) {
  return (
    <div className="dashboard">
      <main>{children}</main>
      
      <aside className="dashboard-widgets">
        <div className="widget">{analytics}</div>
        <div className="widget">{team}</div>
      </aside>
    </div>
  );
}`}
            </CodeBlock>
            
            <div className="tip-box tip-box--success" style={{ marginTop: '16px' }}>
              ✅ <strong>使用场景：</strong>Dashboard 多面板、模态框、条件渲染等
            </div>
          </div>
        </div>
        
        {/* 拦截路由 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🚧</span>
              拦截路由 (Intercepting Routes)
            </h2>
          </div>
          <div className="card__content">
            <p>
              使用 <code>(..)</code> 语法拦截路由，实现模态框等效果：
            </p>
            
            <CodeBlock filename="拦截路由示例">
{`app/
├── photos/
│   └── [id]/
│       └── page.jsx     # 完整照片页面: /photos/123
│
└── @modal/
    └── (.)photos/       # (.) 拦截同级路由
        └── [id]/
            └── page.jsx # 模态框中显示照片

# 行为：
# 点击链接 → 在模态框中显示照片
# 直接访问 URL → 显示完整页面
# 刷新页面 → 显示完整页面`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '16px', marginBottom: '8px' }}>拦截语法</h4>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>语法</th>
                  <th>匹配</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>(.)folder</code></td>
                  <td>同级目录</td>
                </tr>
                <tr>
                  <td><code>(..)folder</code></td>
                  <td>上一级目录</td>
                </tr>
                <tr>
                  <td><code>(..)(..)folder</code></td>
                  <td>上两级目录</td>
                </tr>
                <tr>
                  <td><code>(...)folder</code></td>
                  <td>根目录</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 导航 */}
        <div className="card fade-in">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <Link href="/routing/dynamic" className="btn btn--secondary">
              ← 返回动态路由
            </Link>
            <Link href="/data-fetching" className="btn btn--primary">
              数据获取 →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

