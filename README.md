# 个人博客网站

这是一个使用 Next.js、Vercel 和 Contentful 构建的个人博客网站，采用了增量静态再生（ISR）技术来确保内容始终保持最新状态。

## 特点

- 使用 Next.js 13+ App Router 
- 采用 ISR (Incremental Static Regeneration) 技术
- Contentful 作为无头 CMS
- 响应式设计
- Tailwind CSS 和 Typography 插件
- 博客文章列表和详情页
- 自定义页眉和页脚组件

## 入门指南

### 先决条件

- Node.js 16.8 或更高版本
- npm 或 yarn
- Contentful 账户
- Vercel 账户（用于部署）

### 安装

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/my-blog.git
cd my-blog
```

2. 安装依赖：

```bash
npm install
# 或
yarn install
```

3. 创建 `.env.local` 文件，添加 Contentful API 密钥：

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

### Contentful 设置

在 Contentful 中创建一个 "Blog Post" 内容模型，包含以下字段：

- `title`（标题）- 短文本
- `url`（URL）- 短文本，用于路由
- `summary`（摘要）- 长文本
- `content`（内容）- 富文本
- `author`（作者）- 短文本
- `date`（日期）- 日期和时间
- `featuredImage`（特色图片）- 媒体

### 本地开发

```bash
npm run dev
# 或
yarn dev
```

在浏览器中访问 [http://localhost:3000](http://localhost:3000)。

## 部署到 Vercel

1. 在 GitHub 上创建一个新仓库，并将代码推送到该仓库。

2. 在 Vercel 中创建一个新项目，并连接到你的 GitHub 仓库。

3. 添加环境变量（在 Vercel 项目设置中）：
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`

4. 部署！

## 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Contentful 文档](https://www.contentful.com/developers/docs/)
- [Vercel 部署文档](https://vercel.com/docs/concepts/deployments/overview)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 许可证

MIT
