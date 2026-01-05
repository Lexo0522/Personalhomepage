// 页面加载动画处理 - 使用纯CSS动画，移除GSAP依赖
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // 检查页面是否已完全加载
    if (document.readyState === 'complete') {
      // 页面已完全加载，立即开始淡出动画
      hideLoadingScreen();
    } else {
      // 等待页面完全加载后再淡出
      window.addEventListener('load', hideLoadingScreen);
      
      // 设置最大显示时间，防止加载动画一直显示
      setTimeout(hideLoadingScreen, 3000);
    }
  }
});

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // 添加hidden类，触发CSS过渡动画
    loadingScreen.classList.add('hidden');
    
    // 动画完成后，从DOM中移除加载屏幕，释放资源
    setTimeout(() => {
      try {
        loadingScreen.remove();
      } catch (error) {
        console.warn('Failed to remove loading screen:', error);
      }
    }, 600); // 与CSS过渡时间匹配
  }
}