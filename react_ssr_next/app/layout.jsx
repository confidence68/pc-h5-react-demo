/**
 * 根布局组件 - Next.js App Router 核心概念
 * 
 * 【layout.jsx 的作用】
 * 1. 定义应用的根布局结构
 * 2. 这个文件是必须的，Next.js App Router 要求必须有 app/layout.jsx
 * 3. 所有页面都会被这个布局包裹
 * 4. 布局组件不会在页面切换时重新渲染（保持状态）
 * 
 * 【Next.js App Router 布局特点】
 * - 布局可以嵌套：每个目录都可以有自己的 layout.jsx
 * - 布局默认是服务端组件（Server Component）
 * - 可以在布局中进行数据获取
 * - 支持并行路由和拦截路由
 */

// 引入全局样式
import './globals.css';

// 引入侧边栏组件
import Sidebar from '@/components/Sidebar';

/**
 * 元数据配置
 * 
 * 【Next.js 元数据 API】
 * - 可以导出 metadata 对象来设置页面元数据
 * - 支持静态和动态元数据
 * - 自动处理 SEO 相关标签
 */
export const metadata = {
  title: {
    default: 'Next.js SSR 教学项目',
    template: '%s | Next.js 教学'
  },
  description: 'Next.js App Router 服务端渲染教学演示项目',
  keywords: ['Next.js', 'React', 'SSR', '服务端渲染', '教学'],
};

/**
 * 根布局组件
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子页面内容
 */
export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      {/*
        【head 标签说明】
        Next.js App Router 自动处理 <head> 内容
        通过 metadata 导出配置元数据
        不需要手动添加 <head> 标签
      */}
      <body>
        {/*
          【布局结构】
          采用侧边栏 + 主内容区的经典 PC 布局
          侧边栏固定在左侧，包含导航菜单
          主内容区显示当前页面
        */}
        <div className="app-container">
          {/* 侧边栏导航 */}
          <Sidebar />
          
          {/* 主内容区域 */}
          <main className="main-content">
            {/*
              【children 说明】
              children 是当前路由对应的页面组件
              例如访问 /routing 时，children 就是 app/routing/page.jsx 的内容
            */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

