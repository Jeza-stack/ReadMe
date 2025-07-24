#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function analyzeBundle() {
  const outDir = path.join(process.cwd(), 'out');
  const staticDir = path.join(outDir, '_next', 'static');
  
  if (!fs.existsSync(staticDir)) {
    console.log('❌ No build found. Run "npm run build" first.');
    return;
  }

  console.log('📊 Bundle Analysis Report\n');
  console.log('=' .repeat(50));

  // Analyze chunks
  const chunksDir = path.join(staticDir, 'chunks');
  let chunks = [];
  if (fs.existsSync(chunksDir)) {
    console.log('\n📦 JavaScript Chunks:');
    chunks = fs.readdirSync(chunksDir)
      .filter(file => file.endsWith('.js'))
      .map(file => ({
        name: file,
        size: getFileSizeInKB(path.join(chunksDir, file))
      }))
      .sort((a, b) => b.size - a.size);

    let totalJS = 0;
    chunks.forEach(chunk => {
      console.log(`  ${chunk.name}: ${chunk.size} KB`);
      totalJS += chunk.size;
    });
    console.log(`\n  Total JS: ${totalJS} KB`);
  }

  // Analyze CSS
  const cssDir = path.join(staticDir, 'css');
  let cssFiles = [];
  if (fs.existsSync(cssDir)) {
    console.log('\n🎨 CSS Files:');
    cssFiles = fs.readdirSync(cssDir)
      .filter(file => file.endsWith('.css'))
      .map(file => ({
        name: file,
        size: getFileSizeInKB(path.join(cssDir, file))
      }));

    let totalCSS = 0;
    cssFiles.forEach(file => {
      console.log(`  ${file.name}: ${file.size} KB`);
      totalCSS += file.size;
    });
    console.log(`\n  Total CSS: ${totalCSS} KB`);
  }

  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  
  const largeChunks = chunks?.filter(chunk => chunk.size > 100) || [];
  if (largeChunks.length > 0) {
    console.log('  ⚠️  Large chunks detected (>100KB):');
    largeChunks.forEach(chunk => {
      console.log(`     - ${chunk.name} (${chunk.size} KB)`);
    });
    console.log('     Consider code splitting or lazy loading.');
  }

  const totalSize = (chunks?.reduce((sum, chunk) => sum + chunk.size, 0) || 0) + 
                   (cssFiles?.reduce((sum, file) => sum + file.size, 0) || 0);
  
  if (totalSize > 500) {
    console.log('  ⚠️  Total bundle size is large (>500KB)');
    console.log('     Consider removing unused dependencies.');
  } else if (totalSize < 200) {
    console.log('  ✅ Bundle size is optimized (<200KB)');
  } else {
    console.log('  ✅ Bundle size is reasonable');
  }

  console.log('\n📈 Performance Score:');
  let score = 100;
  
  if (totalSize > 500) score -= 20;
  else if (totalSize > 300) score -= 10;
  
  if (largeChunks.length > 2) score -= 15;
  else if (largeChunks.length > 0) score -= 5;

  console.log(`  Score: ${score}/100`);
  
  if (score >= 90) console.log('  🎉 Excellent performance!');
  else if (score >= 70) console.log('  👍 Good performance');
  else if (score >= 50) console.log('  ⚠️  Needs optimization');
  else console.log('  🚨 Poor performance - immediate action needed');

  console.log('\n' + '='.repeat(50));
}

analyzeBundle();