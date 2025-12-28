/**
 * Webpack 客户端构建配置
 * 
 * 【客户端构建的目标】
 * 1. 将 React 组件打包成浏览器可执行的 JavaScript
 * 2. 提取 CSS 为独立文件
 * 3. 生成可在浏览器中运行的 bundle
 * 
 * 【同构项目中客户端构建的特点】
 * - 入口文件是 client/index.jsx（包含 hydrateRoot 调用）
 * - 输出到 public 目录供 Express 静态服务
 * - 需要处理 CSS（服务端不需要实际的 CSS 处理）
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 开发模式，便于调试
  mode: 'development',
  
  // 客户端入口文件
  // 这个文件负责在浏览器中"水合"服务端渲染的 HTML
  entry: './src/client/index.jsx',
  
  // 输出配置
  output: {
    // 输出到 public 目录，Express 会将此目录设为静态资源目录
    path: path.resolve(__dirname, 'public'),
    // 输出文件名
    filename: 'bundle.js',
    // 公共路径，用于 HTML 中引用资源
    publicPath: '/'
  },
  
  // 模块解析规则
  module: {
    rules: [
      {
        // 处理 JS/JSX 文件
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
          // babel-loader 会自动读取 babel.config.js
        }
      },
      {
        // 处理 CSS 文件
        test: /\.css$/,
        use: [
          // 提取 CSS 到独立文件（生产环境推荐）
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  
  // 插件配置
  plugins: [
    // 提取 CSS 到独立文件
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ],
  
  // 解析配置
  resolve: {
    // 自动解析这些扩展名，import 时可以省略
    extensions: ['.js', '.jsx']
  },
  
  // 生成 source map，便于调试
  devtool: 'source-map'
};

