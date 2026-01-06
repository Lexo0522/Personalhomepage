// 页面加载动画处理 - 使用纯CSS动画，移除GSAP依赖
document.addEventListener('DOMContentLoaded', () => {
  Utils.Logger.log('Rutua个人博客由Kate开发完成，Github仓库链接为： https://github.com/Lexo0522/Personalhomepage');
  
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    if (document.readyState === 'complete') {
      hideLoadingScreen();
    } else {
      window.addEventListener('load', hideLoadingScreen);
      setTimeout(hideLoadingScreen, CONFIG.performance.loadingAnimation.maxDisplayTime);
    }
  }
});

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    Utils.Animation.fadeOut(loadingScreen, CONFIG.performance.loadingAnimation.fadeOutDuration);
    
    setTimeout(() => {
      try {
        loadingScreen.remove();
        Utils.Logger.log('加载动画已移除');
      } catch (error) {
        Utils.Logger.warn('移除加载屏幕失败:', error);
      }
    }, CONFIG.performance.loadingAnimation.fadeOutDuration);
  }
}