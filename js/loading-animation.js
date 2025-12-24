// 页面加载动画处理
// 使用DOMContentLoaded代替load事件，DOM准备好后立即开始淡出动画
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // 缩短延迟时间，让动画更快消失
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 150);
  }
});