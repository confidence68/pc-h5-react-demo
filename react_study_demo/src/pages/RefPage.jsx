/**
 * Ref 演示页面
 * 展示 React 中 Ref 的各种用法
 */

import RefDemo from '../components/ref/RefDemo.jsx'
import ForwardRefDemo from '../components/ref/ForwardRefDemo.jsx'

function RefPage() {
  return (
    <div>
      <h1 className="page-title">Ref 用法演示</h1>
      
      {/* 概述 */}
      <div className="demo-card">
        <h3>📖 Ref 概述</h3>
        <p>
          Ref 提供了一种方式，用于访问 DOM 节点或在渲染周期之间保持可变值。
        </p>
        
        <table className="data-table" style={{ marginTop: '16px' }}>
          <thead>
            <tr>
              <th>API</th>
              <th>使用场景</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>useRef</code></td>
              <td>函数组件</td>
              <td>创建可变的 ref 对象</td>
            </tr>
            <tr>
              <td><code>createRef</code></td>
              <td>Class 组件</td>
              <td>每次渲染创建新的 ref</td>
            </tr>
            <tr>
              <td><code>forwardRef</code></td>
              <td>组件封装</td>
              <td>将 ref 转发给子组件</td>
            </tr>
            <tr>
              <td><code>useImperativeHandle</code></td>
              <td>配合 forwardRef</td>
              <td>自定义暴露给父组件的方法</td>
            </tr>
            <tr>
              <td>回调 Ref</td>
              <td>特殊场景</td>
              <td>使用函数作为 ref</td>
            </tr>
          </tbody>
        </table>
        
        <div className="info-box tip" style={{ marginTop: '16px' }}>
          <strong>💡 使用场景：</strong>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>管理焦点、文本选择或媒体播放</li>
            <li>触发强制动画</li>
            <li>集成第三方 DOM 库</li>
            <li>保存不需要触发重新渲染的可变值（如定时器 ID）</li>
          </ul>
        </div>
        
        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <strong>⚠️ 注意：</strong>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>避免过度使用 ref，大多数情况下使用声明式方式更好</li>
            <li>不要在渲染期间读写 ref.current</li>
            <li>修改 ref.current 不会触发重新渲染</li>
          </ul>
        </div>
      </div>
      
      {/* useRef 和 createRef */}
      <RefDemo />
      
      {/* forwardRef 和 useImperativeHandle */}
      <ForwardRefDemo />
    </div>
  )
}

export default RefPage

