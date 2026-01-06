const fs = require('fs');
const path = require('path');

const CONFIG = {
  sourceDir: __dirname,
  outputDir: path.join(__dirname, 'dist'),
  filesToCopy: [
    'index.html',
    '404.html',
    'offline.html',
    'manifest.json',
    'css',
    'js',
    'img',
    'docs'
  ],
  filesToMinify: [
    'index.html',
    '404.html',
    'offline.html'
  ]
};

function cleanDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`✓ 清理目录: ${dir}`);
  }
}

function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ 创建目录: ${dir}`);
  }
}

function copyFile(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
      copyFile(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
    console.log(`✓ 复制文件: ${path.relative(CONFIG.sourceDir, src)}`);
  }
}

function minifyHTML(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/;\s*/g, ';')
    .replace(/,\s*/g, ',')
    .trim();
}

function build() {
  console.log('🚀 开始构建项目...\n');

  cleanDirectory(CONFIG.outputDir);
  createDirectory(CONFIG.outputDir);

  console.log('\n📁 复制文件到输出目录...\n');
  
  CONFIG.filesToCopy.forEach(file => {
    const srcPath = path.join(CONFIG.sourceDir, file);
    const destPath = path.join(CONFIG.outputDir, file);
    
    if (fs.existsSync(srcPath)) {
      copyFile(srcPath, destPath);
    } else {
      console.warn(`⚠️  文件不存在: ${file}`);
    }
  });

  console.log('\n🔧 处理HTML文件...\n');
  
  CONFIG.filesToMinify.forEach(file => {
    const srcPath = path.join(CONFIG.sourceDir, file);
    const destPath = path.join(CONFIG.outputDir, file);
    
    if (fs.existsSync(srcPath)) {
      const content = fs.readFileSync(srcPath, 'utf8');
      const minified = minifyHTML(content);
      fs.writeFileSync(destPath, minified);
      console.log(`✓ 压缩文件: ${file}`);
    }
  });

  console.log('\n✅ 构建完成！');
  console.log(`📦 输出目录: ${CONFIG.outputDir}`);
  console.log(`📊 文件大小: ${getDirectorySize(CONFIG.outputDir)} KB`);
}

function getDirectorySize(dir) {
  let size = 0;
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      size += getDirectorySize(filePath);
    } else {
      size += stats.size;
    }
  });
  
  return (size / 1024).toFixed(2);
}

build();