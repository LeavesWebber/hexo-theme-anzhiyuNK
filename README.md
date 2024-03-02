<p align="center">
  <a title="Hexo Version" target="_blank" href="https://hexo.io/zh-cn/"><img alt="Hexo Version" src="https://img.shields.io/badge/Hexo-%3E%3D%205.3.0-orange?style=flat"></a>
  <a title="Node Version" target="_blank" href="https://nodejs.org/zh-cn/"><img alt="Node Version" src="https://img.shields.io/badge/Node-%3E%3D%2010.13.0-yellowgreen?style=flat"></a>
  <a title="License" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/anzhiyu-c/hexo-theme-anzhiyu.svg?style=flat"></a>
  <br>
  <a title="GitHub Release" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/anzhiyu-c/hexo-theme-anzhiyu?style=flat"></a>
  <a title="Npm Downloads" target="_blank" href="https://www.npmjs.com/package/hexo-theme-anzhiyu"><img alt="Npm Downloads" src="https://img.shields.io/npm/dt/hexo-theme-anzhiyu?color=red&label=npm"></a>
  <a title="GitHub Commits" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/commits/master"><img alt="GitHub Commits" src="https://img.shields.io/github/commit-activity/m/anzhiyu-c/hexo-theme-anzhiyu.svg?style=flat&color=brightgreen&label=commits"></a>
  <br><br>
  <a title="GitHub Watchers" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/watchers"><img alt="GitHub Watchers" src="https://img.shields.io/github/watchers/anzhiyu-c/hexo-theme-anzhiyu.svg?label=Watchers&style=social"></a>  
  <a title="GitHub Stars" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/anzhiyu-c/hexo-theme-anzhiyu.svg?label=Stars&style=social"></a>  
  <a title="GitHub Forks" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/network/members"><img alt="GitHub Forks" src="https://img.shields.io/github/forks/anzhiyu-c/hexo-theme-anzhiyu.svg?label=Forks&style=social"></a>  
</p>

<p align="center">🇨🇳 中文简体  |  <a title="English" href="README_EN.md">🇬🇧 English</a></p>

预览: 👍 [AnZhiYu](https://blog.anheyu.com/) || 🤞 [AnZhiYu](https://index.anheyu.com/)

文档: 📖 [anzhiyu Docs](https://docs.anheyu.com/)

一款基于[hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly)修改的主題

# hexo-theme-anzhiyu

![](https://bu.dusays.com/2023/07/24/64bdcbfe96762.webp)

## 💻 安裝

### Git 安裝

在博客根目录里安装最新版【推荐】

```powershell
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

## ⚙ 应用主题

修改 hexo 配置文件`_config.yml`，把主题改为`anzhiyu`

```
theme: anzhiyu
```

> 如果你没有 pug 以及 stylus 的渲染器，请下载安装： `npm install hexo-renderer-pug hexo-renderer-stylus --save`

## 覆盖配置

覆盖配置可以使`主题配置`放置在 anzhiyu 目录之外，避免在更新主题时丢失自定义的配置。

通过 Npm 安装主题的用户可忽略，其他用户建议学习使用。

- macos/linux
  在博客根目录运行

```bash
cp -rf ./themes/anzhiyu/_config.yml ./_config.anzhiyu.yml
```

- windows
  复制`/themes/anzhiyu/_config.yml`此文件到 hexo 根目录，并重命名为`_config.anzhiyu.yml`

以后如果修改任何主题配置，都只需修改 _config.anzhiyu.yml 的配置即可。

注意：
 - 只要存在于 `_config.anzhiyu.yml` 的配置都是高优先级，修改原 `_config.yml` 是无效的。
 - 每次更新主题可能存在配置变更，请注意更新说明，可能需要手动对 `_config.anzhiyu.yml` 同步修改。
 - 想查看覆盖配置有没有生效，可以通过 `hexo g --debug` 查看命令行输出。
 - 如果想将某些配置覆盖为空，注意不要把主键删掉，不然是无法覆盖的

## 功能特性

- ✅ 无比详实的[用户文档](https://docs.anheyu.com/)
- ✅ 页面组件懒加载(pjax方案)
- ✅ 图片懒加载
- ✅ 多种代码高亮方案
- ✅ 多语言配置
- ✅ 内置多款评论插件
- ✅ 内置网页访问统计
- ✅ 支持暗色模式
- ✅ 支持脚注语法
- ✅ 支持自定义CDN静态资源
- ✅ 丰富多样化的标签选项快速构建你想要的功能
- ✅ 支持定制化的右键菜单
- ✅ 支持定制化的主色调随封面图片颜色变化
- ✅ 支持沉浸式状态栏
- ✅ 支持文章字数统计
- ✅ 支持聊天系统
- ✅ 支持谷歌分析、百度分析、微软分析、cloudflare分析、cnzz分析
- ✅ 支持广告挂载
- ✅ 支持图片大图查看
- ✅ 支持瀑布流即刻说说
- ✅ 支持瀑布流相册集
- ✅ 支持阿里图标与fontawesome
- ✅ 支持高速缓存的swpp，pwa特性
- ✅ 优秀的隐私协议支持
- ✅ 文章AI摘要支持
- ✅ 支持音乐球
- ✅ 支持全局中控台
- ✅ 支持快捷键选项
- ✅ 支持本地搜索/algolia搜索🔍/Docsearch
- ✅ 支持 LaTeX 数学公式
- ✅ 支持 mermaid 流程图

## 部分功能展示

**沉浸式状态栏**
沉浸阅读。
![沉浸式状态栏](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/3bc088e73d07b4dc25fc62fa4cf63261_4205905123525229755.png)

**高低自定义的右键菜单**
高度定制。
![高低自定义的右键菜单](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/3f66e33b24a758d53717f6c2c44e50af_1884994888952376370.png)

**AI摘要**
迅速读取文章内容。
![AI摘要](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/184e089d64660f5f72390f547c864633_3266246986824356702.png)

**让人眼前一亮的清爽界面**

![让人眼前一亮的清爽界面](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/8a16284fd36a9e986d5dbda772f697d0_1356079755877317976.png)

**评论弹幕**

![评论弹幕](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/628aef1dbf52b61c0333682e8ee9954e_6905019516821534667.png)

## 贡献者

[![contributors](https://opencollective.com/hexo-theme-anzhiyu/contributors.svg?width=890&button=false)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/)

主题设计：[@张洪 Heo](https://github.com/zhheo)

文档编写：[@xiaoran](https://github.com/xiaoran)

## 仓库统计

![仓库统计](https://repobeats.axiom.co/api/embed/60fcf455cd02123aebe6249deabf8d48e3debcae.svg "Repobeats analytics image")


---

# 以上是原作者的声明；以下为个人魔改的说明

- 此仓库主题为[安知鱼主题](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)个人魔改版，如果出现 BUG 请勿麻烦原作者

## 增加页面

- 文章统计页面
  ```YAML
  ---
  title: 文章统计
  date: 2023-12-26 17:02:05
  type: statistics
  aside: false
  top_img: false
  top_background: 'https://cdn.cbd.int/naokuo-blog@1.2.12/img/wallhaven-wed6q7.webp'
  ---
  ```

- 游戏收藏页面
  ```YAML
  ---
  title: 游戏世界
  date: 2023-12-24 01:25:30
  type: 'games'
  aside: false
  top_img: false
  ---
  ```
  ```YAML
  - class_name: 游戏世界
    description: 我的游戏世界
    tip: 跟 Naokuo 一起探索世界
    top_background: # https://cdn.cbd.int/naokuo-blog@1.1.1/img/2023-09-071733054.webp
    top_video: https://cdn.cbd.int/naokuo-media@1.0.3/MP4/2024-01-19_5.mp4
    buttonText: 关于我
    buttonLink: /about/
    good_games:
      - title: 游戏集
        description: 博主收藏的HTML游戏
        games_list:
          - name: 🍰 Mikutap
            specification: Aidn.jp
            description: "🍰一个有趣的音乐网站源码-Mikutap"
            image: https://image.thum.io/get/allowJPG/wait/20/width/600/crop/950/https://naokuo.top/games/game/mikutap/
            link: /games/game/mikutap/
            source_code: https://github.com/HFIProgramming/mikutap

          - name: 3D元素周期表
            specification: 
            description: "3D元素周期表"
            image: https://image.thum.io/get/allowJPG/wait/20/width/600/crop/950/https://naokuo.top/games/game/3Delement/
            link: /games/game/3Delement/
            source_code: https://github.com/YL2209/game/tree/main/3Delement

      - title: 风景一绝
        description: 不会错过的风景
        games_list:
          - name: 原神
            specification: mihoyo
            description: 《原神》是一款开放世界冒险游戏，这意味着从你踏入「提瓦特」的第一刻起，只要合理规划自己的体力，不论翻山越岭、还是横渡江河，总有办法见到新的风景。
            image: https://cdn.cbd.int/naokuo-blog@1.2.19/img/about/63a079ca63c8a.webp
            link: https://ys.mihoyo.com/cloud/?utm_source=default#/
  ```

- 待办清单页面
  ```YAML
  ---
  title: 待办清单
  date: 2023-12-24 01:10:40
  type: 'todolist'
  aside: false
  top_img: false
  top_background: 'https://cdn.cbd.int/naokuo-blog@1.2.12/img/wallhaven-859z1j.webp'
  ---
  ```
  ```YAML
  # seat控制清单在左栏还是右栏显示，completed控制是否已完成
  - class_name: 想做的项目
    seat: left
    todo_list:
      - content: 主页
        completed: false
      - content: 小程序
        completed: false

  - class_name: 想看的书
    seat: left
    todo_list:
      - content: 《骆驼祥子》
        completed: false
      - content: 《活着》
        completed: false

  - class_name: 想买的东西
    seat: left
    todo_list:
      - content: 东西
        completed: true
      - content: 机械硬盘盒
        completed: true

  - class_name: 想学的技术
    seat: right
    todo_list:
      - content: 骑自行车
        completed: true

  - class_name: 想去的地方
    seat: right
    todo_list:
      - content: 广东
        completed: true
      - content: 北京
        completed: false
  ```

- 留言板页面
  ```YAML
  ---
  title: 留言板
  date: 2023-12-26 22:16:14
  comments: true
  top_img: false
  type: 'envelope'
  aside: false
  top_background: 'https://cdn.cbd.int/naokuo-blog@1.2.12/img/posts/posts8.webp'
  ---
  ```

- 网站收藏页面
  ```YAML
  ---
  title: 网站收藏
  date: 2024-01-08 12:22:18
  type: 'websites'
  aside: false
  top_img: false
  ---
  ```
  ```YAML
  - class_name_2: 网站收藏
    description: 我的网站收藏
    tip: 博主收藏的宝藏网站
    # top_background: https://cdn.cbd.int/naokuo-blog/img/2023-09-071733054.webp
    top_video: https://cdn.cbd.int/naokuo-media@1.0.0/3.mp4
    buttonText: 关于我
    buttonLink: /about/
    good_sites:
      - class_name: 收藏网站
        class_desc: 个人收藏的网站
        sites_list:
          - name: 稀土掘金
            link: https://juejin.cn/post/7262897440046678071
          - name: 恩山论坛
            link: https://www.right.com.cn/forum/forum.php
          - name: GitHub
            link: https://github.com/
          - name: Butterfly主题美化教程
            link: https://butterfly.zhheo.com/

      - class_name: 工具箱
        class_desc: 个人收藏的工具网站
        sites_list:
          - name: 透明背景制作
            link: https://www.unscreen.com/
          - name: Trending - CodePen
            link: https://codepen.io/trending
          - name: CSS clip-path 生成器
            link: https://www.jiangweishan.com/tool/clippy/
          - name: 路过图床
            link: https://imgse.com/
          - name: JS 代码压缩工具
            link: https://www.wetools.com/js-compress
          - name: Css转Stylus
            link: https://verytoolz.com/css-stylus.html

      - class_name: 资源库
        class_desc: 个人收藏的资源型网站
        sites_list:
          - name: iconfont
            link: https://www.iconfont.cn/
          - name: 表情包速查
            link: https://emotion.xiaokang.me/#/

      - class_name: API库
        class_desc: 个人收藏的API接口型网站
        sites_list:
          - name: 随机图片API
            link: https://www.cnblogs.com/zaxtyson/p/11628746.html
          - name: 随机壁纸
            link: https://api.btstu.cn/doc/sjbz.php
          - name: 夏柔API
            link: https://api.aa1.cn/
          - name: 青桔-API
            link: https://api.qjqq.cn/

      - class_name: AI工具箱
        class_desc: 个人收藏的AI工具型网站
        sites_list:
          - name: LiblibAI•哩布哩布AI
            link: https://www.liblib.art/
          - name: 原神AI语音生成
            link: https://v2.genshinvoice.top/
          - name: 通义千问
            link: https://tongyi.aliyun.com/
  ```

## hexo插件
  ```json
  {
    "name": "hexo-site",
    "version": "0.0.0",
    "private": true,
    "scripts": {
      "build": "hexo generate",
      "clean": "hexo clean",
      "deploy": "hexo deploy",
      "server": "hexo server",
      "gulpd": "hexo clean & hexo generate & hexo swpp & gulp & hexo deploy",
      "servers": "hexo clean & hexo generate & gulp & hexo server",
      "bangumiu": "hexo cinema -u",
      "bangumid": "hexo cinema -d"
    },
    "hexo": {
      "version": "7.1.1"
    },
    "dependencies": {
      "gulp": "^4.0.2",
      "hexo": "^7.1.1",
      "hexo-abbrlink": "^2.2.1",
      "hexo-bilibili-bangumi": "^1.8.9",
      "hexo-blog-encrypt": "^3.1.9",
      "hexo-deployer-git": "^4.0.0",
      "hexo-filter-nofollow": "^2.0.2",
      "hexo-generator-archive": "^2.0.0",
      "hexo-generator-baidu-sitemap": "^0.1.9",
      "hexo-generator-category": "^2.0.0",
      "hexo-generator-feed": "^3.0.0",
      "hexo-generator-index": "^3.0.0",
      "hexo-generator-sitemap": "^3.0.1",
      "hexo-generator-tag": "^2.0.0",
      "hexo-naokuo-image-color": "^1.1.0-beta.3",
      "hexo-naokuo-search": "^0.0.3",
      "hexo-renderer-ejs": "^2.0.0",
      "hexo-renderer-kramed": "^0.1.4",
      "hexo-renderer-pug": "^3.0.0",
      "hexo-renderer-stylus": "^3.0.1",
      "hexo-server": "^3.0.0",
      "hexo-swpp": "^3.3.7",
      "hexo-wordcount": "^6.0.1",
      "swpp-backends": "^2.3.8"
    },
    "devDependencies": {
      "gulp-clean-css": "^4.3.0",
      "gulp-fontmin": "^0.7.4",
      "gulp-html-minifier-terser": "^7.1.0",
      "gulp-htmlclean": "^2.7.22",
      "gulp-terser": "^2.1.0"
    }
  }
  ```