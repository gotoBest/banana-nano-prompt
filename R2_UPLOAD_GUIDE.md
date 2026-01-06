# Cloudflare R2 图片上传指南

本指南将帮助你将 `public/images/` 文件夹上传到 Cloudflare R2 存储。

## 📋 前置要求

### 1. Cloudflare R2 Bucket

如果你还没有 R2 bucket，需要先创建：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **R2 Object Storage**
3. 点击 **Create bucket**
4. 输入 bucket 名称（例如：`banana-nano-prompts`）
5. 选择区域（推荐：自动）
6. 点击 **Create bucket**

### 2. 创建 API Token

1. 在 R2 页面，点击 **Manage R2 API Tokens**
2. 点击 **Create API Token**
3. 设置权限：
   - **Read**: ✅
   - **Edit**: ✅
   - **List**: ✅
4. 点击 **Create API Token**
5. **重要**: 保存 **Access Key ID** 和 **Secret Access Key**（只显示一次）

### 3. 获取 Account ID

1. 在 Cloudflare Dashboard 右侧可以看到你的 **Account ID**
2. 或者从 URL 中获取：`https://dash.cloudflare.com/<ACCOUNT_ID>/...`

### 4. 配置自定义域名（可选但推荐）

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
# 如果配置了自定义域名（步骤 4），使用自定义域名
R2_ENDPOINT=https://cdn.yourdomain.com

# 如果没有自定义域名，使用 R2 默认端点
# R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
```

**保存文件**

---

## 📤 上传图片

### 方式 1: 使用 Shell 脚本（推荐）

```bash
# 直接运行
./upload-to-r2.sh
```

### 方式 2: 使用 Node.js 脚本

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
Found 0 existing objects

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
  ❌ Failed:     0

🎯 Next steps:
1. Verify files in R2 dashboard
2. Update your code to use R2 URLs
3. Test the application
```

**预计时间**: 3-5 分钟（取决于网络速度和图片数量）

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

## 🔨 更新代码使用 R2

上传完成后，需要更新代码以使用 R2 的图片地址。

### 选项 1: 环境变量方式（推荐）

#### 1. 添加环境变量到 .env.local

```bash
# R2 CDN URL（如果有自定义域名）
NEXT_PUBLIC_R2_CDN_URL=https://cdn.yourdomain.com

# 或者使用 R2 默认端点
# NEXT_PUBLIC_R2_CDN_URL=https://your_account_id.r2.cloudflarestorage.com/bucket-name
```

#### 2. 创建图片 URL 辅助函数

创建 `src/lib/images.ts`:

```typescript
export function getImageUrl(imagePath: string): string {
  const cdnUrl = process.env.NEXT_PUBLIC_R2_CDN_URL;

  if (!cdnUrl) {
    // 开发环境使用本地图片
    return `/${imagePath}`;
  }

  // 生产环境使用 R2 CDN
  return `${cdnUrl}/${imagePath}`;
}
```

#### 3. 更新组件使用新函数

**PromptCard.tsx:**
```typescript
import { getImageUrl } from '@/lib/images';

const imageUrl = item.coverImage ? getImageUrl(item.coverImage) : null;
```

**Modal.tsx:**
```typescript
const imageUrl = getImageUrl(img);
```

### 选项 2: 批量更新数据文件

如果你想要直接更新 `prompts.json`:

```bash
# 创建更新脚本
node update-image-urls-to-r2.js
```

---

## 📝 数据文件批量更新脚本

创建 `update-image-urls-to-r2.js`:

```javascript
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./src/data/prompts.json', 'utf8'));
const cdnUrl = process.env.NEXT_PUBLIC_R2_CDN_URL || 'https://your-cdn-domain.com';

let updated = 0;

data.items.forEach(item => {
  // 更新 images 数组
  item.images = item.images.map(img => {
    if (img.startsWith('images/')) {
      updated++;
      return `${cdnUrl}/${img}`;
    }
    return img;
  });

  // 更新 coverImage
  if (item.coverImage && item.coverImage.startsWith('images/')) {
    updated++;
    item.coverImage = `${cdnUrl}/${item.coverImage}`;
  }
});

fs.writeFileSync('./src/data/prompts.json', JSON.stringify(data, null, 2), 'utf8');

console.log(`✅ Updated ${updated} image URLs`);
```

运行：

```bash
NEXT_PUBLIC_R2_CDN_URL=https://your-cdn-domain.com \
node update-image-urls-to-r2.js
```

---

## 🎯 两种部署方案

### 方案 A: 本地图片 + R2 图片（推荐用于过渡期）

**优点:**
- ✅ 本地开发不需要网络
- ✅ 降级策略完善
- ✅ 易于调试

**缺点:**
- ❌ 仓库体积大（402MB）
- ❌ 首次克隆慢

### 方案 B: 仅 R2 图片（推荐用于生产）

**优点:**
- ✅ 仓库体积小（~2MB）
- ✅ 克隆速度快
- ✅ CDN 加速

**缺点:**
- ❌ 需要网络才能开发
- ❌ 依赖外部服务

---

## 🚀 生产环境推荐配置

### 1. .gitignore 更新

如果选择方案 B（仅 R2），删除本地图片：

```bash
# 从 Git 中移除图片
git rm -r --cached public/images/

# 更新 .gitignore
echo "public/images/" >> .gitignore
```

### 2. 环境变量配置

**Vercel:**
1. 进入项目 Settings
2. Environment Variables
3. 添加：
   - `NEXT_PUBLIC_R2_CDN_URL` = `https://your-cdn-domain.com`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - （其他 R2 配置）

**其他平台:**
- 按平台文档配置环境变量
- 确保客户端变量以 `NEXT_PUBLIC_` 开头

### 3. CORS 配置（如果使用自定义域名）

在 R2 bucket 设置中配置 CORS：

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
- 使用自定义域名
- 或在 R2 中配置 CORS 规则
- 确保网站域名在允许列表中

---

## 💰 成本估算

Cloudflare R2 定价（2024）:

- **存储**: $0.015/GB/月
- **A类操作**（GET）: $4.50/百万次请求
- **B类操作**（PUT）: $5.00/百万次请求

**本项目估算（402MB, 1303 张图片）:**

- 存储: ~$0.006/月
- 1000 次页面浏览: ~$0.02
- 10,000 次页面浏览: ~$0.20

**注**: Cloudflare R2 提供 **免费额度**:
- 每月 10GB 存储
- 每月 1000万次 A类操作请求

本项目很可能完全在免费额度内！

---

## 📚 相关资源

- [Cloudflare R2 文档](https://developers.cloudflare.com/r2/)
- [AWS S3 SDK 文档](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/)
- [R2 迁移工具](https://developers.cloudflare.com/r2/bucket-migration/)

---

## ✅ 上传完成检查清单

上传完成后，确认：

- [ ] 所有 1303 张图片都已上传
- [ ] 在 R2 Dashboard 可以看到文件
- [ ] 图片可以通过 URL 访问
- [ ] 代码已更新使用 R2 URL
- [ ] 本地测试通过
- [ ] 生产环境测试通过
- [ ] .env.local 已添加到 .gitignore
- [ ]（可选）本地图片已从 Git 移除

---

**祝你上传顺利！** 🚀
