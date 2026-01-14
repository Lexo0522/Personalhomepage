const CONFIG = {
  // 网站基本信息
  site: {
    name: 'Rutua',
    fullName: 'Rutua - WordPress Developer',
    description: 'WordPress 开发者主页：开源项目、技术博客与解决方案',
    url: 'https://rutua.cn',
    author: 'Rutua',
    github: 'https://github.com/Lexo0522',
    blog: 'https://www.rutua.cn/',
    icp: '豫ICP备2025133377号-1'
  },

  // API配置
  api: {
    github: {
      username: 'Lexo0522',
      baseUrl: 'https://api.github.com',
      fallbackUrl: 'https://api.github.com',
      reposCount: 6,
      sortBy: 'updated',
      useCache: true,
      cachePath: '/data/github-repos.json',
      cacheTTL: 3600000
    },
    blog: {
      baseUrl: 'https://www.rutua.cn',
      endpoint: '/wp-json/wp/v2/posts',
      postsCount: 3,
      embed: true
    },
    analytics: {
      baidu: {
        enabled: false,
        id: '3008b1edd045b28e9943f84e7bc9b450'
      }
    }
  },

  // 性能配置
  performance: {
    loadingAnimation: {
      maxDisplayTime: 3000,
      fadeOutDuration: 600
    },
    lazyLoading: {
      threshold: 0.1,
      rootMargin: '50px'
    },
    serviceWorker: {
      enabled: true,
      cacheVersion: 'rutua-pwa-v6',
      idleCallbackTimeout: 2000
    }
  },

  // UI配置
  ui: {
    theme: {
      default: 'light',
      storageKey: 'theme-preference'
    },
    backToTop: {
      showThreshold: 300,
      scrollDuration: 300
    },
    animations: {
      enabled: true,
      duration: 300
    }
  },

  // PWA配置
  pwa: {
    name: 'Rutua - WordPress Developer',
    shortName: 'Rutua',
    description: 'WordPress 开发者主页：开源项目、技术博客与解决方案',
    themeColor: '#4a6cf7',
    backgroundColor: '#ffffff',
    display: 'standalone',
    orientation: 'portrait'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}