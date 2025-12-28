/**
 * Webpack 服务端构建配置
 * 
 * 【服务端构建的目标】
 * 1. 将包含 JSX 的服务端代码转换为 Node.js 可执行的代码
 * 2. 保持 Node.js 模块系统（CommonJS）
 * 3. 排除 node_modules 中的包（运行时从 node_modules 加载）
 * 
 * 【同构项目中服务端构建的特点】
 * - target 设为 'node'，针对 Node.js 环境优化
 * - 使用 webpack-node-externals 排除 node_modules
 * - 不需要代码分割和提取 CSS（这些是客户端的需求）
 * 
 * 【为什么服务端代码也需要 Webpack？】
 * 1. Node.js 原生不支持 JSX 语法
 * 2. 需要 Babel 转换 JSX 为 React.createElement 调用
 * 3. 保证服务端和客户端使用相同的组件代码
 */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // 开发模式
  mode: 'development',
  
  // 【关键】指定目标环境为 Node.js
  // 这会影响：
  // 1. 输出的模块格式（CommonJS）
  // 2. 内置模块的处理方式
  // 3. 某些优化策略
  target: 'node',
  
  // 服务端入口文件
  entry: './src/server/index.js',
  
  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  
  // 【关键】排除 node_modules
  // 服务端代码运行时会直接从 node_modules 加载依赖
  // 这样做的好处：
  // 1. 减小打包体积
  // 2. 避免某些 Node.js 原生模块的兼容问题
  // 3. 加快构建速度
  externals: [nodeExternals()],
  
  // 模块解析规则
  module: {
    rules: [
      {
        // 处理 JS/JSX 文件
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        // 【关键】服务端 CSS 处理
        // 服务端不需要实际的 CSS，只需要忽略 import 语句
        // 返回空对象，避免 import 报错
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              // 服务端不需要实际处理 CSS
              // 只导出类名映射（如果使用 CSS Modules）
              modules: false
            }
          }
        ]
      }
    ]
  },
  
  // 解析配置
  resolve: {
    extensions: ['.js', '.jsx']
  },
  
  // source map 便于调试
  devtool: 'source-map'
};

