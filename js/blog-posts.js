// 博客文章加载逻辑（最多3篇）
async function fetchBlogPosts() {
  const container = document.getElementById('blog-posts-container');
  // 确保容器存在
  if (!container) {
    console.error('Blog posts container not found');
    return;
  }
  
  try {
    // 首先检查GSAP是否可用
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not available, proceeding without animations');
    }
    
    // 使用fetch获取数据，添加CORS配置
    const res = await fetch('https://www.rutua.cn/wp-json/wp/v2/posts?per_page=3&_embed', {
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    const posts = await res.json();
    
    if (!Array.isArray(posts)) {
      throw new Error('Invalid response format: expected array');
    }
    
    if (posts.length === 0) {
      container.innerHTML = '<div class="error">暂无文章</div>';
      return;
    }
    
    // 已限制 per_page=3，直接使用
    const html = posts.map(post => {
      // 确保post对象具有必要的属性
      if (!post || !post.title || !post.link) {
        console.warn('Invalid post object, skipping:', post);
        return '';
      }
      
      const temp = document.createElement('div');
      temp.innerHTML = post.excerpt?.rendered || post.content?.rendered || '';
      const excerpt = temp.textContent || temp.innerText || '';
      const shortExcerpt = excerpt.length > 120 ? excerpt.substring(0, 120) + '...' : excerpt;
      
      // 处理日期
      const date = new Date(post.date_gmt ? post.date_gmt + 'Z' : post.date);
      const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      
      // 处理特色图片
      let featuredImage = '';
      if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        featuredImage = `<img src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="${post.title.rendered}" class="project-image" loading="lazy">`;
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
    
    // 移除空字符串
    const cleanHtml = html.replace(/^\s+|\s+$/g, '');
    
    if (!cleanHtml) {
      container.innerHTML = '<div class="error">暂无可用文章</div>';
      return;
    }
    
    container.innerHTML = cleanHtml;
    
  } catch (err) {
    console.error('Failed to load blog posts:', err);
    container.innerHTML = `<div class="error">加载失败，请稍后重试 😢</div>`;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchBlogPosts);
} else {
  fetchBlogPosts();
}