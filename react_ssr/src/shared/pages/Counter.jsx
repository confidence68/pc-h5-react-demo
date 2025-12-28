/**
 * Counter 页面组件 - 交互功能演示
 * 
 * 【本页面教学内容】
 * 1. 演示水合后的交互功能
 * 2. 展示 SSR 中事件处理的原理
 * 3. 说明为什么水合是必要的
 * 
 * 【关键知识点】
 * - 服务端渲染的 HTML 没有事件处理器
 * - 水合过程会绑定事件处理器
 * - 水合完成后组件才能响应用户交互
 */
import { useState, useEffect } from 'react';

function Counter() {
  // 计数器状态
  // 服务端渲染时使用初始值 0
  // 水合后才能通过点击修改
  const [count, setCount] = useState(0);
  
  // 水合状态
  const [isHydrated, setIsHydrated] = useState(false);
  
  // 点击记录（只在客户端有效）
  const [clickHistory, setClickHistory] = useState([]);
  
  // 检测水合完成
  useEffect(() => {
    setIsHydrated(true);
    console.log('🎮 Counter 组件已水合，可以交互了！');
  }, []);
  
  /**
   * 增加计数
   * 
   * 【重要】这个函数在服务端渲染时不会被调用
   * 只有水合完成后，用户点击按钮才会触发
   */
  const increment = () => {
    setCount(prev => prev + 1);
    
    // 记录点击时间
    const time = new Date().toLocaleTimeString('zh-CN');
    setClickHistory(prev => [...prev.slice(-4), `+1 @ ${time}`]);
  };
  
  /**
   * 减少计数
   */
  const decrement = () => {
    setCount(prev => prev - 1);
    
    const time = new Date().toLocaleTimeString('zh-CN');
    setClickHistory(prev => [...prev.slice(-4), `-1 @ ${time}`]);
  };
  
  /**
   * 重置计数
   */
  const reset = () => {
    setCount(0);
    setClickHistory([]);
  };
  
  return (
    <div className="page">
      {/* 交互演示说明 */}
      <div className="page__card">
        <h2 className="page__title">🎮 交互功能演示</h2>
        <p className="page__text">
          这个计数器演示了 SSR 和水合的关系。
          服务端渲染的 HTML 显示初始值，但无法交互。
          水合完成后，按钮才能响应点击。
        </p>
        
        {/* 水合状态提示 */}
        <div 
          className="list__item" 
          style={{ 
            textAlign: 'center',
            background: isHydrated 
              ? 'linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%)'
              : 'linear-gradient(135deg, rgba(240, 147, 251, 0.2) 0%, rgba(245, 87, 108, 0.2) 100%)'
          }}
        >
          {isHydrated ? '✅ 已水合 - 可以交互' : '⏳ 等待水合 - 暂不可交互'}
        </div>
      </div>
      
      {/* 计数器主体 */}
      <div className="page__card">
        <h3 className="page__subtitle">计数器</h3>
        
        <div className="counter">
          <button 
            className="counter__btn" 
            onClick={decrement}
            aria-label="减少"
          >
            −
          </button>
          
          <span className="counter__value">{count}</span>
          
          <button 
            className="counter__btn" 
            onClick={increment}
            aria-label="增加"
          >
            +
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2.67vw' }}>
          <button className="btn btn--secondary" onClick={reset}>
            重置
          </button>
        </div>
      </div>
      
      {/* 点击历史 */}
      <div className="page__card">
        <h3 className="page__subtitle">📝 操作记录</h3>
        {clickHistory.length > 0 ? (
          <ul className="list">
            {clickHistory.map((record, index) => (
              <li key={index} className="list__item">
                {record}
              </li>
            ))}
          </ul>
        ) : (
          <p className="page__text" style={{ textAlign: 'center', color: '#888' }}>
            还没有操作记录，点击按钮试试吧！
          </p>
        )}
      </div>
      
      {/* 原理解释 */}
      <div className="page__card">
        <h3 className="page__subtitle">💡 为什么需要水合？</h3>
        
        <p className="page__text">
          <strong>服务端渲染只生成 HTML</strong>
        </p>
        <div className="code-block">
          <pre className="code-block__text">
            <span className="code-block__comment">{'<!-- 服务端返回的 HTML -->'}</span>{'\n'}
            <span className="code-block__string">{'<button class="counter__btn">'}</span>+<span className="code-block__string">{'</button>'}</span>{'\n'}
            <span className="code-block__comment">{'<!-- 注意：没有 onclick 属性！ -->'}</span>
          </pre>
        </div>
        
        <p className="page__text">
          服务端生成的 HTML 只是静态内容，没有事件处理器。
          这是因为：
        </p>
        <ul className="list">
          <li className="list__item">HTML 无法直接包含 JavaScript 函数引用</li>
          <li className="list__item">React 的事件系统依赖于虚拟 DOM</li>
          <li className="list__item">需要 JavaScript 运行时来处理事件</li>
        </ul>
        
        <p className="page__text" style={{ marginTop: '2.67vw' }}>
          <strong>水合过程绑定事件</strong>
        </p>
        <div className="code-block">
          <pre className="code-block__text">
            <span className="code-block__comment">// 水合时 React 做的事情</span>{'\n'}
            <span className="code-block__comment">// 1. 找到已存在的 DOM 节点</span>{'\n'}
            <span className="code-block__keyword">const</span> button = document.querySelector(<span className="code-block__string">'.counter__btn'</span>);{'\n\n'}
            <span className="code-block__comment">// 2. 绑定事件处理器</span>{'\n'}
            button.addEventListener(<span className="code-block__string">'click'</span>, increment);{'\n\n'}
            <span className="code-block__comment">// 现在按钮可以响应点击了！</span>
          </pre>
        </div>
      </div>
      
      {/* SSR vs CSR 对比 */}
      <div className="page__card">
        <h3 className="page__subtitle">🔄 SSR vs CSR 首屏对比</h3>
        
        <p className="page__text"><strong>SSR（服务端渲染）</strong></p>
        <ul className="list">
          <li className="list__item">用户立即看到内容（HTML 已包含）</li>
          <li className="list__item">等待 JS 加载和水合后可交互</li>
          <li className="list__item">首屏时间 = HTML 加载时间</li>
        </ul>
        
        <p className="page__text" style={{ marginTop: '2.67vw' }}><strong>CSR（客户端渲染）</strong></p>
        <ul className="list">
          <li className="list__item">用户先看到空白或 loading</li>
          <li className="list__item">等待 JS 加载、执行、渲染后显示</li>
          <li className="list__item">首屏时间 = JS 加载 + 执行 + 渲染时间</li>
        </ul>
      </div>
    </div>
  );
}

export default Counter;

