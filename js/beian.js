document.addEventListener('DOMContentLoaded', () => {
  const beianLinks = document.querySelectorAll('.beian-link');
  
  beianLinks.forEach(link => {
    link.textContent = CONFIG.site.icp;
  });
  
  if (beianLinks.length > 0) {
    Utils.Logger.log('备案号已设置:', CONFIG.site.icp);
  }
});