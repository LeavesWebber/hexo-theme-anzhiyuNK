'use strict';

function postU(args) {
  return `<u>${args.join(' ')}</u>`;
}
function postEmp(args) {
  return `<emp>${args.join(' ')}</emp>`;
}
function postWavy(args) {
  return `<wavy>${args.join(' ')}</wavy>`;
}
function postDel(args) {
  return `<del>${args.join(' ')}</del>`;
}
function postKbd(args) {
  return `<kbd>${args.join(' ')}</kbd>`;
}
function postPsw(args) {
  return `<psw>${args.join(' ')}</psw>`;
}

hexo.extend.tag.register('下划线', postU);
hexo.extend.tag.register('着重号', postEmp);
hexo.extend.tag.register('波浪线', postWavy);
hexo.extend.tag.register('删除线', postDel);
hexo.extend.tag.register('键盘', postKbd);
hexo.extend.tag.register('密码', postPsw);