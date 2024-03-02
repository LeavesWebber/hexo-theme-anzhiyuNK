// 'use strict'
//
// function poem (args, content) {
//   return `<div class="tip"><b>${content}<b></div>`
// }
//
// {% tip %}default{% endtip %}
// {% tip info %}info{% endtip %}
// {% tip success %}success{% endtip %}
// {% tip error %}error{% endtip %}
// {% tip warning %}warning{% endtip %}
// {% tip bolt %}bolt{% endtip %}
// {% tip ban %}ban{% endtip %}
// {% tip home %}home{% endtip %}
// {% tip sync %}sync{% endtip %}
// {% tip cogs %}cogs{% endtip %}
// {% tip key %}key{% endtip %}
// {% tip bell %}bell{% endtip %}
// {% tip fa-atom %}自定义font awesome图标{% endtip %}

'use strict'

function tip (args, content) {
  args = args.join(' ').split(',')
  let tipclass = ''
  let tipanima = ''
  if (args.length == 1) {
    tipclass = args[0].trim()
    switch (tipclass) {
      case "信息":
        tipclass = 'info'
        break
      case "正确":
        tipclass = 'success'
        break
      case "错误":
        tipclass = 'error'
        break
      case "警告":
        tipclass = 'warning'
        break
      case "突然":
        tipclass = 'bolt'
        break
      case "禁止":
        tipclass = 'ban'
        break
      case "家":
        tipclass = 'home'
        break
      case "循环":
        tipclass = 'sync'
        break
      case "设置":
        tipclass = 'cogs'
        break
      case "钥匙":
        tipclass = 'key'
        break
      case "提醒":
        tipclass = 'bell'
        break
      default:
        break
    }    
  } else if (args.length == 2) {
    tipclass = args[0].trim()
    switch (tipclass) {
      case "信息":
        tipclass = 'info'
        break
      case "正确":
        tipclass = 'success'
        break
      case "错误":
        tipclass = 'error'
        break
      case "警告":
        tipclass = 'warning'
        break
      case "突然":
        tipclass = 'bolt'
        break
      case "禁止":
        tipclass = 'ban'
        break
      case "家":
        tipclass = 'home'
        break
      case "循环":
        tipclass = 'sync'
        break
      case "设置":
        tipclass = 'cogs'
        break
      case "钥匙":
        tipclass = 'key'
        break
      case "提醒":
        tipclass = 'bell'
        break
      default:
        break
    }
    tipanima = args[1].trim()
  }

  return `<div class="tip ${tipclass} ${tipanima}">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div>`
}

hexo.extend.tag.register('上标',tip, { ends: true })
