'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

hexo.extend.filter.register('after_generate', function (locals) {
  // 首先获取整体的配置项名称
  const config = hexo.config.tag_echarts || hexo.theme.config.tag_echarts
  // 如果配置开启
  if (!(config && config.enable)) return
  // 集体声明配置项
  const data = {
    echartsCDN: config.CDN.tag_echarts_js ? urlFor(config.CDN.tag_echarts_js) : 'https://npm.elemecdn.com/echarts@5.4.3/dist/echarts.min.js',
    lazyloadCDN: config.CDN.echarts_lazyload_js ? urlFor(config.CDN.echarts_lazyload_js) : 'https://unpkg.com/naokuo-blog@1.0.17/js/naokuo_package.js'
  }
  //cdn资源声明
  //head引入资源
  const echarts_js = `<script src="${data.echartsCDN}"></script><script src="${data.lazyloadCDN}"></script>`
  // 注入脚本资源
  if (data.echartsCDN) {
    // hexo.extend.injector.register('head_begin', echarts_js, "default")
    hexo.extend.injector.register('head_begin', echarts_js, "default")
  }

},
  hexo.extend.helper.register('priority', function () {
    // 过滤器优先级，priority 值越低，过滤器会越早执行，默认priority是10
    const pre_priority = hexo.config.tag_echarts.priority ? hexo.config.tag_echarts.priority : hexo.theme.config.tag_echarts.priority
    const priority = pre_priority ? pre_priority : 10
    return priority
  })
)