# 🎨 Cloudflare R2 图片存储 - 使用指南

项目已配置好 Cloudflare R2 图片上传功能！

---

## 📦 已安装的依赖

✅ `@aws-sdk/client-s3` - AWS S3 SDK（用于 R2）

---

## 🚀 快速命令

```bash
# 上传图片到 R2
npm run r2:upload

# 或使用 shell 脚本
./upload-to-r2.sh

# 更新数据文件中的图片 URL
NEXT_PUBLIC_R2_CDN_URL=https://your-cdn.com npm run r2:update-urls
```

---

## 📁 文件说明

| 文件 | 用途 |
|------|------|
| `.env.r2.example` | 环境变量模板 |
| `upload-images-to-r2.js` | 图片上传脚本 |
| `upload-to-r2.sh` | Shell 上传脚本 |
| `update-image-urls-to-r2.js` | 更新图片 URL 脚本 |
| `R2_QUICKSTART.md` | 5 分钟快速开始 |
| `R2_UPLOAD_GUIDE.md` | 完整使用指南 |

---

## ✅ 配置步骤

### 1. 创建 R2 Bucket

访问 Cloudflare Dashboard → R2 → Create bucket

### 2. 创建 API Token

R2 → Manage R2 API Tokens → Create API Token

### 3. 配置环境变量

```bash
cp .env.r2.example .env.local
# 编辑 .env.local 填入凭证
```

### 4. 上传图片

```bash
npm run r2:upload
```

### 5. 更新代码使用 R2 URL

```bash
NEXT_PUBLIC_R2_CDN_URL=https://your-cdn.com npm run r2:update-urls
```

---

## 💰 成本优势

**使用 R2 前:**
- GitHub 仓库：402MB
- 每次克隆：下载 402MB
- 总计：每克隆一次 402MB 传输

**使用 R2 后:**
- GitHub 仓库：~2MB
- 每次克隆：下载 2MB
- 图片：按需从 CDN 加载
- 总计：首次仅 2MB，后续按需加载

**节省**: 99.5% 仓库体积！

---

## 🎯 推荐工作流

### 开发环境

**选项 A: 保留本地图片（推荐开始时）**
- ✅ 无网络也能开发
- ✅ 快速本地测试
- ❌ 仓库大

**选项 B: 仅 R2（推荐稳定后）**
- ✅ 仓库小
- ✅ 克隆快
- ❌ 需要网络

### 生产环境

**必须使用 R2:**
- ✅ CDN 加速
- ✅ 全球分发
- ✅ 按需加载

---

## 📚 详细文档

- 🚀 **快速开始**: `R2_QUICKSTART.md`
- 📖 **完整指南**: `R2_UPLOAD_GUIDE.md`

---

## 🆘 需要帮助？

查看完整指南：`R2_UPLOAD_GUIDE.md`
