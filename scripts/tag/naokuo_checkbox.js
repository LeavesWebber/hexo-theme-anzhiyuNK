'use strict';

function postCheckbox(args) {
  args = args.join(' ').split(',')
  var state = args[0].trim()
  var colour = ''
  var text = ''
  var checked = false
  if (args.length == 1) {
    text = (args[0] || '').trim()
  } else if (args.length == 2) {
    state.indexOf("v") > -1 && (colour += "checked ", checked = true),
      state.indexOf("+") > -1 && (colour += "plus checked ", checked = true),
      state.indexOf("-") > -1 && (colour += "minus checked ", checked = true),
      state.indexOf("x") > -1 && (colour += "times checked ", checked = true),
      state.indexOf("红色") > -1 && (colour += "red "),
      state.indexOf("黄色") > -1 && (colour += "yellow "),
      state.indexOf("绿色") > -1 && (colour += "green "),
      state.indexOf("青色") > -1 && (colour += "cyan "),
      state.indexOf("蓝色") > -1 && (colour += "blue "),
      state.indexOf("手写") > -1 && (colour += "handwriting "),
      state.indexOf("黑体") > -1 && (colour += "SimHei "),
      state.indexOf("宋体") > -1 && (colour += "SimSun "),
      state.indexOf("楷体") > -1 && (colour += "KaiTi "),
      state.indexOf("checked") > -1 && (checked = true),
      ""==colour&&(colour=state)
    text = (args[1] || '').trim()
  }
  if (text.length > 0) {
    return `<div class='checkbox ${colour}'><input type="checkbox" ${checked ? 'checked="checked"' : ''}/>
            ${hexo.render.renderSync({ text: text, engine: 'markdown' }).split('\n').join('')}
            </div>`
  }
}

function postRadio(args) {
  args = args.join(' ').split(',')
  var state = args[0].trim()
  var colour = ''
  var text = ''
  var checked = false
  if (args.length == 1) {
    text = (args[0] || '').trim()
  } else if (args.length == 2) {
    state.indexOf("v") > -1 && (colour += "checked ", checked = true),
      state.indexOf("红色") > -1 && (colour += "red "),
      state.indexOf("黄色") > -1 && (colour += "yellow "),
      state.indexOf("绿色") > -1 && (colour += "green "),
      state.indexOf("青色") > -1 && (colour += "cyan "),
      state.indexOf("蓝色") > -1 && (colour += "blue "),
      state.indexOf("手写") > -1 && (colour += "handwriting "),
      state.indexOf("黑体") > -1 && (colour += "SimHei "),
      state.indexOf("宋体") > -1 && (colour += "SimSun "),
      state.indexOf("楷体") > -1 && (colour += "KaiTi "),
      state.indexOf("checked") > -1 && (checked = true),
      ""==colour&&(colour=state)
    text = (args[1] || '').trim()
  }
  if (text.length > 0) {
    return `<div class='checkbox ${colour}'><input type="radio" ${checked ? 'checked="checked"' : ''}/>
            ${hexo.render.renderSync({ text: text, engine: 'markdown' }).split('\n').join('')}
            </div>`
  }
}
// {% checkbox text %}
// {% checkbox checked, text %}
// {% checkbox color checked, text %}
hexo.extend.tag.register('复选', postCheckbox);
// hexo.extend.tag.register('checkbox', postCheckbox);
hexo.extend.tag.register('单选', postRadio);