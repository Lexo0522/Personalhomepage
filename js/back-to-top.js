// 回到顶部 JS - 使用纯JavaScript实现，不依赖外部库
const backToTopBtn = document.getElementById('back-to-top');

// 滚动监听，控制按钮的显示和隐藏
window.addEventListener('scroll', () => {
  if (backToTopBtn) {
    if (window.pageYOffset > 400) {
      // 显示回到顶部按钮
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
      backToTopBtn.style.transform = 'translateY(0)';
    } else {
      // 隐藏回到顶部按钮
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
      backToTopBtn.style.transform = 'translateY(20px)';
    }
  }
});

// 点击事件，实现平滑滚动到顶部
backToTopBtn.addEventListener('click', () => {
  // 使用原生平滑滚动
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});