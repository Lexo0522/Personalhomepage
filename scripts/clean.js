const fs = require('fs');
const path = require('path');

const CONFIG = {
  outputDir: path.join(__dirname, '..', 'dist'),
  cacheDir: path.join(__dirname, '..', '.cache'),
  tempDir: path.join(__dirname, '..', '.temp')
};

function cleanDirectory(dir, dirName) {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✓ 清理${dirName}: ${dir}`);
    } catch (error) {
      console.error(`✗ 清理${dirName}失败:`, error.message);
    }
  } else {
    console.log(`○ ${dirName}不存在，跳过: ${dir}`);
  }
}

function clean() {
  console.log('🧹 开始清理项目...\n');

  cleanDirectory(CONFIG.outputDir, '构建目录');
  cleanDirectory(CONFIG.cacheDir, '缓存目录');
  cleanDirectory(CONFIG.tempDir, '临时目录');

  console.log('\n✅ 清理完成！');
}

clean();