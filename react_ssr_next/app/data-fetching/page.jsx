/**
 * 数据获取概述页面
 * 
 * 【本页面教学内容】
 * 1. Next.js 数据获取方式概述
 * 2. 服务端获取 vs 客户端获取
 * 3. 缓存和重新验证
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: '数据获取概述',
  description: '了解 Next.js 中各种数据获取方式',
};

export default function DataFetchingPage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">📡 数据获取概述</h1>
        <p className="page-header__subtitle">
          了解 Next.js App Router 中的各种数据获取方式
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 概述 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🎯</span>
              数据获取方式总览
            </h2>
          </div>
          <div className="card__content">
            <p>
              Next.js App Router 提供了多种数据获取方式，
              根据场景选择最合适的方法：
            </p>
            
            <table className="comparison-table" style={{ marginTop: '16px' }}>
              <thead>
                <tr>
                  <th>方式</th>
                  <th>执行位置</th>
                  <th>适用场景</th>
                  <th>缓存</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="tag tag--server">Server Component</span></td>
                  <td>服务端</td>
                  <td>需要 SEO、首屏性能</td>
                  <td>默认缓存</td>
                </tr>
                <tr>
                  <td><span className="tag tag--client">Client Component</span></td>
                  <td>客户端</td>
                  <td>用户交互触发、实时数据</td>
                  <td>需手动处理</td>
                </tr>
                <tr>
                  <td><span className="tag tag--static">静态生成 (SSG)</span></td>
                  <td>构建时</td>
                  <td>内容不常变化</td>
                  <td>永久缓存</td>
                </tr>
                <tr>
                  <td><span className="tag tag--server">增量更新 (ISR)</span></td>
                  <td>服务端</td>
                  <td>内容需定期更新</td>
                  <td>按时间更新</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 服务端获取 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🖥️</span>
              服务端数据获取
            </h2>
            <p className="card__subtitle">Server Components 中直接使用 async/await</p>
          </div>
          <div className="card__content">
            <p>
              在 App Router 中，Server Components 可以直接使用 <code>async/await</code> 获取数据，
              不需要额外的 API 如 <code>getServerSideProps</code>：
            </p>
            
            <CodeBlock filename="app/posts/page.jsx">
{`// Server Component（默认）可以直接 async
export default async function PostsPage() {
  // 直接在组件中获取数据
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// 相比之前的写法：
// Pages Router:
// export async function getServerSideProps() {
//   const res = await fetch('...');
//   return { props: { posts: await res.json() } };
// }`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>服务端获取的优势</h4>
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__icon">🔐</span>
                <div><strong>安全性</strong> - API 密钥等敏感信息不会暴露给客户端</div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">⚡</span>
                <div><strong>性能</strong> - 减少客户端 JavaScript，加快首屏渲染</div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🔍</span>
                <div><strong>SEO</strong> - 搜索引擎可以看到完整内容</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 缓存控制 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">💾</span>
              缓存与重新验证
            </h2>
          </div>
          <div className="card__content">
            <p>Next.js 扩展了原生 <code>fetch</code>，提供了缓存控制选项：</p>
            
            <CodeBlock filename="fetch 缓存选项">
{`// 1. 默认行为：缓存数据（等同于 SSG）
const data = await fetch('https://api.example.com/data');

// 2. 禁用缓存：每次请求都获取新数据（等同于 SSR）
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// 3. 定时重新验证（ISR）：指定秒数后重新获取
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }  // 60 秒后重新验证
});

// 4. 按需重新验证（通过标签）
const data = await fetch('https://api.example.com/data', {
  next: { tags: ['posts'] }  // 设置标签
});
// 然后通过 revalidateTag('posts') 触发更新`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>缓存策略对比</h4>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>选项</th>
                  <th>行为</th>
                  <th>等同于</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>cache: 'force-cache'</code></td>
                  <td>默认，永久缓存</td>
                  <td>SSG</td>
                </tr>
                <tr>
                  <td><code>cache: 'no-store'</code></td>
                  <td>每次请求都获取</td>
                  <td>SSR</td>
                </tr>
                <tr>
                  <td><code>next: {'{ revalidate: N }'}</code></td>
                  <td>N 秒后重新验证</td>
                  <td>ISR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 并行数据获取 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">⚡</span>
              并行数据获取
            </h2>
          </div>
          <div className="card__content">
            <p>使用 <code>Promise.all</code> 并行获取多个数据源：</p>
            
            <CodeBlock filename="并行获取示例">
{`export default async function Dashboard() {
  // ❌ 串行获取（较慢）
  // const user = await getUser();
  // const posts = await getPosts();
  // const analytics = await getAnalytics();
  
  // ✅ 并行获取（更快）
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics()
  ]);
  
  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
      <AnalyticsChart data={analytics} />
    </div>
  );
}`}
            </CodeBlock>
            
            <div className="tip-box tip-box--success" style={{ marginTop: '16px' }}>
              ✅ <strong>性能优化：</strong>并行获取可以显著减少总等待时间，
              特别是当多个数据源相互独立时。
            </div>
          </div>
        </div>
        
        {/* 导航链接 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📚</span>
              深入学习
            </h2>
          </div>
          <div className="card__content">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/data-fetching/server" className="btn btn--primary">
                服务端获取详解 →
              </Link>
              <Link href="/data-fetching/client" className="btn btn--secondary">
                客户端获取详解 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

