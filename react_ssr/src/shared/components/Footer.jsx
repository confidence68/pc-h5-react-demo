/**
 * Footer 组件 - 同构组件示例
 * 
 * 【这是一个纯展示组件】
 * - 没有状态，没有副作用
 * - 在服务端和客户端渲染结果完全一致
 * - 是最简单的同构组件类型
 */

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        © 2024 <span className="footer__highlight">React SSR 教学项目</span>
      </p>
      <p className="footer__text">
        演示 React 18 同构渲染核心原理
      </p>
    </footer>
  );
}

export default Footer;

