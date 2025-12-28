/**
 * 组件通信演示页面
 * 展示 React 中各种组件通信方式
 */

import ParentChildDemo from '../components/communication/ParentChildDemo.jsx'
import SiblingDemo from '../components/communication/SiblingDemo.jsx'
import HooksClassDemo from '../components/communication/HooksClassDemo.jsx'

function CommunicationPage() {
  return (
    <div>
      <h1 className="page-title">组件通信演示</h1>
      
      {/* 概述 */}
      <div className="demo-card">
        <h3>📖 组件通信概述</h3>
        <p>
          React 是单向数据流，但提供了多种组件间通信的方式。
        </p>
        
        <table className="data-table" style={{ marginTop: '16px' }}>
          <thead>
            <tr>
              <th>通信类型</th>
              <th>方式</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>父 → 子</td>
              <td>props</td>
              <td>传递数据、配置</td>
            </tr>
            <tr>
              <td>子 → 父</td>
              <td>回调函数</td>
              <td>事件通知、状态更新</td>
            </tr>
            <tr>
              <td>父 ↔ 子</td>
              <td>ref</td>
              <td>命令式操作</td>
            </tr>
            <tr>
              <td>兄弟组件</td>
              <td>状态提升</td>
              <td>简单共享状态</td>
            </tr>
            <tr>
              <td>跨层级</td>
              <td>Context</td>
              <td>主题、用户信息等</td>
            </tr>
            <tr>
              <td>复杂应用</td>
              <td>Redux/Zustand</td>
              <td>全局状态管理</td>
            </tr>
          </tbody>
        </table>
        
        <div className="info-box tip" style={{ marginTop: '16px' }}>
          <strong>💡 选择建议：</strong>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>优先使用 props 和回调（最简单、最直观）</li>
            <li>跨多层级使用 Context</li>
            <li>复杂状态管理使用 Redux/Zustand</li>
            <li>避免使用 Event Bus（难以追踪数据流）</li>
          </ul>
        </div>
      </div>
      
      {/* 父子组件通信 */}
      <ParentChildDemo />
      
      {/* 兄弟组件通信 */}
      <SiblingDemo />
      
      {/* Hooks 与 Class 组件互操作 */}
      <HooksClassDemo />
    </div>
  )
}

export default CommunicationPage

