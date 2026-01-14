const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG = {
  username: 'Lexo0522',
  proxyUrl: 'github-api-proxy.kate522.workers.dev',
  fallbackUrl: 'api.github.com',
  reposCount: 6,
  sortBy: 'updated',
  outputPath: path.join(__dirname, '..', 'data', 'github-repos.json'),
  githubToken: process.env.GITHUB_TOKEN,
  proxyTimeout: 10000
};

function fetchGitHubAPI(url, useProxy = true) {
  return new Promise((resolve, reject) => {
    const baseUrl = useProxy ? `https://${CONFIG.proxyUrl}` : `https://${CONFIG.fallbackUrl}`;
    const fullUrl = `${baseUrl}${url}`;
    
    const headers = {
      'User-Agent': 'Rutua-Personal-Homepage',
      'Accept': 'application/vnd.github.v3+json'
    };

    if (CONFIG.githubToken && !useProxy) {
      headers['Authorization'] = `token ${CONFIG.githubToken}`;
    }

    const urlObj = new URL(fullUrl);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: headers,
      timeout: useProxy ? CONFIG.proxyTimeout : 30000
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`Response status: ${res.statusCode}`);
        console.log(`Response data length: ${data.length}`);
        
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (error) {
            console.error('Raw response:', data.substring(0, 200));
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        } else {
          console.error('Non-200 response:', data.substring(0, 200));
          reject(new Error(`GitHub API returned status ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timeout after ${options.timeout}ms`));
    });

    req.end();
  });
}

async function fetchReposWithFallback() {
  const url = `/users/${CONFIG.username}/repos?sort=${CONFIG.sortBy}&per_page=${CONFIG.reposCount}`;
  
  try {
    console.log(`Fetching from proxy: https://${CONFIG.proxyUrl}${url}`);
    return await fetchGitHubAPI(url, true);
  } catch (error) {
    console.warn(`Proxy request failed: ${error.message}`);
    console.log('Falling back to official GitHub API...');
    
    try {
      console.log(`Fetching from fallback: https://${CONFIG.fallbackUrl}${url}`);
      const result = await fetchGitHubAPI(url, false);
      console.log('Fallback successful!');
      return result;
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError.message);
      throw new Error(`Both proxy and fallback failed. Proxy: ${error.message}, Fallback: ${fallbackError.message}`);
    }
  }
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
    
    const repos = await fetchReposWithFallback();
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
