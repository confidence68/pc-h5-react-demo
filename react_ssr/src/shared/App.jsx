/**
 * App 主组件 - 同构应用的根组件
 * 
 * 【同构应用的核心组件】
 * 这个组件会在服务端和客户端都执行：
 * - 服务端：renderToString(<App />) 时执行
 * - 客户端：hydrateRoot(container, <App />) 时执行
 * 
 * 【设计原则】
 * 1. 组件结构和初始状态必须保证服务端和客户端一致
 * 2. 避免在组件顶层使用浏览器 API
 * 3. 使用 React Router 处理路由（支持 SSR）
 */

// 引入路由组件
import { Routes, Route } from 'react-router-dom';

// 引入共享组件
import Header from './components/Header';
import Footer from './components/Footer';

// 引入页面组件
import Home from './pages/Home';
import About from './pages/About';
import Counter from './pages/Counter';

// 引入样式
import './styles/global.css';
import './styles/components.css';

/**
 * 应用根组件
 * 
 * 【路由配置说明】
 * - 使用 React Router v6 的 Routes 和 Route 组件
 * - 服务端需要用 StaticRouter 包裹
 * - 客户端需要用 BrowserRouter 包裹
 * - 具体的 Router 包裹在 client/index.jsx 和 server/index.js 中完成
 */
function App() {
  return (
    <div className="app">
      {/* 页面头部 - 包含导航 */}
      <Header />
      
      {/* 主内容区域 - 根据路由渲染不同页面 */}
      <main>
        <Routes>
          {/* 首页 - SSR 原理概述 */}
          <Route path="/" element={<Home />} />
          
          {/* 关于页 - SSR 流程详解 */}
          <Route path="/about" element={<About />} />
          
          {/* 计数器页 - 交互功能演示 */}
          <Route path="/counter" element={<Counter />} />
          
          {/* 404 页面 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* 页面底部 */}
      <Footer />
    </div>
  );
}

/**
 * 404 页面组件
 */
function NotFound() {
  return (
    <div className="page">
      <div className="page__card" style={{ textAlign: 'center' }}>
        <h2 className="page__title">😅 404</h2>
        <p className="page__text">页面不存在</p>
      </div>
    </div>
  );
}

export default App;

