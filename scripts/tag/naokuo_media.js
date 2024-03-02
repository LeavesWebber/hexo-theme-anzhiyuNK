'use strict';

function postAudio(args) {
  let src = args[0].trim()
  return `<div class="audio"><audio controls preload><source src='${src}' type='audio/mp3'>Your browser does not support the audio tag.</audio></div>`;
}

function postVideo(args) {
  let src = args[0].trim()
  return `<div class="video"><video controls preload="none" poster="/img/default_cover.webp"><source src='${src}' type='video/mp4'>Your browser does not support the video tag.</video></div>`;
}

function postVideos(args, content) {
  args = args.join(' ').split(',')
  var cls = args[0]
  if (cls.length > 0) {
    cls = ' ' + cls
  }
  var col = Number(args[1]) || 0;
  if (col > 0) {
    return `<div class="videos${cls}" col='${col}'>${content}</div>`
  } else {
    return `<div class="videos${cls}">${content}</div>`
  }
}

hexo.extend.tag.register('音频', postAudio);
hexo.extend.tag.register('视频', postVideo);
hexo.extend.tag.register('视频组', postVideos, {ends: true});
