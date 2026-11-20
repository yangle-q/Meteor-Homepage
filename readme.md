<div align="center">
	<h1>Meteor Homepage</h1>
	<p>An elegant, customizable personal homepage.</p>
	<p>一个优雅简洁，可自定义的个人主页项目</p>
	<p><a href="README.md" >English</a> / 简体中文</p>
</div>

# 预览

![三端预览](https://pic-2.yoxo.top/Snipaste_2026-11-20_19-35-48.webp)
![浅色模式](https://pic-2.yoxo.top/Snipaste_2026-11-20_19-37-29.webp)
![深色模式](https://pic-2.yoxo.top/Snipaste_2026-11-20_19-38-22.webp)

# 介绍

Meteor Homepage 是一款创意型的个人主页，使用多页式结构，一键部署，无需复杂环境。

界面优雅美观，定制自由度高，深浅色模式完美适配，响应式布局，适配桌面和移动设备。

# 使用方法

1. Fork此仓库到您的账号
2. 在线或本地修改文件
3. 部署到网页托管网站

# 功能特点

- 响应式布局，适配桌面和移动设备

- 独特状态圈设计

- 天气信息与时间与日期显示

- 原生音乐播放器

- 毛玻璃卡片

- 便当盒布局

- 多页面个人主页，可容纳多个个人项目与自我介绍

- 纯 HTML、CSS 和 JavaScript，无需复杂构建环境

## 本地文件修改指南

### index.html

#### 网站title

每个html文件的head中：

[示例](index.html#L35)

```html
<title>Yangle's Homepage | 20100807.xyz</title>
```

#### 网站图标

每个html文件的head中：

[示例](index.html#L38)

```html
<link rel="icon" href="/static/img/favicon.webp">
```

#### 个人头像

每个html文件的body中：

[示例](index.html#L38)

```html
<header>
	<img src="static/img/avatar.webp" alt="avatar" id="avatar">
</header>
```
### JavaScript.js 

建议修改：[19 ~ 31 行](static/js/JavaScript.js#L19-L31)

可选修改：
+ [199 行](static/js/JavaScript.js#L199)（默认音量档位）
+ [440 行 至 460 行](static/js/JavaScript.js#L440-L460)（天气代码对应的文字和图标）
+ [534 行 至 546 行](static/js/JavaScript.js#L534-L546)（问候语）
+ [576 行 至 623 行](static/js/JavaScript.js#L576-L623)（天气定位和服务依赖逻辑）

### css.css 

建议修改：
[21 ~ 41 行](static/css/css.css#L21-L41)（包括背景图像）

可选修改：
+ [43 ~ 66 行](static/css/css.css#L43-L66)（字体）
+ [522 ~ 570 行](static/css/css.css#L522-L570)（特别文字颜色）
+ [1312 ~ 1331 行](static/css/css.css#L1312-L1331)（玻璃效果）
+ [1413 ~ 1513 行](static/css/css.css#L1413-L1513)（图标动画基础设定）

### config.js 

可选修改：

[整个文件](static/js/config.js)（音乐信息）

（行号有可能变化，请以实际为准）

## 便当盒布局指南

本项目首页采用便当盒布局（Bento Box Layout），可供使用的空间为6\*3格，支持的最大单格为6\*3格。

要应用格子大小到卡片，在[卡片](index.html#L220-L310)的类名中添加：
```html
class="span-1x1"
```
第一个数是行，第二个数是列。最大支持`span-6x3`。

示例：
```html
<div class="span-2x1">
你的格子内容
</div>
```

请注意排版，避免格子超出可用范围。

## 图标动画指南

本项目使用font awesome提供的12个免费动画，均为鼠标悬浮时生效。

要应用动画大小到图标，在[卡片](index.html#L220-L310)的类名中添加：
```html
class="fade"
```

可用动画有：

- spin（旋转）

- fade（闪烁）

- shake（晃动）

- bounce（弹跳）

- flip（翻转）

- flip-360（360度翻转）

- flip-360-vertical（360度垂直翻转）

- beat（放大缩小）

- jello（果冻）

- beat-fade（放大缩小同时闪烁）

- buzz（振动）

- float（漂浮）

```html
<div class="span-2x1 jello">
你的格子内容
</div>
```

## 图标指南

本项目使用[Font Awesome](https://fontawesome.com/)图标库，已提前引入，可直接使用。

使用方法：
``` html
<i class="fa-图标类 fa-图标名称"></i>
```

e.g:

```html
<i class="fa-solid fa-blog"></i>
```

## 部署指南

### 1.Vercel 一键部署

1. Fork此仓库到自己账号
2. 修改文件与样式
3. 点击下键一键部署
4. 绑定域名

### 2.Cloudflare Pages 部署

1. Fork此仓库到自己账号
2. 修改文件与样式
3. 点击下键一键部署
4. 绑定域名

### 3.自有服务器

1. 克隆项目到本地
	```bash
	git clone https://github.com/yangle-q/Meteor-Homepage.git
	cd Meteor-Homepage
	```
2. 修改文件并启动python服务器查看
	```python
	python -m http.server 8000
	```
3. 上传到服务器，绑定域名

# 外部资源

图标库：[Font Awesome](https://fontawesome.com/)

# 在线预览

[访问 Meteor Homepage](https://20100807.xyz)

# 文件结构

Meteor-Homepage/<br>
├── index.html<br>
├── contact/<br>
├── info/<br>
├── message/<br>
├── projects/<br>
├── static/<br>
│   ├── css/<br>
│   ├── js/<br>
│   └── img/<br>
├── README.md<br>
├── .gitignore<br>
└── LICENSE<br>
