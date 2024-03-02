'use strict';

function postP(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  let ps = ''
  p0.indexOf("居中") > -1 && (ps += "center "),
    p0.indexOf("居左") > -1 && (ps += "left "),
    p0.indexOf("居右") > -1 && (ps += "right "),
    p0.indexOf("1") > -1 && (ps += "small "),
    p0.indexOf("2") > -1 && (ps += "h4 "),
    p0.indexOf("3") > -1 && (ps += "h3 "),
    p0.indexOf("4") > -1 && (ps += "h2 "),
    p0.indexOf("5") > -1 && (ps += "h1 "),
    p0.indexOf("6") > -1 && (ps += "large "),
    p0.indexOf("7") > -1 && (ps += "huge "),
    p0.indexOf("8") > -1 && (ps += "ultra "),
    p0.indexOf("红色") > -1 && (ps += "red "),
    p0.indexOf("黄色") > -1 && (ps += "yellow "),
    p0.indexOf("绿色") > -1 && (ps += "green "),
    p0.indexOf("青色") > -1 && (ps += "cyan "),
    p0.indexOf("蓝色") > -1 && (ps += "blue "),
    p0.indexOf("灰色") > -1 && (ps += "gray "),
    p0.indexOf("手写") > -1 && (ps += "handwriting "),
    p0.indexOf("黑体") > -1 && (ps += "SimHei "),
    p0.indexOf("宋体") > -1 && (ps += "SimSun "),
    p0.indexOf("楷体") > -1 && (ps += "KaiTi "),
    "" == ps && (ps = p0)

  return `<p class='p ${ps}'>${p1}</p>`
}

function postSpan(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  let ps = ''
  p0.indexOf("居中") > -1 && (ps += "center "),
    p0.indexOf("居左") > -1 && (ps += "left "),
    p0.indexOf("居右") > -1 && (ps += "right "),
    p0.indexOf("1") > -1 && (ps += "small "),
    p0.indexOf("2") > -1 && (ps += "h4 "),
    p0.indexOf("3") > -1 && (ps += "h3 "),
    p0.indexOf("4") > -1 && (ps += "h2 "),
    p0.indexOf("5") > -1 && (ps += "h1 "),
    p0.indexOf("6") > -1 && (ps += "large "),
    p0.indexOf("7") > -1 && (ps += "huge "),
    p0.indexOf("8") > -1 && (ps += "ultra "),
    p0.indexOf("红色") > -1 && (ps += "red "),
    p0.indexOf("黄色") > -1 && (ps += "yellow "),
    p0.indexOf("绿色") > -1 && (ps += "green "),
    p0.indexOf("青色") > -1 && (ps += "cyan "),
    p0.indexOf("蓝色") > -1 && (ps += "blue "),
    p0.indexOf("灰色") > -1 && (ps += "gray "),
    p0.indexOf("手写") > -1 && (ps += "handwriting "),
    p0.indexOf("黑体") > -1 && (ps += "SimHei "),
    p0.indexOf("宋体") > -1 && (ps += "SimSun "),
    p0.indexOf("楷体") > -1 && (ps += "KaiTi "),
    "" == ps && (ps = p0)

  return `<span class='p ${ps}'>${p1}</span>`
}

hexo.extend.tag.register('段', postP)
hexo.extend.tag.register('行', postSpan)
