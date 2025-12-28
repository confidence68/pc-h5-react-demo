/**
 * Webpack 配置文件
 * 
 * Webpack 是一个传统的模块打包器，具有以下特点：
 * 1. 功能强大，生态丰富，插件众多
 * 2. 需要配置 loader 来处理不同类型的文件
 * 3. 开发时需要完整打包，启动较慢
 * 4. 高度可定制化，适合复杂项目
 * 
 * 与 Vite 的主要区别：
 * - Vite: 开发时利用浏览器原生 ES Module，按需编译，启动快
 * - Webpack: 开发时需要完整打包所有模块，启动较慢但功能更全面
 */

import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// ES Module 中获取 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default (env, argv) => {
  const isDevelopment = argv.mode === 'development'
  
  return {
    // 入口文件配置
    // Webpack 从这里开始构建依赖图
    entry: './src/main.jsx',
    
    // 输出配置
    output: {
      path: path.resolve(__dirname, 'dist-webpack'),  // 输出目录
      filename: isDevelopment 
        ? '[name].js'                    // 开发环境：简单文件名
        : '[name].[contenthash].js',     // 生产环境：带哈希的文件名，用于缓存
      clean: true,                       // 每次构建前清空输出目录
      publicPath: '/'                    // 公共路径
    },
    
    // 模块解析配置
    resolve: {
      // 可以省略的文件扩展名
      extensions: ['.js', '.jsx', '.json'],
      // 路径别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    
    // 模块规则配置
    // Webpack 通过 loader 来处理非 JS 文件
    module: {
      rules: [
        {
          // 处理 JS/JSX 文件
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',     // 转换现代 JS 语法
                ['@babel/preset-react', {
                  runtime: 'automatic'   // 自动导入 React（React 17+）
                }]
              ]
            }
          }
        },
        {
          // 处理 CSS 文件
          test: /\.css$/,
          use: [
            'style-loader',  // 将 CSS 注入到 DOM
            'css-loader'     // 解析 CSS 文件
          ]
        },
        {
          // 处理图片文件
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource'
        }
      ]
    },
    
    // 插件配置
    plugins: [
      // 自动生成 HTML 文件并注入打包后的资源
      new HtmlWebpackPlugin({
        template: './index.html',  // HTML 模板
        title: 'React Learning Demo'
      })
    ],
    
    // 开发服务器配置
    devServer: {
      port: 3001,                  // 端口（与 Vite 区分）
      hot: true,                   // 热模块替换
      open: true,                  // 自动打开浏览器
      historyApiFallback: true,    // 支持 SPA 路由
      static: {
        directory: path.join(__dirname, 'public')
      }
    },
    
    // Source Map 配置
    devtool: isDevelopment 
      ? 'eval-source-map'      // 开发环境：快速重建，完整源码映射
      : 'source-map',          // 生产环境：完整源码映射
    
    // 优化配置（生产环境）
    optimization: {
      // 代码分割
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // 将 node_modules 中的代码单独打包
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }
}

