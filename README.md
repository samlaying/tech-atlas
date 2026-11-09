# Tech Atlas

林承列的 GitHub 项目与技术路线，一个偏朴实的玻璃拟态静态站。

- 线上地址：https://samlaying.github.io/tech-atlas/
- 仓库：https://github.com/samlaying/tech-atlas

## 结构

```text
.
├── index.html      # 全部内容：精选项目、技术路线、关于
├── styles.css      # 玻璃拟态、渐变背景、响应式
├── script.js       # 项目筛选、滚动出现、导航高亮
├── .nojekyll       # GitHub Pages 跳过 Jekyll
└── README.md
```

无构建步骤、无框架、无外部依赖，直接静态托管。

## 本地预览

```bash
cd /Users/sam/04-OWN/tech-atlas
python3 -m http.server 4173
```

打开 http://127.0.0.1:4173

## 怎么改内容

### 项目卡片

在 `index.html` 的 `.project-grid` 里复制一个 `<article class="project glass" data-category="agent">`：

- `data-category` 决定筛选分类：`agent` / `voice` / `info` / `notes`
- 标题、描述、标签、仓库链接都在卡片内部
- 序号 `project-index` 手动递增

### 技术路线

在 `#tracks` 的两个 `.track` 里改 `<li>`：

- `track-no` 是编号
- `pill-doing` / `pill-reading` / `pill-writing` 控制状态颜色
- 每个条目右侧链到对应仓库或文章

### 颜色与玻璃效果

`styles.css` 顶部的 `:root`：

- `--accent` / `--accent-2` / `--ochre`：主色
- `--paper`：纸张底色
- `.glass`：半透明、模糊、渐变描边
- `.backdrop`：多色 mesh 渐变背景

## 部署

仓库 `main` 分支根目录直接作为 GitHub Pages 源：

```bash
git add .
git commit -m "Update site"
git push
```

推送后 GitHub Pages 会自动更新。
