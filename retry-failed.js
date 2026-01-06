const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// 读取失败图片列表
const failedPath = path.join(__dirname, 'failed-images.json');

if (!fs.existsSync(failedPath)) {
  console.log('✗ 未找到失败图片记录文件 (failed-images.json)');
  console.log('  请先运行 npm run download-images 下载图片');
  process.exit(1);
}

const failedImages = JSON.parse(fs.readFileSync(failedPath, 'utf8'));
const imagesDir = path.join(__dirname, 'images');

console.log(`\n发现 ${failedImages.length} 张失败的图片需要重新下载\n`);

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

// 重新下载失败的图片
async function retryFailedImages() {
  let success = 0;
  let stillFailed = 0;
  const newErrors = [];

  // 分批下载，每批5个
  for (let i = 0; i < failedImages.length; i += 5) {
    const batch = failedImages.slice(i, i + 5);
    const promises = batch.map(async ({ url }) => {
      try {
        // 从URL中提取文件名
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.split('/').pop();
        const filepath = path.join(imagesDir, filename);

        // 删除可能存在的不完整文件
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }

        await downloadImage(url, filepath);
        success++;
        process.stdout.write(`\r进度: ${success + stillFailed}/${failedImages.length}`);
      } catch (err) {
        stillFailed++;
        newErrors.push({ url, error: err.message });
        console.error(`\n✗ 下载失败: ${url} - ${err.message}`);
      }
    });

    await Promise.allSettled(promises);
  }

  console.log(`\n\n重新下载完成!`);
  console.log(`✓ 成功: ${success} 张`);
  console.log(`✗ 仍然失败: ${stillFailed} 张`);

  if (stillFailed > 0) {
    // 更新失败列表
    fs.writeFileSync(failedPath, JSON.stringify(newErrors, null, 2));
    console.log(`\n✓ 更新失败列表: ${failedImages.length} 张`);
    console.log(`  可再次运行 'npm run retry-images' 继续重试`);
  } else {
    // 全部成功，删除失败列表文件
    fs.unlinkSync(failedPath);
    console.log(`\n✓ 所有图片下载成功！已删除失败记录文件`);
  }
}

// 执行重试
retryFailedImages().catch(console.error);
