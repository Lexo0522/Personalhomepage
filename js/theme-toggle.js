// 主题切换逻辑
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle-float');
  const icon = document.getElementById('theme-icon');
  
  if (!toggleBtn || !icon) {
    Utils.Logger.warn('主题切换按钮或图标未找到');
    return;
  }

  const savedTheme = Utils.Storage.get(CONFIG.ui.theme.storageKey);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    Utils.Storage.set(CONFIG.ui.theme.storageKey, theme);
    
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
    
    Utils.Logger.log(`主题已切换为: ${theme}`);
  };

  const getInitialTheme = () => {
    if (savedTheme) {
      return savedTheme;
    }
    return prefersDark ? 'dark' : CONFIG.ui.theme.default;
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || CONFIG.ui.theme.default;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  Utils.Event.on(toggleBtn, 'click', toggleTheme);
  
  setTheme(getInitialTheme());
  Utils.Logger.log('主题切换功能已初始化');
});
