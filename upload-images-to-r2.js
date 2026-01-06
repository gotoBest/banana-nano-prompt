// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { S3Client, PutObjectCommand, ListObjectsV2Command, HeadObjectCommand } = require('@aws-sdk/client-s3');
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
const uploadRecordPath = './r2-upload-record.json';

// Load upload record
function loadUploadRecord() {
  if (fs.existsSync(uploadRecordPath)) {
    const data = fs.readFileSync(uploadRecordPath, 'utf8');
    return JSON.parse(data);
  }
  return {
    uploaded: [],      // List of uploaded file keys
    lastUpload: null,  // Last upload timestamp
    totalCount: 0,     // Total uploaded count
  };
}

// Save upload record
function saveUploadRecord(record) {
  record.lastUpload = new Date().toISOString();
  fs.writeFileSync(uploadRecordPath, JSON.stringify(record, null, 2), 'utf8');
}

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

// Recursively upload all files in a directory (with incremental upload support)
async function uploadDirectory(directoryPath, baseKey = '', uploadedSet = new Set()) {
  const files = fs.readdirSync(directoryPath);
  const results = {
    total: 0,
    success: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  for (const file of files) {
    const fullPath = path.join(directoryPath, file);
    const stat = fs.statSync(fullPath);
    const relativePath = path.join(baseKey, file).replace(/\\/g, '/');

    if (stat.isDirectory()) {
      // Recursively upload subdirectory
      const subResults = await uploadDirectory(fullPath, relativePath, uploadedSet);
      results.total += subResults.total;
      results.success += subResults.success;
      results.skipped += subResults.skipped;
      results.failed += subResults.failed;
      results.errors.push(...subResults.errors);
    } else {
      // Check if already uploaded
      results.total++;
      if (uploadedSet.has(relativePath)) {
        results.skipped++;
        process.stdout.write(`\r⏭️  [${results.skipped} skipped] ${relativePath}`);
        continue;
      }

      // Upload file
      const result = await uploadFile(fullPath, relativePath);

      if (result.success) {
        results.success++;
        uploadedSet.add(relativePath);  // Mark as uploaded
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
    console.log('1. Copy .env.local.example to .env.local');
    console.log('2. Fill in your R2 credentials');
    console.log('3. Run this script again\n');
    process.exit(1);
  }

  console.log(`📁 Bucket: ${bucketName}`);
  console.log(`📂 Local path: ${localImagesPath}`);
  console.log(`🌐 Endpoint: ${config.endpoint}\n`);

  // Load upload record
  console.log('📋 Loading upload record...');
  const record = loadUploadRecord();
  const uploadedSet = new Set(record.uploaded);

  console.log(`  Previously uploaded: ${record.uploaded.length} files`);
  if (record.lastUpload) {
    console.log(`  Last upload: ${record.lastUpload}`);
  }
  console.log('');

  // Check existing objects in R2
  console.log('🔍 Checking existing objects in R2...');
  const existingObjects = await listExistingObjects();
  console.log(`Found ${existingObjects.length} existing objects in R2\n`);

  // Sync R2 objects with record (add any objects that are in R2 but not in record)
  const r2Keys = new Set(existingObjects.map(obj => obj.Key));
  let syncCount = 0;
  for (const key of r2Keys) {
    if (!uploadedSet.has(key)) {
      uploadedSet.add(key);
      record.uploaded.push(key);
      syncCount++;
    }
  }
  if (syncCount > 0) {
    console.log(`🔄 Synced ${syncCount} files from R2 to record\n`);
  }

  // Start upload
  console.log('📤 Uploading files...\n');
  const startTime = Date.now();

  const results = await uploadDirectory(localImagesPath, 'images', uploadedSet);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Update record with newly uploaded files
  if (results.success > 0) {
    record.uploaded = Array.from(uploadedSet);
    record.totalCount = record.uploaded.length;
    saveUploadRecord(record);
  }

  console.log('\n\n✨ Upload complete!\n');
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`📊 Statistics:`);
  console.log(`  Total files:     ${results.total}`);
  console.log(`  ✅ Success:       ${results.success}`);
  console.log(`  ⏭️  Skipped:       ${results.skipped}`);
  console.log(`  ❌ Failed:        ${results.failed}`);
  console.log(`  📦 Total in R2:   ${record.uploaded.length}`);

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:');
    results.errors.slice(0, 10).forEach(({ key, error }) => {
      console.log(`  - ${key}: ${error}`);
    });
    if (results.errors.length > 10) {
      console.log(`  ... and ${results.errors.length - 10} more errors`);
    }
  }

  console.log('\n💾 Upload record saved to: r2-upload-record.json');
  console.log('\n🎯 Next steps:');
  console.log(`1. Verify files in R2 dashboard: https://dash.cloudflare.com/${process.env.R2_ACCOUNT_ID}/r2/buckets`);
  console.log(`2. Update your code to use R2 URLs`);
  console.log(`3. Test the application`);
  console.log(`4. Run this script again for incremental uploads`);
}

// Run the upload
main().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
