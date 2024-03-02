'use strict';

const { escapeDiacritic } = require('hexo-util');

function echartsMaps(args, content) {
  args = args.join(' ').split(',');
  const Id = Math.random().toString(36).substring(2, 8),
    Width = args[0] ? args[0] : '100%',
    Height = args[1] ? args[1] : '400',
    Mode = args[2] ? args[2] : 'null',
    Renderer = args[3] ? args[3] : 'svg';
  // 布局
  let result = '';
  if (Width == 'diy') {
    result += `${escapeDiacritic(content)}`;
  } else {
    result += `<div id="echarts_${Id}" style="width:${Width};height:${Height}px;padding:20px;border-radius:12px;"></div>`;
    result += `<p>`;
    result += `  <script defer data-pjax>`;
    result += `    "use strict";`;    
    result += `    !function () {`;
    result += `      const GetID = document.getElementById("echarts_${Id}");`;
    result += `      function naokuo_lazyLoad() {`;
    result += `        var myChart = echarts.init(GetID,${Mode}, { renderer: '${Renderer}' });`;
    result += `        var option;`;
    result += `        ${escapeDiacritic(content)}`;
    result += `        option && myChart.setOption(option);`;
    result += `        naokuo.resizeObserver(myChart.resize,GetID,2500);`;
    result += `      };`;
    result += `      naokuo.intersectionObserver(naokuo_lazyLoad, GetID);`;
    result += `    }();`;
    result += `  </script>`;
    result += `</p>`;
  }
  return result;
}

hexo.extend.tag.register('图表', echartsMaps, { ends: true });