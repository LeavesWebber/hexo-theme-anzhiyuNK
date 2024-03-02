// 'use strict'
//
// function poem (args, content) {
//   return `<div class="poem">${content}</div>`
// }
//
// hexo.extend.tag.register('poem', poem, { ends: true })

'use strict'

function poem(args, content) {
  args = args.join(' ').split(',')
  let p0 = args[0]
  let p1 = args[1] ? args[1] : ''
  let styl = ''
  if (args.length > 2) {
    if (args[2].trim() == "手写") {
      styl = 'handwriting'
    } else if (args[2].trim() == "黑体") {
      styl = 'SimHei'
    } else if (args[2].trim() == "楷体") {
      styl = 'SimSun'
    } else if (args[2].trim() == "宋体") {
      styl = 'KaiTi'
    }else {
      styl = args[2].trim()
    }
  }
  return `<div class='poem ${styl}'><div class='poem-title'>${p0}</div><div class='poem-author'>${p1}</div>${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div>`
}

hexo.extend.tag.register('诗词', poem, { ends: true });
