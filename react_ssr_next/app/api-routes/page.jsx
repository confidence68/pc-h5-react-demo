/**
 * API Routes 教学页面
 * 
 * 【本页面教学内容】
 * 1. Next.js API Routes 介绍
 * 2. Route Handlers 用法
 * 3. 不同 HTTP 方法
 */

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import ApiDemo from '@/components/ApiDemo';

export const metadata = {
  title: 'API Routes',
  description: '学习 Next.js API Routes 的使用方法',
};

export default function ApiRoutesPage() {
  return (
    <>
      {/* 页面头部 */}
      <header className="page-header">
        <h1 className="page-header__title">🔌 API Routes</h1>
        <p className="page-header__subtitle">
          使用 Route Handlers 创建后端 API
        </p>
      </header>
      
      {/* 页面内容 */}
      <div className="page-content">
        {/* 什么是 API Routes */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🤔</span>
              什么是 API Routes？
            </h2>
          </div>
          <div className="card__content">
            <p>
              API Routes 让你可以在 Next.js 项目中创建<strong>后端 API 端点</strong>。
              在 App Router 中，使用 <code>route.js</code> 文件定义 Route Handlers。
            </p>
            
            <CodeBlock filename="文件结构">
{`app/
└── api/
    ├── hello/
    │   └── route.js    → /api/hello
    │
    ├── users/
    │   ├── route.js    → /api/users
    │   └── [id]/
    │       └── route.js → /api/users/:id
    │
    └── posts/
        └── route.js    → /api/posts`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 基本用法 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📝</span>
              基本用法
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="app/api/hello/route.js">
{`// 定义 GET 请求处理器
export async function GET(request) {
  return Response.json({
    message: 'Hello, Next.js!',
    timestamp: new Date().toISOString()
  });
}

// 定义 POST 请求处理器
export async function POST(request) {
  // 获取请求体
  const body = await request.json();
  
  return Response.json({
    received: body,
    message: '数据已接收'
  });
}`}
            </CodeBlock>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>支持的 HTTP 方法</h4>
            <div className="grid grid--3">
              <div className="feature-list__item">
                <span className="feature-list__icon">🟢</span>
                <code>GET</code>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🔵</span>
                <code>POST</code>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🟡</span>
                <code>PUT</code>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🟠</span>
                <code>PATCH</code>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">🔴</span>
                <code>DELETE</code>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__icon">⚪</span>
                <code>HEAD/OPTIONS</code>
              </div>
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
            <p className="card__subtitle">调用本项目的 API Route</p>
          </div>
          <div className="card__content">
            <ApiDemo />
          </div>
        </div>
        
        {/* 动态路由参数 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🔄</span>
              动态路由参数
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="app/api/users/[id]/route.js">
{`// 获取动态参数
export async function GET(request, { params }) {
  const { id } = params;
  
  // 模拟数据库查询
  const user = await db.user.findUnique({
    where: { id }
  });
  
  if (!user) {
    return Response.json(
      { error: '用户不存在' },
      { status: 404 }
    );
  }
  
  return Response.json(user);
}

// 更新用户
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  
  const user = await db.user.update({
    where: { id },
    data: body
  });
  
  return Response.json(user);
}

// 删除用户
export async function DELETE(request, { params }) {
  const { id } = params;
  
  await db.user.delete({
    where: { id }
  });
  
  return Response.json({ message: '用户已删除' });
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 请求和响应 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">📨</span>
              处理请求和响应
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="请求处理">
{`export async function POST(request) {
  // 获取 URL 参数
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  
  // 获取请求头
  const authHeader = request.headers.get('Authorization');
  
  // 获取请求体（JSON）
  const body = await request.json();
  
  // 获取表单数据
  // const formData = await request.formData();
  
  // 返回响应
  return Response.json(
    { success: true },
    {
      status: 200,
      headers: {
        'X-Custom-Header': 'value'
      }
    }
  );
}

// 其他响应方式
// return new Response('文本内容');
// return new Response(JSON.stringify(data));
// return Response.redirect('/new-url');`}
            </CodeBlock>
          </div>
        </div>
        
        {/* CORS 和中间件 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">🔒</span>
              CORS 配置
            </h2>
          </div>
          <div className="card__content">
            <CodeBlock filename="处理 CORS">
{`export async function GET(request) {
  const data = { message: 'Hello' };
  
  return Response.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

// 处理 OPTIONS 预检请求
export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}`}
            </CodeBlock>
          </div>
        </div>
        
        {/* 与手搓 SSR 对比 */}
        <div className="card fade-in">
          <div className="card__header">
            <h2 className="card__title">
              <span className="card__title-icon">⚖️</span>
              与手搓 SSR 对比
            </h2>
          </div>
          <div className="card__content">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>方面</th>
                  <th>手搓 Express</th>
                  <th>Next.js API Routes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>路由定义</td>
                  <td><code>app.get('/api/hello', handler)</code></td>
                  <td>创建 <code>api/hello/route.js</code></td>
                </tr>
                <tr>
                  <td>参数获取</td>
                  <td><code>req.params, req.query</code></td>
                  <td><code>params, searchParams</code></td>
                </tr>
                <tr>
                  <td>响应发送</td>
                  <td><code>res.json(data)</code></td>
                  <td><code>Response.json(data)</code></td>
                </tr>
                <tr>
                  <td>与前端集成</td>
                  <td>需要单独配置</td>
                  <td>开箱即用</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 导航 */}
        <div className="card fade-in">
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <Link href="/components/client" className="btn btn--secondary">
              ← Client Components
            </Link>
            <Link href="/comparison" className="btn btn--primary">
              对比学习 →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

