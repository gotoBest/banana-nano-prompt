// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
};

// Create S3 client for R2
const s3Client = new S3Client(config);

const bucketName = process.env.R2_BUCKET_NAME;
const localImagesPath = './public/images';

// Upload a single file to R2
async function uploadFile(filePath, key) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = getContentType(filePath);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
  });

  try {
    const response = await s3Client.send(command);
    return { success: true, key, etag: response.ETag };
  } catch (error) {
    return { success: false, key, error: error.message };
  }
}

// Get content type based on file extension
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };
  return contentTypes[ext] || 'application/octet-stream';
}

// Recursively upload all files in a directory
async function uploadDirectory(directoryPath, baseKey = '') {
  const files = fs.readdirSync(directoryPath);
  const results = {
    total: 0,
    success: 0,
    failed: 0,
    errors: [],
  };

  for (const file of files) {
    const fullPath = path.join(directoryPath, file);
    const stat = fs.statSync(fullPath);
    const relativePath = path.join(baseKey, file).replace(/\\/g, '/');

    if (stat.isDirectory()) {
      // Recursively upload subdirectory
      const subResults = await uploadDirectory(fullPath, relativePath);
      results.total += subResults.total;
      results.success += subResults.success;
      results.failed += subResults.failed;
      results.errors.push(...subResults.errors);
    } else {
      // Upload file
      results.total++;
      const result = await uploadFile(fullPath, relativePath);

      if (result.success) {
        results.success++;
        process.stdout.write(`\r✅ [${results.success}/${results.total}] ${relativePath}`);
      } else {
        results.failed++;
        results.errors.push({ key: relativePath, error: result.error });
        process.stdout.write(`\r❌ [${results.failed}] ${relativePath}: ${result.error}`);
      }
    }
  }

  return results;
}

// List existing objects in R2
async function listExistingObjects() {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
  });

  try {
    const response = await s3Client.send(command);
    return response.Contents || [];
  } catch (error) {
    console.error('Error listing objects:', error.message);
    return [];
  }
}

// Main upload function
async function main() {
  console.log('🚀 Starting upload to Cloudflare R2...\n');

  // Check configuration
  if (!bucketName || !config.credentials.accessKeyId) {
    console.error('❌ Error: Missing required environment variables.');
    console.log('\nPlease set up your .env.local file:');
    console.log('1. Copy .env.r2.example to .env.local');
    console.log('2. Fill in your R2 credentials');
    console.log('3. Run this script again\n');
    process.exit(1);
  }

  console.log(`📁 Bucket: ${bucketName}`);
  console.log(`📂 Local path: ${localImagesPath}`);
  console.log(`🌐 Endpoint: ${config.endpoint}\n`);

  // Check existing objects
  console.log('🔍 Checking existing objects in R2...');
  const existingObjects = await listExistingObjects();
  console.log(`Found ${existingObjects.length} existing objects\n`);

  // Start upload
  console.log('📤 Uploading files...\n');
  const startTime = Date.now();

  const results = await uploadDirectory(localImagesPath, 'images');

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('\n\n✨ Upload complete!\n');
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`📊 Statistics:`);
  console.log(`  Total files:   ${results.total}`);
  console.log(`  ✅ Success:    ${results.success}`);
  console.log(`  ❌ Failed:     ${results.failed}`);

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:');
    results.errors.slice(0, 10).forEach(({ key, error }) => {
      console.log(`  - ${key}: ${error}`);
    });
    if (results.errors.length > 10) {
      console.log(`  ... and ${results.errors.length - 10} more errors`);
    }
  }

  console.log('\n🎯 Next steps:');
  console.log(`1. Verify files in R2 dashboard: https://dash.cloudflare.com/${process.env.R2_ACCOUNT_ID}/r2/buckets`);
  console.log(`2. Update your code to use R2 URLs`);
  console.log(`3. Test the application`);
}

// Run the upload
main().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
