'use strict'

function bubble (args) {
  args = args.join(' ').split(',')
  const content = args[0]
  const notation = args[1]
  const color = args[2] ? args[2] : '#71a4e3'

  return `<span class="bubble-content">${content}</span><span class="bubble-notation"><span class="bubble-item" style="background-color:${color};">${notation}</span>`
}

hexo.extend.tag.register('气泡注释', bubble, { ends: false })
