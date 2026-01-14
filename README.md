# Rutua 个人主页

一个现代化、响应式的个人开发者主页，支持深色/浅色主题切换，集成GitHub仓库展示和博客文章列表。经过优化的开屏速度和流畅的用户体验。

## 功能特点

- 🎨 **响应式设计**：适配各种屏幕尺寸，从手机到桌面设备
- 📱 **平板优化**：专门的平板设备布局优化
- 👆 **触摸优化**：增大触摸目标，添加触摸反馈
- 🔤 **字体适配**：支持系统动态字体大小
- ♿ **无障碍访问**：符合WCAG 2.1 AA/AAA标准，支持屏幕阅读器
- 🌓 **主题切换**：支持深色/浅色主题，自动跟随系统设置
- 📱 **PWA支持**：可安装为桌面应用，支持离线访问
- 📊 **GitHub集成**：通过Cloudflare代理获取GitHub仓库数据，支持自动fallback
- 📝 **博客集成**：从WordPress博客自动获取最新文章
- 🔝 **回到顶部**：平滑滚动回到顶部功能
- 🎯 **平滑滚动**：页面内锚点平滑跳转
- 🔄 **错误重试**：API请求失败时自动重试机制
- 🚀 **高性能**：优化的加载速度和缓存策略
- 🔧 **易于自定义**：清晰的代码结构，便于修改和扩展
- 📈 **滚动进度**：页面滚动进度条显示
- 🎯 **模块化代码**：清晰的代码组织和配置管理
- 🤖 **CI/CD**：自动化构建和部署流程

## 技术栈

- **HTML5**：语义化标签，良好的SEO支持
- **CSS3**：CSS变量，Grid/Flex布局，响应式设计，贝塞尔曲线动画
- **JavaScript (ES6+)**：异步编程，模块化设计，纯JavaScript动画实现
- **PWA**：Service Worker，Manifest.json
- **GitHub API**：通过Cloudflare代理获取数据，支持自动fallback
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
│   ├── github-repos.js    # GitHub仓库获取与展示（支持代理和fallback）
│   ├── loading-animation.js # 页面加载动画
│   ├── sw.js              # Service Worker文件
│   └── theme-toggle.js    # 主题切换功能
├── data/                  # 数据缓存目录
│   └── github-repos.json  # GitHub仓库数据缓存
├── scripts/               # 构建脚本
│   ├── build.js          # 构建脚本
│   ├── clean.js          # 清理脚本
│   ├── validate.js       # 验证脚本
│   ├── extract-critical-css.js # 关键CSS提取脚本
│   ├── fetch-github-data.js # GitHub数据获取脚本（支持代理和fallback）
│   └── deploy.js         # 部署脚本
├── .github/
│   └── workflows/
│       └── ci-cd.yml     # CI/CD配置
├── .gitignore             # Git忽略文件
├── .eslintrc.json        # ESLint配置
├── .prettierrc.json      # Prettier配置
├── netlify.toml          # Netlify配置
├── package.json          # 项目配置和脚本
├── 404.html               # 404错误页面
├── index.html             # 主页面
├── manifest.json          # PWA配置文件
├── offline.html           # 离线页面
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

### 构建项目

```bash
npm run build
```

### 验证代码

```bash
npm run validate
```

### 清理构建文件

```bash
npm run clean
```

### 更新GitHub数据缓存

```bash
npm run fetch-github
```

## 自定义配置

所有配置都集中在 `js/config.js` 文件中，包括：
- 网站基本信息（包括备案号）
- API配置（GitHub代理、fallback、博客、分析）
- 性能配置
- UI配置
- PWA配置

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
    username: '你的GitHub用户名',
    proxyUrl: '你的代理地址',
    fallbackUrl: 'https://api.github.com'
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

## GitHub API 代理机制

项目使用 Cloudflare Workers 作为 GitHub API 代理，提供以下优势：

### 代理配置

- **代理地址**：`https://github-api-proxy.kate522.workers.dev`
- **Fallback地址**：`https://api.github.com`
- **超时时间**：10秒（代理），30秒（官方API）

### 工作原理

1. **优先使用代理**：首次请求通过 Cloudflare 代理发送
2. **超时检测**：10秒内无响应自动触发fallback
3. **自动切换**：代理超时后自动切换到 GitHub 官方 API
4. **本地缓存**：成功获取的数据缓存到本地，1小时内有效
5. **智能重试**：支持最多2次重试（代理 + fallback）

### 优势

- ✅ **速度优化**：代理服务器通常响应更快
- ✅ **可靠性**：fallback机制确保服务可用性
- ✅ **减少限制**：代理可绕过 GitHub API 速率限制
- ✅ **缓存策略**：本地缓存减少重复请求
- ✅ **详细日志**：便于调试和监控

## 部署

### GitHub Pages

1. 推送代码到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择main分支作为源
4. CI/CD会自动构建和部署

### Netlify

1. 连接GitHub仓库到Netlify
2. 配置构建命令：`npm run build`
3. 配置发布目录：`dist`
4. 自动部署

### Vercel

1. 导入GitHub仓库
2. 配置构建命令：`npm run build`
3. 配置输出目录：`dist`
4. 自动部署

## 性能优化

项目已实施以下性能优化措施：

### 资源优化
- 🖼️ 骨架屏加载：替代传统加载动画，提升感知性能
- 🎯 关键CSS内联：首屏关键样式内联到HTML
- 📊 智能缓存策略：API请求数据本地缓存 + 过期策略
- 🚀 代码分割和懒加载：非首屏功能按需加载
- 📦 响应式图片：为不同设备提供适配尺寸
- 🎨 图片优化：width/height属性避免CLS
- 🗜️ 请求重试：API失败时自动重试机制

### 缓存策略
- Service Worker缓存
- 浏览器缓存优化
- 智能缓存策略（Cache First, Network First, Stale While Revalidate）
- 离线支持
- 精细化缓存规则：静态资源、API请求分别处理

### 加载优化
- 关键渲染路径优化
- 延迟加载非关键资源
- 资源提示（preload, prefetch）
- DNS预解析

详细的性能优化文档请参考 [docs/PERFORMANCE.md](docs/PERFORMANCE.md)

## 响应式优化

项目已实施全面的响应式优化措施：

### 设备适配
- 📱 手机设备（< 768px）：单列布局，优化小屏体验
- 📱 平板设备（768px - 1024px）：双列布局，专门的平板优化
- 💻 大平板设备（1024px - 1200px）：三列布局
- 🖥 桌面设备（> 1200px）：四列布局，超大屏优化

### 触摸设备优化
- 👆 增大触摸目标：最小 48x48px，符合WCAG标准
- 👇 添加触摸反馈：按下时的视觉反馈
- 🎯 优化触摸间距：增大可点击区域
- 📱 改进触摸响应：减少延迟

### 字体适配
- 🔤 支持系统动态字体大小：尊重用户设置
- 📏 适配用户缩放偏好：`prefers-reduced-data`
- 🎨 使用系统字体栈：最佳渲染效果
- 📐 响应式字体大小：根据设备自动调整

### 特殊场景优化
- 📐 横屏模式：优化横屏浏览体验
- 🖼️ 高分辨率设备：优化图片渲染质量
- 📺 超大屏幕：支持1400px+超大屏
- 📱 小屏手机：支持< 360px超小屏

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
3. 运行验证：`npm run validate`
4. 提交更改
5. 创建Pull Request

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
