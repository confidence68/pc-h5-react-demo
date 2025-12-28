/**
 * Babel 配置文件
 * 
 * 【同构项目中 Babel 的作用】
 * 1. 将 JSX 语法转换为 React.createElement() 调用
 * 2. 将 ES6+ 语法转换为兼容性更好的 ES5 语法
 * 3. 确保代码在 Node.js 服务端和浏览器端都能正常运行
 * 
 * 【为什么同构项目需要 Babel？】
 * - 服务端：Node.js 原生不支持 JSX 语法
 * - 客户端：需要兼容各种浏览器
 * - 统一转换：保证前后端代码执行结果一致
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // 目标环境配置
        // 服务端代码会被 webpack.server.js 中的 target: 'node' 覆盖
        // 客户端代码使用这里的配置
        targets: {
          browsers: ['> 1%', 'last 2 versions']
        }
      }
    ],
    [
      '@babel/preset-react',
      {
        // React 18 推荐使用新的 JSX 转换
        // 不再需要在每个文件顶部 import React
        runtime: 'automatic'
      }
    ]
  ]
};

