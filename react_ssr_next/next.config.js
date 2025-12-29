/**
 * Next.js 配置文件
 * 
 * 【配置文件说明】
 * next.config.js 是 Next.js 的核心配置文件
 * 在这里可以自定义 Next.js 的各种行为
 * 
 * 【常用配置项】
 * - reactStrictMode: 启用 React 严格模式
 * - images: 图片优化配置
 * - env: 环境变量
 * - redirects: 重定向规则
 * - rewrites: 重写规则
 * - headers: 自定义 HTTP 头
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 React 严格模式
  // 帮助发现潜在问题，如不安全的生命周期方法
  reactStrictMode: true,

  // 实验性功能配置
  experimental: {
    // 服务端 Actions（Server Actions）
    // 允许在服务端直接处理表单提交等操作
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },

  // 图片优化配置
  images: {
    // 允许的远程图片域名
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // 环境变量（可选）
  // 这些变量会在构建时注入
  env: {
    SITE_NAME: 'Next.js SSR 教学项目',
  },
};

module.exports = nextConfig;

