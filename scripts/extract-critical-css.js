const fs = require('fs');
const path = require('path');

const CONFIG = {
  sourceDir: __dirname,
  criticalCSS: [
    'body',
    'header',
    '.avatar',
    '.tagline',
    '.about-text',
    '.btn-primary',
    '#projects',
    '#github-repos-section',
    '#blog-posts-section'
  ],
  outputDir: path.join(__dirname, 'critical.css')
};

function extractCriticalCSS() {
  console.log('🔍 开始提取关键CSS...\n');
  
  const cssPath = path.join(CONFIG.sourceDir, 'css', 'style.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  const criticalRules = CONFIG.criticalCSS.map(selector => {
    const regex = new RegExp(`${selector.replace(/[.*+?^${}()[\]\\]/g, '\\\\') ? selector.replace(/[.*+?^${}()[\]\\]/g, '\\\\') : selector}[^{]*\\{([^}]*)\\}`, 'g');
    const matches = cssContent.match(regex);
    
    if (matches) {
      return matches[0];
    }
    return null;
  }).filter(rule => rule !== null);
  
  if (criticalRules.length === 0) {
    console.warn('⚠️  未找到关键CSS规则');
    return '';
  }
  
  const criticalCSS = criticalRules.join('\n');
  fs.writeFileSync(CONFIG.outputDir, criticalCSS, 'utf8');
  
  console.log(`✅ 提取了 ${criticalRules.length} 条关键CSS规则`);
  console.log(`📦 输出文件: ${CONFIG.outputDir}`);
  console.log(`📊 文件大小: ${(criticalCSS.length / 1024).toFixed(2)} KB\n`);
  
  return criticalCSS;
}

if (require.main === module) {
  module.exports = extractCriticalCSS;
} else {
  extractCriticalCSS();
}