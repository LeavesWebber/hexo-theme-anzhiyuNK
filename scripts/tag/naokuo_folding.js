'use strict';

function postFolding(args, content) {
  args = args.join(' ').split(',');
  let style = ''
  let colour = args[0].trim()
  let title = ''
  if (args.length == 1) {
    title = args[0].trim()
  } else if (args.length == 2) {
    colour.indexOf("打开") > -1 && (style += "open "),
      colour.indexOf("红色") > -1 && (style += "red "),
      colour.indexOf("橙色") > -1 && (style += "orange "),
      colour.indexOf("黄色") > -1 && (style += "yellow "),
      colour.indexOf("绿色") > -1 && (style += "green "),
      colour.indexOf("青色") > -1 && (style += "cyan "),
      colour.indexOf("蓝色") > -1 && (style += "blue "),
      colour.indexOf("紫色") > -1 && (style += "purple "),
      "" == style && (style = colour)
    title = args[1].trim()
  }
  if (colour != undefined) {
    return `<details class="folding-tag" ${style}><summary> ${title} </summary>
              <div class='content'>
              ${hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')}
              </div>
            </details>`
  } else {
    return `<details class="folding-tag"><summary> ${title} </summary>
              <div class='content'>
              ${hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('')}
              </div>
            </details>`
  }

}

hexo.extend.tag.register('折叠', postFolding, { ends: true })