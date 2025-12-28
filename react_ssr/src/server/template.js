/**
 * HTML 模板生成函数
 * 
 * 【模板的作用】
 * 将服务端渲染的 React HTML 嵌入到完整的 HTML 文档中
 * 
 * 【模板包含的关键元素】
 * 1. DOCTYPE 声明 - 告诉浏览器这是 HTML5 文档
 * 2. meta 标签 - 字符集、viewport 等
 * 3. CSS 文件引用 - 样式立即生效，避免 FOUC（无样式内容闪烁）
 * 4. <div id="root"> - React 应用挂载点，包含 SSR 内容
 * 5. JavaScript 文件引用 - 客户端 bundle，用于水合
 * 
 * 【为什么 CSS 在前，JS 在后？】
 * - CSS 放在 <head> 中，确保 HTML 渲染时样式已加载
 * - JS 放在 <body> 底部，避免阻塞 HTML 解析
 * - 这样用户能更快看到有样式的内容
 */

/**
 * 渲染完整的 HTML 模板
 * 
 * @param {Object} options - 模板选项
 * @param {string} options.appHtml - React 组件渲染的 HTML 字符串
 * @param {string} options.title - 页面标题
 * @returns {string} 完整的 HTML 文档
 */
function renderTemplate({ appHtml, title = 'React SSR Demo' }) {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!--
    【Meta 标签说明】
    charset: 字符编码
    viewport: 移动端适配关键设置
    - width=device-width: 宽度等于设备宽度
    - initial-scale=1.0: 初始缩放比例 1:1
    - maximum-scale=1.0: 禁止用户缩放（可选）
    - user-scalable=no: 禁止用户缩放（可选）
  -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  
  <!--
    【SEO 相关】
    SSR 的一个重要优势是 SEO 友好
    搜索引擎爬虫可以直接看到完整内容
  -->
  <meta name="description" content="React SSR 同构渲染教学演示项目">
  <meta name="keywords" content="React, SSR, 同构, 服务端渲染, hydrate">
  
  <!--
    【Open Graph 标签】
    用于社交媒体分享时的预览展示
    SSR 可以动态设置这些标签
  -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="React SSR 同构渲染教学演示项目">
  <meta property="og:type" content="website">
  
  <title>${title}</title>
  
  <!--
    【样式文件】
    由 webpack.client.js 构建生成
    放在 <head> 中确保样式先于内容加载
    避免 FOUC（Flash of Unstyled Content）
  -->
  <link rel="stylesheet" href="/styles.css">
  
  <!--
    【可选】预加载关键资源
    <link rel="preload" href="/bundle.js" as="script">
  -->
</head>
<body>
  <!--
    【React 应用挂载点】
    
    这是 SSR 的核心部分：
    - id="root" 是 React 应用的挂载点
    - 服务端渲染的 HTML 直接放在这里
    - 客户端 hydrateRoot 会找到这个元素进行水合
    
    【重要】
    服务端渲染的内容必须与客户端首次渲染一致
    否则会出现水合错误（Hydration Mismatch）
  -->
  <div id="root">${appHtml}</div>
  
  <!--
    【调试信息】
    这段注释在开发时有助于确认 SSR 是否生效
    生产环境可以移除
  -->
  <!-- SSR rendered at: ${new Date().toISOString()} -->
  
  <!--
    【客户端 JavaScript】
    
    由 webpack.client.js 构建生成
    放在 body 底部的原因：
    1. 不阻塞 HTML 解析和渲染
    2. 用户可以更快看到内容
    3. DOM 已准备好，可以直接操作
    
    【执行流程】
    1. 浏览器解析到这个 script 标签
    2. 下载 bundle.js
    3. 执行 bundle.js
    4. React 调用 hydrateRoot 进行水合
    5. 页面变得可交互
  -->
  <script src="/bundle.js"></script>
</body>
</html>
`.trim();
}

module.exports = { renderTemplate };

