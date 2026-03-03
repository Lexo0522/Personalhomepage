# Rutua 个人主页

一个现代化、响应式的个人开发者主页，支持深色/浅色主题切换，集成GitHub仓库展示和博客文章列表。经过优化的开屏速度和流畅的用户体验。

## 功能特点

- 🎨 **响应式设计**：适配各种屏幕尺寸，从手机到桌面设备
- 🔧 **易于自定义**：清晰的代码结构，便于修改和扩展
- ✨ **现代化UI**：美观的界面设计，流畅的动画效果
- 📝 **博客文章集成**：通过WordPress REST API获取最新博客文章
- 📦 **GitHub仓库展示**：展示个人开源项目

## 技术栈

- **HTML5**：语义化标签，良好的SEO支持
- **CSS3**：CSS变量，Grid/Flex布局，响应式设计，贝塞尔曲线动画
- **JavaScript (ES6+)**：异步编程，纯JavaScript动画实现
- **WordPress REST API**：获取博客文章数据
- **性能优化**：资源预加载，图片懒加载，代码优化

## 项目结构

```
Personalhomepage/
├── css/
│   ├── style.css          # 主样式文件
│   ├── responsive.css    # 响应式优化样式
│   └── accessibility.css  # 无障碍优化样式
├── img/                   # 图片资源
├── js/
│   └── blog-posts.js      # 整合了所有功能的脚本文件
├── .gitignore             # Git忽略文件
├── .eslintrc.json        # ESLint配置
├── .prettierrc.json      # Prettier配置
├── package.json          # 项目配置和脚本
├── 404.html               # 404错误页面
├── index.html             # 主页面
└── README.md              # 项目说明文档
```

## 修改主题颜色

在 `css/style.css` 中修改CSS变量：

```css
:root {
  /* 亮色主题 */
  --bg: #ffffff;
  --fg: #2c3e50;
  --muted: #7f8c8d;
  --link: #3498db;
  --link-hover: #2980b9;
  --border: #ecf0f1;
  --card-bg: #ffffff;
  --card-hover: #f8f9fa;
  --shadow: rgba(0, 0, 0, 0.08);
  --shadow-hover: rgba(0, 0, 0, 0.15);
  --accent: #e74c3c;
}

[data-theme="dark"] {
  /* 暗色主题 */
  --bg: #1a1a1a;
  --fg: #f1f1f1;
  --muted: #b0b0b0;
  --link: #4da6ff;
  --link-hover: #3590d8;
  --border: #333333;
  --card-bg: #252525;
  --card-hover: #2d2d2d;
  --shadow: rgba(0, 0, 0, 0.3);
  --shadow-hover: rgba(0, 0, 0, 0.45);
  --accent: #ff6b6b;
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