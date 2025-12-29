/**
 * 动态路由示例页面 - [slug]
 * 
 * 【本文件演示】
 * 1. 实际的动态路由文件结构
 * 2. 如何获取 params 参数
 * 3. 根据参数渲染不同内容
 */

import Link from 'next/link';

/**
 * 动态生成元数据
 * 
 * 【generateMetadata 说明】
 * - 可以根据动态参数生成不同的元数据
 * - 支持 async/await 获取数据
 * - 在服务端执行
 */
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  // 模拟文章数据
  const postTitles = {
    'getting-started': 'Next.js 入门指南',
    'routing-basics': '路由系统详解',
    'data-fetching': '数据获取最佳实践',
  };
  
  const title = postTitles[slug] || `文章: ${slug}`;
  
  return {
    title: title,
    description: `阅读文章 - ${title}`,
  };
}

/**
 * 动态路由页面组件
 * 
 * @param {Object} props
 * @param {Object} props.params - 路由参数
 * @param {string} props.params.slug - 动态路由段的值
 */
export default function DynamicPostPage({ params }) {
  const { slug } = params;
  
  // 模拟文章数据
  const posts = {
    'getting-started': {
      title: 'Next.js 入门指南',
      content: '这是一篇关于 Next.js 入门的文章...',
      author: 'Next.js Team',
      date: '2024-01-01',
    },
    'routing-basics': {
      title: '路由系统详解',
      content: '深入了解 Next.js App Router 的路由系统...',
      author: 'Next.js Team',
      date: '2024-01-15',
    },
    'data-fetching': {
      title: '数据获取最佳实践',
      content: '学习在 Next.js 中进行数据获取的各种方法...',
      author: 'Next.js Team',
      date: '2024-02-01',
    },
  };
  
  const post = posts[slug];
  
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">📄 动态路由示例</h1>
        <p className="page-header__subtitle">
          当前 slug 参数: <code style={{ 
            background: 'var(--bg-secondary)', 
            padding: '4px 8px', 
            borderRadius: '4px' 
          }}>{slug}</code>
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 参数展示 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🔍</span>
              路由参数解析
            </h2>
          </div>
          <div className="card__content">
            <div className="code-block">
              <div className="code-block__content">
                <pre>{`// 当前路由: /routing/dynamic/${slug}

// params 对象:
params = {
  slug: "${slug}"
}

// 在组件中获取:
export default function Page({ params }) {
  const { slug } = params;
  // slug = "${slug}"
}`}</pre>
              </div>
            </div>
          </div>
        </div>
        
        {/* 文章内容（如果存在） */}
        {post ? (
          <div className="card fade-in">
            <div className="card__header">
              <h2 className="card__title">
                <span className="card__title-icon">📝</span>
                {post.title}
              </h2>
              <p className="card__subtitle">
                作者: {post.author} | 日期: {post.date}
              </p>
            </div>
            <div className="card__content">
              <p>{post.content}</p>
              
              <div className="tip-box tip-box--success" style={{ marginTop: '16px' }}>
                ✅ 这个页面根据 URL 中的 <code>{slug}</code> 参数动态渲染不同内容。
                在实际项目中，可以根据参数从数据库或 API 获取数据。
              </div>
            </div>
          </div>
        ) : (
          <div className="card fade-in">
            <div className="card__header">
              <h2 className="card__title">
                <span className="card__title-icon">🔍</span>
                未知的 slug: {slug}
              </h2>
            </div>
            <div className="card__content">
              <p>
                这个 slug 没有对应的预设数据，但页面仍然可以渲染。
                这就是动态路由的强大之处！
              </p>
              
              <div className="tip-box tip-box--info" style={{ marginTop: '16px' }}>
                💡 你可以尝试在 URL 中输入任意的 slug 值，
                比如 <code>/routing/dynamic/my-custom-slug</code>
              </div>
            </div>
          </div>
        )}
        
        {/* 其他示例链接 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🔗</span>
              其他示例
            </h2>
          </div>
          <div className="card__content">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/routing/dynamic/getting-started" className="btn btn--secondary">
                getting-started
              </Link>
              <Link href="/routing/dynamic/routing-basics" className="btn btn--secondary">
                routing-basics
              </Link>
              <Link href="/routing/dynamic/data-fetching" className="btn btn--secondary">
                data-fetching
              </Link>
              <Link href="/routing/dynamic/custom-slug" className="btn btn--secondary">
                custom-slug
              </Link>
            </div>
          </div>
        </div>
        
        {/* 导航 */}
        <div className="card fade-in">
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/routing/dynamic" className="btn btn--secondary">
              ← 返回动态路由教学
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

