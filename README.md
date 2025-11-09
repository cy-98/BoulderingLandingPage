# Next.js SSG Demo

这是一个使用 Next.js 14 和 Tailwind CSS 构建的静态站点生成（SSG）示例项目。

## 特性

- ⚡️ Next.js 14 App Router
- 🎨 Tailwind CSS 样式
- 📦 TypeScript 支持
- 🚀 静态站点生成 (SSG)

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建静态站点

```bash
npm run build
```

构建后的静态文件会生成在 `out` 目录中，可以直接部署到任何静态托管服务。

### 预览构建结果

```bash
npm run start
```

## 项目结构

```
nextjs-ssg-demo/
├── src/
│   └── app/
│       ├── globals.css    # 全局样式
│       ├── layout.tsx     # 根布局
│       └── page.tsx       # 首页
├── next.config.js         # Next.js 配置
├── tailwind.config.js     # Tailwind 配置
├── tsconfig.json          # TypeScript 配置
└── package.json
```

## 部署

构建后的静态文件可以部署到：

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- 任何 CDN 或静态托管服务

## 了解更多

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Next.js SSG 文档](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

