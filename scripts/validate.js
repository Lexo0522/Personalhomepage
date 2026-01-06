const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  projectDir: __dirname,
  htmlFiles: ['index.html', '404.html', 'offline.html'],
  jsFiles: ['js/*.js'],
  jsonFiles: ['manifest.json', 'package.json']
};

function validateHTML() {
  console.log('\n🔍 验证HTML文件...\n');
  
  let hasErrors = false;
  
  CONFIG.htmlFiles.forEach(file => {
    const filePath = path.join(CONFIG.projectDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const result = execSync(`npx html-validate ${filePath}`, { encoding: 'utf8' });
        console.log(`✓ ${file}: 通过验证`);
      } catch (error) {
        console.error(`✗ ${file}: 验证失败`);
        console.error(error.stdout);
        hasErrors = true;
      }
    } else {
      console.warn(`⚠️  ${file}: 文件不存在`);
    }
  });
  
  return !hasErrors;
}

function validateJSON() {
  console.log('\n🔍 验证JSON文件...\n');
  
  let hasErrors = false;
  
  CONFIG.jsonFiles.forEach(file => {
    const filePath = path.join(CONFIG.projectDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content);
        console.log(`✓ ${file}: 通过验证`);
      } catch (error) {
        console.error(`✗ ${file}: JSON格式错误 - ${error.message}`);
        hasErrors = true;
      }
    } else {
      console.warn(`⚠️  ${file}: 文件不存在`);
    }
  });
  
  return !hasErrors;
}

function validateJavaScript() {
  console.log('\n🔍 验证JavaScript文件...\n');
  
  let hasErrors = false;
  const jsDir = path.join(CONFIG.projectDir, 'js');
  
  if (fs.existsSync(jsDir)) {
    const files = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
    
    files.forEach(file => {
      const filePath = path.join(jsDir, file);
      try {
        const result = execSync(`node -c "${filePath}"`, { encoding: 'utf8' });
        console.log(`✓ ${file}: 通过验证`);
      } catch (error) {
        console.error(`✗ ${file}: 语法错误`);
        console.error(error.stderr || error.stdout);
        hasErrors = true;
      }
    });
  } else {
    console.warn(`⚠️  JavaScript目录不存在`);
  }
  
  return !hasErrors;
}

function checkFileStructure() {
  console.log('\n🔍 检查文件结构...\n');
  
  const requiredFiles = [
    'index.html',
    'manifest.json',
    'css/style.css',
    'js/config.js',
    'js/utils.js',
    'js/sw.js'
  ];
  
  let allExist = true;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(CONFIG.projectDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`✓ ${file}: 存在`);
    } else {
      console.error(`✗ ${file}: 缺失`);
      allExist = false;
    }
  });
  
  return allExist;
}

function validate() {
  console.log('🚀 开始验证项目...\n');
  
  const results = {
    html: validateHTML(),
    json: validateJSON(),
    javascript: validateJavaScript(),
    structure: checkFileStructure()
  };
  
  console.log('\n📊 验证结果总结:\n');
  console.log(`HTML验证: ${results.html ? '✅ 通过' : '❌ 失败'}`);
  console.log(`JSON验证: ${results.json ? '✅ 通过' : '❌ 失败'}`);
  console.log(`JavaScript验证: ${results.javascript ? '✅ 通过' : '❌ 失败'}`);
  console.log(`文件结构检查: ${results.structure ? '✅ 通过' : '❌ 失败'}`);
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n✅ 所有验证通过！');
    process.exit(0);
  } else {
    console.log('\n❌ 验证失败，请修复上述问题');
    process.exit(1);
  }
}

validate();