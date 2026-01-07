# 📦 Cloudflare R2 图片存储配置指南

完整的 Cloudflare R2 图片上传和配置指南，用于将项目图片迁移到 CDN 存储。

---

## 🎯 为什么使用 R2？

### 成本优势

**使用 R2 前:**
- GitHub 仓库：402MB
- 每次克隆：下载 402MB
- 总计：每克隆一次 402MB 传输

**使用 R2 后:**
- GitHub 仓库：~2MB
- 每次克隆：下载 2MB
- 图片：按需从 CDN 加载
- 总计：首次仅 2MB，后续按需加载

**节省**: 99.5% 仓库体积！💚

### R2 免费额度

- ✅ 每月 10GB 存储
- ✅ 每月 1000万次请求
- ✅ 本项目估算：
  - 存储：402MB (<< 10GB) ✅ **免费**
  - 请求：10万次/月 (<< 1000万) ✅ **免费**

---

## 📋 前置要求

### 步骤 1: 创建 R2 Bucket

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **R2 Object Storage**
3. 点击 **Create bucket**
4. 输入 bucket 名称（例如：`banana-nano-prompts`）
5. 选择区域（推荐：自动）
6. 点击 **Create bucket**

### 步骤 2: 创建 API Token

1. 在 R2 页面，点击 **Manage R2 API Tokens**
2. 点击 **Create API Token**
3. 设置权限：
   - **Read**: ✅
   - **Edit**: ✅
   - **List**: ✅
4. 点击 **Create API Token**
5. **重要**: 保存 **Access Key ID** 和 **Secret Access Key**（只显示一次）

### 步骤 3: 获取 Account ID

1. 在 Cloudflare Dashboard 右侧可以看到你的 **Account ID**
2. 或者从 URL 中获取：`https://dash.cloudflare.com/<ACCOUNT_ID>/...`

### 步骤 4: 配置自定义域名（可选但推荐）

**为什么要用自定义域名？**
- ✅ 避免 R2 默认域名的 CORS 问题
- ✅ 更好的性能（使用 Cloudflare CDN）
- ✅ 自定义 SSL 证书
- ✅ 更简洁的 URL

**步骤：**
1. 在 R2 bucket 设置中，点击 **Settings**
2. 找到 **Public Access** 部分
3. 点击 **Connect Domain**
4. 输入你的域名（例如：`cdn.yourdomain.com`）
5. 按照提示添加 DNS 记录
6. 等待 SSL 证书生成

---

## 🔧 配置项目

### 步骤 1: 创建环境变量文件

```bash
# 复制示例文件
cp .env.r2.example .env.local
```

### 步骤 2: 编辑 .env.local

```bash
# 使用你喜欢的编辑器打开
nano .env.local
# 或
vim .env.local
# 或
code .env.local
```

填写以下信息：

```bash
# Cloudflare R2 Access Key ID（从步骤 2 获取）
R2_ACCESS_KEY_ID=your_access_key_id_here

# Cloudflare R2 Secret Access Key（从步骤 2 获取）
R2_SECRET_ACCESS_KEY=your_secret_access_key_here

# Cloudflare R2 Bucket Name（从步骤 1 创建的）
R2_BUCKET_NAME=banana-nano-prompts

# Cloudflare R2 Account ID（从步骤 3 获取）
R2_ACCOUNT_ID=your_account_id

# Cloudflare R2 Endpoint
# 如果配置了自定义域名，使用自定义域名
R2_ENDPOINT=https://cdn.yourdomain.com

# 如果没有自定义域名，使用 R2 默认端点
# R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
```

**保存文件**

---

## 📤 上传图片到 R2

### 方式 1: 使用 Shell 脚本（推荐）

```bash
# 直接运行
./upload-to-r2.sh
```

### 方式 2: 使用 NPM 脚本

```bash
npm run r2:upload
```

### 方式 3: 使用 Node.js 脚本

```bash
# 确保 .env.local 已配置
node upload-images-to-r2.js
```

### 上传过程

你会看到类似这样的输出：

```
🚀 Starting upload to Cloudflare R2...

📁 Bucket: banana-nano-prompts
📂 Local path: ./public/images
🌐 Endpoint: https://cdn.yourdomain.com

🔍 Checking existing objects in R2...
Found 1000 existing objects (syncing to local record...)

📤 Uploading files...

✅ [1/1303] images/1.png
✅ [2/1303] images/10.png
✅ [3/1303] images/100.png
...
✅ [1303/1303] images/999.png

✨ Upload complete!

⏱️  Duration: 245.32s
📊 Statistics:
  Total files:   1303
  ✅ Success:    1303
  ⏭️  Skipped:   0
  ❌ Failed:     0

🎯 Next steps:
1. Verify files in R2 dashboard
2. Update your code to use R2 URLs
3. Test the application
```

**预计时间**: 3-5 分钟（取决于网络速度和图片数量）

### 增量上传功能

项目支持增量上传，已上传的文件会自动跳过：

```
📊 Upload Record:
  Previously uploaded: 1000 files
  New files to upload: 303 files
  ⏭️  Skipping: 1000 files
  📤 Uploading: 303 files
```

上传记录保存在 `r2-upload-record.json`，每次上传会自动同步 R2 中已存在的文件。

---

## ✅ 验证上传

### 1. 检查 R2 Dashboard

1. 访问 [Cloudflare R2 Dashboard](https://dash.cloudflare.com/)
2. 进入你的 bucket
3. 应该能看到 `images/` 文件夹
4. 点击进入，确认所有图片都已上传

### 2. 测试图片访问

如果你配置了自定义域名：

```bash
# 测试单个图片
curl -I https://cdn.yourdomain.com/images/1.png

# 应该返回 200 OK
```

---

## 🔄 更新图片 URL 为 R2 CDN

### 方式 1: 环境变量方式（推荐）

#### 1. 添加环境变量到 .env.local

```bash
# R2 CDN URL（如果有自定义域名）
NEXT_PUBLIC_R2_CDN_URL=https://cdn.yourdomain.com

# 或者使用 R2 默认端点
# NEXT_PUBLIC_R2_CDN_URL=https://your_account_id.r2.cloudflarestorage.com/bucket-name
```

#### 2. 更新代码中的图片 URL

项目代码已经支持检测 R2 URL，无需额外修改：

**PromptCard.tsx:**
```typescript
const imageUrl = item.coverImage
  ? (item.coverImage.startsWith('http') ? item.coverImage : `/${item.coverImage}`)
  : null
```

**Modal.tsx:**
```typescript
{item.images.map((img, idx) => (
  <img
    key={idx}
    src={img.startsWith('http') ? img : `/${img}`}
    alt={`${item.title} - 图片 ${idx + 1}`}
  />
))}
```

### 方式 2: 批量更新数据文件

如果想要直接更新 `prompts.json`:

```bash
# 运行更新脚本
npm run r2:update-urls
```

或手动设置 CDN URL 并运行：

```bash
NEXT_PUBLIC_R2_CDN_URL=https://your-cdn-domain.com \
  node update-image-urls-to-r2.js
```

### URL 更新过程

```
🔄 Updating image URLs to use R2 CDN...
📦 CDN URL: https://your-cdn-domain.com

✅ Update complete!
📊 Statistics:
  Updated URLs: 2168
  Skipped: 0
```

---

## 🎯 两种部署方案

### 方案 A: 保留本地图片 + R2（推荐开发时）

**适用**: 开发初期

**优点:**
- ✅ 开发无需网络
- ✅ 有备份
- ✅ 易于调试

**缺点:**
- ❌ 仓库大（402MB）
- ❌ 首次克隆慢

### 方案 B: 仅 R2（推荐生产环境）

**适用**: 生产环境

**优点:**
- ✅ 仓库小（~2MB）
- ✅ 克隆快
- ✅ CDN 加速

**缺点:**
- ❌ 需要网络才能开发
- ❌ 依赖外部服务

**迁移到方案 B:**
```bash
# 从 Git 移除本地图片
git rm -r --cached public/images/
echo "public/images/" >> .gitignore
git commit -m "chore: migrate to R2 CDN"
```

---

## 🚀 生产环境配置

### 1. .gitignore 更新

如果选择方案 B（仅 R2），确保 .gitignore 包含：

```gitignore
# R2 images - served from CDN
public/images/

# R2 upload record - local upload tracking
r2-upload-record.json
```

### 2. 环境变量配置

**Vercel:**
1. 进入项目 Settings
2. Environment Variables
3. 添加：
   - `NEXT_PUBLIC_R2_CDN_URL` = `https://your-cdn-domain.com`
   - （可选：R2 凭证，如果需要在 Vercel 上传）

**其他平台:**
- 按平台文档配置环境变量
- 确保客户端变量以 `NEXT_PUBLIC_` 开头

### 3. Next.js 配置

确保 `next.config.js` 包含 R2 域名：

```javascript
images: {
  unoptimized: false,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'gotovpn.win',
      pathname: '/images/**',
    },
  ],
}
```

### 4. CORS 配置（如果使用自定义域名）

在 R2 bucket 设置中配置 CORS（通常不需要，因为使用自定义域名）：

```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

---

## 🔍 故障排查

### 问题 1: 认证失败

```
Error: InvalidAccessKeyId
```

**解决:**
- 检查 `.env.local` 中的凭证是否正确
- 确认 API Token 有正确的权限
- 尝试重新生成 API Token

### 问题 2: Bucket 不存在

```
Error: NoSuchBucket
```

**解决:**
- 确认 bucket 名称正确
- 检查 Account ID 是否正确
- 确认 bucket 在正确的账户中

### 问题 3: 上传失败

```
Error: NetworkingError
```

**解决:**
- 检查网络连接
- 确认 endpoint URL 正确
- 尝试增加超时时间

### 问题 4: CORS 错误

**解决:**
- 使用自定义域名（推荐）
- 或在 R2 中配置 CORS 规则
- 确保网站域名在允许列表中

### 问题 5: 图片 404 错误

**解决:**
- 确认图片已上传到 R2
- 检查 CDN URL 是否正确
- 确认 Next.js 配置中的 hostname
- 清除浏览器缓存

---

## 📁 项目文件说明

| 文件 | 用途 |
|------|------|
| `.env.r2.example` | 环境变量模板 |
| `upload-images-to-r2.js` | 图片上传脚本（Node.js） |
| `upload-to-r2.sh` | 图片上传脚本（Shell） |
| `update-image-urls-to-r2.js` | 批量更新图片 URL |
| `r2-upload-record.json` | 上传记录（自动生成，gitignore） |
| `R2_SETUP.md` | 本文档 - 完整配置指南 |

### NPM 脚本

```json
{
  "scripts": {
    "r2:upload": "node upload-images-to-r2.js",
    "r2:update-urls": "node update-image-urls-to-r2.js"
  }
}
```

---

## 📚 相关资源

- [Cloudflare R2 文档](https://developers.cloudflare.com/r2/)
- [AWS S3 SDK 文档](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/)
- [R2 迁移工具](https://developers.cloudflare.com/r2/bucket-migration/)
- [Next.js Image 优化](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## ✅ 上传完成检查清单

上传完成后，确认：

- [ ] 所有 1303 张图片都已上传
- [ ] 在 R2 Dashboard 可以看到文件
- [ ] 图片可以通过 URL 访问
- [ ] 代码已更新使用 R2 URL（如果选择方案 B）
- [ ] 本地测试通过
- [ ] 生产环境测试通过
- [ ] .env.local 已添加到 .gitignore
- [ ] r2-upload-record.json 已添加到 .gitignore
- [ ] （可选）本地图片已从 Git 移除

---

## 💡 最佳实践

1. **开发环境**: 保留本地图片（方案 A）
2. **生产环境**: 使用 R2 CDN（方案 B）
3. **增量上传**: 利用上传记录功能，避免重复上传
4. **备份策略**: 定期备份 R2 数据
5. **监控成本**: 关注 R2 使用量，确保在免费额度内
6. **自定义域名**: 强烈推荐配置，避免 CORS 问题

---

**祝你配置顺利！** 🚀
