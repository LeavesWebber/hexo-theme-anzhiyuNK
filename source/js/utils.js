const anzhiyu = {
  debounce: (func, wait = 0, immediate = false) => {
    let timeout;
    return (...args) => {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  throttle: function (func, wait, options = {}) {
    let timeout, context, args;
    let previous = 0;

    const later = () => {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
    };

    const throttled = (...params) => {
      const now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      const remaining = wait - (now - previous);
      context = this;
      args = params;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
    };

    return throttled;
  },

  sidebarPaddingR: () => {
    const innerWidth = window.innerWidth;
    const clientWidth = document.body.clientWidth;
    const paddingRight = innerWidth - clientWidth;
    if (innerWidth !== clientWidth) {
      document.body.style.paddingRight = paddingRight + "px";
    }
  },

  snackbarShow: (text, showActionFunction = false, duration = 2000, actionText = false) => {
    const { position, bgLight, bgDark } = GLOBAL_CONFIG.Snackbar;
    const bg = document.documentElement.getAttribute("data-theme") === "light" ? bgLight : bgDark;
    const root = document.querySelector(":root");
    root.style.setProperty("--anzhiyu-snackbar-time", duration + "ms");

    Snackbar.show({
      text: text,
      backgroundColor: bg,
      onActionClick: showActionFunction,
      actionText: actionText,
      showAction: actionText,
      duration: duration,
      pos: position,
      customClass: "snackbar-css",
    });
  },

  loadComment: (dom, callback) => {
    if ("IntersectionObserver" in window) {
      const observerItem = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            callback();
            observerItem.disconnect();
          }
        },
        { threshold: [0] }
      );
      observerItem.observe(dom);
    } else {
      callback();
    }
  },

  scrollToDest: (pos, time = 500) => {
    const currentPos = window.pageYOffset;
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: pos,
        behavior: "smooth",
      });
      return;
    }

    let start = null;
    pos = +pos;
    window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      const progress = currentTime - start;
      if (currentPos < pos) {
        window.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos);
      } else {
        window.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time);
      }
      if (progress < time) {
        window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, pos);
      }
    });
  },

  initJustifiedGallery: function (selector) {
    const runJustifiedGallery = i => {
      if (!anzhiyu.isHidden(i)) {
        fjGallery(i, {
          itemSelector: ".fj-gallery-item",
          rowHeight: i.getAttribute("data-rowHeight"),
          gutter: 4,
          onJustify: function () {
            this.$container.style.opacity = "1";
          },
        });
      }
    };

    if (Array.from(selector).length === 0) runJustifiedGallery(selector);
    else
      selector.forEach(i => {
        runJustifiedGallery(i);
      });
  },

  animateIn: (ele, text) => {
    ele.style.display = "block";
    ele.style.animation = text;
  },

  animateOut: (ele, text) => {
    ele.addEventListener("animationend", function f() {
      ele.style.display = "";
      ele.style.animation = "";
      ele.removeEventListener("animationend", f);
    });
    ele.style.animation = text;
  },

  /**
   * @param {*} selector
   * @param {*} eleType the type of create element
   * @param {*} options object key: value
   */
  wrap: (selector, eleType, options) => {
    const creatEle = document.createElement(eleType);
    for (const [key, value] of Object.entries(options)) {
      creatEle.setAttribute(key, value);
    }
    selector.parentNode.insertBefore(creatEle, selector);
    creatEle.appendChild(selector);
  },

  isHidden: ele => ele.offsetHeight === 0 && ele.offsetWidth === 0,

  getEleTop: ele => {
    let actualTop = ele.offsetTop;
    let current = ele.offsetParent;

    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }

    return actualTop;
  },

  loadLightbox: ele => {
    const service = GLOBAL_CONFIG.lightbox;

    if (service === "mediumZoom") {
      const zoom = mediumZoom(ele);
      zoom.on("open", e => {
        const photoBg = document.documentElement.getAttribute("data-theme") === "dark" ? "#121212" : "#fff";
        zoom.update({
          background: photoBg,
        });
      });
    }

    if (service === "fancybox") {
      Array.from(ele).forEach(i => {
        if (i.parentNode.tagName !== "A") {
          const dataSrc = i.dataset.lazySrc || i.src;
          const dataCaption = i.title || i.alt || "";
          anzhiyu.wrap(i, "a", {
            href: dataSrc,
            "data-fancybox": "gallery",
            "data-caption": dataCaption,
            "data-thumb": dataSrc,
          });
        }
      });

      if (!window.fancyboxRun) {
        Fancybox.bind("[data-fancybox]", {
          Hash: false,
          // Thumbs: {
          //   autoStart: false,
          // },
          Thumbs: {
            showOnStart: false,
          },
        });
        window.fancyboxRun = true;
      }
    }
  },

  setLoading: {
    add: ele => {
      const html = `
        <div class="loading-container">
          <div class="loading-item">
            <div></div><div></div><div></div><div></div><div></div>
          </div>
        </div>
      `;
      ele.insertAdjacentHTML("afterend", html);
    },
    remove: ele => {
      ele.nextElementSibling.remove();
    },
  },

  updateAnchor: anchor => {
    if (anchor !== window.location.hash) {
      if (!anchor) anchor = location.pathname;
      const title = GLOBAL_CONFIG_SITE.title;
      window.history.replaceState(
        {
          url: location.href,
          title,
        },
        title,
        anchor
      );
    }
  },

  getScrollPercent: (currentTop, ele) => {
    const docHeight = ele.clientHeight;
    const winHeight = document.documentElement.clientHeight;
    const headerHeight = ele.offsetTop;
    const contentMath =
      docHeight > winHeight ? docHeight - winHeight : document.documentElement.scrollHeight - winHeight;
    const scrollPercent = (currentTop - headerHeight) / contentMath;
    const scrollPercentRounded = Math.round(scrollPercent * 100);
    const percentage = scrollPercentRounded > 100 ? 100 : scrollPercentRounded <= 0 ? 0 : scrollPercentRounded;
    return percentage;
  },

  addGlobalFn: (key, fn, name = false, parent = window) => {
    const globalFn = parent.globalFn || {};
    const keyObj = globalFn[key] || {};

    if (name && keyObj[name]) return;

    name = name || Object.keys(keyObj).length;
    keyObj[name] = fn;
    globalFn[key] = keyObj;
    parent.globalFn = globalFn;
  },

  addEventListenerPjax: (ele, event, fn, option = false) => {
    ele.addEventListener(event, fn, option);
    anzhiyu.addGlobalFn("pjax", () => {
      ele.removeEventListener(event, fn, option);
    });
  },

  removeGlobalFnEvent: (key, parent = window) => {
    const { globalFn = {} } = parent;
    const keyObj = globalFn[key] || {};
    const keyArr = Object.keys(keyObj);
    if (!keyArr.length) return;
    keyArr.forEach(i => {
      keyObj[i]();
    });
    delete parent.globalFn[key];
  },

  //更改主题色
  changeThemeMetaColor: function (color) {
    // console.info(`%c ${color}`, `font-size:36px;color:${color};`);
    if (themeColorMeta !== null) {
      themeColorMeta.setAttribute("content", color);
    }
  },

  //顶栏自适应主题色
  initThemeColor: function () {
    let themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--anzhiyu-bar-background")
      .trim()
      .replace('"', "")
      .replace('"', "");
    const currentTop = window.scrollY || document.documentElement.scrollTop;
    if (currentTop > 26) {
      if (anzhiyu.is_Post()) {
        themeColor = getComputedStyle(document.documentElement)
          .getPropertyValue("--anzhiyu-meta-theme-post-color")
          .trim()
          .replace('"', "")
          .replace('"', "");
      }
      if (themeColorMeta.getAttribute("content") === themeColor) return;
      this.changeThemeMetaColor(themeColor);
    } else {
      if (themeColorMeta.getAttribute("content") === themeColor) return;
      this.changeThemeMetaColor(themeColor);
    }
  },
  //是否是文章页
  is_Post: function () {
    var url = window.location.href; //获取url
    if (url.indexOf("/posts/") >= 0) {
      //判断url地址中是否包含code字符串
      return true;
    } else {
      return false;
    }
  },
  //监测是否在页面开头
  addNavBackgroundInit: function () {
    var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    if ($bodyWrap) {
      bodyScrollTop = $bodyWrap.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;

    if (scrollTop != 0) {
      pageHeaderEl.classList.add("nav-fixed");
      pageHeaderEl.classList.add("nav-visible");
    }
  },
  // 下载图片
  downloadImage: function (imgsrc, name) {
    //下载图片地址和图片名
    rm.hideRightMenu();
    if (rm.downloadimging == false) {
      rm.downloadimging = true;
      anzhiyu.snackbarShow("正在下载中，请稍后", false, 10000);
      setTimeout(function () {
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function () {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
          let a = document.createElement("a"); // 生成一个a元素
          let event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
        anzhiyu.snackbarShow("图片已添加盲水印，请遵守版权协议");
        rm.downloadimging = false;
      }, "10000");
    } else {
      anzhiyu.snackbarShow("有正在进行中的下载，请稍后再试");
    }
  },
  //禁止图片右键单击
  stopImgRightDrag: function () {
    var img = document.getElementsByTagName("img");
    for (var i = 0; i < img.length; i++) {
      img[i].addEventListener("dragstart", function () {
        return false;
      });
    }
  },
  //滚动到指定id
  scrollTo: function (id) {
    var domTop = document.querySelector(id).offsetTop;
    window.scrollTo(0, domTop - 80);
  },
  //隐藏侧边栏
  hideAsideBtn: () => {
    // Hide aside
    const $htmlDom = document.documentElement.classList;
    $htmlDom.contains("hide-aside")
      ? saveToLocal.set("aside-status", "show", 2)
      : saveToLocal.set("aside-status", "hide", 2);
    $htmlDom.toggle("hide-aside");
    $htmlDom.contains("hide-aside")
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on");
  },
  // 热评切换
  switchCommentBarrage: function () {
    let commentBarrage = document.querySelector(".comment-barrage");
    if (commentBarrage) {
      if (window.getComputedStyle(commentBarrage).display === "flex") {
        commentBarrage.style.display = "none";
        anzhiyu.snackbarShow("✨ 已关闭评论弹幕");
        document.querySelector(".menu-commentBarrage-text").textContent = "显示热评";
        document.querySelector("#consoleCommentBarrage").classList.remove("on");
        saveToLocal.set("commentBarrageSwitch", "false", 2);
      } else {
        commentBarrage.style.display = "flex";
        document.querySelector(".menu-commentBarrage-text").textContent = "关闭热评";
        document.querySelector("#consoleCommentBarrage").classList.add("on");
        anzhiyu.snackbarShow("✨ 已开启评论弹幕");
        localStorage.removeItem("commentBarrageSwitch");
      }
    }
    rm && rm.hideRightMenu();
  },
  initPaginationObserver: () => {
    const commentElement = document.getElementById("post-comment");
    const paginationElement = document.getElementById("pagination");

    if (commentElement && paginationElement) {
      new IntersectionObserver(entries => {
        const commentBarrage = document.querySelector(".comment-barrage");

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            paginationElement.classList.add("show-window");
            if (commentBarrage) {
              commentBarrage.style.bottom = "-200px";
            }
          } else {
            paginationElement.classList.remove("show-window");
            if (commentBarrage) {
              commentBarrage.style.bottom = "0px";
            }
          }
        });
      }).observe(commentElement);
    }
  },
  // 初始化即刻
  initIndexEssay: function () {
    if (!document.querySelector(".bbTimeList#bbTimeList")) return;
    setTimeout(() => {
      const setessay_bar_swiper = () => {
        const essay_bar_swiper = new Swiper(".essay_bar_swiper_container", {
          passiveListeners: true,
          direction: "vertical",
          loop: true,
          autoplay: {
            disableOnInteraction: true,
            delay: 3000,
          },
          mousewheel: true,
        });

        let essay_bar_comtainer = document.getElementById("bbtalk");
        if (essay_bar_comtainer !== null) {
          essay_bar_comtainer.onmouseenter = function () {
            essay_bar_swiper.autoplay.stop();
          };
          essay_bar_comtainer.onmouseleave = function () {
            essay_bar_swiper.autoplay.start();
          };
        }
      };
      (async function () {
        if (typeof Swiper === 'function') {
          setessay_bar_swiper()
        } else {
          await getCSS(`${GLOBAL_CONFIG.source.swiper.css}`);
          await getScript(`${GLOBAL_CONFIG.source.swiper.js}`).then(setessay_bar_swiper)
        }
      })();
    }, 100);
  },
  scrollByMouseWheel: function ($list, $target) {
    const scrollHandler = function (e) {
      $list.scrollLeft -= e.wheelDelta / 2;
      e.preventDefault();
    };
    $list.addEventListener("mousewheel", scrollHandler, { passive: false });
    if ($target) {
      $target.classList.add("selected");
      $list.scrollLeft = $target.offsetLeft - $list.offsetLeft - ($list.offsetWidth - $target.offsetWidth) / 2;
    }
  },
  // catalog激活
  catalogActive: function () {
    const $list = document.getElementById("catalog-list");
    if ($list) {
      const pathname = decodeURIComponent(window.location.pathname);
      const catalogListItems = $list.querySelectorAll(".catalog-list-item");

      let $catalog = null;
      catalogListItems.forEach(item => {
        if (pathname.startsWith(item.id)) {
          $catalog = item;
          return;
        }
      });

      anzhiyu.scrollByMouseWheel($list, $catalog);
    }
  },
  // Page Tag 激活
  tagsPageActive: function () {
    const $list = document.getElementById("tag-page-tags");
    if ($list) {
      const $tagPageTags = document.getElementById(decodeURIComponent(window.location.pathname));
      anzhiyu.scrollByMouseWheel($list, $tagPageTags);
    }
  },
  // 修改时间显示"最近"
  diffDate: function (d, more = false, simple = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else if (simple) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;
      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1 && dayCount <= 3) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (dayCount > 3) {
        result = datePost.getMonth() + 1 + "/" + datePost.getDate();
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },

  // 修改即刻中的时间显示
  changeTimeInEssay: function () {
    document.querySelector("#bber") &&
      document.querySelectorAll("#bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  // 修改相册集中的时间
  changeTimeInAlbumDetail: function () {
    document.querySelector("#album_detail") &&
      document.querySelectorAll("#album_detail time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  // 刷新瀑布流
  reflashEssayWaterFall: function () {
    const waterfallEl = document.getElementById("waterfall");
    if (waterfallEl) {
      setTimeout(function () {
        waterfall(waterfallEl);
        waterfallEl.classList.add("show");
      }, 800);
    }
  },
  sayhi: function () {
    const $sayhiEl = document.getElementById("author-info__sayhi");

    const getTimeState = () => {
      const hour = new Date().getHours();
      let message = "";

      if (hour >= 0 && hour <= 5) {
        message = "睡个好觉，保证精力充沛";
      } else if (hour > 5 && hour <= 10) {
        message = "一日之计在于晨";
      } else if (hour > 10 && hour <= 14) {
        message = "吃饱了才有力气干活";
      } else if (hour > 14 && hour <= 18) {
        message = "集中精力，攻克难关";
      } else if (hour > 18 && hour <= 24) {
        message = "不要太劳累了，早睡更健康";
      }

      return message;
    };

    if ($sayhiEl) {
      $sayhiEl.innerHTML = getTimeState();
    }
  },

  // 友链注入预设评论
  addFriendLink() {
    var input = document.getElementsByClassName("el-textarea__inner")[0];
    if (!input) return;
    const evt = new Event("input", { cancelable: true, bubbles: true });
    const defaultPlaceholder =
      "昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n站点截图（可选）：\n";
    input.value = this.getConfigIfPresent(GLOBAL_CONFIG.linkPageTop, "addFriendPlaceholder", defaultPlaceholder);
    input.dispatchEvent(evt);
    input.focus();
    input.setSelectionRange(-1, -1);
  },
  // 获取配置，如果为空则返回默认值
  getConfigIfPresent: function (config, configKey, defaultValue) {
    if (!config) return defaultValue;
    if (!config.hasOwnProperty(configKey)) return defaultValue;
    if (!config[configKey]) return defaultValue;
    return config[configKey];
  },
  //切换音乐播放状态
  musicToggle: function (changePaly = true) {
    if (!anzhiyu_musicFirst) {
      anzhiyu.musicBindEvent();
      anzhiyu_musicFirst = true;
    }
    let msgPlay = '<i class="naokuofont naokuo-icon-play"></i><span>播放音乐</span>';
    let msgPause = '<i class="naokuofont naokuo-icon-pause"></i><span>暂停音乐</span>';
    const menu_music_toggle = document.getElementById("menu-music-toggle"),
      nav_music_hoverTips = document.getElementById("nav-music-hoverTips"),
      consoleMusic = document.querySelector("#consoleMusic");
    if (anzhiyu_musicPlaying) {
      navMusicEl.classList.remove("playing");
      menu_music_toggle && (menu_music_toggle.innerHTML = msgPlay);
      nav_music_hoverTips && (nav_music_hoverTips.innerHTML = "音乐已暂停");
      consoleMusic && consoleMusic.classList.remove("on");
      anzhiyu_musicPlaying = false;
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("playing");
      menu_music_toggle && (menu_music_toggle.innerHTML = msgPause);
      consoleMusic && consoleMusic.classList.add("on");
      anzhiyu_musicPlaying = true;
      navMusicEl.classList.add("stretch");
    }
    if (changePaly) document.querySelector("#nav-music meting-js").aplayer.toggle();
    rm && rm.hideRightMenu();
  },
  // 音乐伸缩
  musicTelescopic: function () {
    if (navMusicEl.classList.contains("stretch")) {
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("stretch");
    }
  },

  //音乐上一曲
  musicSkipBack: function () {
    navMusicEl.querySelector("meting-js").aplayer.skipBack();
    rm && rm.hideRightMenu();
  },

  //音乐下一曲
  musicSkipForward: function () {
    navMusicEl.querySelector("meting-js").aplayer.skipForward();
    rm && rm.hideRightMenu();
  },

  //获取音乐中的名称
  musicGetName: function () {
    // 直接使用querySelector获取类名为"aplayer-title"的第一个元素
    const titleElement = document.querySelector("#nav-music .aplayer-title");

    // 如果找到了该元素，则复制其innerText并显示成功消息；否则显示失败消息
    if (titleElement) {
      anzhiyu.snackbarShow("复制歌曲名称成功", false, 3000);
      return titleElement.innerText;
    } else {
      anzhiyu.snackbarShow("复制歌曲名称失败", false, 3000);
      return "复制的歌曲名称不存在";
    }
  },
  //初始化console图标
  initConsoleState: function () {
    //初始化隐藏边栏
    const $htmlDomClassList = document.documentElement.classList;
    $htmlDomClassList.contains("hide-aside")
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on");

    const consoleKeyboard = document.querySelector("#consoleKeyboard");
    if (consoleKeyboard) {
      if (!saveToLocal.get("keyboardToggle")) {
        consoleKeyboard.classList.add("on");
      } else {
        consoleKeyboard.classList.remove("on");
      }
    }

    // 热评控制台按钮状态
    const consoleCommentBarrage = document.querySelector("#consoleCommentBarrage");
    if (consoleCommentBarrage) {
      if (saveToLocal.get("commentBarrageSwitch") !== "false") {
        consoleCommentBarrage.classList.add("on");
      } else {
        consoleCommentBarrage.classList.remove("on");
      }
    }

    // 音乐控制台按钮状态
    const consoleMusic = document.querySelector("#consoleMusic");
    if (consoleMusic) {
      if (!anzhiyu_musicPlaying) {
        consoleMusic.classList.remove("on");
      } else {
        consoleMusic.classList.add("on");
      }
    }
  },

  // 显示打赏中控台
  rewardShowConsole: function () {
    // 判断是否为赞赏打开控制台
    consoleEl.classList.add("reward-show");
    anzhiyu.initConsoleState();
  },
  // 显示中控台
  showConsole: function () {
    consoleEl.classList.add("show");
    anzhiyu.initConsoleState();
  },

  //隐藏中控台
  hideConsole: function () {
    if (consoleEl.classList.contains("show")) {
      // 如果是一般控制台，就关闭一般控制台
      consoleEl.classList.remove("show");
    } else if (consoleEl.classList.contains("reward-show")) {
      // 如果是打赏控制台，就关闭打赏控制台
      consoleEl.classList.remove("reward-show");
    }
    // 获取center-console元素
    const centerConsole = document.getElementById("center-console");

    // 检查center-console是否被选中
    if (centerConsole.checked) {
      // 取消选中状态
      centerConsole.checked = false;
    }
  },
  // 取消加载动画
  hideLoading: function () {
    document.getElementById("loading-box").classList.add("loaded");
  },
  // 将音乐缓存播放
  cacheAndPlayMusic() {
    let data = localStorage.getItem("musicData");
    if (data) {
      data = JSON.parse(data);
      const currentTime = new Date().getTime();
      if (currentTime - data.timestamp < 24 * 60 * 60 * 1000) {
        // 如果缓存的数据没有过期，直接使用
        anzhiyu.playMusic(data.songs);
        return;
      }
    }

    // 否则重新从服务器获取数据
    fetch("/json/music.json")
      .then(response => response.json())
      .then(songs => {
        const cacheData = {
          timestamp: new Date().getTime(),
          songs: songs,
        };
        localStorage.setItem("musicData", JSON.stringify(cacheData));
        anzhiyu.playMusic(songs);
      });
  },
  // 播放音乐
  playMusic(songs) {
    const anMusicPage = document.getElementById("anMusic-page");
    const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];
    const allAudios = metingAplayer.list.audios;
    if (!selectRandomSong.includes(randomSong.name)) {
      // 如果随机到的歌曲已经未被随机到过，就添加进metingAplayer.list
      metingAplayer.list.add([randomSong]);
      // 播放最后一首(因为是添加到了最后)
      metingAplayer.list.switch(allAudios.length);
      // 添加到已被随机的歌曲列表
      selectRandomSong.push(randomSong.name);
    } else {
      // 随机到的歌曲已经在播放列表中了
      // 直接继续随机直到随机到没有随机过的歌曲，如果全部随机过了就切换到对应的歌曲播放即可
      let songFound = false;
      while (!songFound) {
        const newRandomIndex = Math.floor(Math.random() * songs.length);
        const newRandomSong = songs[newRandomIndex];
        if (!selectRandomSong.includes(newRandomSong.name)) {
          metingAplayer.list.add([newRandomSong]);
          metingAplayer.list.switch(allAudios.length);
          selectRandomSong.push(newRandomSong.name);
          songFound = true;
        }
        // 如果全部歌曲都已被随机过，跳出循环
        if (selectRandomSong.length === songs.length) {
          break;
        }
      }
      if (!songFound) {
        // 如果全部歌曲都已被随机过，切换到对应的歌曲播放
        const palyMusicIndex = allAudios.findIndex(song => song.name === randomSong.name);
        if (palyMusicIndex != -1) metingAplayer.list.switch(palyMusicIndex);
      }
    }

    console.info("已随机歌曲：", selectRandomSong, "本次随机歌曲：", randomSong.name);
  },
  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    const anMusicBg = document.getElementById("an_music_bg");

    if (isChangeBg) {
      // player listswitch 会进入此处
      const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
      musiccover && (anMusicBg.style.backgroundImage = musiccover.style.backgroundImage);
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(() => {
        const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
        // 确保player加载完成
        if (musiccover) {
          clearInterval(timer);
          // 绑定事件
          anzhiyu.addEventListenerMusic();
          // 确保第一次能够正确替换背景
          anzhiyu.changeMusicBg();

          // 暂停nav的音乐
          if (
            document.querySelector("#nav-music meting-js").aplayer &&
            !document.querySelector("#nav-music meting-js").aplayer.audio.paused
          ) {
            anzhiyu.musicToggle();
          }
        }
      }, 100);
    }
  },
  // 获取自定义播放列表
  getCustomPlayList: function (musicId = "3067156818", Server = "netease") {

    if (!document.querySelector('body[data-type="music"]')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const userId = musicId;
    const userServer = Server;
    const anMusicPageMeting = document.getElementById("anMusic-page-meting");
    if (urlParams.get("id") && urlParams.get("server")) {
      const id = urlParams.get("id");
      const server = urlParams.get("server");
      anMusicPageMeting.innerHTML = `<meting-js class="eo-music eoHide" id="${id}" server=${server} type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>`;
    } else {
      anMusicPageMeting.innerHTML = `<meting-js class="eo-music eoHide" id="${userId}" server="${userServer}" type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>`;
    }
    anzhiyu.changeMusicBg(false);
  },
  //隐藏今日推荐
  hideTodayCard: function () {
    if (document.getElementById("todayCard")) {
      document.getElementById("todayCard").classList.add("hide");
      const topGroup = document.querySelector(".topGroup");
      const recentPostItems = topGroup.querySelectorAll(".recent-post-item");
      recentPostItems.forEach(item => {
        item.style.display = "flex";
      });
    }
  },

  // 监听音乐背景改变
  addEventListenerMusic: function () {
    const anMusicPage = document.getElementById("anMusic-page");
    const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
    const anMusicBtnGetSong = anMusicPage.querySelector("#anMusicBtnGetSong");
    const anMusicRefreshBtn = anMusicPage.querySelector("#anMusicRefreshBtn");
    const anMusicSwitchingBtn = anMusicPage.querySelector("#anMusicSwitching");
    const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
    //初始化音量
    metingAplayer.volume(0.8, true);
    metingAplayer.on("loadeddata", function () {
      anzhiyu.changeMusicBg();
    });

    aplayerIconMenu.addEventListener("click", function () {
      const menu_mask = document.getElementById("menu-mask"),
        aplayer_list = anMusicPage.querySelector(".aplayer.aplayer-withlist .aplayer-list");
      if (menu_mask && aplayer_list) {
        menu_mask.style.display = "block";
        menu_mask.style.animation = "0.5s ease 0s 1 normal none running to_show";
        aplayer_list.style.opacity = "1";
      }
    });

    function anMusicPageMenuAask() {
      if (!document.querySelector('body[data-type="music"]')) {
        document.getElementById("menu-mask").removeEventListener("click", anMusicPageMenuAask);
        return;
      }
      document.getElementById("eo-music-list").classList.remove("eomusic-onoff"),
        anMusicPage.querySelector(".aplayer-list") && anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
    }

    document.getElementById("menu-mask").addEventListener("click", anMusicPageMenuAask);

    // 监听增加单曲按钮
    anMusicBtnGetSong.addEventListener("click", () => {
      if (changeMusicListFlag) {
        const anMusicPage = document.getElementById("anMusic-page");
        const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
        const allAudios = metingAplayer.list.audios;
        const randomIndex = Math.floor(Math.random() * allAudios.length);
        // 随机播放一首
        metingAplayer.list.switch(randomIndex);
      } else {
        anzhiyu.cacheAndPlayMusic();
      }
      // 黑胶唱片状态
      document.querySelector(".aplayer-button").classList.contains("aplayer-pause") ? document.querySelector(".naokuo-song-disc").classList.add("naokuo-play") : document.querySelector(".naokuo-song-disc").classList.remove("naokuo-play");
    });
    anMusicRefreshBtn.addEventListener("click", () => {
      localStorage.removeItem("musicData");
      anzhiyu.snackbarShow("已移除相关缓存歌曲");
    });
    anMusicSwitchingBtn.addEventListener("click", () => {
      anzhiyu.changeMusicList();
    });

    // 监听键盘事件
    //空格控制音乐
    document.addEventListener("keydown", function anMusicKeyDown(event) {
      if (!document.querySelector('body[data-type="music"]')) {
        document.removeEventListener("keydown", anMusicKeyDown);
        return;
      }
      //暂停开启音乐
      if (event.code === "Space") {
        event.preventDefault();
        metingAplayer.toggle();
      }
      //切换下一曲
      if (event.keyCode === 39) {
        event.preventDefault();
        metingAplayer.skipForward();
      }
      //切换上一曲
      if (event.keyCode === 37) {
        event.preventDefault();
        metingAplayer.skipBack();
      }
      //增加音量
      if (event.keyCode === 38) {
        if (musicVolume <= 1) {
          musicVolume += 0.1;
          metingAplayer.volume(musicVolume, true);
        }
      }
      //减小音量
      if (event.keyCode === 40) {
        if (musicVolume >= 0) {
          musicVolume += -0.1;
          metingAplayer.volume(musicVolume, true);
        }
      }
    });
  },
  // 切换歌单
  changeMusicList: async function () {
    const anMusicPage = document.getElementById("anMusic-page");
    const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
    const currentTime = new Date().getTime();
    const cacheData = JSON.parse(localStorage.getItem("musicData")) || { timestamp: 0 };
    let songs = [];

    if (changeMusicListFlag) {
      songs = defaultPlayMusicList;
    } else {
      // 保存当前默认播放列表，以使下次可以切换回来
      defaultPlayMusicList = metingAplayer.list.audios;
      // 如果缓存的数据没有过期，直接使用
      if (currentTime - cacheData.timestamp < 24 * 60 * 60 * 1000) {
        songs = cacheData.songs;
      } else {
        // 否则重新从服务器获取数据
        const response = await fetch("/json/music.json");
        songs = await response.json();
        cacheData.timestamp = currentTime;
        cacheData.songs = songs;
        localStorage.setItem("musicData", JSON.stringify(cacheData));
      }
    }

    // 清除当前播放列表并添加新的歌曲
    metingAplayer.list.clear();
    metingAplayer.list.add(songs);

    // 切换标志位
    changeMusicListFlag = !changeMusicListFlag;
  },
  // 控制台音乐列表监听
  addEventListenerConsoleMusicList: function () {
    const navMusic = document.getElementById("nav-music");
    if (!navMusic) return;
    navMusic.addEventListener("click", e => {
      const aplayerList = navMusic.querySelector(".aplayer-list");
      const listBtn = navMusic.querySelector(
        "div.aplayer-info > div.aplayer-controller > div.aplayer-time.aplayer-time-narrow > button.aplayer-icon.aplayer-icon-menu svg"
      );
      if (e.target != listBtn && aplayerList.classList.contains("aplayer-list-hide")) {
        aplayerList.classList.remove("aplayer-list-hide");
      }
    });
  },
  // 监听按键
  toPage: function () {
    var toPageText = document.getElementById("toPageText"),
      toPageButton = document.getElementById("toPageButton"),
      pageNumbers = document.querySelectorAll(".page-number"),
      lastPageNumber = Number(pageNumbers[pageNumbers.length - 1].innerHTML),
      pageNumber = Number(toPageText.value);

    if (!isNaN(pageNumber) && pageNumber >= 1 && Number.isInteger(pageNumber)) {
      var url = "/page/" + (pageNumber > lastPageNumber ? lastPageNumber : pageNumber) + "/";
      toPageButton.href = pageNumber === 1 ? "/" : url;
    } else {
      toPageButton.href = "javascript:void(0);";
    }
  },

  //删除多余的class
  removeBodyPaceClass: function () {
    document.body.className = "pace-done";
  },
  // 修改body的type类型以适配css
  setValueToBodyType: function () {
    const input = document.getElementById("page-type"); // 获取input元素
    const value = input.value; // 获取input的value值
    document.body.dataset.type = value; // 将value值赋值到body的type属性上
  },
  //匿名评论
  addRandomCommentInfo: function () {
    // 从形容词数组中随机取一个值
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    // 从蔬菜水果动物名字数组中随机取一个值
    const randomName = vegetablesAndFruits[Math.floor(Math.random() * vegetablesAndFruits.length)];

    // 将两个值组合成一个字符串
    const name = `${randomAdjective}${randomName}`;

    function dr_js_autofill_commentinfos() {
      var lauthor = [
        "#author",
        "input[name='comname']",
        "#inpName",
        "input[name='author']",
        "#ds-dialog-name",
        "#name",
        "input[name='nick']",
        "#comment_author",
      ],
        lmail = [
          "#mail",
          "#email",
          "input[name='commail']",
          "#inpEmail",
          "input[name='email']",
          "#ds-dialog-email",
          "input[name='mail']",
          "#comment_email",
        ],
        lurl = [
          "#url",
          "input[name='comurl']",
          "#inpHomePage",
          "#ds-dialog-url",
          "input[name='url']",
          "input[name='website']",
          "#website",
          "input[name='link']",
          "#comment_url",
        ];
      for (var i = 0; i < lauthor.length; i++) {
        var author = document.querySelector(lauthor[i]);
        if (author != null) {
          author.value = name;
          author.dispatchEvent(new Event("input"));
          author.dispatchEvent(new Event("change"));
          break;
        }
      }
      for (var j = 0; j < lmail.length; j++) {
        var mail = document.querySelector(lmail[j]);
        if (mail != null) {
          mail.value = visitorMail;
          mail.dispatchEvent(new Event("input"));
          mail.dispatchEvent(new Event("change"));
          break;
        }
      }
      return !1;
    }

    dr_js_autofill_commentinfos();
    var input = document.getElementsByClassName("el-textarea__inner")[0];
    input.focus();
    input.setSelectionRange(-1, -1);
  },

  // 跳转开往
  totraveling: function () {
    anzhiyu.snackbarShow(
      "即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性",
      element => {
        element.style.opacity = 0;
        travellingsTimer && clearTimeout(travellingsTimer);
      },
      5000,
      "取消"
    );
    travellingsTimer = setTimeout(function () {
      window.open("https://www.travellings.cn/go.html", "_blank");
    }, "5000");
  },

  // 工具函数替换字符串
  replaceAll: function (e, n, t) {
    return e.split(n).join(t);
  },

  // 音乐绑定事件
  musicBindEvent: function () {
    document.querySelector("#nav-music .aplayer-music").addEventListener("click", function () {
      anzhiyu.musicTelescopic();
    });
    document.querySelector("#nav-music .aplayer-button").addEventListener("click", function () {
      anzhiyu.musicToggle(false);
    });
  },

  // 判断是否是移动端
  hasMobile: function () {
    let isMobile = false;
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      ) ||
      document.body.clientWidth < 800
    ) {
      // 移动端
      isMobile = true;
    }
    return isMobile;
  },

  // 创建二维码
  qrcodeCreate: function () {
    if (document.getElementById("qrcode")) {
      document.getElementById("qrcode").innerHTML = "";
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 250,
        height: 250,
        colorDark: "#000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
  },

  // 判断是否在el内
  isInViewPortOfOne: function (el) {
    if (!el) return;
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const offsetTop = el.offsetTop;
    const scrollTop = document.documentElement.scrollTop;
    const top = offsetTop - scrollTop;
    return top <= viewPortHeight;
  },
  //添加赞赏蒙版
  addRewardMask: function () {
    if (!document.querySelector(".reward-main")) return;
    document.querySelector(".reward-main").style.display = "flex";
    document.querySelector(".reward-main").style.zIndex = "102";
    document.getElementById("quit-box").style.display = "flex";
  },
  // 移除赞赏蒙版
  removeRewardMask: function () {
    if (!document.querySelector(".reward-main")) return;
    document.querySelector(".reward-main").style.display = "none";
    document.getElementById("quit-box").style.display = "none";
  },

  keyboardToggle: function () {
    const isKeyboardOn = anzhiyu_keyboard;

    if (!isKeyboardOn) {
      const consoleKeyboard = document.querySelector("#consoleKeyboard");
      consoleKeyboard.classList.remove("on");
      anzhiyu_keyboard = true;
      saveToLocal.set("keyboardToggle", anzhiyu_keyboard, 2);
    } else {
      const consoleKeyboard = document.querySelector("#consoleKeyboard");
      consoleKeyboard.classList.add("on");
      anzhiyu_keyboard = null;
      localStorage.removeItem("keyboardToggle");
    }
  },
  rightMenuToggle: function () {
    if (window.oncontextmenu) {
      window.oncontextmenu = null;
    } else if (!window.oncontextmenu && oncontextmenuFunction) {
      window.oncontextmenu = oncontextmenuFunction;
    }
  },
  switchConsole: () => {
    // switch console
    const consoleEl = document.getElementById("console");
    if (consoleEl.classList.contains("show")) {
      consoleEl.classList.remove("show");
    } else {
      consoleEl.classList.add("show");
    }

    //初始化隐藏边栏
    const $htmlDom = document.documentElement.classList;
    $htmlDom.contains("hide-aside")
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on");

    const consoleKeyboard = document.querySelector("#consoleKeyboard");
    if (consoleKeyboard) {
      if (!saveToLocal.get("keyboardToggle")) {
        consoleKeyboard.classList.add("on");
      } else {
        consoleKeyboard.classList.remove("on");
      }
    }

    // 热评控制台按钮状态
    const consoleCommentBarrage = document.querySelector("#consoleCommentBarrage");
    if (consoleCommentBarrage) {
      if (saveToLocal.get("commentBarrageSwitch") !== "false") {
        consoleCommentBarrage.classList.add("on");
      } else {
        consoleCommentBarrage.classList.remove("on");
      }
    }

    // 音乐控制台按钮状态
    const consoleMusic = document.querySelector("#consoleMusic");
    if (consoleMusic) {
      if (!anzhiyu_musicPlaying) {
        consoleMusic.classList.remove("on");
      } else {
        consoleMusic.classList.add("on");
      }
    }
  },
  // 定义 intersectionObserver 函数，并接收两个可选参数
  intersectionObserver: function (enterCallback, leaveCallback) {
    let observer;
    return () => {
      if (!observer) {
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              enterCallback?.();
            } else {
              leaveCallback?.();
            }
          });
        });
      } else {
        // 如果 observer 对象已经存在，则先取消对之前元素的观察
        observer.disconnect();
      }
      return observer;
    };
  },
  // CategoryBar滚动
  scrollCategoryBarToRight: function () {
    // 获取需要操作的元素
    const items = document.getElementById("catalog-list");
    const nextButton = document.getElementById("category-bar-next");

    // 检查元素是否存在
    if (items && nextButton) {
      const itemsWidth = items.clientWidth;

      // 判断是否已经滚动到最右侧
      if (items.scrollLeft + items.clientWidth + 1 >= items.scrollWidth) {
        // 滚动到初始位置并更新按钮内容
        items.scroll({
          left: 0,
          behavior: "smooth",
        });
        nextButton.innerHTML = '<i class="naokuofont naokuo-icon-angle-double-right"></i>';
      } else {
        // 滚动到下一个视图
        items.scrollBy({
          left: itemsWidth,
          behavior: "smooth",
        });
      }
    } else {
      console.error("Element(s) not found: 'catalog-list' and/or 'category-bar-next'.");
    }
  },
  // 分类条
  categoriesBarActive: function () {
    const urlinfo = decodeURIComponent(window.location.pathname);
    const $categoryBar = document.getElementById("category-bar");
    if (!$categoryBar) return;

    if (urlinfo === "/") {
      $categoryBar.querySelector("#首页").classList.add("select");
    } else {
      const pattern = /\/categories\/.*?\//;
      const patbool = pattern.test(urlinfo);
      if (!patbool) return;

      const nowCategorie = urlinfo.split("/")[2];
      $categoryBar.querySelector(`#${nowCategorie}`).classList.add("select");
    }
  },
  topCategoriesBarScroll: function () {
    const $categoryBarItems = document.getElementById("category-bar-items");
    if (!$categoryBarItems) return;

    $categoryBarItems.addEventListener("mousewheel", function (e) {
      const v = -e.wheelDelta / 2;
      this.scrollLeft += v;
      e.preventDefault();
    });
  },
  // 切换菜单显示热评
  switchRightClickMenuHotReview: function () {
    const postComment = document.getElementById("post-comment");
    const menuCommentBarrageDom = document.getElementById("menu-commentBarrage");
    if (postComment) {
      menuCommentBarrageDom.style.display = "flex";
    } else {
      menuCommentBarrageDom.style.display = "none";
    }
  },
  // 切换作者卡片状态文字
  changeSayHelloText: function () {
    const greetings = GLOBAL_CONFIG.authorStatus.skills;

    const authorInfoSayHiElement = document.getElementById("author-info__sayhi");

    // 如果只有一个问候语，设置为默认值
    if (greetings.length === 1) {
      authorInfoSayHiElement.textContent = greetings[0];
      return;
    }

    let lastSayHello = authorInfoSayHiElement.textContent;

    let randomGreeting = lastSayHello;
    while (randomGreeting === lastSayHello) {
      randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    }
    authorInfoSayHiElement.textContent = randomGreeting;
  },
};

const anzhiyuPopupManager = {
  queue: [],
  processing: false,
  Jump: false,

  enqueuePopup(title, tip, url, duration = 3000) {
    this.queue.push({ title, tip, url, duration });
    if (!this.processing) {
      this.processQueue();
    }
  },

  processQueue() {
    if (this.queue.length > 0 && !this.processing) {
      this.processing = true;
      const { title, tip, url, duration } = this.queue.shift();
      this.popupShow(title, tip, url, duration);
    }
  },

  popupShow(title, tip, url, duration) {
    const popupWindow = document.getElementById("popup-window");
    if (!popupWindow) return;
    const windowTitle = popupWindow.querySelector(".popup-window-title");
    const windowContent = popupWindow.querySelector(".popup-window-content");
    const cookiesTip = windowContent.querySelector(".popup-tip");
    if (popupWindow.classList.contains("show-popup-window")) {
      popupWindow.classList.add("popup-hide");
    }

    // 等待上一个弹窗完全消失
    setTimeout(() => {
      // 移除之前的点击事件处理程序
      popupWindow.removeEventListener("click", this.clickEventHandler);
      if (url) {
        if (window.pjax) {
          this.clickEventHandler = event => {
            event.preventDefault();
            pjax.loadUrl(url);
            popupWindow.classList.remove("show-popup-window");
            popupWindow.classList.remove("popup-hide");
            this.Jump = true;

            // 处理队列中的下一个弹出窗口
            this.processing = false;
            this.processQueue();
          };

          popupWindow.addEventListener("click", this.clickEventHandler);
        } else {
          this.clickEventHandler = () => {
            window.location.href = url;
          };
          popupWindow.addEventListener("click", this.clickEventHandler);
        }
        if (popupWindow.classList.contains("no-url")) {
          popupWindow.classList.remove("no-url");
        }
      } else {
        if (!popupWindow.classList.contains("no-url")) {
          popupWindow.classList.add("no-url");
        }

        this.clickEventHandler = () => {
          popupWindow.classList.add("popup-hide");
          setTimeout(() => {
            popupWindow.classList.remove("popup-hide");
            popupWindow.classList.remove("show-popup-window");
          }, 1000);
        };
        popupWindow.addEventListener("click", this.clickEventHandler);
      }

      if (popupWindow.classList.contains("popup-hide")) {
        popupWindow.classList.remove("popup-hide");
      }
      popupWindow.classList.add("show-popup-window");
      windowTitle.textContent = title;
      cookiesTip.textContent = tip;
    }, 800);

    setTimeout(() => {
      if (url && !this.Jump) {
        this.Jump = false;
      }
      if (!popupWindow.classList.contains("popup-hide") && popupWindow.className != "") {
        popupWindow.classList.add("popup-hide");
      }

      // 处理队列中的下一个弹出窗口
      this.processing = false;
      this.processQueue();
    }, duration);
  },
};

const NaoKuo = {
  // 统计适配明暗模式
  switchPostChart: () => {
    // 这里为了统一颜色选取的是“明暗模式”下的两种字体颜色，也可以自己定义
    let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4C4948' : 'rgba(255,255,255,0.7)'
    if (document.getElementById('posts-chart') && postsOption) {
      try {
        let postsOptionNew = postsOption
        postsOptionNew.title.textStyle.color = color
        postsOptionNew.xAxis.nameTextStyle.color = color
        postsOptionNew.yAxis.nameTextStyle.color = color
        postsOptionNew.xAxis.axisLabel.color = color
        postsOptionNew.yAxis.axisLabel.color = color
        postsOptionNew.xAxis.axisLine.lineStyle.color = color
        postsOptionNew.yAxis.axisLine.lineStyle.color = color
        postsOptionNew.series[0].markLine.data[0].label.color = color
        postsChart.setOption(postsOptionNew)
      } catch (error) {
        console.log(error)
      }
    }
    if (document.getElementById('tags-chart') && tagsOption) {
      try {
        let tagsOptionNew = tagsOption
        tagsOptionNew.title.textStyle.color = color
        tagsOptionNew.xAxis.nameTextStyle.color = color
        tagsOptionNew.yAxis.nameTextStyle.color = color
        tagsOptionNew.xAxis.axisLabel.color = color
        tagsOptionNew.yAxis.axisLabel.color = color
        tagsOptionNew.xAxis.axisLine.lineStyle.color = color
        tagsOptionNew.yAxis.axisLine.lineStyle.color = color
        tagsOptionNew.series[0].markLine.data[0].label.color = color
        tagsChart.setOption(tagsOptionNew)
      } catch (error) {
        console.log(error)
      }
    }
    if (document.getElementById('categories-chart') && categoriesOption) {
      try {
        let categoriesOptionNew = categoriesOption
        categoriesOptionNew.title.textStyle.color = color
        categoriesOptionNew.legend.textStyle.color = color
        if (!categoryParentFlag) { categoriesOptionNew.series[0].label.color = color }
        categoriesChart.setOption(categoriesOptionNew)
      } catch (error) {
        console.log(error)
      }
    }
  },
  PostChartClick: () => {
    const $console_darkmode = document.querySelector('#console .darkmode_switchbutton');
    const $rightside_darkmode = document.querySelector('#rightside #darkmode');
    const $rightMenu_darkmode = document.querySelector('#rightMenu #menu-darkmode');
    $console_darkmode && anzhiyu.addEventListenerPjax($console_darkmode, "click", function () { setTimeout(NaoKuo.switchPostChart, 100) });
    $rightside_darkmode && anzhiyu.addEventListenerPjax($rightside_darkmode, "click", function () { setTimeout(NaoKuo.switchPostChart, 100) });
    $rightMenu_darkmode && anzhiyu.addEventListenerPjax($rightMenu_darkmode, "click", function () { setTimeout(NaoKuo.switchPostChart, 100) });
  },

  // 欢迎语
  setWelcome_info: async () => {
    if (!document.getElementById("welcome-info")) return;

    let ipLoacation = saveToLocal.get('welcome-info');

    try {
      if (!ipLoacation) {
        return new Promise((resolve, reject) => {
          var script = document.createElement('script');
          var url = `https://apis.map.qq.com/ws/location/v1/ip?key=AKBBZ-A5BKN-732F7-S477E-EA645-OGBJJ&output=jsonp`;
          script.src = url;

          window.QQmap = (data) => {
            if (data.status === 0) {
              // console.info(data);
              ipLoacation = data;
              saveToLocal.set('welcome-info', ipLoacation, 0.5);
              NaoKuo.showWelcome(ipLoacation);
              resolve();
            } else {
              reject(new Error('Failed to fetch location data'));
            }
            document.body.removeChild(script);
            delete window.QQmap;
          };
          document.body.appendChild(script);
        });
      } else {
        await Promise.resolve(); // 确保在同步代码路径上也能保持异步风格
        NaoKuo.showWelcome(ipLoacation);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  },
  //根据经纬度计算两点距离(点1经度,点1纬度,点2经度,点2纬度)
  getDistance: (e1, n1, e2, n2) => {
    const R = 6371
    const { sin, cos, asin, PI, hypot } = Math
    let getPoint = (e, n) => {
      e *= PI / 180
      n *= PI / 180
      return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
    }
    let a = getPoint(e1, n1)
    let b = getPoint(e2, n2)
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
    let r = asin(c / 2) * 2 * R
    return Math.round(r);
  },
  //根据国家、省份、城市信息自定义欢迎语
  showWelcome: (ipStore) => {
    const WelcomeInfo = document.getElementById("welcome-info"),
      IP = ipStore.result.ip || "未知";
    let dist = NaoKuo.getDistance(106.713478, 26.578343, ipStore.result.location.lng, ipStore.result.location.lat),
      address,
      welcome_info;
    //根据国家、省份、城市信息自定义欢迎语
    //海外地区不支持省份及城市信息
    switch (ipStore.result.ad_info.nation) {
      case "日本":
        welcome_info = "よろしく，一起去看樱花吗";
        break;
      case "美国":
        welcome_info = "Make America Great Again";
        break;
      case "英国":
        welcome_info = "想同你一起夜乘伦敦眼";
        break;
      case "俄罗斯":
        welcome_info = "干了这瓶伏特加";
        break;
      case "法国":
        welcome_info = "C'est La Vie";
        break;
      case "德国":
        welcome_info = "Die Zeit verging im Fluge";
        break;
      case "澳大利亚":
        welcome_info = "一起去大堡礁吧";
        break;
      case "加拿大":
        welcome_info = "拾起一片枫叶赠予你";
        break;
      case "中国":
        address = ipStore.result.ad_info.province + " " + ipStore.result.ad_info.city;
        switch (ipStore.result.ad_info.province) {
          case "北京市":
            address = "北京市";
            welcome_info = "北——京——欢迎你";
            break;
          case "天津市":
            address = "天津市";
            welcome_info = "讲段相声吧";
            break;
          case "重庆市":
            address = "重庆市";
            welcome_info = "高德地图:已到达重庆，下面交给百度地图导航"
            break;
          case "河北省":
            welcome_info = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山";
            break;
          case "山西省":
            welcome_info = "展开坐具长三尺，已占山河五百余";
            break;
          case "内蒙古自治区":
            welcome_info = "天苍苍，野茫茫，风吹草低见牛羊";
            break;
          case "辽宁省":
            welcome_info = "我想吃烤鸡架";
            break;
          case "吉林省":
            welcome_info = "状元阁就是东北烧烤之王";
            break;
          case "黑龙江省":
            welcome_info = "很喜欢哈尔滨大剧院";
            break;
          case "上海市":
            address = "上海市";
            welcome_info = "众所周知，中国只有两个城市";
            break;
          case "江苏省":
            switch (ipStore.result.ad_info.city) {
              case "南京市":
                welcome_info = "欢迎来自安徽省南京市的小伙伴";
                break;
              case "苏州市":
                welcome_info = "上有天堂，下有苏杭";
                break;
              case "泰州市":
                welcome_info = "这里也是我的故乡";
                break;
              default:
                welcome_info = "散装是必须要散装的";
                break;
            }
            break;
          case "浙江省":
            welcome_info = "东风渐绿西湖柳，雁已还人未南归";
            break;
          case "安徽省":
            welcome_info = "蚌埠住了，芜湖起飞";
            break;
          case "福建省":
            welcome_info = "井邑白云间，岩城远带山";
            break;
          case "江西省":
            welcome_info = "落霞与孤鹜齐飞，秋水共长天一色";
            break;
          case "山东省":
            welcome_info = "遥望齐州九点烟，一泓海水杯中泻";
            break;
          case "湖北省":
            welcome_info = "来碗热干面";
            break;
          case "湖南省":
            welcome_info = "74751，长沙斯塔克";
            break;
          case "广东省":
            welcome_info = "老板来两斤福建人";
            break;
          case "广西壮族自治区":
            welcome_info = "桂林山水甲天下";
            break;
          case "海南省":
            welcome_info = "朝观日出逐白浪，夕看云起收霞光";
            break;
          case "四川省":
            welcome_info = "康康川妹子";
            break;
          case "贵州省":
            welcome_info = "茅台，学生，再塞200";
            break;
          case "云南省":
            welcome_info = "玉龙飞舞云缠绕，万仞冰川直耸天";
            break;
          case "西藏自治区":
            welcome_info = "躺在茫茫草原上，仰望蓝天";
            break;
          case "陕西省":
            welcome_info = "来份臊子面加馍";
            break;
          case "甘肃省":
            welcome_info = "羌笛何须怨杨柳，春风不度玉门关";
            break;
          case "青海省":
            welcome_info = "牛肉干和老酸奶都好好吃";
            break;
          case "宁夏回族自治区":
            welcome_info = "大漠孤烟直，长河落日圆";
            break;
          case "新疆维吾尔自治区":
            welcome_info = "驼铃古道丝绸路，胡马犹闻唐汉风";
            break;
          case "台湾省":
            welcome_info = "我在这头，大陆在那头";
            break;
          case "香港特别行政区":
            address = "香港特别行政区";
            welcome_info = "永定贼有残留地鬼嚎，迎击光非岁玉";
            break;
          case "澳门特别行政区":
            address = "澳门特别行政区";
            welcome_info = "性感荷官，在线发牌";
            break;
          default:
            welcome_info = "带我去你的城市逛逛吧";
            break;
        }
        break;
      default:
        welcome_info = "带我去你的国家看看吧";
        break;
    }
    //判断时间
    let timeChange,
      date = new Date();
    if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>🌤️上午好，一日之计在于晨</span>";
    else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>☀️中午好，该摸鱼吃午饭了</span>";
    else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>🕞下午好，懒懒地睡个午觉吧</span>";
    else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>🍵三点几啦，饮茶先啦</span>";
    else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>🌇夕阳无限好，只是近黄昏</span>";
    else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>🌔晚上好，夜生活嗨起来</span>";
    else timeChange = "🌌夜深了，早点休息，少熬夜";

    //自定义文本需要放的位置
    WelcomeInfo && (WelcomeInfo.innerHTML = `🙋欢迎来自 <strong>${address}</strong> 的小伙伴<br>
    😊<strong>${welcome_info}</strong><br>
    🗺️您距离 <strong>Naokuo</strong> 约有 <strong>${dist}</strong> 公里！<br>
    当前IP地址为：<br>
    <strong style="font-size:12px;"><psw>${IP}</psw></strong><br>
    <strong>${timeChange}！</strong>`);

  },
  // 隐私协议信息
  setuserAgent: async () => {
    if (!document.querySelector('body[data-type="privacy"]')) return; //判断是否是隐私协议页面    
    try {
      let UserInfo = saveToLocal.get('welcome-info');
      if (!UserInfo) {
        return new Promise((resolve, reject) => {
          var script = document.createElement('script');
          var url = `https://apis.map.qq.com/ws/location/v1/ip?key=AKBBZ-A5BKN-732F7-S477E-EA645-OGBJJ&output=jsonp`;
          script.src = url;

          window.QQmap = (data) => {
            if (data.status === 0) {
              // console.info(data);
              UserInfo = data;
              saveToLocal.set('welcome-info', UserInfo, 0.5);
              setUserInfo();
              resolve();
            } else {
              reject(new Error('Failed to fetch location data'));
            }
            document.body.removeChild(script);
            delete window.QQmap;
          };
          document.body.appendChild(script);
        });
      } else {
        await Promise.resolve(); // 确保在同步代码路径上也能保持异步风格
        setUserInfo();
      }

      function setUserInfo() {
        const ua_Ip = document.getElementById("userAgentIp"),
          ua_City = document.getElementById("userAgentCity"),
          ua_Os = document.getElementById("userAgentOs");
        ua_Ip && (ua_Ip.innerText = UserInfo.result.ip);
        ua_City && (ua_City.innerText = UserInfo.result.ad_info.nation + UserInfo.result.ad_info.province + UserInfo.result.ad_info.city);
        ua_Os && (ua_Os.innerText = navigator.userAgent);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  },

  // 博客线路切换
  setNaokuo_Host: () => {
    const N_hostName = document.querySelector("#travellings_button #naokuo_qiehuan");

    if (N_hostName) {
      const yupathname = window.location.pathname,
        yuhostname = window.location.hostname;
      let yuurl;

      if (yuhostname == 'naokuo.top' || yuhostname == 'www.naokuo.top' || yuhostname == 'blog.naokuo.top') {
        yuurl = "https://myxiaochuang.gitee.io" + yupathname;
        N_hostName.href = yuurl;
      } else if (yuhostname == 'myxiaochuang.gitee.io') {
        yuurl = "https://naokuo.top" + yupathname;
        N_hostName.href = yuurl;
      }
    }
  },
  // 音乐歌单切换
  musicBtnClis: () => {
    document.getElementById("eo-music-list").classList.add("eomusic-onoff"),
      document.getElementById("menu-mask").style.display = "block",
      document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show"
  },
  musicListHide: () => {
    document.getElementById("eo-music-list").classList.remove("eomusic-onoff"),
      document.getElementById("menu-mask").style.cssText = "";
  },
  clocClass: () => {
    var e = document.querySelectorAll("#eo-music-list .eolistbg");
    if (!e) return;
    for (let t = 0; t < e.length; t++)
      e[t].classList.remove("playlistimgbg"),
        e[t].classList.remove("playimgbg")
  },
  musicListClick: (e, t, s) => {
    indexNex = indexNum,
      indexNum = s,
      NaoKuo.clocClass(),
      NaoKuo.musicListHide(),
      window.screen.width > 768 && (document.getElementById("eolistbg" + indexNum).classList.add("playlistimgbg"),
        document.getElementById("eolistbg" + indexNum).classList.add("playimgbg")),
      indexNum != indexNex && (document.getElementsByClassName("eo-music")[0].style.left = "-200%",
        document.getElementsByClassName("eo-music")[0].style.right = "0%",
        document.getElementsByClassName("eo-music")[0].style.opacity = 0,
        setTimeout((() => {
          document.getElementsByClassName("eo-music")[0].style.right = "-200%",
            document.getElementsByClassName("eo-music")[0].style.left = "0%",
            document.getElementsByClassName("eo-music")[0].style.opacity = 0;
          const s = document.querySelector("#anMusic-page .eo-music").aplayer;
          var n = `https://meting.naokuo.top/api?server=${t}&type=playlist&id=${e}`;
          s.list.clear(),
            fetch(n).then((e => e.json())).then((e => {
              s.list.add(e)
            }
            )).catch((e => console.error(e))),
            setTimeout((() => {
              document.getElementsByClassName("eo-music")[0].style.right = "0%",
                document.getElementsByClassName("eo-music")[0].style.left = "0%",
                document.getElementsByClassName("eo-music")[0].style.opacity = 1;
            }
            ), 200)
        }
        ), 600))
  },
  naoDarkButton: function (elementId, childSelector) {
    const willChangeMode = document.documentElement.getAttribute("data-theme");
    const element = document.getElementById(elementId);
    if (element && childSelector) {
      const childElement = element.querySelector(childSelector);
      childElement && childElement.addEventListener("click", () => {
        const isMode = element.getAttribute("button-theme") === "dark" ? "light" : "dark";
        element.setAttribute("button-theme", isMode);
      });
    }
    if (element && willChangeMode) {
      element.setAttribute("button-theme", willChangeMode);
    }
  },
  // 宠物挂件随机移动
  changeMarginLeft: function (element, parent) {
    const Width = document.querySelector(parent).offsetWidth - 240;
    var randomMargin = Math.floor(Math.random() * (Width - 100 + 1)) + 100; // 生成100-父元素之间的随机数
    element.style.marginLeft = randomMargin + 'px';
  },
  // 随机宠物挂件图片
  animalsRandomImage: function () {
    const element = document.getElementById('console_climb'),
      images = [
        'https://cdn.cbd.int/naokuo-blog-static@1.0.12/img/animals/kaluote.webp',
        'https://cdn.cbd.int/naokuo-blog-static@1.0.12/img/animals/keke.webp',
        'https://cdn.cbd.int/naokuo-blog-static@1.0.12/img/animals/nimo.webp',
        'https://cdn.cbd.int/naokuo-blog-static@1.0.12/img/animals/tugou.webp',
        'https://cdn.cbd.int/naokuo-blog-static@1.0.12/img/animals/wate.webp',
      ],
      randomIndex = Math.floor(Math.random() * images.length),
      randomImageUrl = images[randomIndex];

    if (element && randomImageUrl) {
      element.src = randomImageUrl;
    }
  },
  // 定义更新时钟显示的函数
  updateClock: function () {
    // 获取时钟显示容器
    const clockDisplay = document.getElementById('rightside-clock'),
    clockPeriod = document.getElementById('rightside-clock-period');
    // 获取当前时间
    const now = new Date();

    // 提取小时、分钟，并补零
    let hours = now.getHours();
    let period = null;
    if (hours > 12) {
      hours -= 12; // 将24小时制转换为12小时制
      period = 'PM';
    } else if (hours === 0) {
      hours = 12; // 0点应显示为12点
      period = 'AM';
    } else {
      period = 'AM';
    }
    hours = String(hours).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // 组合时间字符串并设置到页面上
    clockDisplay.textContent = `${hours}:${minutes}`;
    clockPeriod.textContent = `${period}`;
    // 每秒钟调用一次此函数以保持时间更新
    setTimeout(NaoKuo.updateClock, 1000);
  }
}
