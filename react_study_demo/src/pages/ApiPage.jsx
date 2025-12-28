/**
 * API 请求演示页面
 * 
 * 本页面展示 Axios 封装的各种用法，包括：
 * - 配置化 API 管理
 * - 基础请求调用
 * - 请求缓存
 * - 可取消请求
 * - useRequest Hook
 */

import AxiosDemo from '../components/api/AxiosDemo.jsx'

/**
 * ApiPage 组件
 * 
 * 作为 Axios 封装演示的容器页面
 */
export default function ApiPage() {
  return (
    <div className="api-page">
      <div className="page-header">
        <h1>🌐 API 请求封装</h1>
        <p>
          基于 Axios 的请求封装方案，支持配置化管理、自动缓存、请求取消等特性。
          新增接口只需在配置文件中添加一行即可。
        </p>
      </div>
      
      {/* Axios 封装演示组件 */}
      <AxiosDemo />
      
      <style>{`
        .api-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .page-header {
          background: linear-gradient(135deg, #00c6fb 0%, #005bea 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 24px;
        }
        
        .page-header h1 {
          margin: 0 0 12px 0;
          font-size: 28px;
        }
        
        .page-header p {
          margin: 0;
          opacity: 0.9;
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}

