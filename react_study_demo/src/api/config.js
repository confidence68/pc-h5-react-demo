/**
 * API 接口配置文件
 * 
 * 这是一个集中管理所有 API 接口的配置文件
 * 新增接口只需要在 apiConfigs 数组中添加一行配置即可
 * 
 * 配置项说明：
 * - name: 接口名称，调用时使用的方法名（如 request.getUser）
 * - url: 接口地址，支持动态参数（如 /api/user/:id）
 * - method: 请求方法（get, post, put, delete, patch）
 * - headers: 可选，自定义请求头
 * - timeout: 可选，单独设置超时时间
 * - mock: 可选，是否使用 mock 数据（开发环境）
 * - mockData: 可选，mock 数据或 mock 函数
 */

// ================================
// API 接口配置列表
// ================================
// 新增接口只需在此数组中添加一行配置
export const apiConfigs = [
  // ============ 用户相关接口 ============
  { 
    name: 'getUser', 
    url: '/api/user/info', 
    method: 'get',
    mock: true,
    mockData: { id: 1, name: '张三', email: 'zhangsan@example.com', avatar: '👤' }
  },
  { 
    name: 'getUserById', 
    url: '/api/user/:id', 
    method: 'get',
    mock: true,
    mockData: (params) => ({ id: params.id, name: `用户${params.id}`, email: `user${params.id}@example.com` })
  },
  { 
    name: 'updateUser', 
    url: '/api/user/update', 
    method: 'post',
    mock: true,
    mockData: { success: true, message: '更新成功' }
  },
  { 
    name: 'deleteUser', 
    url: '/api/user/:id', 
    method: 'delete',
    mock: true,
    mockData: { success: true, message: '删除成功' }
  },
  
  // ============ 文章相关接口 ============
  { 
    name: 'getArticleList', 
    url: '/api/articles', 
    method: 'get',
    mock: true,
    mockData: {
      list: [
        { id: 1, title: 'React Hooks 入门', author: '张三', views: 1234 },
        { id: 2, title: 'Vue3 组合式 API', author: '李四', views: 567 },
        { id: 3, title: 'TypeScript 最佳实践', author: '王五', views: 890 }
      ],
      total: 3
    }
  },
  { 
    name: 'getArticleDetail', 
    url: '/api/article/:id', 
    method: 'get',
    mock: true,
    mockData: (params) => ({
      id: params.id,
      title: `文章标题 ${params.id}`,
      content: '这是文章的详细内容...',
      createTime: new Date().toISOString()
    })
  },
  { 
    name: 'createArticle', 
    url: '/api/article/create', 
    method: 'post',
    mock: true,
    mockData: { success: true, id: Date.now(), message: '创建成功' }
  },
  
  // ============ 商品相关接口 ============
  { 
    name: 'getProductList', 
    url: '/api/products', 
    method: 'get',
    mock: true,
    mockData: {
      list: [
        { id: 1, name: 'iPhone 15', price: 7999, stock: 100 },
        { id: 2, name: 'MacBook Pro', price: 14999, stock: 50 },
        { id: 3, name: 'AirPods Pro', price: 1999, stock: 200 }
      ],
      total: 3
    }
  },
  
  // ============ 上传接口 ============
  { 
    name: 'uploadFile', 
    url: '/api/upload', 
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    mock: true,
    mockData: { success: true, url: 'https://example.com/file.jpg' }
  },

  // ============ 登录相关接口 ============
  { 
    name: 'login', 
    url: '/api/auth/login', 
    method: 'post',
    mock: true,
    mockData: { 
      success: true, 
      token: 'mock-jwt-token-' + Date.now(),
      user: { id: 1, name: '管理员', role: 'admin' }
    }
  },
  { 
    name: 'logout', 
    url: '/api/auth/logout', 
    method: 'post',
    mock: true,
    mockData: { success: true, message: '退出成功' }
  },

  // ================================
  // 在此处添加新接口配置
  // 示例：
  // { name: 'getOrders', url: '/api/orders', method: 'get' },
  // { name: 'createOrder', url: '/api/order/create', method: 'post' },
  // ================================
]

// ================================
// 基础配置
// ================================
export const baseConfig = {
  // 基础 URL，可根据环境变量配置
  baseURL: import.meta.env?.VITE_API_BASE_URL || 'https://api.example.com',
  
  // 请求超时时间（毫秒）
  timeout: 10000,
  
  // 是否启用 mock（开发环境建议开启）
  enableMock: true,
  
  // Mock 延迟时间（模拟网络延迟）
  mockDelay: 500,
  
  // 默认请求头
  headers: {
    'Content-Type': 'application/json',
  },
}

// ================================
// 错误码映射
// ================================
export const errorCodeMap = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求的资源不存在',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

