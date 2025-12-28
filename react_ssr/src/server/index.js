/**
 * 服务端入口文件 - Express + React SSR
 * 
 * 【核心职责】
 * 1. 创建 Express 服务器
 * 2. 处理静态资源请求
 * 3. 处理页面请求，执行服务端渲染
 * 4. 返回完整的 HTML 给客户端
 * 
 * 【SSR 关键步骤】
 * 步骤 1：使用 ReactDOMServer.renderToString() 将 React 组件渲染为 HTML
 * 步骤 2：将渲染的 HTML 嵌入到完整的 HTML 模板中
 * 步骤 3：返回给客户端，客户端加载 JS 后进行水合
 */

// Node.js 内置模块
const path = require('path');

// Express 框架
const express = require('express');

// 【关键】React 服务端渲染 API
// renderToString: 将 React 元素渲染为 HTML 字符串
const ReactDOMServer = require('react-dom/server');

// React - 需要在服务端使用 createElement
const React = require('react');

// React Router 服务端路由组件
// StaticRouter: 专为服务端设计的路由组件
// 不同于 BrowserRouter，它不依赖浏览器 history API
const { StaticRouter } = require('react-router-dom/server');

// 共享的 App 组件
// 这个组件在服务端和客户端都会使用（同构）
const App = require('../shared/App').default;

// HTML 模板函数
const { renderTemplate } = require('./template');

// 创建 Express 应用实例
const app = express();

// 定义端口号
const PORT = process.env.PORT || 3000;

/**
 * 静态资源中间件
 * 
 * 【作用】
 * - 提供 public 目录下的静态文件服务
 * - 包括客户端 bundle.js 和 styles.css
 * - 这些文件由 webpack.client.js 构建生成
 */
app.use(express.static(path.join(__dirname, '../public')));

/**
 * 【核心】处理所有页面请求的 SSR 中间件
 * 
 * 这里是 SSR 的核心逻辑：
 * 1. 获取请求的 URL
 * 2. 使用 StaticRouter 包裹 App 组件（提供路由上下文）
 * 3. 调用 renderToString 将组件渲染为 HTML
 * 4. 将 HTML 嵌入模板返回给客户端
 */
app.get('*', (req, res) => {
  // 记录开始时间，用于计算渲染耗时
  const startTime = Date.now();
  
  console.log(`\n📥 收到请求: ${req.url}`);
  console.log('🔄 开始服务端渲染...');
  
  try {
    /**
     * 【步骤 1】使用 renderToString 将 React 组件渲染为 HTML 字符串
     * 
     * 【关键点】
     * - StaticRouter 需要传入 location（当前 URL）
     * - 服务端没有 window.location，需要从请求对象获取
     * - renderToString 是同步的，会阻塞直到渲染完成
     */
    const appHtml = ReactDOMServer.renderToString(
      // 使用 React.createElement 创建元素
      // 因为服务端 JS 文件没有 JSX 转换
      // 注：这里其实已经被 babel 转换了，但为了教学清晰使用 createElement
      React.createElement(
        StaticRouter,
        { location: req.url }, // 传入当前请求的 URL
        React.createElement(App)
      )
    );
    
    // 计算渲染耗时
    const renderTime = Date.now() - startTime;
    console.log(`✅ 渲染完成，耗时: ${renderTime}ms`);
    console.log(`📝 HTML 长度: ${appHtml.length} 字符`);
    
    /**
     * 【步骤 2】将渲染的 HTML 嵌入完整的 HTML 模板
     * 
     * 模板包含：
     * - DOCTYPE 声明和 HTML 结构
     * - meta 标签（viewport 等）
     * - CSS 样式文件引用
     * - 服务端渲染的 HTML 内容
     * - 客户端 JavaScript 文件引用
     */
    const fullHtml = renderTemplate({
      appHtml,
      title: 'React SSR 教学演示',
      // 可以传入其他 meta 信息
    });
    
    /**
     * 【步骤 3】返回完整的 HTML 给客户端
     * 
     * 客户端收到后：
     * 1. 浏览器解析 HTML，显示内容
     * 2. 加载 bundle.js
     * 3. React 执行 hydrateRoot 进行水合
     * 4. 页面变得可交互
     */
    res.status(200).send(fullHtml);
    
    console.log('📤 响应已发送\n');
    
  } catch (error) {
    // 错误处理
    console.error('❌ SSR 渲染错误:', error);
    
    // 返回错误页面
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>服务器错误</title>
        </head>
        <body>
          <h1>服务器渲染错误</h1>
          <pre>${error.message}</pre>
        </body>
      </html>
    `);
  }
});

/**
 * 启动服务器
 */
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 React SSR 服务器已启动！');
  console.log(`📍 访问地址: http://localhost:${PORT}`);
  console.log('='.repeat(50));
  console.log('\n【SSR 流程说明】');
  console.log('1. 浏览器请求页面');
  console.log('2. 服务端执行 renderToString() 生成 HTML');
  console.log('3. 返回完整 HTML 给浏览器');
  console.log('4. 浏览器显示内容，加载 JS');
  console.log('5. React hydrateRoot() 水合页面');
  console.log('6. 页面变得可交互\n');
});

