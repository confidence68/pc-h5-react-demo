/**
 * 动态路由教学页面
 * 
 * 【本页面教学内容】
 * 1. 动态路由段 [param]
 * 2. 获取路由参数
 * 3. 捕获所有路由 [...slug]
 * 4. 可选捕获 [[...slug]]
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: '动态路由',
  description: '学习 Next.js 动态路由的使用方法',
};

export default function DynamicRoutingPage() {
  // 示例文章数据
  const posts = [
    { id: 1, slug: 'getting-started', title: 'Next.js 入门指南' },
    { id: 2, slug: 'routing-basics', title: '路由系统详解' },
    { id: 3, slug: 'data-fetching', title: '数据获取最佳实践' },
  ];
  
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">🔄 动态路由</h1>
        <p className="page-header__subtitle">
          学习如何创建动态路由和获取路由参数
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 动态路由段 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📂</span>
              动态路由段 [param]
            </h2>
          </div>
          <div className="card__content">
            <p>
              使用方括号 <code>[param]</code> 创建动态路由段，
              可以匹配任意值：
            </p>
            
            <CodeBlock filename="文件结构">
{`app/
└── blog/
    └── [slug]/          # 动态路由段
        └── page.jsx     # 匹配 /blog/任意值

# 路由匹配示例：
# /blog/hello-world  → slug = "hello-world"
# /blog/my-first-post → slug = "my-first-post"
# /blog/123          → slug = "123"`}
            </CodeBlock>
            
            <CodeBlock filename="app/blog/[slug]/page.jsx">
{`// 动态路由页面组件
// params 是 Next.js 自动注入的路由参数

export default function BlogPost({ params }) {
  // 获取动态参数
  const { slug } = params;
  
  return (
    <article>
      <h1>文章: {slug}</h1>
      {/* 根据 slug 获取并展示文章内容 */}
    </article>
  );
}

// 也可以使用 async 函数获取数据
export default async function BlogPost({ params }) {
  const { slug } = params;
  
  // 服务端获取数据
  const post = await fetch(\`/api/posts/\${slug}\`);
  const data = await post.json();
  
  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </article>
  );
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 动态路由示例 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📝</span>
              动态路由示例
            </h2>
          </div>
          <div className="card__content">
            <p>点击下面的链接体验动态路由：</p>
            
            <div className="feature-list" style={{ marginTop: '16px' }}>
              {posts.map((post) => (
                <Link 
                  key={post.id}
                  href={`/routing/dynamic/${post.slug}`}
                  className="feature-list__item"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="feature-list__icon">📄</span>
                  <div>
                    <strong>{post.title}</strong>
                    <br />
                    <small style={{ color: 'var(--text-muted)' }}>
                      路由: /routing/dynamic/{post.slug}
                    </small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* 多个动态段 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🔢</span>
              多个动态段
            </h2>
          </div>
          <div className="card__content">
            <p>可以在路径中使用多个动态段：</p>
            
            <CodeBlock filename="多动态段示例">
{`app/
└── shop/
    └── [category]/
        └── [product]/
            └── page.jsx

# 匹配: /shop/electronics/iphone
# params = { category: 'electronics', product: 'iphone' }

export default function ProductPage({ params }) {
  const { category, product } = params;
  
  return (
    <div>
      <p>分类: {category}</p>
      <p>产品: {product}</p>
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 捕获所有路由 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🎯</span>
              捕获所有路由 [...slug]
            </h2>
          </div>
          <div className="card__content">
            <p>
              使用 <code>[...slug]</code> 捕获所有后续路径段：
            </p>
            
            <CodeBlock filename="捕获所有路由">
{`app/
└── docs/
    └── [...slug]/
        └── page.jsx

# 匹配示例：
# /docs/a           → slug = ['a']
# /docs/a/b         → slug = ['a', 'b']
# /docs/a/b/c       → slug = ['a', 'b', 'c']

export default function DocsPage({ params }) {
  const { slug } = params;
  // slug 是一个数组
  
  return (
    <div>
      <p>路径段: {slug.join(' / ')}</p>
    </div>
  );
}`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>可选捕获 [[...slug]]</h4>
            <CodeBlock filename="可选捕获所有路由">
{`app/
└── docs/
    └── [[...slug]]/    # 双方括号
        └── page.jsx

# 区别：也匹配根路径
# /docs              → slug = undefined
# /docs/a            → slug = ['a']
# /docs/a/b          → slug = ['a', 'b']`}
            </CodeBlock>
          </div>
        </div>
        
        {/* generateStaticParams */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">⚙️</span>
              静态生成动态路由
            </h2>
          </div>
          <div className="card__content">
            <p>
              使用 <code>generateStaticParams</code> 在构建时预生成动态路由：
            </p>
            
            <CodeBlock filename="generateStaticParams 示例">
{`// app/blog/[slug]/page.jsx

// 构建时调用，返回所有需要预生成的参数
export async function generateStaticParams() {
  // 可以从 API 或数据库获取数据
  const posts = await fetch('https://api.example.com/posts');
  const data = await posts.json();
  
  // 返回参数数组
  return data.map((post) => ({
    slug: post.slug,
  }));
}

// 这些页面会在构建时静态生成：
// /blog/hello-world
// /blog/my-first-post
// /blog/nextjs-tutorial

export default function BlogPost({ params }) {
  const { slug } = params;
  // ...
}`}
            </CodeBlock>
            
            <div className="tip-box tip-box--success" style={{ marginTop: '16px' }}>
              ✅ <strong>SSG + 动态路由：</strong>
              使用 <code>generateStaticParams</code> 可以将动态路由页面静态化，
              获得更好的性能和 SEO。
            </div>
          </div>
        </div>
        
        {/* 导航 */}
        <div className="card fade-in">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <Link href="/routing" className="btn btn--secondary">
              ← 返回基础路由
            </Link>
            <Link href="/routing/nested" className="btn btn--primary">
              嵌套路由 →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

