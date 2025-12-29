/**
 * 计数器演示组件
 * 
 * 【组件说明】
 * 这是一个 Client Component，演示：
 * 1. useState 状态管理
 * 2. 事件处理
 * 3. 水合后的交互功能
 * 
 * 对应之前手搓 SSR 项目中的 Counter 组件
 */
'use client';

import { useState, useEffect } from 'react';

export default function CounterDemo() {
  const [count, setCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [history, setHistory] = useState([]);
  
  // 检测水合完成
  useEffect(() => {
    setIsHydrated(true);
    console.log('🎮 CounterDemo 组件已水合！');
  }, []);
  
  const increment = () => {
    setCount(prev => prev + 1);
    addHistory('+1');
  };
  
  const decrement = () => {
    setCount(prev => prev - 1);
    addHistory('-1');
  };
  
  const reset = () => {
    setCount(0);
    setHistory([]);
  };
  
  const addHistory = (action) => {
    const time = new Date().toLocaleTimeString('zh-CN');
    setHistory(prev => [...prev.slice(-4), `${action} @ ${time}`]);
  };
  
  return (
    <div>
      {/* 水合状态指示器 */}
      <div className={`status-indicator ${isHydrated ? 'status-indicator--client' : 'status-indicator--server'}`}
           style={{ marginBottom: '20px' }}>
        {isHydrated ? '✅ 已水合 - 可以交互' : '⏳ 等待水合...'}
      </div>
      
      {/* 计数器主体 */}
      <div className="counter-demo">
        <button 
          className="counter-demo__btn" 
          onClick={decrement}
          aria-label="减少"
        >
          −
        </button>
        
        <span className="counter-demo__value">{count}</span>
        
        <button 
          className="counter-demo__btn" 
          onClick={increment}
          aria-label="增加"
        >
          +
        </button>
      </div>
      
      {/* 重置按钮 */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <button className="btn btn--secondary" onClick={reset}>
          重置
        </button>
      </div>
      
      {/* 操作历史 */}
      {history.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
            📝 操作记录
          </h4>
          <div className="feature-list">
            {history.map((record, index) => (
              <div key={index} className="feature-list__item" style={{ padding: '8px 12px' }}>
                <span className="feature-list__icon">•</span>
                <span style={{ fontSize: '13px' }}>{record}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 代码说明 */}
      <div className="tip-box tip-box--info" style={{ marginTop: '16px' }}>
        💡 <strong>对比手搓 SSR：</strong>
        在之前的项目中，我们需要手动实现 SSR 和水合。
        在 Next.js 中，只需要添加 <code>'use client'</code> 指令，
        框架会自动处理服务端渲染和客户端水合。
      </div>
    </div>
  );
}

