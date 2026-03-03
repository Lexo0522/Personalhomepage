// 回到顶部 JS - 使用纯JavaScript实现，不依赖外部库
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) {
    Utils.Logger.warn('回到顶部按钮未找到');
    return;
  }

  const handleScroll = Utils.Data.throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > CONFIG.ui.backToTop.showThreshold) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
      backToTopBtn.style.transform = 'translateY(0)';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
      backToTopBtn.style.transform = 'translateY(20px)';
    }
  }, 100);

  const scrollToTop = () => {
    Utils.Animation.scrollTo(0, CONFIG.ui.backToTop.scrollDuration);
  };

  Utils.Event.on(window, 'scroll', handleScroll, { passive: true });
  Utils.Event.on(backToTopBtn, 'click', scrollToTop);

  Utils.Logger.log('回到顶部功能已初始化');
});