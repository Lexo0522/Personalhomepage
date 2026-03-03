# Rutua 个人主页

一个现代化、响应式的个人开发者主页，支持深色/浅色主题切换，集成GitHub仓库展示和博客文章列表。经过优化的开屏速度和流畅的用户体验。

## 功能特点

- 🎨 **响应式设计**：适配各种屏幕尺寸，从手机到桌面设备
- 🔧 **易于自定义**：清晰的代码结构，便于修改和扩展
- 🎯 **模块化代码**：清晰的代码组织和配置管理

## 技术栈

- **HTML5**：语义化标签，良好的SEO支持
- **CSS3**：CSS变量，Grid/Flex布局，响应式设计，贝塞尔曲线动画
- **JavaScript (ES6+)**：异步编程，模块化设计，纯JavaScript动画实现
- **GitHub API**：直接使用GitHub官方API获取数据
- **WordPress REST API**：获取博客文章数据
- **性能优化**：资源预加载，图片懒加载，代码拆分，延迟执行

## 项目结构

```
Personalhomepage/
├── css/
│   ├── style.css          # 主样式文件
│   ├── responsive.css    # 响应式优化样式
│   └── accessibility.css  # 无障碍优化样式
├── img/                   # 图片资源
├── js/
│   ├── config.js          # 配置文件
│   ├── utils.js           # 工具函数库
│   ├── beian.js           # 备案号设置
│   ├── smooth-scroll.js    # 平滑滚动脚本
│   ├── critical-css.js     # 关键CSS内联脚本
│   ├── back-to-top.js     # 回到顶部功能
│   ├── blog-posts.js      # 博客文章获取与展示
│   ├── github-repos.js    # GitHub仓库获取与展示
│   ├── loading-animation.js # 页面加载动画
│   └── theme-toggle.js    # 主题切换功能
├── .gitignore             # Git忽略文件
├── .eslintrc.json        # ESLint配置
├── .prettierrc.json      # Prettier配置
├── package.json          # 项目配置和脚本
├── 404.html               # 404错误页面
├── index.html             # 主页面
└── README.md              # 项目说明文档
```

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

3. 安装依赖

```bash
npm install
```

4. 启动开发服务器

```bash
npm run dev
```

5. 在浏览器中访问 `http://localhost:8000`

## 自定义配置

所有配置都集中在 `js/config.js` 文件中，包括：
- 网站基本信息（包括备案号）
- API配置（GitHub、博客、分析）
- 性能配置
- UI配置

### 修改备案号

在 `js/config.js` 文件中修改：

```javascript
site: {
  icp: '你的备案号'
}
```

### 修改GitHub用户名

在 `js/config.js` 文件中修改：

```javascript
api: {
  github: {
    username: '你的GitHub用户名'
  }
}
```

### 修改博客API

在 `js/config.js` 文件中修改：

```javascript
api: {
  blog: {
    baseUrl: 'https://你的博客地址',
    endpoint: '/wp-json/wp/v2/posts'
  }
}
```

### 修改主题颜色

在 `css/style.css` 中修改CSS变量：

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
```



## 部署

### GitHub Pages

1. 推送代码到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择main分支作为源
4. 手动部署静态文件

### 其他静态托管服务

你可以将项目部署到任何支持静态网站托管的服务，如：
- Netlify
- Vercel
- Cloudflare Pages
- Amazon S3
- 传统的Web服务器

只需将项目文件上传到托管服务即可。

## 开发指南

### 代码规范

项目使用ESLint和Prettier进行代码检查和格式化：

```bash
npm run lint      # 代码检查
npm run format    # 代码格式化
```

### 提交代码

1. 创建新分支
2. 进行修改
3. 提交更改
4. 创建Pull Request

### 工具函数

项目提供了丰富的工具函数库（`js/utils.js`）：
- DOM操作
- 事件处理
- 动画效果
- 数据处理
- 本地存储
- 日志记录

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
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)：GitHub API 代理服务

---

**作者**: Rutua  
**GitHub**: [Lexo0522](https://github.com/Lexo0522)  
**博客**: [https://www.rutua.cn/](https://www.rutua.cn/)
