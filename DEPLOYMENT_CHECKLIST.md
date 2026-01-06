# ✅ Vercel 部署检查清单

## 部署前检查

- [x] 项目已成功构建 (`npm run build` 通过)
- [x] 所有依赖已安装
- [x] TypeScript 类型检查通过
- [x] 无 ESLint 错误
- [x] 图片域名已配置在 `next.config.js`
- [x] 环境变量已设置（可选）

## 部署步骤

### 步骤 1: 推送到 GitHub

```bash
# 1. 初始化 git 仓库（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "🚀 Initial commit: Nano Banana Prompt Gallery"

# 4. 在 GitHub 创建新仓库，然后添加远程地址
git remote add origin https://github.com/YOUR_USERNAME/banana-nano-prompt.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 2: 在 Vercel 部署

#### 方式 A: 通过 Vercel 网站（推荐新手）

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 **"Add New..."** → **"Project"**
4. 选择你的 `banana-nano-prompt` 仓库
5. 保持默认设置，点击 **"Deploy"**
6. 等待 2-3 分钟，部署完成！

#### 方式 B: 通过 Vercel CLI（推荐开发者）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署（预览环境）
vercel

# 4. 部署到生产环境
vercel --prod
```

### 步骤 3: 验证部署

访问你的 Vercel 提供的 URL（如 `https://banana-nano-prompt.vercel.app`）检查：

- [ ] 页面正常加载
- [ ] 图片可以显示
- [ ] 搜索功能正常
- [ ] 标签筛选正常
- [ ] 点击卡片可以打开详情弹窗
- [ ] 移动端显示正常

## 部署后配置

### 自定义域名（可选）

1. 在 Vercel 项目中，进入 **Settings** → **Domains**
2. 点击 **Add Domain**
3. 输入你的域名
4. 按照 Vercel 的提示配置 DNS 记录

### 环境变量（可选）

如果需要使用自己的数据源：

1. 在 Vercel 项目中，进入 **Settings** → **Environment Variables**
2. 添加变量：
   - Key: `NEXT_PUBLIC_BASE_URL`
   - Value: `https://your-domain.com`
3. 重新部署项目

### 添加 GitHub 集成（可选）

在 Vercel 项目中：

1. 进入 **Settings** → **Git**
2. 启用 **"Auto Deploy"**
3. 现在每次推送到 `main` 分支都会自动部署

## 常见问题

### Q: 构建失败怎么办？

A: 检查以下几点：
- Node.js 版本是否 >= 18
- 依赖是否正确安装
- 查看构建日志的错误信息

### Q: 图片无法显示？

A: 检查 `next.config.js` 中的 `remotePatterns` 配置是否正确

### Q: 数据无法加载？

A: 检查 `NEXT_PUBLIC_BASE_URL` 环境变量是否正确设置

### Q: 如何更新网站？

A: 
```bash
git add .
git commit -m "Update"
git push
```
Vercel 会自动重新部署！

## 监控和维护

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

## 成功标志 ✨

当你看到以下情况，说明部署成功：

- ✅ 构建日志显示 "✓ Compiled successfully"
- ✅ 部署日志显示 "Production: available"
- ✅ 可以访问网站并正常使用所有功能
- ✅ Vercel Dashboard 显示绿色的 "Ready" 状态

## 需要帮助？

- Vercel 文档: https://vercel.com/docs
- Next.js 文档: https://nextjs.org/docs
- GitHub Issues: 提交问题到项目仓库

---

**🎉 恭喜！你的 Nano Banana Prompt Gallery 已经上线！**
