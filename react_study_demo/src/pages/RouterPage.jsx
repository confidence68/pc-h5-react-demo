/**
 * 路由演示页面
 * 展示 React Router v6 的各种用法
 */

import { 
  Routes, 
  Route, 
  Link, 
  NavLink, 
  useParams, 
  useNavigate, 
  useLocation, 
  useSearchParams,
  Outlet,
  Navigate
} from 'react-router-dom'

// ==================== 嵌套路由子组件 ====================

/**
 * 路由首页
 */
function RouterHome() {
  const navigate = useNavigate()
  const location = useLocation()
  
  return (
    <div className="demo-area">
      <h4>路由首页</h4>
      <p>当前路径: <code>{location.pathname}</code></p>
      
      <div className="button-group" style={{ marginTop: '16px' }}>
        <button onClick={() => navigate('/router/users')}>
          跳转到用户列表
        </button>
        <button onClick={() => navigate('/router/users/1')}>
          跳转到用户 1
        </button>
        <button onClick={() => navigate('/router/search?q=react')}>
          跳转到搜索
        </button>
      </div>
    </div>
  )
}

/**
 * 用户列表页面
 */
function UserList() {
  const users = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' }
  ]
  
  return (
    <div className="demo-area">
      <h4>用户列表</h4>
      <ul className="item-list">
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/router/users/${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * 用户详情页面（使用路由参数）
 */
function UserDetail() {
  // useParams 获取路由参数
  const { userId } = useParams()
  const navigate = useNavigate()
  
  // 模拟用户数据
  const users = {
    1: { id: 1, name: '张三', email: 'zhangsan@example.com', age: 25 },
    2: { id: 2, name: '李四', email: 'lisi@example.com', age: 30 },
    3: { id: 3, name: '王五', email: 'wangwu@example.com', age: 28 }
  }
  
  const user = users[userId]
  
  if (!user) {
    return (
      <div className="demo-area">
        <h4>用户不存在</h4>
        <p>未找到 ID 为 {userId} 的用户</p>
        <button onClick={() => navigate('/router/users')}>返回列表</button>
      </div>
    )
  }
  
  return (
    <div className="demo-area">
      <h4>用户详情</h4>
      
      <div className="description">
        <p>使用 <code>useParams()</code> 获取路由参数</p>
        <code>{`const { userId } = useParams()`}</code>
      </div>
      
      <div className="result" style={{ marginTop: '16px' }}>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>姓名:</strong> {user.name}</p>
        <p><strong>邮箱:</strong> {user.email}</p>
        <p><strong>年龄:</strong> {user.age}</p>
      </div>
      
      <div className="button-group" style={{ marginTop: '16px' }}>
        <button onClick={() => navigate(-1)}>返回</button>
        <button onClick={() => navigate('/router/users')}>返回列表</button>
        {userId < 3 && (
          <button onClick={() => navigate(`/router/users/${parseInt(userId) + 1}`)}>
            下一个用户
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * 搜索页面（使用查询参数）
 */
function SearchPage() {
  // useSearchParams 获取和设置查询参数
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const page = searchParams.get('page') || '1'
  
  return (
    <div className="demo-area">
      <h4>搜索页面</h4>
      
      <div className="description">
        <p>使用 <code>useSearchParams()</code> 处理查询参数</p>
        <code>{`const [searchParams, setSearchParams] = useSearchParams()`}</code>
      </div>
      
      <div style={{ marginTop: '16px' }}>
        <input 
          type="text"
          value={query}
          onChange={(e) => setSearchParams({ q: e.target.value, page: '1' })}
          placeholder="搜索..."
          style={{ width: '200px', marginRight: '8px' }}
        />
      </div>
      
      <div className="result" style={{ marginTop: '16px' }}>
        <p>搜索关键词: <code>{query || '(空)'}</code></p>
        <p>当前页: <code>{page}</code></p>
        <p>完整 URL: <code>{window.location.href}</code></p>
      </div>
      
      <div className="button-group" style={{ marginTop: '16px' }}>
        <button 
          onClick={() => setSearchParams({ q: query, page: String(parseInt(page) - 1) })}
          disabled={parseInt(page) <= 1}
        >
          上一页
        </button>
        <span style={{ padding: '8px 16px' }}>第 {page} 页</span>
        <button 
          onClick={() => setSearchParams({ q: query, page: String(parseInt(page) + 1) })}
        >
          下一页
        </button>
      </div>
    </div>
  )
}

/**
 * 关于页面
 */
function AboutPage() {
  return (
    <div className="demo-area">
      <h4>关于页面</h4>
      <p>这是一个嵌套路由演示的关于页面。</p>
    </div>
  )
}

// ==================== 主路由页面 ====================

function RouterPage() {
  const location = useLocation()
  
  return (
    <div>
      <h1 className="page-title">React Router 演示</h1>
      
      {/* 概述 */}
      <div className="demo-card">
        <h3>📖 React Router v6 概述</h3>
        
        <table className="data-table" style={{ marginTop: '16px' }}>
          <thead>
            <tr>
              <th>组件/Hook</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>BrowserRouter</code></td>
              <td>使用 HTML5 History API 的路由器</td>
            </tr>
            <tr>
              <td><code>Routes/Route</code></td>
              <td>定义路由配置</td>
            </tr>
            <tr>
              <td><code>Link/NavLink</code></td>
              <td>导航链接</td>
            </tr>
            <tr>
              <td><code>useNavigate</code></td>
              <td>编程式导航</td>
            </tr>
            <tr>
              <td><code>useParams</code></td>
              <td>获取路由参数</td>
            </tr>
            <tr>
              <td><code>useSearchParams</code></td>
              <td>获取/设置查询参数</td>
            </tr>
            <tr>
              <td><code>useLocation</code></td>
              <td>获取当前位置信息</td>
            </tr>
            <tr>
              <td><code>Outlet</code></td>
              <td>嵌套路由的出口</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* 路由配置演示 */}
      <div className="demo-card">
        <h3>路由配置</h3>
        
        <div className="code-block">
{`// 路由配置示例
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/users" element={<UserList />} />
  <Route path="/users/:userId" element={<UserDetail />} />
  <Route path="/search" element={<SearchPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>`}
        </div>
      </div>
      
      {/* 导航演示 */}
      <div className="demo-card">
        <h3>导航演示</h3>
        
        <div className="demo-area">
          <h4>当前路由信息</h4>
          <div className="result">
            <p>pathname: <code>{location.pathname}</code></p>
            <p>search: <code>{location.search || '(空)'}</code></p>
            <p>hash: <code>{location.hash || '(空)'}</code></p>
          </div>
        </div>
        
        <div className="demo-area">
          <h4>子路由导航</h4>
          <p>点击下方链接导航到子页面</p>
          
          <nav style={{ 
            display: 'flex', 
            gap: '8px', 
            marginTop: '12px',
            flexWrap: 'wrap'
          }}>
            <NavLink 
              to="/router"
              end
              style={({ isActive }) => ({
                padding: '8px 16px',
                backgroundColor: isActive ? 'var(--primary-color)' : 'var(--bg-light)',
                color: isActive ? 'white' : 'var(--text-color)',
                borderRadius: '4px',
                textDecoration: 'none'
              })}
            >
              首页
            </NavLink>
            <NavLink 
              to="/router/users"
              style={({ isActive }) => ({
                padding: '8px 16px',
                backgroundColor: isActive ? 'var(--primary-color)' : 'var(--bg-light)',
                color: isActive ? 'white' : 'var(--text-color)',
                borderRadius: '4px',
                textDecoration: 'none'
              })}
            >
              用户列表
            </NavLink>
            <NavLink 
              to="/router/search"
              style={({ isActive }) => ({
                padding: '8px 16px',
                backgroundColor: isActive ? 'var(--primary-color)' : 'var(--bg-light)',
                color: isActive ? 'white' : 'var(--text-color)',
                borderRadius: '4px',
                textDecoration: 'none'
              })}
            >
              搜索
            </NavLink>
            <NavLink 
              to="/router/about"
              style={({ isActive }) => ({
                padding: '8px 16px',
                backgroundColor: isActive ? 'var(--primary-color)' : 'var(--bg-light)',
                color: isActive ? 'white' : 'var(--text-color)',
                borderRadius: '4px',
                textDecoration: 'none'
              })}
            >
              关于
            </NavLink>
          </nav>
        </div>
        
        {/* 嵌套路由内容 */}
        <div style={{ 
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'var(--bg-light)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)'
        }}>
          <Routes>
            <Route index element={<RouterHome />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:userId" element={<UserDetail />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
      
      {/* 编程式导航 */}
      <div className="demo-card">
        <h3>编程式导航</h3>
        
        <div className="code-block">
{`// 使用 useNavigate
const navigate = useNavigate()

// 跳转到指定路径
navigate('/users')

// 带参数跳转
navigate('/users/1')

// 带查询参数
navigate('/search?q=react')

// 返回上一页
navigate(-1)

// 替换当前历史记录
navigate('/login', { replace: true })

// 传递状态
navigate('/detail', { state: { from: 'home' } })`}
        </div>
      </div>
      
      {/* 路由守卫示例 */}
      <div className="demo-card">
        <h3>路由守卫（Protected Route）</h3>
        
        <div className="code-block">
{`// 创建受保护的路由组件
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth() // 自定义 Hook 检查登录状态
  const location = useLocation()
  
  if (!isAuthenticated) {
    // 重定向到登录页，保存来源路径
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}

// 使用
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>`}
        </div>
        
        <div className="info-box tip" style={{ marginTop: '16px' }}>
          <strong>💡 提示：</strong>
          路由守卫可以用于权限控制、登录验证等场景。
        </div>
      </div>
    </div>
  )
}

export default RouterPage


