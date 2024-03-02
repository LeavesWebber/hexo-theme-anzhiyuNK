/**
 * image.js v4 | https://volantis.js.org
 */

'use strict';

// {% image url %}
// {% image url, alt=haha %}
// {% image url, width=50% %}
// {% image url, height=32px %}
// {% image url, bg=#eee %}
// {% image url, alt=haha, width=400px %}
// {% image url, alt=haha, width=400px, bg=#eee %}
function imaGe(args) {
  args = args.join(' ').split(', ');
  let url = args[0].trim();
  let alt = '';
  let bg = '';
  let style = '';
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      let tmp = args[i].trim();
      if (tmp.includes('描述=')) {
        alt = tmp.substring(3, tmp.length);
      } else if (tmp.includes('宽=')) {
        style += 'width:' + tmp.substring(2, tmp.length) + ';';
      } else if (tmp.includes('高=')) {
        style += 'height:' + tmp.substring(2, tmp.length) + ';';
      } else if (tmp.includes('背景=')) {
        bg = tmp.substring(3, tmp.length);
      } else if (tmp.includes('alt=')) {
        alt = tmp.substring(4, tmp.length);
      } else if (tmp.includes('width=')) {
        style += 'width:' + tmp.substring(6, tmp.length) + ';';
      } else if (tmp.includes('height=')) {
        style += 'height:' + tmp.substring(7, tmp.length) + ';';
      } else if (tmp.includes('bg=')) {
        bg = tmp.substring(3, tmp.length);
      }
    }
  }
  function img(url, alt, style) {
    let img = '';
    img += '<img class="img" src="' + url + '"';
    if (alt.length > 0) {
      img += ' alt="' + alt + '"';
    }
    if (style.length > 0) {
      img += ' style="' + style + '"';
    }
    img += '/>';
    return img;
  }

  let ret = '';
  // wrap
  ret += '<div class="img-wrap">';
  // bg
  ret += '<div class="img-bg"';
  if (bg.length > 0) {
    ret += ' style="background:' + bg + '"';
  }
  ret += '>';
  ret += img(url, alt, style);
  ret += '<div class="img-alt is-center">' + alt + '</div>'
  ret += '</div>';

  if (alt.length > 0) {
    ret += '<span class="image-caption">' + alt + '</span>';
  }

  ret += '</div>';
  return ret;
}

hexo.extend.tag.register('图片', imaGe);


// {% inlineimage url %}
// {% inlineimage url, height=22px %}
function inlineImage(args) {
  args = args.join(' ').split(', ');
  let url = args[0].trim();
  let ret = '';
  ret += '<img no-lazy class="inline" src="' + url + '"';
  let style = '';
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      let tmp = args[i].trim();
      if (tmp.includes('高=')) {
        style += 'height:' + tmp.substring(2, tmp.length) + ';';
      } else if (tmp.includes('height=')) {
        style += 'height:' + tmp.substring(7, tmp.length) + ';';
      }
    }
  }
  if (style.length > 0) {
    ret += ' style="' + style + '"';
  } else {
    ret += ' style="height:1.5em"';
  }
  ret += '/>';
  return ret;
}

hexo.extend.tag.register('行内图', inlineImage);
