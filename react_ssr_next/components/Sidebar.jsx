/**
 * 侧边栏导航组件
 * 
 * 【组件说明】
 * 这是一个客户端组件（Client Component）
 * 因为需要使用 usePathname 获取当前路由路径
 * 
 * 【'use client' 指令】
 * - 标记组件为客户端组件
 * - 可以使用 useState, useEffect 等 React Hooks
 * - 可以使用浏览器 API
 * - 可以添加事件处理器
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * 导航菜单配置
 * 分组展示不同主题的教学内容
 */
const navSections = [
  {
    title: '入门',
    items: [
      { href: '/', icon: '🏠', label: '首页' },
      { href: '/introduction', icon: '📖', label: 'Next.js 简介' },
    ]
  },
  {
    title: '路由系统',
    items: [
      { href: '/routing', icon: '🛤️', label: '基础路由' },
      { href: '/routing/dynamic', icon: '🔄', label: '动态路由' },
      { href: '/routing/nested', icon: '📁', label: '嵌套路由' },
    ]
  },
  {
    title: '数据获取',
    items: [
      { href: '/data-fetching', icon: '📡', label: '数据获取概述' },
      { href: '/data-fetching/server', icon: '🖥️', label: '服务端获取' },
      { href: '/data-fetching/client', icon: '🌐', label: '客户端获取' },
    ]
  },
  {
    title: '组件类型',
    items: [
      { href: '/components/server', icon: '⚙️', label: 'Server Components' },
      { href: '/components/client', icon: '💻', label: 'Client Components' },
    ]
  },
  {
    title: 'API 路由',
    items: [
      { href: '/api-routes', icon: '🔌', label: 'API Routes 介绍' },
    ]
  },
  {
    title: '对比学习',
    items: [
      { href: '/comparison', icon: '⚖️', label: 'Next.js vs 手搓 SSR' },
    ]
  }
];

/**
 * 侧边栏组件
 */
export default function Sidebar() {
  // 获取当前路由路径
  // usePathname 是 next/navigation 提供的 Hook
  const pathname = usePathname();
  
  /**
   * 判断链接是否激活
   * @param {string} href - 链接路径
   * @returns {boolean} 是否激活
   */
  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };
  
  return (
    <aside className="sidebar">
      {/* Logo 区域 */}
      <div className="sidebar__header">
        <Link href="/" className="sidebar__logo">
          <div className="sidebar__logo-icon">⚡</div>
          <span className="sidebar__logo-text">Next.js 教学</span>
        </Link>
      </div>
      
      {/* 导航菜单 */}
      <nav className="sidebar__nav">
        {navSections.map((section) => (
          <div key={section.title} className="sidebar__section">
            {/* 分组标题 */}
            <div className="sidebar__section-title">
              {section.title}
            </div>
            
            {/* 导航链接 */}
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar__link ${isActive(item.href) ? 'sidebar__link--active' : ''}`}
              >
                <span className="sidebar__link-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

