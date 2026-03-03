// 页面滚动进度条
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  const updateProgress = Utils.Data.throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }, 50);

  Utils.Event.on(window, 'scroll', updateProgress, { passive: true });
  Utils.Logger.log('滚动进度条已初始化');
});

// 图片懒加载动画
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.onload = () => {
          Utils.DOM.addClass(img, 'loaded');
        };
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: CONFIG.performance.lazyLoading.rootMargin,
    threshold: CONFIG.performance.lazyLoading.threshold
  });

  images.forEach(img => imageObserver.observe(img));
  Utils.Logger.log(`初始化 ${images.length} 张图片的懒加载`);
});

// 页面元素淡入效果
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main > section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Utils.DOM.addClass(entry.target, 'fade-in-up');
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => sectionObserver.observe(section));
  Utils.Logger.log(`初始化 ${sections.length} 个区块的淡入效果`);
});