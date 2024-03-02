'use strict';
function postprogress(args) {
  args = args.join(',').split(',')
  if (args.length > 1) {
    let pwidth = args[0].trim()
    let pcolor = args[1].trim()
    switch (pcolor) {
      case "红色":
        pcolor = 'red'
        break
      case "黄色":
        pcolor = 'yellow'
        break
      case "绿色":
        pcolor = 'green'
        break
      case "青色":
        pcolor = 'cyan'
        break
      case "蓝色":
        pcolor = 'blue'
        break
      case "灰色":
        pcolor = 'gray'
        break
      default:
        break
    }
    let text = args[2].trim()
    return `<div class="progress"><div class="progress-bar-animated progress-bar progress-bar-striped bg-${pcolor}"  style="width: ${pwidth}%" aria-valuenow="${pwidth}" aria-valuemin="0" aria-valuemax="100">${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</div></div>`;
  }
}
hexo.extend.tag.register('进度条', postprogress);
