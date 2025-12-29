# Next.js SSR 教学项目

这是一个 Next.js 14 教学演示项目，使用 App Router，旨在帮助学习者理解 Next.js 的核心概念和最佳实践。

## 📚 学习内容

本项目涵盖以下 Next.js 核心知识点：

### 1. 路由系统
- **基础路由** - 基于文件系统的路由机制
- **动态路由** - `[param]` 动态路由段
- **嵌套路由** - layout.jsx 嵌套布局
- **路由组** - `(group)` 组织代码

### 2. 数据获取
- **服务端获取** - Server Component 中直接 async/await
- **客户端获取** - useEffect + useState 模式
- **缓存策略** - cache、revalidate 配置

### 3. 组件类型
- **Server Components** - 默认组件类型，服务端渲染
- **Client Components** - 使用 'use client' 指令，支持交互

### 4. API Routes
- **Route Handlers** - 创建后端 API 端点
- **HTTP 方法** - GET、POST、PUT、DELETE 等
- **动态参数** - 处理路由参数

### 5. 对比学习
- **Next.js vs 手搓 SSR** - 详细对比两种实现方式

## 🚀 快速开始

```bash
# 1. 进入项目目录
cd react_ssr_next

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问
http://localhost:3000
```

## 📁 项目结构

```
react_ssr_next/
├── app/                          # App Router 目录
│   ├── layout.jsx               # 根布局
│   ├── page.jsx                 # 首页
│   ├── globals.css              # 全局样式
│   │
│   ├── introduction/            # Next.js 简介
│   │   └── page.jsx
│   │
│   ├── routing/                 # 路由教学
│   │   ├── page.jsx            # 基础路由
│   │   ├── dynamic/            # 动态路由
│   │   │   ├── page.jsx
│   │   │   └── [slug]/
│   │   │       └── page.jsx    # 动态路由示例
│   │   └── nested/
│   │       └── page.jsx        # 嵌套路由
│   │
│   ├── data-fetching/          # 数据获取教学
│   │   ├── page.jsx            # 概述
│   │   ├── server/
│   │   │   └── page.jsx        # 服务端获取
│   │   └── client/
│   │       └── page.jsx        # 客户端获取
│   │
│   ├── components/             # 组件类型教学
│   │   ├── server/
│   │   │   └── page.jsx        # Server Components
│   │   └── client/
│   │       └── page.jsx        # Client Components
│   │
│   ├── api-routes/             # API Routes 教学
│   │   └── page.jsx
│   │
│   ├── api/                    # API 端点
│   │   └── hello/
│   │       └── route.js        # /api/hello
│   │
│   └── comparison/             # 对比学习
│       └── page.jsx
│
├── components/                  # 共享组件
│   ├── Sidebar.jsx             # 侧边栏导航
│   ├── CodeBlock.jsx           # 代码块展示
│   ├── CounterDemo.jsx         # 计数器演示
│   ├── ClientFetchDemo.jsx     # 客户端获取演示
│   └── ApiDemo.jsx             # API 调用演示
│
├── next.config.js              # Next.js 配置
├── jsconfig.json               # 路径别名配置
├── package.json                # 项目配置
└── README.md                   # 项目说明
```

## 🔑 核心概念

### Server Components vs Client Components

```jsx
// Server Component（默认）
// 不需要任何指令
export default async function ServerPage() {
  const data = await fetchData(); // 可以直接 async
  return <div>{data}</div>;
}

// Client Component
// 需要添加 'use client' 指令
'use client'
import { useState } from 'react';

export default function ClientPage() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 数据获取

```jsx
// 服务端获取（Server Component）
export default async function Page() {
  // 默认缓存（SSG）
  const data1 = await fetch('https://api.example.com/data');
  
  // 禁用缓存（SSR）
  const data2 = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  });
  
  // 定时重新验证（ISR）
  const data3 = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  });
}
```

### API Routes

```js
// app/api/hello/route.js
export async function GET(request) {
  return Response.json({ message: 'Hello!' });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ received: body });
}
```

## 📖 与手搓 SSR 对比

| 方面 | 手搓 SSR | Next.js |
|------|----------|---------|
| 服务端渲染 | 手动 `renderToString` | 自动处理 |
| 客户端水合 | 手动 `hydrateRoot` | 自动处理 |
| 路由配置 | React Router 手动配置 | 基于文件自动生成 |
| 构建配置 | 两套 Webpack 配置 | 零配置 |
| 代码分割 | 手动配置 | 自动优化 |

## 🎯 学习路径建议

1. **先学习手搓 SSR** (`react_ssr` 项目)
   - 理解 SSR 核心原理
   - 了解 renderToString 和 hydrateRoot
   - 明白服务端和客户端代码分离

2. **再学习 Next.js** (本项目)
   - 体验框架带来的便利
   - 学习 App Router 新特性
   - 掌握 Server/Client Components

## 📝 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 🔗 相关资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [App Router 文档](https://nextjs.org/docs/app)

## 📌 注意事项

1. **Node.js 版本**: 需要 Node.js 18.17 或更高版本
2. **包管理器**: 推荐使用 npm 或 pnpm
3. **端口**: 默认运行在 3000 端口

## 🤝 配套项目

- `react_ssr` - 手搓 SSR 项目，学习底层原理
- `react_study_demo` - React 基础学习项目

