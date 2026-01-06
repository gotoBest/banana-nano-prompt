const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// 读取prompts.json
const promptsPath = path.join(__dirname, 'src', 'data', 'prompts.json');
const promptsData = JSON.parse(fs.readFileSync(promptsPath, 'utf8'));

// 创建images文件夹
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('✓ 创建 images 文件夹');
}

// 收集所有需要下载的图片
const imagesToDownload = new Set();
const errors = [];

promptsData.items.forEach(item => {
  // 添加coverImage
  if (item.coverImage) {
    const url = `https://opennana.com/awesome-prompt-gallery/${item.coverImage}`;
    imagesToDownload.add(url);
  }
  // 添加images数组中的图片
  if (item.images && Array.isArray(item.images)) {
    item.images.forEach(img => {
      const url = `https://opennana.com/awesome-prompt-gallery/${img}`;
      imagesToDownload.add(url);
    });
  }
});

console.log(`\n发现 ${imagesToDownload.size} 张图片需要下载\n`);

// 下载单个图片
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });

        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {}); // 删除不完整的文件
          reject(err);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // 处理重定向
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
        } else {
          reject(new Error(`重定向失败: ${response.statusCode}`));
        }
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('请求超时'));
    });
  });
}

// 批量下载图片（并发限制为5）
async function downloadAllImages() {
  const urls = Array.from(imagesToDownload);
  let completed = 0;
  let failed = 0;

  // 分批下载，每批5个
  for (let i = 0; i < urls.length; i += 5) {
    const batch = urls.slice(i, i + 5);
    const promises = batch.map(async (url) => {
      try {
        // 从URL中提取文件名
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.split('/').pop();
        const filepath = path.join(imagesDir, filename);

        // 检查文件是否已存在
        if (fs.existsSync(filepath)) {
          completed++;
          process.stdout.write(`\r进度: ${completed}/${urls.length} (跳过已存在)`);
          return;
        }

        await downloadImage(url, filepath);
        completed++;
        process.stdout.write(`\r进度: ${completed}/${urls.length}`);
      } catch (err) {
        failed++;
        errors.push({ url, error: err.message });
        console.error(`\n✗ 下载失败: ${url} - ${err.message}`);
      }
    });

    await Promise.allSettled(promises);
  }

  console.log(`\n\n下载完成!`);
  console.log(`✓ 成功: ${completed - failed} 张`);
  console.log(`✗ 失败: ${failed} 张`);

  // 保存失败的URL到文件
  if (errors.length > 0) {
    const failedPath = path.join(__dirname, 'failed-images.json');
    fs.writeFileSync(failedPath, JSON.stringify(errors, null, 2));
    console.log(`\n✓ 失败列表已保存到: failed-images.json`);
    console.log(`  运行 'npm run retry-images' 可重新下载失败的图片`);

    console.log(`\n失败列表:`);
    errors.forEach(({ url, error }) => {
      console.log(`  - ${url}`);
      console.log(`    错误: ${error}`);
    });
  }
}

// 执行下载
downloadAllImages().catch(console.error);
