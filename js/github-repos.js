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

async function loadFromCache() {
  try {
    const response = await fetch(CONFIG.api.github.cachePath);
    
    if (!response.ok) {
      return null;
    }
    
    const cacheData = await response.json();
    
    if (!cacheData.timestamp || !cacheData.data) {
      return null;
    }
    
    const now = Date.now();
    const cacheAge = now - cacheData.timestamp;
    
    if (cacheAge > CONFIG.api.github.cacheTTL) {
      return null;
    }
    
    return cacheData.data;
  } catch (error) {
    return null;
  }
}



async function fetchRepos() {
  const container = document.getElementById('github-repos-container');
  
  if (!container) {
    return;
  }
  
  try {
    let repos = null;
    
    if (CONFIG.api.github.useCache) {
      repos = await loadFromCache();
    }
    
    if (!repos) {
      const apiUrl = `https://api.github.com/users/${CONFIG.api.github.username}/repos?sort=${CONFIG.api.github.sortBy}&per_page=${CONFIG.api.github.reposCount}`;
      
      const res = await fetch(apiUrl, {
        mode: 'cors',
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      repos = await res.json();
      
      if (!Array.isArray(repos)) {
        throw new Error('Invalid response format: expected array');
      }
    }
    
    if (repos.length === 0) {
      container.innerHTML = '<div class="error">暂无公开仓库</div>';
      return;
    }
    
    const filtered = repos.filter(repo => !repo.fork).slice(0, 3);
    
    if (filtered.length === 0) {
      container.innerHTML = '<div class="error">暂无公开仓库</div>';
      return;
    }
    
    const html = filtered.map(repo => {
      const lang = repo.language || 'Unknown';
      const color = getLanguageColor(lang);
      const desc = repo.description || '开发中';
      const updated = Utils.Data.formatDate(repo.updated_at);
      
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
                <span class="updated">更新于 ${updated}</span>
              </div>
              <div class="repo-actions">
                <a href="${repo.html_url}/stargazers" target="_blank" rel="noopener" class="repo-action-btn star-btn" onclick="event.stopPropagation()">
                  ⭐ Star
                </a>
                <a href="${repo.html_url}/fork" target="_blank" rel="noopener" class="repo-action-btn fork-btn" onclick="event.stopPropagation()">
                  🍴 Fork
                </a>
              </div>
            </div>
          </a>
        </div>
      `;
    }).join('');
    
    container.innerHTML = html;
    
    const skeletonCard = document.querySelector('#github-repos-container .project-card.skeleton');
    if (skeletonCard) {
      skeletonCard.classList.add('hidden');
    }
    
  } catch (err) {
    container.innerHTML = `
      <div class="loading-with-retry">
        <div class="error">GitHub仓库加载失败: ${err.message}</div>
        <button class="retry-button" onclick="fetchRepos()">重试</button>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchRepos);
} else {
  fetchRepos();
}
