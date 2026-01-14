const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG = {
  username: 'Lexo0522',
  reposCount: 6,
  sortBy: 'updated',
  outputPath: path.join(__dirname, '..', 'data', 'github-repos.json'),
  githubToken: process.env.GITHUB_TOKEN
};

function fetchGitHubAPI(url) {
  return new Promise((resolve, reject) => {
    const headers = {
      'User-Agent': 'Rutua-Personal-Homepage',
      'Accept': 'application/vnd.github.v3+json'
    };

    if (CONFIG.githubToken) {
      headers['Authorization'] = `token ${CONFIG.githubToken}`;
    }

    const options = {
      hostname: 'api.github.com',
      path: url,
      headers: headers
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        } else {
          reject(new Error(`GitHub API returned status ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function fetchRepos() {
  const url = `/users/${CONFIG.username}/repos?sort=${CONFIG.sortBy}&per_page=${CONFIG.reposCount}`;
  console.log(`Fetching from GitHub API: https://api.github.com${url}`);
  
  const repos = await fetchGitHubAPI(url);
  
  if (!Array.isArray(repos)) {
    throw new Error('Invalid response format: expected array');
  }

  const filtered = repos.filter(repo => !repo.fork).slice(0, 3);
  
  return filtered;
}

async function saveCache(data) {
  const cacheData = {
    timestamp: Date.now(),
    data: data
  };

  const dir = path.dirname(CONFIG.outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(CONFIG.outputPath, JSON.stringify(cacheData, null, 2), 'utf-8');
  console.log(`Cache saved to: ${CONFIG.outputPath}`);
}

async function main() {
  try {
    console.log('Starting GitHub repos cache update...');
    
    const repos = await fetchRepos();
    console.log(`Fetched ${repos.length} repositories`);
    
    await saveCache(repos);
    
    console.log('Cache update completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating cache:', error.message);
    process.exit(1);
  }
}

main();
