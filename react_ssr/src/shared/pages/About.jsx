/**
 * About 页面组件 - SSR 流程详解
 * 
 * 【本页面教学内容】
 * 详细展示 React SSR 的完整流程，包括：
 * 1. 服务端渲染阶段
 * 2. HTML 传输阶段
 * 3. 客户端水合阶段
 */
import { useState, useEffect } from 'react';

function About() {
  // 用于演示水合时机
  const [hydrated, setHydrated] = useState(false);
  const [renderTime, setRenderTime] = useState('计算中...');
  
  useEffect(() => {
    // 标记已水合
    setHydrated(true);
    
    // 记录水合完成时间（只能在客户端获取）
    const now = new Date().toLocaleTimeString('zh-CN');
    setRenderTime(now);
  }, []);
  
  return (
    <div className="page">
      {/* SSR 流程图解 */}
      <div className="page__card">
        <h2 className="page__title">📖 SSR 完整流程详解</h2>
        <p className="page__text">
          理解 SSR 的工作流程是掌握同构开发的关键。
          下面让我们一步步拆解整个过程。
        </p>
      </div>
      
      {/* 步骤 1 */}
      <div className="page__card">
        <h3 className="page__subtitle">🔹 步骤 1：服务端渲染</h3>
        <p className="page__text">
          当用户访问页面时，服务端执行以下操作：
        </p>
        
        <div className="code-block">
          <pre className="code-block__text">
            <span className="code-block__comment">// server/index.js</span>{'\n'}
            <span className="code-block__keyword">import</span> ReactDOMServer <span className="code-block__keyword">from</span> <span className="code-block__string">'react-dom/server'</span>;{'\n'}
            <span className="code-block__keyword">import</span> App <span className="code-block__keyword">from</span> <span className="code-block__string">'../shared/App'</span>;{'\n\n'}
            <span className="code-block__comment">// 将 React 组件渲染为 HTML 字符串</span>{'\n'}
            <span className="code-block__keyword">const</span> html = ReactDOMServer.<span className="code-block__keyword">renderToString</span>({'<App />'}){'\n\n'}
            <span className="code-block__comment">// html 内容示例：</span>{'\n'}
            <span className="code-block__comment">// {'<div class="app"><header>...</header></div>'}</span>
          </pre>
        </div>
        
        <ul className="list">
          <li className="list__item">执行组件函数，获取虚拟 DOM</li>
          <li className="list__item">将虚拟 DOM 转换为 HTML 字符串</li>
          <li className="list__item">useState 初始值会被使用</li>
          <li className="list__item">useEffect 不会执行</li>
        </ul>
      </div>
      
      {/* 步骤 2 */}
      <div className="page__card">
        <h3 className="page__subtitle">🔹 步骤 2：嵌入 HTML 模板</h3>
        <p className="page__text">
          服务端将渲染结果嵌入到 HTML 模板中：
        </p>
        
        <div className="code-block">
          <pre className="code-block__text">
            <span className="code-block__comment">{'<!-- HTML 模板 -->'}</span>{'\n'}
            <span className="code-block__keyword">{'<!DOCTYPE html>'}</span>{'\n'}
            <span className="code-block__string">{'<html>'}</span>{'\n'}
            <span className="code-block__string">{'<head>'}</span>{'\n'}
            {'  '}<span className="code-block__string">{'<link rel="stylesheet" href="/styles.css">'}</span>{'\n'}
            <span className="code-block__string">{'</head>'}</span>{'\n'}
            <span className="code-block__string">{'<body>'}</span>{'\n'}
            {'  '}<span className="code-block__comment">{'<!-- 服务端渲染的内容注入这里 -->'}</span>{'\n'}
            {'  '}<span className="code-block__string">{'<div id="root">'}</span>{'${html}'}<span className="code-block__string">{'</div>'}</span>{'\n'}
            {'  '}<span className="code-block__comment">{'<!-- 客户端 JS 用于水合 -->'}</span>{'\n'}
            {'  '}<span className="code-block__string">{'<script src="/bundle.js"></script>'}</span>{'\n'}
            <span className="code-block__string">{'</body>'}</span>{'\n'}
            <span className="code-block__string">{'</html>'}</span>
          </pre>
        </div>
        
        <ul className="list">
          <li className="list__item">HTML 包含完整的页面内容</li>
          <li className="list__item">CSS 可以立即应用样式</li>
          <li className="list__item">JS bundle 用于后续水合</li>
        </ul>
      </div>
      
      {/* 步骤 3 */}
      <div className="page__card">
        <h3 className="page__subtitle">🔹 步骤 3：客户端水合</h3>
        <p className="page__text">
          浏览器加载 JS 后，React 进行"水合"操作：
        </p>
        
        <div className="code-block">
          <pre className="code-block__text">
            <span className="code-block__comment">// client/index.jsx</span>{'\n'}
            <span className="code-block__keyword">import</span> {'{ hydrateRoot }'} <span className="code-block__keyword">from</span> <span className="code-block__string">'react-dom/client'</span>;{'\n'}
            <span className="code-block__keyword">import</span> App <span className="code-block__keyword">from</span> <span className="code-block__string">'../shared/App'</span>;{'\n\n'}
            <span className="code-block__comment">// 水合：复用服务端渲染的 DOM</span>{'\n'}
            <span className="code-block__comment">// 不会重新创建 DOM，只绑定事件</span>{'\n'}
            hydrateRoot({'\n'}
            {'  '}document.getElementById(<span className="code-block__string">'root'</span>),{'\n'}
            {'  '}{'<App />'}{'\n'}
            );
          </pre>
        </div>
        
        <ul className="list">
          <li className="list__item">对比服务端 HTML 和客户端渲染结果</li>
          <li className="list__item">复用已有 DOM，不重新创建</li>
          <li className="list__item">绑定事件处理器</li>
          <li className="list__item">执行 useEffect</li>
          <li className="list__item">页面变得完全可交互</li>
        </ul>
      </div>
      
      {/* 水合状态演示 */}
      <div className="page__card">
        <h3 className="page__subtitle">🧪 水合状态演示</h3>
        <p className="page__text">
          下面的状态可以帮助你理解水合时机：
        </p>
        
        <div className="list">
          <div className="list__item">
            水合状态：<strong>{hydrated ? '✅ 已水合' : '⏳ 未水合'}</strong>
          </div>
          <div className="list__item">
            水合时间：<strong>{renderTime}</strong>
          </div>
        </div>
        
        <p className="page__text" style={{ marginTop: '2.67vw', fontSize: '3.2vw', color: '#888' }}>
          💡 提示：如果你看到"已水合"，说明客户端 JS 已经执行完成。
          刷新页面后，你可能会短暂看到"未水合"状态。
        </p>
      </div>
      
      {/* renderToString vs renderToPipeableStream */}
      <div className="page__card">
        <h3 className="page__subtitle">📚 扩展：渲染 API 对比</h3>
        
        <p className="page__text"><strong>renderToString()</strong></p>
        <ul className="list">
          <li className="list__item">同步渲染，一次性返回完整 HTML</li>
          <li className="list__item">简单易用，适合教学和小型项目</li>
          <li className="list__item">不支持 Suspense 流式传输</li>
        </ul>
        
        <p className="page__text" style={{ marginTop: '2.67vw' }}><strong>renderToPipeableStream()</strong></p>
        <ul className="list">
          <li className="list__item">React 18 新增的流式渲染 API</li>
          <li className="list__item">支持 Suspense 和流式传输</li>
          <li className="list__item">可以更早地发送 HTML 给浏览器</li>
          <li className="list__item">更好的性能，适合生产环境</li>
        </ul>
      </div>
    </div>
  );
}

export default About;

