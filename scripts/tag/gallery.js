/**
 * AnZhiYu
 * galleryGroup and gallery
 * {% galleryGroup [name] [descr] [url] [img] %}
 * {% gallery [lazyload],[rowHeight],[limit] %}
 * {% gallery url,[url],[lazyload],[rowHeight],[limit] %}
 */

"use strict";

const urlFor = require("hexo-util").url_for.bind(hexo);

function gallery(args, content) {
  const { data, languages } = hexo.theme.i18n;
  args = args.join(" ").split(",");
  let rowHeight, limit, lazyload, type, dataStr, lazyloadBtn;

  if (args[0] === "url") {
    [type, dataStr, lazyload, rowHeight = 220, limit = 10, lazyloadBtn = false] = args; // url,[link],[lazyload],[rowHeight],[limit]
    rowHeight = rowHeight == "" ? 220 : rowHeight;
    limit = limit == "" ? 10 : limit;
    lazyloadBtn = lazyloadBtn == false ? false : lazyloadBtn;
  } else {
    [lazyload, rowHeight = 220, limit = 10, lazyloadBtn = false] = args; // [lazyload],[rowHeight],[limit]
    rowHeight = rowHeight == "" ? 220 : rowHeight;
    limit = limit == "" ? 10 : limit;
    lazyloadBtn = lazyloadBtn == false ? false : lazyloadBtn;

    const regex = /!\[(.*?)\]\(([^\s]*)\s*(?:["'](.*?)["']?)?\s*\)/g;
    let m;
    const arr = [];
    while ((m = regex.exec(content)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      arr.push({
        url: m[2],
        alt: m[1],
        title: m[3],
      });
    }

    dataStr = JSON.stringify(arr);
  }

  type = type ? " url" : " data";
  const lazyloadClass = lazyload === "true" ? "lazyload btn_album_detail_lazyload" : "";
  const pageImgLazyloadClass = lazyloadBtn == true ? "" : "page_img_lazyload ";
  let html = `<div class="gallery">
  <div class="fj-gallery ${
    pageImgLazyloadClass + lazyloadClass + type
  }" data-rowHeight="${rowHeight}" data-limit="${limit}">
    <span class="gallery-data">${dataStr}</span>
  </div><button class="gallery-load-more" style="${!lazyloadBtn ? "opacity:0" : ""}">
  <span>${data[languages[0]].load_more}</span>
  <i class="naokuofont naokuo-icon-arrow-down"></i>
  </button>`;

  return (html += `</div>`);
}

function galleryGroup(args) {
  const name = args[0];
  const descr = args[1];
  const url = urlFor(args[2]);
  const img = urlFor(args[3]);

  return `
  <figure class="gallery-group">
  <img class="gallery-group-img no-lightbox" src='${img}' alt="Group Image Gallery">
  <figcaption>
  <div class="gallery-group-name">${name}</div>
  <p>${descr}</p>
  <a href='${url}'></a>
  </figcaption>
  </figure>
  `;
}

hexo.extend.tag.register("相册", gallery, { ends: true });
hexo.extend.tag.register("图库", galleryGroup);
