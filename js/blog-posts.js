// 博客文章加载逻辑（最多3篇）
async function fetchBlogPosts() {
  const container = document.getElementById('blog-posts-container');
  try {
    const res = await fetch('https://www.rutua.cn/wp-json/wp/v2/posts?per_page=3&_embed');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      container.innerHTML = '<div class="error">暂无文章</div>';
      return;
    }
    // 已限制 per_page=3，直接使用
    const html = posts.map(post => {
      const temp = document.createElement('div');
      temp.innerHTML = post.excerpt.rendered || post.content.rendered;
      const excerpt = temp.textContent || temp.innerText || '';
      const shortExcerpt = excerpt.length > 120 ? excerpt.substring(0, 120) + '...' : excerpt;
      const date = new Date(post.date_gmt + 'Z');
      const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      let featuredImage = '';
      if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        featuredImage = `<img src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="${post.title.rendered}" class="project-image">`;
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
    container.innerHTML = html;
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