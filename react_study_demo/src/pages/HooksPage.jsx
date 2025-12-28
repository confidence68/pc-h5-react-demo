/**
 * Hooks 演示页面
 * 展示各种 React Hooks 的用法
 */

import UseStateDemo from '../components/hooks/UseStateDemo.jsx'
import UseEffectDemo from '../components/hooks/UseEffectDemo.jsx'
import UseCallbackDemo from '../components/hooks/UseCallbackDemo.jsx'
import UseMemoDemo from '../components/hooks/UseMemoDemo.jsx'
import CustomHookDemo from '../components/hooks/CustomHookDemo.jsx'

function HooksPage() {
  return (
    <div>
      <h1 className="page-title">React Hooks 演示</h1>
      
      {/* 概述 */}
      <div className="demo-card">
        <h3>📖 Hooks 概述</h3>
        <p>
          Hooks 是 React 16.8 引入的特性，允许在函数组件中使用状态和其他 React 特性。
        </p>
        
        <div className="info-box tip" style={{ marginTop: '16px' }}>
          <strong>Hooks 规则：</strong>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>只在函数组件或自定义 Hook 中调用</li>
            <li>只在最顶层调用，不要在循环、条件或嵌套函数中调用</li>
            <li>自定义 Hook 必须以 <code>use</code> 开头</li>
          </ul>
        </div>
        
        <table className="data-table" style={{ marginTop: '16px' }}>
          <thead>
            <tr>
              <th>Hook</th>
              <th>用途</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>useState</code></td>
              <td>状态管理</td>
            </tr>
            <tr>
              <td><code>useEffect</code></td>
              <td>副作用处理（数据获取、订阅等）</td>
            </tr>
            <tr>
              <td><code>useCallback</code></td>
              <td>缓存函数引用</td>
            </tr>
            <tr>
              <td><code>useMemo</code></td>
              <td>缓存计算结果</td>
            </tr>
            <tr>
              <td><code>useRef</code></td>
              <td>保存可变值，访问 DOM</td>
            </tr>
            <tr>
              <td><code>useContext</code></td>
              <td>访问 Context</td>
            </tr>
            <tr>
              <td><code>useReducer</code></td>
              <td>复杂状态逻辑</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* useState */}
      <UseStateDemo />
      
      {/* useEffect */}
      <UseEffectDemo />
      
      {/* useCallback */}
      <UseCallbackDemo />
      
      {/* useMemo */}
      <UseMemoDemo />
      
      {/* 自定义 Hook */}
      <CustomHookDemo />
    </div>
  )
}

export default HooksPage

