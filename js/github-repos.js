// GitHub 仓库加载逻辑（最多3个）
const languageColors = {
  'JavaScript': '#f1e05a', 'TypeScript': '#3178c6', 'Python': '#3572A5', 'PHP': '#4F5D95',
  'HTML': '#e34c26', 'CSS': '#563d7c', 'Shell': '#89e051', 'Go': '#00ADD8',
  'Java': '#b07219', 'C++': '#f34b7d', 'C': '#555555', 'C#': '#178600',
  'Ruby': '#701516', 'Rust': '#dea584', 'Swift': '#ffac45', 'Kotlin': '#7f52ff',
  'Vue': '#41b883', 'React': '#61dafb', 'Svelte': '#ff3e00', 'Dockerfile': '#0db7ed'
};

function getLanguageColor(lang) {
  return lang && languageColors[lang] ? languageColors[lang] : '#6c757d';
}

async function fetchRepos() {
  const container = document.getElementById('github-repos-container');
  // 确保容器存在
  if (!container) {
    console.error('GitHub repos container not found');
    return;
  }
  
  try {
    // 首先检查GSAP是否可用
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not available, proceeding without animations');
    }
    
    // 使用fetch获取数据，添加CORS配置
    const res = await fetch('https://stats.rutua.cn/github-api/users/Lexo0522/repos?sort=updated&per_page=6', {
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    const repos = await res.json();
    
    if (!Array.isArray(repos)) {
      throw new Error('Invalid response format: expected array');
    }
    
    if (repos.length === 0) {
      container.innerHTML = '<div class="error">暂无公开仓库</div>';
      return;
    }
    
    // 过滤非 fork 仓库，并取前 3 个
    const filtered = repos.filter(repo => !repo.fork).slice(0, 3);
    
    if (filtered.length === 0) {
      container.innerHTML = '<div class="error">暂无公开仓库</div>';
      return;
    }
    
    const html = filtered.map(repo => {
      const lang = repo.language || 'Unknown';
      const color = getLanguageColor(lang);
      const stars = repo.stargazers_count.toLocaleString();
      const desc = repo.description || '暂无描述';
      return `
        <div class="project-card">
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
            <div class="project-content">
              <h3>${repo.name}</h3>
              <p>${desc}</p>
              <div class="repo-meta">
                <span class="lang-badge" style="
                  background-color: ${color}20;
                  color: ${color};
                  border: 1px solid ${color}40;
                ">${lang}</span>
                <span class="stars">⭐ ${stars}</span>
              </div>
            </div>
          </a>
        </div>
      `;
    }).join('');
    
    container.innerHTML = html;
    
  } catch (err) {
    console.error('Failed to load GitHub repos:', err);
    container.innerHTML = `<div class="error">GitHub仓库加载失败: ${err.message}</div>`;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchRepos);
} else {
  fetchRepos();
}