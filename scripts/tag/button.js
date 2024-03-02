/**
 * Button
 * {% btn url text icon option %}
 * option: color outline center block larger
 * color : default/blue/pink/red/purple/orange/green
 */

"use strict";

const urlFor = require("hexo-util").url_for.bind(hexo);

function btn(args) {
  args = args.join(" ").split(",");
  let url = args[0] || "";
  let text = args[1] || "";
  let icon = args[2] || "";
  let option = args[3] || "";
  let type = args[4] || "";

  url = url.trim();
  text = text.trim();
  icon = icon.trim();
  option = option.trim();
  type = type.trim();

  return `<a class="btn-anzhiyu ${option}" href="${urlFor(url)}" 
  title="${text}" ${type.length ? `data-pjax-state data-fancybox data-type="${type}"` : ""}>${icon.length ? `<i class="${icon}"></i>` : ""}${text.length ? `<span>${text}</span>` : ""}</a>`;
}

hexo.extend.tag.register("按键", btn, { ends: false });