# 🚀 Cloudflare R2 快速开始

**5 分钟将图片上传到 Cloudflare R2**

---

## 步骤 1: 创建 R2 Bucket (1 分钟)

1. 访问 https://dash.cloudflare.com/
2. 进入 **R2 Object Storage**
3. **Create bucket** → 输入名称 `banana-prompts`
4. **Manage R2 API Tokens** → **Create API Token**
5. 权限：Read ✅ Edit ✅ List ✅
6. **保存** Access Key ID 和 Secret Access Key

## 步骤 2: 配置项目 (1 分钟)

```bash
# 创建环境变量文件
cp .env.r2.example .env.local

# 编辑文件，填入你的凭证
nano .env.local
```

填写：
```bash
R2_ACCESS_KEY_ID=你的key
R2_SECRET_ACCESS_KEY=你的secret
R2_BUCKET_NAME=banana-prompts
R2_ACCOUNT_ID=你的account_id
R2_ENDPOINT=https://你的account_id.r2.cloudflarestorage.com
```

## 步骤 3: 上传图片 (3 分钟)

```bash
# 运行上传脚本
./upload-to-r2.sh
```

等待上传完成（约 3-5 分钟）

## 步骤 4: 验证

访问 R2 Dashboard → 你的 bucket → images 文件夹

---

## 🎯 完成！

查看详细文档：`R2_UPLOAD_GUIDE.md`
