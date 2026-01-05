# Rutua 个人主页

![ac99f3d9-ff48-452f-a225-6e22167d8496_compressed.png](https://free.picui.cn/free/2025/12/24/694b8455abf7e.png)

一个现代化、响应式的个人开发者主页，支持深色/浅色主题切换，集成GitHub仓库展示和博客文章列表。

## 功能特点

- 🎨 **响应式设计**：适配各种屏幕尺寸，从手机到桌面设备
- 🌓 **主题切换**：支持深色/浅色主题，自动跟随系统设置
- 📱 **PWA支持**：可安装为桌面应用，支持离线访问
- 📊 **GitHub集成**：自动获取并展示最新的GitHub仓库
- 📝 **博客集成**：从WordPress博客自动获取最新文章
- 🔝 **回到顶部**：平滑滚动回到顶部功能
- 🚀 **高性能**：优化的加载速度和缓存策略
- 🔧 **易于自定义**：清晰的代码结构，便于修改和扩展

## 技术栈

- **HTML5**：语义化标签，良好的SEO支持
- **CSS3**：CSS变量，Grid/Flex布局，响应式设计
- **JavaScript (ES6+)**：异步编程，模块化设计
- **PWA**：Service Worker，Manifest.json
- **GitHub API**：通过代理获取GitHub仓库数据
- **WordPress REST API**：获取博客文章数据

## 安装和使用

### 本地开发

1. 克隆仓库到本地

```bash
git clone https://github.com/Lexo0522/Personalhomepage.git
```

2. 进入项目目录

```bash
cd Personalhomepage
```

3. 使用本地服务器运行

```bash
# 使用Python 3
python -m http.server 8000

# 或使用Node.js (需要安装http-server)
npx http-server -p 8000
```

4. 在浏览器中访问 `http://localhost:8000`

### 部署

可以部署到任何静态网站托管服务，如：

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## 项目结构

```
Personalhomepage/
├── css/
│   └── style.css          # 主样式文件
├── js/
│   ├── back-to-top.js     # 回到顶部功能
│   ├── blog-posts.js      # 博客文章获取与展示
│   ├── github-repos.js    # GitHub仓库获取与展示
│   ├── loading-animation.js # 页面加载动画
│   ├── sw.js              # Service Worker文件
│   └── theme-toggle.js    # 主题切换功能
├── .user.ini              # 服务器配置文件
├── 404.html               # 404错误页面
├── index.html             # 主页面
├── manifest.json          # PWA配置文件
├── offline.html           # 离线页面
└── README.md              # 项目说明文档
```

## 自定义配置

### 修改GitHub用户名

在 `js/github-repos.js` 文件中找到GitHub API请求部分，修改用户名：

```javascript
const res = await fetch('https://stats.rutua.cn/github-api/users/[你的GitHub用户名]/repos?sort=updated&per_page=6');
```

### GitHub API 备用配置

项目默认使用 `https://stats.rutua.cn/github-api` 作为 GitHub API 的代理服务。如果该代理不可用，你可以切换到官方 API 地址：

```javascript
// 将 github-repos.js 文件中的 API 地址修改为
const res = await fetch('https://github-readme-stats.vercel.app/api/repos?username=[你的GitHub用户名]&sort=updated&per_page=6');
```

**注意**：请根据官方 API 的最新文档调整请求参数格式，确保能够正确获取数据。

### 修改博客API

在 `index.html` 中找到博客API请求部分，修改为你的WordPress博客地址：

```javascript
const res = await fetch('https://[你的博客地址]/wp-json/wp/v2/posts?per_page=3&_embed');
```

### 修改主题颜色

在 `css/style.css` 中修改CSS变量，自定义主题颜色：

```css
:root {
  /* 亮色主题 */
  --bg: #ffffff;
  --fg: #2c3e50;
  --muted: #7f8c8d;
  --link: #3498db;
  --border: #ecf0f1;
  --card-bg: #ffffff;
  --shadow: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  /* 暗色主题 */
  --bg: #1a1a1a;
  --fg: #f1f1f1;
  --muted: #b0b0b0;
  --link: #4da6ff;
  --border: #333333;
  --card-bg: #252525;
  --shadow: rgba(0, 0, 0, 0.3);
}
```

## PWA支持

项目已配置为PWA应用，支持离线访问和桌面安装。可以修改 `manifest.json` 文件自定义PWA设置：

```json
{
  "name": "Rutua - WordPress Developer",
  "short_name": "Rutua",
  "description": "WordPress 开发者主页：开源项目、技术博客与解决方案",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#ffffff",
  "theme_color": "#4a6cf7",
  "icons": [
    // 图标配置
  ]
}
```

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 致谢

- [WordPress REST API](https://developer.wordpress.org/rest-api/)：获取博客文章数据

---

**作者**: Rutua  
**GitHub**: [Lexo0522](https://github.com/Lexo0522)  
**博客**: [https://www.rutua.cn/](https://www.rutua.cn/)






