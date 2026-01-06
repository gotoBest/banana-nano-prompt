const fs = require('fs');
const path = require('path');

// Check if CDN URL is provided
const cdnUrl = process.env.NEXT_PUBLIC_R2_CDN_URL;

if (!cdnUrl) {
  console.error('❌ Error: NEXT_PUBLIC_R2_CDN_URL environment variable is required');
  console.log('\nUsage:');
  console.log('  NEXT_PUBLIC_R2_CDN_URL=https://your-cdn-domain.com node update-image-urls-to-r2.js');
  console.log('\nOr set it in .env.local');
  process.exit(1);
}

console.log('🔄 Updating image URLs to use R2 CDN...\n');
console.log(`📦 CDN URL: ${cdnUrl}\n`);

// Read prompts.json
const dataPath = './src/data/prompts.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let updated = 0;
const skipped = [];

// Update all items
data.items.forEach(item => {
  // Update images array
  const originalImages = [...item.images];
  item.images = item.images.map(img => {
    if (img.startsWith('images/')) {
      return `${cdnUrl}/${img}`;
    }
    return img;
  });

  if (originalImages.some(img => img.startsWith('images/'))) {
    updated++;
  }

  // Update coverImage
  if (item.coverImage) {
    if (item.coverImage.startsWith('images/')) {
      item.coverImage = `${cdnUrl}/${item.coverImage}`;
      updated++;
    } else if (item.coverImage.startsWith('http')) {
      skipped.push({ id: item.id, coverImage: item.coverImage });
    }
  }
});

// Write back to prompts.json
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Update complete!\n');
console.log(`📊 Statistics:`);
console.log(`  Updated URLs: ${updated}`);
console.log(`  Skipped (already URLs): ${skipped.length}`);

if (skipped.length > 0 && skipped.length <= 10) {
  console.log('\n⚠️  Skipped items (already have full URLs):');
  skipped.forEach(({ id, coverImage }) => {
    console.log(`  #${id}: ${coverImage}`);
  });
}

console.log('\n💡 Next steps:');
console.log('  1. Test the application locally: npm run dev');
console.log('  2. Verify images load correctly');
console.log('  3. Commit changes: git add . && git commit -m "feat: migrate to R2 CDN"');
console.log('  4. Deploy to production');
