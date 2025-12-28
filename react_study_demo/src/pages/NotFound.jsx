/**
 * 404 页面
 * 当访问不存在的路由时显示
 */

import { useNavigate, useLocation } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  const location = useLocation()
  
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '60px 20px'
    }}>
      <div style={{ fontSize: '120px', marginBottom: '20px' }}>
        🔍
      </div>
      
      <h1 style={{ 
        fontSize: '48px', 
        color: 'var(--primary-color)',
        marginBottom: '16px'
      }}>
        404
      </h1>
      
      <h2 style={{ 
        color: 'var(--text-color)',
        marginBottom: '24px'
      }}>
        页面未找到
      </h2>
      
      <p style={{ 
        color: 'var(--text-muted)',
        marginBottom: '8px'
      }}>
        抱歉，您访问的页面不存在。
      </p>
      
      <p style={{ 
        color: 'var(--text-muted)',
        marginBottom: '32px'
      }}>
        请求路径: <code>{location.pathname}</code>
      </p>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button onClick={() => navigate(-1)}>
          返回上一页
        </button>
        <button onClick={() => navigate('/')} className="btn-secondary">
          返回首页
        </button>
      </div>
    </div>
  )
}

export default NotFound


