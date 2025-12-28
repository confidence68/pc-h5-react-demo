/**
 * Header 组件 - 同构组件示例
 * 
 * 【同构组件设计要点】
 * 1. 避免直接访问浏览器 API（window, document, localStorage 等）
 * 2. 使用 React Router 的 Link 组件进行导航（支持 SSR）
 * 3. 如果必须使用浏览器 API，放在 useEffect 中（只在客户端执行）
 * 
 * 【为什么这样设计？】
 * - 服务端没有 window 和 document 对象
 * - useEffect 只在客户端执行，不会在服务端运行
 * - 这样可以保证组件在服务端和客户端都能正常渲染
 */
import { Link, useLocation } from 'react-router-dom';

/**
 * 页面头部组件
 * 包含标题和导航链接
 */
function Header() {
  // 使用 React Router 的 useLocation 获取当前路径
  // 这个 Hook 在 SSR 中也能正常工作
  const location = useLocation();
  
  // 导航配置
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/about', label: '关于' },
    { path: '/counter', label: '计数器' }
  ];
  
  /**
   * 判断当前导航是否激活
   * @param {string} path - 导航路径
   * @returns {boolean} 是否激活
   */
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header className="header">
      {/* 标题 */}
      <h1 className="header__title">
        🚀 React SSR 教学演示
      </h1>
      
      {/* 导航栏 */}
      <nav className="header__nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`header__nav-link ${isActive(item.path) ? 'header__nav-link--active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;

