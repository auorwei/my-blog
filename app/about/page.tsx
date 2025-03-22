export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">关于我</h1>
        
        <div className="prose lg:prose-xl">
          <p>
            欢迎来到我的个人博客！这个网站使用 Next.js、Vercel 和 Contentful 构建，
            采用了增量静态再生（ISR）技术来确保内容始终保持最新状态。
          </p>
          
          <h2>关于这个项目</h2>
          
          <p>
            这个博客是我学习 Vercel 部署和 Contentful 内容管理系统的实践项目。
            通过这个项目，我探索了现代 Web 开发的最佳实践，包括：
          </p>
          
          <ul>
            <li>Next.js 框架的使用，特别是 App Router 和 ISR 功能</li>
            <li>Contentful 作为无头 CMS 的集成和使用</li>
            <li>Vercel 的自动部署和托管功能</li>
            <li>响应式设计和现代 UI 组件构建</li>
          </ul>
          
          <h2>联系方式</h2>
          
          <p>
            如果您有任何问题或建议，欢迎通过以下方式联系我：
          </p>
          
          <ul>
            <li>邮箱：your.email@example.com</li>
            <li>GitHub：<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">github.com/yourusername</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
