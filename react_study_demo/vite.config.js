/**
 * Vite 配置文件
 * 
 * Vite 是一个现代化的前端构建工具，具有以下特点：
 * 1. 开发时使用原生 ES Module，无需打包，启动速度极快
 * 2. 生产环境使用 Rollup 进行打包，输出高度优化的静态资源
 * 3. 内置支持 TypeScript、JSX、CSS 等
 * 4. 热模块替换 (HMR) 速度极快
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // 插件配置
  // @vitejs/plugin-react 提供 React 的快速刷新和 JSX 转换
  plugins: [react()],
  
  // 路径别名配置
  // 允许使用 @ 符号代替 src 目录，简化导入路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  // 开发服务器配置
  server: {
    port: 3000,        // 开发服务器端口
    open: true,        // 启动时自动打开浏览器
    host: true         // 允许局域网访问
  },
  
  // 构建配置
  build: {
    outDir: 'dist',           // 输出目录
    sourcemap: true,          // 生成 sourcemap，便于调试
    // Rollup 特定选项
    rollupOptions: {
      output: {
        // 代码分割配置
        manualChunks: {
          // 将 React 相关库单独打包
          'react-vendor': ['react', 'react-dom'],
          // 将路由单独打包
          'router': ['react-router-dom'],
          // 将状态管理单独打包
          'redux': ['@reduxjs/toolkit', 'react-redux']
        }
      }
    }
  }
})

