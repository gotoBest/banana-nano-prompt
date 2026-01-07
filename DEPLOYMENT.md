# 🚀 部署指南

完整的 Banana Nano Prompt Gallery 部署指南，包括 GitHub 推送和 Vercel 部署。

---

## 📋 部署前检查清单

### 部署前检查
- [x] 项目已成功构建 (`npm run build` 通过)
- [x] 所有依赖已安装
- [x] TypeScript 类型检查通过
- [x] 无 ESLint 错误
- [x] 图片域名已配置在 `next.config.js`
- [x] 环境变量已设置（可选）

### 安全检查
- [x] 无敏感文件（API keys、密码等）
- [x] 无环境变量文件（`.env`, `.env.local`）
- [x] 无构建产物（`.next/`, `build/`）
- [x] 无依赖包（`node_modules/`）
- [x] .gitignore 配置正确

---

## 🔐 安全推送指南

### ⚠️ 永远不要推送
- ❌ `.env` 文件（包含 API Keys）
- ❌ `.env.local` 文件
- ❌ `.env.production` 文件
- ❌ 任何包含密码的文件
- ❌ 私人证书或密钥

### ✅ 可以推送
- ✅ `.env.example` 或 `.env.local.example`（模板）
- ✅ 源代码
- ✅ 配置文件（无敏感信息）
- ✅ 文档
- ✅ 公开数据

---

## 📤 步骤 1: 推送代码到 GitHub

### 方式 1: 全部推送（推荐）

```bash
# 1. 初始化 Git（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 创建首次提交
git commit -m "feat: initial commit - Banana Nano Prompt Gallery

- 完整的 AI 提示词案例展示系统
- 支持 1084+ 精选案例
- 中英文双语支持
- 现代化 UI 设计
- 完整的搜索和筛选功能"

# 4. 创建主分支
git branch -M main

# 5. 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 6. 推送到 GitHub
git push -u origin main
```

### 方式 2: 使用 GitHub CLI（更简单）

```bash
# 1. 登录 GitHub（如果还没登录）
gh auth login

# 2. 创建仓库并推送
gh repo create banana-nano-prompt --public --source=. --remote=origin --push
```

### ⏱️ 预估推送时间
- **检查文件**: ~1 分钟
- **上传对象**: ~2-3 分钟
- **总耗时**: 约 5-10 分钟（取决于网络速度）

---

## 🌐 步骤 2: 在 Vercel 上部署

### 方式 A: 通过 Vercel Dashboard（推荐新手）

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 **"Add New..."** → **"Project"**
4. 选择你的 `banana-nano-prompt` 仓库
5. 保持默认设置，点击 **"Deploy"**
6. 等待 2-3 分钟，部署完成！

### 方式 B: 通过 Vercel CLI（推荐开发者）

#### 安装 Vercel CLI
```bash
npm i -g vercel
```

#### 登录 Vercel
```bash
vercel login
```

#### 部署到预览环境
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

#### 部署到生产环境
```bash
vercel --prod
```

---

## ✅ 步骤 3: 验证部署

访问你的 Vercel 提供的 URL（如 `https://banana-nano-prompt.vercel.app`）检查：

- [ ] 页面正常加载
- [ ] 图片可以显示
- [ ] 搜索功能正常
- [ ] 标签筛选正常
- [ ] 点击卡片可以打开详情弹窗
- [ ] 移动端显示正常

---

## ⚙️ 部署后配置

### 自定义域名（可选）

1. 在 Vercel 项目中，进入 **Settings** → **Domains**
2. 点击 **Add Domain**
3. 输入你的域名
4. 按照 Vercel 的提示配置 DNS 记录

### DNS 配置

如果你的域名在其他提供商（如 Cloudflare、阿里云）：

```
Type: CNAME
Name: prompts (或你想要的子域名)
Value: cname.vercel-dns.com
```

### 环境变量（可选）

如果需要使用自定义 CDN：

1. 在 Vercel 项目中，进入 **Settings** → **Environment Variables**
2. 添加：
   - Key: `NEXT_PUBLIC_R2_CDN_URL`
   - Value: `https://your-cdn-domain.com`
3. 重新部署项目

### 添加 GitHub 集成（可选）

在 Vercel 项目中：
1. 进入 **Settings** → **Git**
2. 启用 **"Auto Deploy"**
3. 现在每次推送到 `main` 分支都会自动部署

---

## 🔄 更新部署

### 更新网站

每次推送新代码到 GitHub 的 `main` 分支，Vercel 会自动重新部署。

或者使用 CLI：

```bash
vercel --prod
```

### 开发流程

```bash
# 1. 修改代码
# 2. 本地测试
npm run build
npm run dev

# 3. 提交更改
git add .
git commit -m "Update feature"

# 4. 推送到 GitHub
git push

# Vercel 会自动部署！
```

---

## 🔍 故障排查

### 构建失败

检查以下几点：
- Node.js 版本是否 >= 18
- 依赖是否正确安装
- 查看构建日志的错误信息

### 图片无法显示

检查 `next.config.js` 中的 `remotePatterns` 配置是否正确：

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'gotovpn.win',
      pathname: '/images/**',
    },
  ],
}
```

### 数据无法加载

检查环境变量是否正确设置（如果使用自定义数据源）。

### Q: 推送失败怎么办？

```bash
# 查看错误信息
git push -v

# 如果是超时，增加超时时间
git config --global http.postBuffer 524288000
git push
```

### Q: 如何忽略已推送的文件？

```bash
# 更新 .gitignore
echo "large-file.zip" >> .gitignore

# 从 Git 缓存中移除
git rm --cached -r .

# 重新提交
git commit -m "chore: update .gitignore"
git push
```

---

## 📊 监控和维护

### Vercel Analytics

1. 在 Vercel Dashboard 启用 Analytics
2. 查看访问量、页面性能等数据

### 更新依赖

```bash
# 检查过时的包
npm outdated

# 更新依赖
npm update

# 测试
npm run build
npm run dev
```

---

## 📈 性能优化建议

1. **启用 Image Optimization**: Next.js 自动优化图片
2. **使用 CDN**: Vercel 自动提供全球 CDN
3. **启用缓存**: 数据已配置静态生成
4. **压缩资源**: Next.js 自动压缩 JS/CSS

---

## 💰 成本

- **Hobby 计划**: 免费
  - 无限带宽
  - 100GB 边出网络传输/月
  - 自动 HTTPS
  - 全球 CDN

对于个人项目和小型应用完全够用！

---

## ✨ 成功标志

当你看到以下情况，说明部署成功：

- ✅ 构建日志显示 "✓ Compiled successfully"
- ✅ 郀署日志显示 "Production: available"
- ✅ 可以访问网站并正常使用所有功能
- ✅ Vercel Dashboard 显示绿色的 "Ready" 状态

---

## 📞 获取帮助

- Vercel 文档: https://vercel.com/docs
- Next.js 文档: https://nextjs.org/docs
- GitHub Issues: 提交问题到项目仓库

---

**🎉 恭喜！你的 Nano Banana Prompt Gallery 已经上线！**
