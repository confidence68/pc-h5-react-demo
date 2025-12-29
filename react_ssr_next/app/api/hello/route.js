/**
 * API Route 示例 - /api/hello
 * 
 * 【Route Handler 说明】
 * - 这是一个 API 端点，处理 HTTP 请求
 * - 文件名必须是 route.js（或 route.ts）
 * - 导出的函数名对应 HTTP 方法
 * 
 * 【与 Express 对比】
 * Express: app.get('/api/hello', (req, res) => { ... })
 * Next.js: export async function GET(request) { ... }
 */

/**
 * 处理 GET 请求
 * 访问: GET /api/hello
 */
export async function GET(request) {
  // 获取 URL 搜索参数
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'World';
  
  // 返回 JSON 响应
  return Response.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    method: 'GET',
    description: '这是一个 Next.js API Route 示例'
  });
}

/**
 * 处理 POST 请求
 * 访问: POST /api/hello
 */
export async function POST(request) {
  try {
    // 获取请求体
    const body = await request.json();
    
    // 模拟处理数据
    const result = {
      received: body,
      processed: true,
      timestamp: new Date().toISOString(),
      method: 'POST'
    };
    
    return Response.json(result, { status: 201 });
    
  } catch (error) {
    return Response.json(
      { error: '无效的 JSON 数据' },
      { status: 400 }
    );
  }
}

