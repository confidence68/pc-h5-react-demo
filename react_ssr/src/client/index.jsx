/**
 * 客户端入口文件 - React 水合（Hydration）
 * 
 * 【核心职责】
 * 在浏览器端"水合"服务端渲染的 HTML，使其变得可交互
 * 
 * 【什么是水合（Hydration）？】
 * 水合是指 React 在客户端接管服务端渲染的 HTML 的过程：
 * 1. React 不会重新创建 DOM（因为 HTML 已经存在）
 * 2. React 会复用已有的 DOM 节点
 * 3. React 会绑定事件处理器
 * 4. React 会执行 useEffect 等副作用
 * 
 * 【hydrateRoot vs createRoot】
 * - createRoot: 用于客户端渲染（CSR），创建新的 DOM
 * - hydrateRoot: 用于 SSR，复用已有的 DOM
 * 
 * 【重要】
 * 水合时，客户端渲染的结果必须与服务端一致
 * 否则会出现 "Hydration Mismatch" 错误
 */

// React 18 的客户端渲染 API
import { hydrateRoot } from 'react-dom/client';

// React Router 的浏览器路由组件
// BrowserRouter 使用 HTML5 History API 进行路由管理
import { BrowserRouter } from 'react-router-dom';

// 共享的 App 组件
// 同一个组件在服务端和客户端使用，这就是"同构"
import App from '../shared/App';

/**
 * 【关键】获取 React 挂载点
 * 
 * 这个 DOM 元素在服务端返回的 HTML 中已经存在
 * 并且已经包含了服务端渲染的内容
 */
const container = document.getElementById('root');

/**
 * 【核心】使用 hydrateRoot 进行水合
 * 
 * 【参数说明】
 * - container: DOM 元素，React 应用的挂载点
 * - element: React 元素，必须与服务端渲染的组件结构一致
 * 
 * 【BrowserRouter 的作用】
 * - 提供路由上下文
 * - 使用浏览器的 History API
 * - 与服务端的 StaticRouter 对应（它们提供相同的路由功能）
 * 
 * 【水合过程】
 * 1. React 遍历服务端渲染的 DOM
 * 2. 与客户端渲染的虚拟 DOM 进行对比
 * 3. 如果一致，复用 DOM 节点，绑定事件
 * 4. 如果不一致，控制台警告，可能导致 UI 异常
 */
hydrateRoot(
  container,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

/**
 * 【调试信息】
 * 在控制台输出水合完成的信息
 * 帮助确认水合是否成功执行
 */
console.log('='.repeat(50));
console.log('🎉 React 水合（Hydration）完成！');
console.log('='.repeat(50));
console.log('\n【水合过程说明】');
console.log('1. 找到 id="root" 的 DOM 元素');
console.log('2. 复用服务端渲染的 HTML');
console.log('3. 绑定事件处理器');
console.log('4. 执行 useEffect 副作用');
console.log('5. 页面现在完全可交互！\n');

/**
 * 【扩展知识】关于 React 18 的并发特性
 * 
 * React 18 引入了并发渲染（Concurrent Rendering），
 * hydrateRoot 支持一些新特性：
 * 
 * 1. 选择性水合（Selective Hydration）
 *    - 可以优先水合用户正在交互的部分
 *    - 配合 Suspense 使用效果更好
 * 
 * 2. 流式 SSR（Streaming SSR）
 *    - 服务端可以边渲染边发送 HTML
 *    - 客户端可以边接收边水合
 *    - 使用 renderToPipeableStream API
 * 
 * 示例（流式 SSR）：
 * 
 * // 服务端
 * const { pipe } = renderToPipeableStream(
 *   <App />,
 *   {
 *     bootstrapScripts: ['/bundle.js'],
 *     onShellReady() {
 *       pipe(res);
 *     }
 *   }
 * );
 * 
 * 本项目使用简单的 renderToString 进行教学演示，
 * 生产环境推荐使用流式渲染以获得更好的性能。
 */

/**
 * 【常见问题】Hydration Mismatch（水合不匹配）
 * 
 * 原因：服务端和客户端渲染结果不一致
 * 
 * 常见场景：
 * 1. 使用了当前时间 new Date()
 * 2. 使用了随机数 Math.random()
 * 3. 使用了 typeof window !== 'undefined' 判断
 * 4. 服务端和客户端环境变量不同
 * 
 * 解决方案：
 * 1. 确保初始渲染在两端一致
 * 2. 将动态内容放在 useEffect 中
 * 3. 使用 suppressHydrationWarning 属性（不推荐，应该修复根本问题）
 * 
 * 示例：
 * // ❌ 错误：会导致水合不匹配
 * function Time() {
 *   return <span>{new Date().toLocaleTimeString()}</span>
 * }
 * 
 * // ✅ 正确：在 useEffect 中更新
 * function Time() {
 *   const [time, setTime] = useState('--:--:--');
 *   useEffect(() => {
 *     setTime(new Date().toLocaleTimeString());
 *   }, []);
 *   return <span>{time}</span>
 * }
 */

