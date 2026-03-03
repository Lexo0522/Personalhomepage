// 工具函数
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function formatDate(dateString, locale = 'zh-CN') {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

async function fetchWithRetry(url, options, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, options);
      
      if (res.ok) {
        return res;
      }
      
      if (i === maxRetries - 1) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      
      console.warn(`请求失败，第 ${i + 1} 次重试...`, error);
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

async function fetchBlogPosts() {
  const container = document.getElementById('blog-posts-container');
  
  if (!container) {
    console.error('Blog posts container not found');
    return;
  }
  
  console.log('开始获取博客文章数据');
  
  try {
    // 直接硬编码API URL
    const apiUrl = 'https://www.rutua.cn/wp-json/wp/v2/posts?per_page=3&_embed=true';
    
    const res = await fetchWithRetry(apiUrl, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const posts = await res.json();
    
    if (!Array.isArray(posts)) {
      throw new Error('Invalid response format: expected array');
    }
    
    if (posts.length === 0) {
      container.innerHTML = '<div class="error">暂无文章</div>';
      console.log('无博客文章');
      return;
    }
    
    const html = posts.map(post => {
      if (!post || !post.title || !post.link) {
        console.warn('Invalid post object, skipping:', post);
        return '';
      }
      
      const temp = document.createElement('div');
      temp.innerHTML = post.excerpt?.rendered || post.content?.rendered || '';
      const excerpt = temp.textContent || temp.innerText || '';
      const shortExcerpt = truncateText(excerpt, 120);
      
      const formattedDate = formatDate(post.date_gmt ? post.date_gmt + 'Z' : post.date);
      
      return `
        <div class="post-card">
          <a href="${post.link}" target="_blank" rel="noopener" class="project-link">
            <div class="post-excerpt">
              <div class="post-date">${formattedDate}</div>
              <h3 class="post-title">${post.title.rendered}</h3>
              <p class="post-content">${shortExcerpt}</p>
            </div>
          </a>
        </div>
      `;
    }).join('');
    
    const cleanHtml = html.replace(/^\s+|\s+$/g, '');
    
    if (!cleanHtml) {
      container.innerHTML = '<div class="error">暂无可用文章</div>';
      console.log('无可用博客文章');
      return;
    }
    
    container.innerHTML = cleanHtml;
    console.log(`成功加载 ${posts.length} 篇博客文章`);
    
    const skeletonCard = document.querySelector('#blog-posts-container .post-card.skeleton');
    if (skeletonCard) {
      skeletonCard.classList.add('hidden');
    }
    
  } catch (err) {
    console.error('Failed to load blog posts:', err);
    container.innerHTML = `
      <div class="loading-with-retry">
        <div class="error">加载失败，请稍后重试 😢</div>
        <button class="retry-button" onclick="fetchBlogPosts()">重试</button>
      </div>
    `;
  }
}

// 页面加载动画处理
function initLoadingAnimation() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    if (document.readyState === 'complete') {
      hideLoadingScreen();
    } else {
      window.addEventListener('load', hideLoadingScreen);
      setTimeout(hideLoadingScreen, 3000);
    }
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 600);
  }
}

// 回到顶部按钮
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 主题切换功能
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-float');
  const icon = document.getElementById('theme-icon');
  
  if (!toggleBtn || !icon) {
    return;
  }

  const savedTheme = localStorage.getItem('theme-preference');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);
    
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  };

  const getInitialTheme = () => {
    if (savedTheme) {
      return savedTheme;
    }
    return prefersDark ? 'dark' : 'light';
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  toggleBtn.addEventListener('click', toggleTheme);
  setTheme(getInitialTheme());
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
  initLoadingAnimation();
  initBackToTop();
  initThemeToggle();
  fetchBlogPosts();
});