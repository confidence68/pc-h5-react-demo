/**
 * API 调用演示组件
 * 
 * 【组件说明】
 * 演示如何调用 Next.js API Routes
 */
'use client';

import { useState } from 'react';

export default function ApiDemo() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('GET');
  const [name, setName] = useState('Next.js');
  
  const callApi = async () => {
    setLoading(true);
    setResponse(null);
    
    try {
      let res;
      
      if (method === 'GET') {
        res = await fetch(`/api/hello?name=${encodeURIComponent(name)}`);
      } else {
        res = await fetch('/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, timestamp: new Date().toISOString() }),
        });
      }
      
      const data = await res.json();
      setResponse({
        status: res.status,
        data,
      });
      
    } catch (error) {
      setResponse({
        status: 'error',
        data: { error: error.message },
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {/* 控制面板 */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid var(--border-color)',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入名字"
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid var(--border-color)',
            fontSize: '14px',
            flex: 1,
            minWidth: '150px',
          }}
        />
        
        <button 
          className="btn btn--primary" 
          onClick={callApi}
          disabled={loading}
        >
          {loading ? '请求中...' : '发送请求'}
        </button>
      </div>
      
      {/* 请求信息 */}
      <div className="tip-box tip-box--info" style={{ marginBottom: '16px' }}>
        📡 <strong>请求:</strong> {method} /api/hello{method === 'GET' ? `?name=${name}` : ''}
      </div>
      
      {/* 响应结果 */}
      {response && (
        <div>
          <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📥 响应结果
            <span className={`tag tag--${response.status === 200 || response.status === 201 ? 'static' : 'server'}`}>
              Status: {response.status}
            </span>
          </h4>
          <div className="code-block">
            <div className="code-block__content">
              <pre>{JSON.stringify(response.data, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
      
      {/* 代码示例 */}
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
          💻 调用代码
        </h4>
        <div className="code-block">
          <div className="code-block__content">
            <pre>{method === 'GET' 
? `// GET 请求
const res = await fetch('/api/hello?name=${name}');
const data = await res.json();`
: `// POST 请求
const res = await fetch('/api/hello', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '${name}' }),
});
const data = await res.json();`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

