document.addEventListener('DOMContentLoaded', () => {
  const skipLink = document.querySelector('.skip-link');
  
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = skipLink.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        targetElement.focus();
      }
    });
  }
  
  Utils.Logger.log('平滑锚点跳转已初始化');
});