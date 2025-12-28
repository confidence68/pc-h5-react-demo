# React 学习 Demo

> 一个用于学习 React 核心知识的演示项目，涵盖 Hooks、Ref、组件通信、路由、状态管理等内容。

## 📚 目录

- [项目介绍](#项目介绍)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [知识点详解](#知识点详解)
  - [React Hooks](#react-hooks)
  - [Ref 用法](#ref-用法)
  - [组件通信](#组件通信)
  - [路由](#路由)
  - [状态管理](#状态管理)
  - [API 请求封装](#api-请求封装)
- [Vite vs Webpack](#vite-vs-webpack)
- [参考资源](#参考资源)

---

## 项目介绍

本项目是一个 React 教学演示项目，专门用于讲解 React 的核心概念和最佳实践。

### 技术栈

- **React 18** - 最新版本的 React
- **React Router v6** - 官方路由库
- **Redux Toolkit** - 官方推荐的状态管理方案
- **Axios** - HTTP 请求库（配置化封装）
- **Vite** - 现代前端构建工具
- **Webpack** - 传统打包工具

### 涵盖内容

1. ✅ React Hooks（useState, useEffect, useCallback, useMemo, useRef, 自定义 Hook）
2. ✅ Ref 用法（useRef, createRef, forwardRef, useImperativeHandle）
3. ✅ 组件通信（父子通信、兄弟通信、Context、Hooks与Class互操作）
4. ✅ React Router（路由配置、嵌套路由、路由参数、编程式导航）
5. ✅ Redux Toolkit（createSlice、createAsyncThunk、Selectors）
6. ✅ **Axios 请求封装**（配置化 API、缓存、取消请求、useRequest Hook）
7. ✅ Vite 和 Webpack 双构建工具配置

---

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
# 使用 Vite（推荐，启动更快）
npm run dev

# 使用 Webpack
npm run dev:webpack
```

### 构建生产版本

```bash
# 使用 Vite 构建（输出到 dist 目录）
npm run build

# 使用 Webpack 构建（输出到 dist-webpack 目录）
npm run build:webpack
```

### 预览生产版本

```bash
npm run preview
```

---

## 项目结构

```
demo/
├── index.html              # HTML 入口文件
├── package.json            # 项目配置和依赖
├── vite.config.js          # Vite 配置文件
├── webpack.config.js       # Webpack 配置文件
├── .babelrc                # Babel 配置（Webpack 使用）
├── README.md               # 项目文档
│
└── src/                    # 源代码目录
    ├── main.jsx            # 应用入口文件
    ├── App.jsx             # 根组件
    ├── index.css           # 全局样式
    │
    ├── api/                # API 请求封装 ⭐新增
    │   ├── config.js             # API 配置文件（新增接口只需添加一行）
    │   ├── request.js            # Axios 封装（拦截器、缓存、取消）
    │   └── index.js              # 统一导出、useRequest Hook
    │
    ├── components/         # 组件目录
    │   ├── hooks/          # Hooks 示例组件
    │   │   ├── UseStateDemo.jsx      # useState 演示
    │   │   ├── UseEffectDemo.jsx     # useEffect 演示
    │   │   ├── UseCallbackDemo.jsx   # useCallback 演示
    │   │   ├── UseMemoDemo.jsx       # useMemo 演示
    │   │   └── CustomHookDemo.jsx    # 自定义 Hook 演示
    │   │
    │   ├── ref/            # Ref 示例组件
    │   │   ├── RefDemo.jsx           # useRef/createRef 演示
    │   │   └── ForwardRefDemo.jsx    # forwardRef 演示
    │   │
    │   ├── communication/  # 组件通信示例
    │   │   ├── ParentChildDemo.jsx   # 父子通信
    │   │   ├── SiblingDemo.jsx       # 兄弟通信
    │   │   └── HooksClassDemo.jsx    # Hooks与Class互操作
    │   │
    │   └── api/            # API 演示组件 ⭐新增
    │       └── AxiosDemo.jsx         # Axios 封装演示
    │
    ├── pages/              # 页面组件
    │   ├── Home.jsx              # 首页
    │   ├── HooksPage.jsx         # Hooks 演示页
    │   ├── RefPage.jsx           # Ref 演示页
    │   ├── CommunicationPage.jsx # 组件通信演示页
    │   ├── StorePage.jsx         # 状态管理演示页
    │   ├── RouterPage.jsx        # 路由演示页
    │   ├── ApiPage.jsx           # API 请求演示页 ⭐新增
    │   └── NotFound.jsx          # 404 页面
    │
    ├── router/             # 路由配置
    │   └── index.jsx             # 路由配置文件
    │
    └── store/              # Redux 状态管理
        ├── index.js              # Store 配置
        ├── counterSlice.js       # 计数器 Slice
        ├── todosSlice.js         # Todo Slice
        └── userSlice.js          # 用户 Slice（异步操作）
```

---

## 知识点详解

### React Hooks

#### 文件说明

| 文件 | 内容 |
|------|------|
| `UseStateDemo.jsx` | useState 的基础用法、对象/数组状态管理、函数式更新、惰性初始化 |
| `UseEffectDemo.jsx` | useEffect 的执行时机、依赖数组、清理函数、数据获取 |
| `UseCallbackDemo.jsx` | useCallback 的作用、与 React.memo 配合使用 |
| `UseMemoDemo.jsx` | useMemo 缓存计算结果、对象缓存、列表过滤排序 |
| `CustomHookDemo.jsx` | 自定义 Hook 的创建和使用（useCounter、useToggle、useFetch 等） |

#### 核心概念

```jsx
// useState - 状态管理
const [state, setState] = useState(initialValue)
setState(newValue)           // 直接设置
setState(prev => prev + 1)   // 函数式更新（推荐）

// useEffect - 副作用处理
useEffect(() => {
  // 副作用代码
  return () => {
    // 清理函数
  }
}, [dependencies])

// useCallback - 缓存函数
const memoizedFn = useCallback(() => {
  doSomething(a, b)
}, [a, b])

// useMemo - 缓存值
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

### Ref 用法

#### 文件说明

| 文件 | 内容 |
|------|------|
| `RefDemo.jsx` | useRef 基础、保存定时器、保存上一次的值、访问 DOM、createRef 和回调 Ref |
| `ForwardRefDemo.jsx` | forwardRef 转发 ref、useImperativeHandle 暴露方法 |

#### 核心概念

```jsx
// useRef - 创建可变引用
const inputRef = useRef(null)
<input ref={inputRef} />
inputRef.current.focus()

// forwardRef - 转发 ref
const FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />
})

// useImperativeHandle - 自定义暴露的方法
useImperativeHandle(ref, () => ({
  focus() { inputRef.current.focus() },
  getValue() { return inputRef.current.value }
}), [])
```

### 组件通信

#### 文件说明

| 文件 | 内容 |
|------|------|
| `ParentChildDemo.jsx` | Props 传递、回调函数、ref 调用、children/render props |
| `SiblingDemo.jsx` | 状态提升、Context API、Event Bus |
| `HooksClassDemo.jsx` | Hooks 组件调用 Class、Class 调用 Hooks、混合使用 |

#### 通信方式总结

| 方式 | 方向 | 适用场景 |
|------|------|----------|
| Props | 父 → 子 | 传递数据、配置 |
| 回调函数 | 子 → 父 | 事件通知 |
| Ref | 父 → 子 | 命令式操作 |
| Context | 跨层级 | 主题、用户信息 |
| Redux | 全局 | 复杂状态管理 |

### 路由

#### 文件说明

| 文件 | 内容 |
|------|------|
| `router/index.jsx` | 路由配置、懒加载、路由守卫 |
| `RouterPage.jsx` | 嵌套路由、路由参数、查询参数、编程式导航 |

#### 核心概念

```jsx
// 路由配置
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/users/:userId" element={<UserDetail />} />
  <Route path="*" element={<NotFound />} />
</Routes>

// 获取路由参数
const { userId } = useParams()

// 获取查询参数
const [searchParams, setSearchParams] = useSearchParams()
const query = searchParams.get('q')

// 编程式导航
const navigate = useNavigate()
navigate('/users')
navigate(-1)  // 返回上一页
```

### 状态管理

#### 文件说明

| 文件 | 内容 |
|------|------|
| `store/index.js` | Redux Store 配置 |
| `store/counterSlice.js` | 基础 Slice 示例（同步操作） |
| `store/todosSlice.js` | 数组操作、createSelector |
| `store/userSlice.js` | createAsyncThunk 异步操作 |
| `StorePage.jsx` | Redux 使用演示 |

#### 核心概念

```jsx
// 创建 Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    incrementByAmount: (state, action) => { state.value += action.payload }
  }
})

// 使用 Redux
const count = useSelector(state => state.counter.value)
const dispatch = useDispatch()
dispatch(increment())

// 异步操作
const fetchUser = createAsyncThunk('user/fetch', async (userId) => {
  const response = await api.getUser(userId)
  return response.data
})
```

### API 请求封装

#### 文件说明

| 文件 | 内容 |
|------|------|
| `api/config.js` | API 配置文件，所有接口集中配置，新增接口只需添加一行 |
| `api/request.js` | Axios 封装，包含拦截器、缓存、取消请求等功能 |
| `api/index.js` | 统一导出，动态生成请求方法，提供 useRequest Hook |
| `components/api/AxiosDemo.jsx` | API 封装演示组件 |

#### 核心特性

1. **配置化管理** - 所有 API 集中在一个配置文件中
2. **动态参数** - 支持 URL 参数自动替换（如 `/user/:id`）
3. **请求缓存** - 相同请求复用结果，减少重复请求
4. **请求取消** - 支持取消之前的请求，适用于搜索场景
5. **Mock 支持** - 开发环境模拟数据，无需后端
6. **useRequest Hook** - React Hook 封装，简化状态管理

#### 使用方式

```javascript
// ========== 1. 在配置文件中添加新接口 ==========
// src/api/config.js
export const apiConfigs = [
  // 新增接口只需添加一行配置
  { 
    name: 'getUser',     // 方法名：request.getUser()
    url: '/api/user',    // 接口地址
    method: 'get',       // 请求方法
    mock: true,          // 是否使用 mock
    mockData: { ... }    // mock 数据
  },
  
  // 支持 URL 动态参数
  { 
    name: 'getUserById', 
    url: '/api/user/:id',  // :id 会被自动替换
    method: 'get' 
  },
]

// ========== 2. 在组件中使用 ==========
import { request } from '@/api'

// 基础调用
const user = await request.getUser()

// 带 URL 参数（自动替换 :id）
const user = await request.getUserById({ id: 123 })
// 实际请求: GET /api/user/123

// 带查询参数
const list = await request.getArticleList({ page: 1, size: 10 })

// POST 请求
const result = await request.createArticle({ 
  title: '标题', 
  content: '内容' 
})

// ========== 3. 使用缓存 ==========
// 第一次请求走网络，之后使用缓存
const data = await request.getProductList({}, { useCache: true })

// 清除缓存
import { clearCache } from '@/api'
clearCache()

// ========== 4. 可取消的请求（搜索防抖）==========
import { cancelableRequest } from '@/api'

// 发送请求（会自动取消之前的请求）
const data = await cancelableRequest.getArticleList.send({ 
  keyword: '搜索词' 
})

// 手动取消
cancelableRequest.getArticleList.cancel()

// ========== 5. useRequest Hook ==========
import { useRequest, request } from '@/api'

function MyComponent() {
  const { 
    data,      // 响应数据
    loading,   // 加载状态
    error,     // 错误信息
    run,       // 执行请求
    refresh    // 刷新
  } = useRequest(request.getProductList, { manual: true })
  
  return (
    <button onClick={() => run()}>
      {loading ? '加载中...' : '获取数据'}
    </button>
  )
}
```

#### 添加新接口示例

```javascript
// src/api/config.js
export const apiConfigs = [
  // ... 现有配置
  
  // ===== 假如新增一个 user 接口 =====
  { 
    name: 'getUser',           // 调用：request.getUser()
    url: '/api/restful/getUser', 
    method: 'get' 
  },
  
  // ===== 新增订单接口 =====
  { name: 'getOrders', url: '/api/orders', method: 'get' },
  { name: 'createOrder', url: '/api/order/create', method: 'post' },
  { name: 'getOrderById', url: '/api/order/:id', method: 'get' },
  { name: 'deleteOrder', url: '/api/order/:id', method: 'delete' },
]

// 使用时直接调用
const user = await request.getUser({ userId: 1 })
const orders = await request.getOrders({ page: 1 })
const order = await request.getOrderById({ id: 123 })
await request.deleteOrder({ id: 123 })
```

---

## Vite vs Webpack

### 对比

| 特性 | Vite | Webpack |
|------|------|---------|
| 开发启动速度 | ⚡ 极快（毫秒级） | 较慢（需要打包） |
| 热更新速度 | ⚡ 极快 | 较慢 |
| 配置复杂度 | 简单 | 复杂 |
| 生态系统 | 较新，快速发展 | 成熟，插件丰富 |
| 浏览器兼容性 | 现代浏览器 | 可配置 |
| 生产构建工具 | Rollup | Webpack |

### Vite 工作原理

1. **开发时**：利用浏览器原生 ES Module，按需编译
2. **生产时**：使用 Rollup 打包，输出优化的静态资源

### Webpack 工作原理

1. **开发时**：完整打包所有模块，通过 webpack-dev-server 提供服务
2. **生产时**：打包、压缩、代码分割等优化

### 配置对比

```javascript
// vite.config.js - 简洁
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 }
})

// webpack.config.js - 详细
export default {
  entry: './src/main.jsx',
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })]
}
```

---

## 参考资源

### 官方文档

- [React 官方文档](https://react.dev)
- [React Router 文档](https://reactrouter.com)
- [Redux Toolkit 文档](https://redux-toolkit.js.org)
- [Vite 文档](https://vitejs.dev)
- [Webpack 文档](https://webpack.js.org)

### 推荐阅读

- [React Hooks 完全指南](https://react.dev/reference/react)
- [Redux Toolkit 入门](https://redux-toolkit.js.org/tutorials/quick-start)
- [React Router v6 迁移指南](https://reactrouter.com/en/main/upgrading/v5)

---

## License

MIT

