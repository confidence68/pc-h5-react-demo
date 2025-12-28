/**
 * useMemo Hook 演示组件
 * 
 * useMemo 用于缓存计算结果
 * 只有当依赖项变化时，才会重新计算
 * 
 * 语法：const memoizedValue = useMemo(() => computeValue, dependencies)
 * - computeValue: 计算函数，返回需要缓存的值
 * - dependencies: 依赖数组
 * 
 * useMemo vs useCallback:
 * - useMemo: 缓存计算结果（值）
 * - useCallback: 缓存函数引用
 * - useMemo(() => fn, deps) === useCallback(fn, deps)
 */

import { useState, useMemo, useCallback, memo } from 'react'

// ==================== 辅助函数 ====================
/**
 * 模拟耗时计算
 */
const expensiveCalculation = (num) => {
  console.log('执行耗时计算...')
  // 模拟复杂计算
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += num
  }
  return result
}

/**
 * 斐波那契数列计算
 */
const fibonacci = (n) => {
  console.log(`计算 fibonacci(${n})...`)
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// ==================== 子组件 ====================
/**
 * 显示计算结果的子组件
 */
const ResultDisplay = memo(function ResultDisplay({ value, label }) {
  console.log(`ResultDisplay "${label}" 渲染了`)
  return (
    <div className="result" style={{ marginBottom: '16px' }}>
      <div className="result-label">{label}</div>
      <div className="result-value">{value.toLocaleString()}</div>
    </div>
  )
})

/**
 * 列表组件
 */
const FilteredList = memo(function FilteredList({ items }) {
  console.log('FilteredList 渲染了')
  return (
    <ul className="item-list">
      {items.map(item => (
        <li key={item.id}>{item.name} - ¥{item.price}</li>
      ))}
    </ul>
  )
})

// ==================== 主组件 ====================
function UseMemoDemo() {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(5)
  const [fibNum, setFibNum] = useState(10)
  const [darkTheme, setDarkTheme] = useState(false)
  
  // 列表数据
  const [products] = useState([
    { id: 1, name: '手机', price: 5999, category: '电子' },
    { id: 2, name: '笔记本', price: 8999, category: '电子' },
    { id: 3, name: 'T恤', price: 199, category: '服装' },
    { id: 4, name: '耳机', price: 899, category: '电子' },
    { id: 5, name: '牛仔裤', price: 399, category: '服装' }
  ])
  const [category, setCategory] = useState('全部')
  const [sortOrder, setSortOrder] = useState('none')
  
  // ==================== 未使用 useMemo ====================
  /**
   * 每次组件渲染都会重新计算
   * 即使 num 没有变化
   */
  // const expensiveResult = expensiveCalculation(num) // 不推荐
  
  // ==================== 使用 useMemo ====================
  /**
   * 只有当 num 变化时才重新计算
   */
  const expensiveResult = useMemo(() => {
    return expensiveCalculation(num)
  }, [num])
  
  /**
   * 斐波那契计算结果
   */
  const fibResult = useMemo(() => {
    return fibonacci(fibNum)
  }, [fibNum])
  
  // ==================== 过滤和排序列表 ====================
  /**
   * 根据分类过滤商品
   */
  const filteredProducts = useMemo(() => {
    console.log('过滤商品列表...')
    if (category === '全部') return products
    return products.filter(p => p.category === category)
  }, [products, category])
  
  /**
   * 对过滤后的商品排序
   */
  const sortedProducts = useMemo(() => {
    console.log('排序商品列表...')
    if (sortOrder === 'none') return filteredProducts
    
    return [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price
      return b.price - a.price
    })
  }, [filteredProducts, sortOrder])
  
  // ==================== 缓存对象 ====================
  /**
   * 使用 useMemo 缓存对象，避免子组件不必要的重新渲染
   */
  const themeStyles = useMemo(() => {
    console.log('计算主题样式...')
    return {
      backgroundColor: darkTheme ? '#333' : '#fff',
      color: darkTheme ? '#fff' : '#333',
      padding: '16px',
      borderRadius: '8px',
      transition: 'all 0.3s'
    }
  }, [darkTheme])
  
  // ==================== 汇总统计 ====================
  /**
   * 计算商品统计信息
   */
  const statistics = useMemo(() => {
    console.log('计算统计信息...')
    const total = sortedProducts.reduce((sum, p) => sum + p.price, 0)
    const avg = sortedProducts.length > 0 ? total / sortedProducts.length : 0
    const max = sortedProducts.length > 0 ? Math.max(...sortedProducts.map(p => p.price)) : 0
    const min = sortedProducts.length > 0 ? Math.min(...sortedProducts.map(p => p.price)) : 0
    
    return { total, avg, max, min, count: sortedProducts.length }
  }, [sortedProducts])
  
  return (
    <div className="demo-card">
      <h3>useMemo Hook 演示</h3>
      
      {/* 概念说明 */}
      <div className="demo-area">
        <h4>概念说明</h4>
        <div className="description">
          <p><code>useMemo(() =&gt; value, deps)</code> 缓存计算结果</p>
          <p>只有当依赖项变化时，才会重新执行计算</p>
          <p>适用于耗时计算、复杂对象创建、大数据处理等场景</p>
        </div>
      </div>
      
      {/* 耗时计算演示 */}
      <div className="demo-area">
        <h4>1. 耗时计算缓存</h4>
        <div className="description">
          <p>模拟一个复杂计算，只有当输入值变化时才重新计算</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <label>
            计算倍数: 
            <input 
              type="number" 
              value={num}
              onChange={(e) => setNum(parseInt(e.target.value) || 0)}
              style={{ width: '80px', marginLeft: '8px' }}
            />
          </label>
        </div>
        
        <ResultDisplay value={expensiveResult} label="计算结果" />
        
        <div className="button-group">
          <button onClick={() => setCount(c => c + 1)}>
            更新其他状态 (count: {count})
          </button>
        </div>
        
        <div className="info-box tip">
          <strong>💡 观察控制台：</strong>
          点击 "更新其他状态" 不会触发重新计算，只有修改倍数才会计算。
        </div>
      </div>
      
      {/* 斐波那契演示 */}
      <div className="demo-area">
        <h4>2. 递归计算缓存（斐波那契）</h4>
        <div className="description">
          <p>斐波那契数列的递归计算非常耗时，使用 useMemo 缓存结果</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <label>
            Fibonacci(n), n = 
            <input 
              type="range" 
              min="1" 
              max="40"
              value={fibNum}
              onChange={(e) => setFibNum(parseInt(e.target.value))}
              style={{ marginLeft: '8px', width: '200px' }}
            />
            <span style={{ marginLeft: '8px' }}>{fibNum}</span>
          </label>
        </div>
        
        <ResultDisplay value={fibResult} label={`Fibonacci(${fibNum})`} />
        
        <div className="info-box warning">
          <strong>⚠️ 注意：</strong>
          n 值过大会导致计算卡顿（建议不超过40），这正好说明了缓存的重要性。
        </div>
      </div>
      
      {/* 列表过滤排序演示 */}
      <div className="demo-area">
        <h4>3. 列表过滤与排序</h4>
        <div className="description">
          <p>使用 useMemo 缓存过滤和排序结果，避免重复计算</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <label>
            分类：
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginLeft: '8px' }}
            >
              <option value="全部">全部</option>
              <option value="电子">电子产品</option>
              <option value="服装">服装</option>
            </select>
          </label>
          
          <label>
            排序：
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ marginLeft: '8px' }}
            >
              <option value="none">不排序</option>
              <option value="asc">价格升序</option>
              <option value="desc">价格降序</option>
            </select>
          </label>
        </div>
        
        <FilteredList items={sortedProducts} />
        
        <div className="result" style={{ marginTop: '16px' }}>
          <h5 style={{ marginBottom: '8px' }}>统计信息</h5>
          <p>商品数量: {statistics.count}</p>
          <p>总价: ¥{statistics.total.toLocaleString()}</p>
          <p>平均价: ¥{statistics.avg.toFixed(2)}</p>
          <p>最高价: ¥{statistics.max.toLocaleString()}</p>
          <p>最低价: ¥{statistics.min.toLocaleString()}</p>
        </div>
      </div>
      
      {/* 对象缓存演示 */}
      <div className="demo-area">
        <h4>4. 对象引用缓存</h4>
        <div className="description">
          <p>使用 useMemo 缓存对象，避免每次渲染创建新引用</p>
        </div>
        
        <div className="button-group">
          <button onClick={() => setDarkTheme(d => !d)}>
            切换主题 ({darkTheme ? '暗色' : '亮色'})
          </button>
        </div>
        
        <div style={themeStyles}>
          <p>这是一个主题切换演示区域</p>
          <p>样式对象被 useMemo 缓存</p>
        </div>
        
        <div className="info-box success">
          <strong>✅ 关键点：</strong>
          如果不使用 useMemo，每次渲染都会创建新的样式对象，
          即使值相同，对象引用也不同，可能导致子组件不必要的重新渲染。
        </div>
      </div>
      
      {/* useMemo vs useCallback */}
      <div className="demo-area">
        <h4>5. useMemo vs useCallback</h4>
        <div className="code-block">
{`// useMemo 缓存值
const memoizedValue = useMemo(() => computeValue(a, b), [a, b])

// useCallback 缓存函数
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b])

// 等价关系
useCallback(fn, deps) === useMemo(() => fn, deps)`}
        </div>
        
        <div className="info-box tip">
          <p><strong>💡 选择建议：</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li><strong>useMemo</strong>: 缓存计算结果、数组、对象等</li>
            <li><strong>useCallback</strong>: 缓存函数，作为 props 传递给子组件</li>
            <li>两者都是为了性能优化，不要过度使用</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UseMemoDemo

