const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  buildCommand: 'npm run build',
  gitAddCommand: 'git add .',
  gitCommitCommand: 'git commit -m "chore: 自动部署更新"',
  gitPushCommand: 'git push origin main'
};

function executeCommand(command, description) {
  try {
    console.log(`\n🔄 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description}完成`);
    return true;
  } catch (error) {
    console.error(`❌ ${description}失败:`, error.message);
    return false;
  }
}

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length === 0;
  } catch (error) {
    console.error('❌ 无法检查Git状态');
    return false;
  }
}

function deploy() {
  console.log('🚀 开始部署流程...\n');

  if (!checkGitStatus()) {
    console.log('\n⚠️  检测到未提交的更改');
    
    const shouldCommit = executeCommand(CONFIG.gitAddCommand, '添加文件到Git');
    if (!shouldCommit) {
      console.log('\n❌ 部署失败：无法添加文件');
      process.exit(1);
    }
    
    const shouldCommitNow = executeCommand(CONFIG.gitCommitCommand, '提交更改');
    if (!shouldCommitNow) {
      console.log('\n❌ 部署失败：无法提交更改');
      process.exit(1);
    }
  }

  const buildSuccess = executeCommand(CONFIG.buildCommand, '构建项目');
  if (!buildSuccess) {
    console.log('\n❌ 部署失败：构建失败');
    process.exit(1);
  }

  const pushSuccess = executeCommand(CONFIG.gitPushCommand, '推送到远程仓库');
  if (!pushSuccess) {
    console.log('\n❌ 部署失败：推送失败');
    process.exit(1);
  }

  console.log('\n✅ 部署成功！');
  console.log('📦 项目已推送到远程仓库');
  console.log('🌐 请检查您的部署平台（如GitHub Pages）是否已更新');
}

deploy();