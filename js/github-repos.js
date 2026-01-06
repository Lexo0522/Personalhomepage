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

async function fetchRepos() {
  const container = document.getElementById('github-repos-container');
  
  if (!container) {
    Utils.Logger.error('GitHub repos container not found');
    return;
  }
  
  Utils.Logger.log('开始获取GitHub仓库数据');
  
  try {
    const apiUrl = `${CONFIG.api.github.baseUrl}/users/${CONFIG.api.github.username}/repos?sort=${CONFIG.api.github.sortBy}&per_page=${CONFIG.api.github.reposCount}`;
    
    const res = await fetchWithRetry(apiUrl, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const repos = await res.json();
    
    if (!Array.isArray(repos)) {
      throw new Error('Invalid response format: expected array');
    }
    
    if (repos.length === 0) {
      container.innerHTML = '<div class="error">暂无公开仓库</div>';
      Utils.Logger.log('无公开仓库');
      return;
    }
    
    const filtered = repos.filter(repo => !repo.fork).slice(0, 3);
    
    if (filtered.length === 0) {
      container.innerHTML = '<div class="error">暂无公开仓库</div>';
      Utils.Logger.log('无非fork仓库');
      return;
    }
    
    const html = filtered.map(repo => {
      const lang = repo.language || 'Unknown';
      const color = getLanguageColor(lang);
      const stars = repo.stargazers_count.toLocaleString();
      const forks = repo.forks_count.toLocaleString();
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
    Utils.Logger.log(`成功加载 ${filtered.length} 个GitHub仓库`);
    
    const skeletonCard = document.querySelector('#github-repos-container .project-card.skeleton');
    if (skeletonCard) {
      skeletonCard.classList.add('hidden');
    }
    
  } catch (err) {
    Utils.Logger.error('Failed to load GitHub repos:', err);
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