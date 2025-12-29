/**
 * 代码块组件
 * 
 * 【组件说明】
 * 用于展示代码示例的通用组件
 * 支持语法高亮（简化版）
 * 
 * 【这是一个服务端组件】
 * 没有 'use client' 指令，默认是 Server Component
 * 纯展示组件，不需要客户端交互
 */

/**
 * 代码块组件
 * 
 * @param {Object} props
 * @param {string} props.filename - 文件名（可选）
 * @param {string} props.language - 代码语言（可选）
 * @param {React.ReactNode} props.children - 代码内容
 */
export default function CodeBlock({ filename, language, children }) {
  return (
    <div className="code-block">
      {/* 头部信息 */}
      {filename && (
        <div className="code-block__header">
          <span className="code-block__filename">
            {filename}
          </span>
          {language && (
            <span className="code-block__language">
              {language}
            </span>
          )}
        </div>
      )}
      
      {/* 代码内容 */}
      <div className="code-block__content">
        <pre>{children}</pre>
      </div>
    </div>
  );
}

