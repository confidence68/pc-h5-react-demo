/**
 * Home 页面组件 - SSR 原理演示
 * 
 * 【同构组件的生命周期】
 * 
 * 服务端渲染阶段：
 * 1. 组件被 renderToString 调用
 * 2. 执行组件函数，获取初始 JSX
 * 3. useState 的初始值会被使用
 * 4. useEffect 不会执行（只在客户端执行）
 * 5. 返回 HTML 字符串
 * 
 * 客户端水合阶段：
 * 1. React 通过 hydrateRoot 接管 DOM
 * 2. 对比服务端 HTML 和客户端渲染结果
 * 3. 绑定事件监听器
 * 4. useEffect 开始执行
 * 5. 组件变成完全可交互的
 */
import { useState, useEffect } from 'react';

function Home() {
  // 【关键】这个状态在服务端和客户端都会被初始化
  // 服务端：初始值 'server'，但不会看到 useEffect 的修改
  // 客户端：水合后 useEffect 执行，更新为 'client'
  const [renderEnv, setRenderEnv] = useState('server');
  
  // 【关键】useEffect 只在客户端执行
  // 这是在 SSR 中区分服务端和客户端代码的关键技术
  useEffect(() => {
    // 这段代码只会在浏览器中运行
    // 服务端渲染时不会执行
    setRenderEnv('client');
    
    // 可以安全地使用浏览器 API
    console.log('🎉 客户端水合完成！');
    console.log('📍 当前 URL:', window.location.href);
  }, []);
  
  return (
    <div className="page">
      {/* SSR 状态指示器 */}
      <div className={`ssr-indicator ssr-indicator--${renderEnv}`}>
        {renderEnv === 'server' ? '🖥️ SSR 渲染' : '🌐 客户端已水合'}
      </div>
      
      {/* 欢迎卡片 */}
      <div className="page__card">
        <h2 className="page__title">👋 欢迎来到 React SSR 教学项目</h2>
        <p className="page__text">
          这是一个手动实现的 React 同构渲染演示项目，
          帮助你深入理解 SSR 的核心原理。
        </p>
      </div>
      
      {/* 什么是 SSR */}
      <div className="page__card">
        <h3 className="page__subtitle">🤔 什么是 SSR（服务端渲染）？</h3>
        <p className="page__text">
          SSR 是指在服务器端将 React 组件渲染成 HTML 字符串，
          然后发送给浏览器。浏览器收到后直接显示内容，
          再由 React 在客户端"水合"（hydrate）这些 HTML，使其变得可交互。
        </p>
        
        <div className="code-block">
          <pre className="code-block__text">
            <span className="code-block__comment">// 服务端渲染流程</span>{'\n'}
            <span className="code-block__keyword">const</span> html = ReactDOMServer.<span className="code-block__keyword">renderToString</span>({'<App />'}){'\n'}
            <span className="code-block__comment">// 返回给浏览器的 HTML 包含完整内容</span>
          </pre>
        </div>
      </div>
      
      {/* SSR 优势 */}
      <div className="page__card">
        <h3 className="page__subtitle">✨ SSR 的优势</h3>
        <ul className="list">
          <li className="list__item">首屏加载更快 - 无需等待 JS 执行</li>
          <li className="list__item">SEO 友好 - 搜索引擎可以抓取完整内容</li>
          <li className="list__item">更好的用户体验 - 减少白屏时间</li>
          <li className="list__item">社交分享友好 - 支持 OG 标签预览</li>
        </ul>
      </div>
      
      {/* 核心概念 */}
      <div className="page__card">
        <h3 className="page__subtitle">🔑 核心概念</h3>
        
        <p className="page__text"><strong>1. renderToString()</strong></p>
        <p className="page__text">
          将 React 组件树转换为 HTML 字符串，在服务端执行。
        </p>
        
        <p className="page__text"><strong>2. hydrateRoot()</strong></p>
        <p className="page__text">
          在客户端"水合"服务端渲染的 HTML，绑定事件处理器，使页面可交互。
        </p>
        
        <p className="page__text"><strong>3. 同构代码</strong></p>
        <p className="page__text">
          同一套代码在服务端和客户端都能运行，需要注意避免在服务端使用浏览器 API。
        </p>
      </div>
      
      {/* 同构注意事项 */}
      <div className="page__card">
        <h3 className="page__subtitle">⚠️ 同构开发注意事项</h3>
        <ul className="list">
          <li className="list__item">避免在组件顶层使用 window/document</li>
          <li className="list__item">将浏览器 API 调用放在 useEffect 中</li>
          <li className="list__item">服务端和客户端的初始渲染结果必须一致</li>
          <li className="list__item">使用环境判断：typeof window !== 'undefined'</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;

