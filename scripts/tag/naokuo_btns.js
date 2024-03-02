'use strict';

function postBtns(args, content) {
  let style = args.join(' ')
  let grid = ''
  style.indexOf("方") > -1 && (grid += "rounded "),
    style.indexOf("圆") > -1 && (grid += "circle "),
    style.indexOf("2格") > -1 && (grid += "grid2 "),
    style.indexOf("3格") > -1 && (grid += "grid3"),
    style.indexOf("4格") > -1 && (grid += "grid4 "),
    style.indexOf("5格") > -1 && (grid += "grid5 "),
    style.indexOf("居中") > -1 && (grid += "center "),
    style.indexOf("宽") > -1 && (grid += "wide "),
    style.indexOf("填充") > -1 && (grid += "fill "),
    style.indexOf("居中分散") > -1 && (grid += "around "),
    "" == grid && (grid = style)

  return `<div class="btns ${grid}">
            ${content}
          </div>`;
}

function postCell(args) {
  args = args.join(' ').split(',')
  let text = args[0] || ''
  let url = args[1] || ''
  text = text.trim()
  url = url.trim()
  if (url.length > 0) {
    url = "href='" + url + "'"
  }
  let icon = ''
  let img = 'https://unpkg.com/hexo-butterfly-tag-plugins-plus-chinese@latest/lib/assets/default.svg'
  if (args.length > 2) {
    if (args[2].indexOf(' naokuo-') > -1) {
      icon = args[2].trim()
    } else {
      img = args[2].trim()
    }
  }
  if (icon.length > 0) {
    return `<a class="button no-text-decoration" ${url} title='${text}'><i class='${icon}'></i>${text}</a>`;
  } else {
    return `<a class="button no-text-decoration" ${url} title='${text}'><img src='${img}'>${text}</a>`;
  }
}

hexo.extend.tag.register('按钮组', postBtns, { ends: true });
hexo.extend.tag.register('按钮', postCell);