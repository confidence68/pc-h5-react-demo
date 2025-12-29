/**
 * 客户端数据获取演示组件
 * 
 * 【组件说明】
 * 演示在客户端组件中获取数据的完整流程
 * 包括：加载状态、错误处理、数据展示
 */
'use client';

import { useState, useEffect } from 'react';

export default function ClientFetchDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  
  /**
   * 模拟数据获取
   */
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 模拟 API 延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟随机成功/失败
      if (Math.random() > 0.9) {
        throw new Error('模拟网络错误');
      }
      
      // 模拟数据
      const mockData = {
        time: new Date().toLocaleTimeString('zh-CN'),
        randomNumber: Math.floor(Math.random() * 1000),
        items: [
          { id: 1, name: '项目 A', status: '进行中' },
          { id: 2, name: '项目 B', status: '已完成' },
          { id: 3, name: '项目 C', status: '待开始' },
        ]
      };
      
      setData(mockData);
      setFetchCount(prev => prev + 1);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {/* 操作按钮 */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          className="btn btn--primary" 
          onClick={fetchData}
          disabled={loading}
          style={{ marginRight: '12px' }}
        >
          {loading ? '加载中...' : '获取数据'}
        </button>
        
        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          已获取 {fetchCount} 次
        </span>
      </div>
      
      {/* 加载状态 */}
      {loading && (
        <div className="tip-box tip-box--info">
          ⏳ 正在从服务器获取数据...（模拟 1 秒延迟）
        </div>
      )}
      
      {/* 错误状态 */}
      {error && (
        <div className="tip-box tip-box--warning">
          ❌ 错误: {error}
          <button 
            onClick={fetchData} 
            style={{ 
              marginLeft: '12px', 
              padding: '4px 12px',
              background: 'white',
              border: '1px solid #f59e0b',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            重试
          </button>
        </div>
      )}
      
      {/* 数据展示 */}
      {data && !loading && !error && (
        <div>
          <div className="feature-list">
            <div className="feature-list__item">
              <span className="feature-list__icon">🕐</span>
              <div>
                <strong>获取时间</strong>: {data.time}
              </div>
            </div>
            <div className="feature-list__item">
              <span className="feature-list__icon">🎲</span>
              <div>
                <strong>随机数</strong>: {data.randomNumber}
              </div>
            </div>
          </div>
          
          <h4 style={{ marginTop: '16px', marginBottom: '8px' }}>📋 项目列表</h4>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>名称</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <span className={`tag tag--${item.status === '已完成' ? 'static' : item.status === '进行中' ? 'client' : 'server'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="tip-box tip-box--success" style={{ marginTop: '16px' }}>
            ✅ 数据获取成功！这是在浏览器中执行的，可以在 Network 面板看到请求。
          </div>
        </div>
      )}
      
      {/* 初始状态 */}
      {!data && !loading && !error && (
        <div className="tip-box tip-box--info">
          💡 点击上方按钮开始获取数据
        </div>
      )}
    </div>
  );
}

