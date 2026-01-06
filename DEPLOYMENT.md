# 🚀 Vercel 部署指南

## 方法一：通过 Vercel Dashboard 部署（推荐）

### 步骤 1: 推送代码到 GitHub

```bash
# 初始化 git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Nano Banana Prompt Gallery"

# 创建 GitHub 仓库后，添加远程地址
git remote add origin https://github.com/YOUR_USERNAME/banana-nano-prompt.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 2: 在 Vercel 上部署

1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 **"New Project"**
3. 导入你的 GitHub 仓库 `banana-nano-prompt`
4. Vercel 会自动检测到 Next.js 配置
5. （可选）修改项目名称
6. 点击 **"Deploy"**

等待几分钟，Vercel 会自动构建和部署你的网站！

### 步骤 3: 访问你的网站

部署完成后，Vercel 会提供一个 `https://your-project.vercel.app` 的链接。

---

## 方法二：通过 Vercel CLI 部署

### 安装 Vercel CLI

```bash
npm i -g vercel
```

### 登录 Vercel

```bash
vercel login
```

### 部署

```bash
# 在项目根目录运行
vercel
```

按照提示操作：
- ? Set up and deploy "~/banana-nano-prompt"? [Y/n] **Y**
- ? Which scope do you want to deploy to? **选择你的账号**
- ? Link to existing project? [y/N] **N**
- ? What's your project's name? **banana-nano-prompt**
- ? In which directory is your code located? **.**
- ? Want to override the settings? [y/N] **N**

Vercel 会自动部署项目！

### 生产部署

```bash
vercel --prod
```

---

## 环境变量（可选）

如果你想使用自己的数据源，可以在 Vercel 项目设置中添加环境变量：

1. 进入项目设置 → **Environment Variables**
2. 添加：
   - **Key**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: `https://your-domain.com`

---

## 自定义域名

### 在 Vercel 中设置

1. 进入项目设置 → **Domains**
2. 点击 **Add Domain**
3. 输入你的域名（如 `prompts.yourdomain.com`）
4. 按照提示配置 DNS 记录

### DNS 配置

如果你的域名在其他提供商（如 Cloudflare、阿里云）：

```
Type: CNAME
Name: prompts (或你想要的子域名)
Value: cname.vercel-dns.com
```

---

## 更新部署

每次推送新代码到 GitHub 的 `main` 分支，Vercel 会自动重新部署。

或者使用 CLI：

```bash
vercel --prod
```

---

## 故障排查

### 构建失败

检查：
- Node.js 版本（建议 18+）
- 依赖是否正确安装
- 查看构建日志

### 图片无法加载

确保 `next.config.js` 中正确配置了图片域名：

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'opennana.com',
    },
  ],
}
```

### 数据无法获取

检查环境变量 `NEXT_PUBLIC_BASE_URL` 是否正确设置。

---

## 性能优化建议

1. **启用 Image Optimization**: Next.js 自动优化图片
2. **使用 CDN**: Vercel 自动提供全球 CDN
3. **启用缓存**: 数据已配置 1 小时缓存
4. **压缩资源**: Next.js 自动压缩 JS/CSS

---

## 监控和分析

Vercel 提供：
- **Analytics**: 访问统计
- **Speed Insights**: 性能分析
- **Logs**: 部署日志
- **Deploy Hooks**: Webhook 通知

在项目 Dashboard 中可以查看这些功能。

---

## 成本

- **Hobby 计划**: 免费
  - 无限带宽
  - 100GB 边出网络传输/月
  - 自动 HTTPS
  - 全球 CDN

对于个人项目和小型应用完全够用！

---

需要帮助？查看 [Vercel 文档](https://vercel.com/docs)
