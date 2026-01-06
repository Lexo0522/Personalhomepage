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
      
      Utils.Logger.warn(`请求失败，第 ${i + 1} 次重试...`, error);
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

async function fetchBlogPosts() {
  const container = document.getElementById('blog-posts-container');
  
  if (!container) {
    Utils.Logger.error('Blog posts container not found');
    return;
  }
  
  Utils.Logger.log('开始获取博客文章数据');
  
  try {
    const apiUrl = `${CONFIG.api.blog.baseUrl}${CONFIG.api.blog.endpoint}?per_page=${CONFIG.api.blog.postsCount}&_embed=${CONFIG.api.blog.embed}`;
    
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
      Utils.Logger.log('无博客文章');
      return;
    }
    
    const html = posts.map(post => {
      if (!post || !post.title || !post.link) {
        Utils.Logger.warn('Invalid post object, skipping:', post);
        return '';
      }
      
      const temp = document.createElement('div');
      temp.innerHTML = post.excerpt?.rendered || post.content?.rendered || '';
      const excerpt = temp.textContent || temp.innerText || '';
      const shortExcerpt = Utils.Data.truncateText(excerpt, 120);
      
      const formattedDate = Utils.Data.formatDate(post.date_gmt ? post.date_gmt + 'Z' : post.date);
      
      let featuredImage = '';
      if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        featuredImage = `<img src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="${post.title.rendered}" class="project-image" loading="lazy" width="300" height="200" onerror="this.src='/img/icon.jpg'; this.onerror=null;">`;
      }
      
      return `
        <div class="post-card">
          <a href="${post.link}" target="_blank" rel="noopener" class="project-link">
            ${featuredImage}
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
      Utils.Logger.log('无可用博客文章');
      return;
    }
    
    container.innerHTML = cleanHtml;
    Utils.Logger.log(`成功加载 ${posts.length} 篇博客文章`);
    
    const skeletonCard = document.querySelector('#blog-posts-container .post-card.skeleton');
    if (skeletonCard) {
      skeletonCard.classList.add('hidden');
    }
    
  } catch (err) {
    Utils.Logger.error('Failed to load blog posts:', err);
    container.innerHTML = `
      <div class="loading-with-retry">
        <div class="error">加载失败，请稍后重试 😢</div>
        <button class="retry-button" onclick="fetchBlogPosts()">重试</button>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchBlogPosts);
} else {
  fetchBlogPosts();
}