var canvas, delta = [0, 0],
  stage = [window.screenX, window.screenY, window.innerWidth, window.innerHeight];
getBrowserDimensions();
var theme, worldAABB, world, bodies, elements, text, mouseJoint, themes = [
  [" #10222B", "#95AB63", "#BDD684", "#E2F0D6", "#F6FFE0"],
  ["#362C2A", "#732420", "#BF734C", "#FAD9A0", "#736859"],
  ["#0D1114", "#102C2E", "#695F4C", "#EBBC5E", "#FFFBB8"],
  ["#2E2F38", "#FFD63E", "#FFB54B", "#E88638", "#8A221C"],
  ["#121212", "#E6F2DA", "#C9F24B", "#4D7B85", "#23383D"],
  ["#343F40", "#736751", "#F2D7B6", "#BFAC95", "#8C3F3F"],
  ["#000000", "#2D2B2A", "#561812", "#B81111", "#FFFFFF"],
  ["#333B3A", "#B4BD51", "#543B38", "#61594D", "#B8925A"]
],
  iterations = 1,
  timeStep = 1 / 15,
  walls = [],
  wall_thickness = 200,
  wallsSetted = !1,
  createMode = !1,
  destroyMode = !1,
  isMouseDown = !1,
  mouse = {
    x: 0,
    y: 0
  },
  gravity = {
    x: 0,
    y: 1
  },
  PI2 = 2 * Math.PI,
  timeOfLastTouch = 0;

function init() {
  canvas = document.getElementById("canvas"), document.onmousedown = onDocumentMouseDown, document.onmouseup = onDocumentMouseUp, document.onmousemove = onDocumentMouseMove, document.ondblclick = onDocumentDoubleClick, document.addEventListener("touchstart", onDocumentTouchStart, !1), document.addEventListener("touchmove", onDocumentTouchMove, !1), document.addEventListener("touchend", onDocumentTouchEnd, !1), window.addEventListener("deviceorientation", onWindowDeviceOrientation, !1), (worldAABB = new b2AABB)
    .minVertex.Set(-200, -200), worldAABB.maxVertex.Set(window.innerWidth + 200, window.innerHeight + 200), world = new b2World(worldAABB, new b2Vec2(0, 0), !0), setWalls(), reset()
}

function play() {
  setInterval(loop, 25)
}

function reset() {
  var i;
  if (bodies)
    for (i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      canvas.removeChild(body.GetUserData()
        .element), world.DestroyBody(body), body = null
    }
  for (theme = themes[Math.random() * themes.length >> 0], document.body.style.backgroundColor = theme[0], bodies = [], elements = [], createInstructions(), i = 0; i < 10; i++) createBall()
}

function onDocumentMouseDown() {
  return isMouseDown = !0, !1
}

function onDocumentMouseUp() {
  return isMouseDown = !1, !1
}

function onDocumentMouseMove(event) {
  mouse.x = event.clientX, mouse.y = event.clientY
}

function onDocumentDoubleClick() {
  reset()
}

function onDocumentTouchStart(event) {
  if (1 == event.touches.length) {
    event.preventDefault();
    var now = (new Date)
      .getTime();
    if (now - timeOfLastTouch < 250) return void reset();
    timeOfLastTouch = now, mouse.x = event.touches[0].pageX, mouse.y = event.touches[0].pageY, isMouseDown = !0
  }
}

function onDocumentTouchMove(event) {
  1 == event.touches.length && (event.preventDefault(), mouse.x = event.touches[0].pageX, mouse.y = event.touches[0].pageY)
}

function onDocumentTouchEnd(event) {
  0 == event.touches.length && (event.preventDefault(), isMouseDown = !1)
}

function onWindowDeviceOrientation(event) {
  event.beta && (gravity.x = Math.sin(event.gamma * Math.PI / 180), gravity.y = Math.sin(Math.PI / 4 + event.beta * Math.PI / 180))
}

function createInstructions() {
  var element = document.createElement("div");
  element.width = 250, element.height = 250, element.style.position = "absolute", element.style.left = "-200px", element.style.top = "-200px", element.style.cursor = "default", canvas.appendChild(element), elements.push(element), (circle = document.createElement("canvas"))
    .width = 250, circle.height = 250;
  var graphics = circle.getContext("2d");
  graphics.fillStyle = theme[3], graphics.beginPath(), graphics.arc(125, 125, 125, 0, PI2, !0), graphics.closePath(), graphics.fill(), element.appendChild(circle), (text = document.createElement("div")).onSelectStart = null;
  var flinks = saveToLocal.get('flinkLogos');
  if (!flinks) {
    const flinkLogos = window.friend_link_list.flatMap(item => { return item.avatar });
    // 使用filter()方法创建一个不包含目标字符的新数组
    const imgLogos = flinkLogos.filter(word => !word.includes('guoqi'));
    flinks = imgLogos;
    saveToLocal.set('flinkLogos', imgLogos, 1);
  }
  text.innerHTML = '<span class="gdtx" style="color:' + theme[0] + '"><img src=' + flinks[Math.floor(Math.random() * flinks.length)] + "></img></span>", text.style.color = theme[1], text.style.position = "absolute", text.style.left = "0px", text.style.top = "0px", text.style.fontFamily = "Georgia", text.style.textAlign = "center", element.appendChild(text), text.style.left = (250 - text.clientWidth) / 2 + "px", text.style.top = (250 - text.clientHeight) / 2 + "px";
  var circle, b2body = new b2BodyDef;
  (circle = new b2CircleDef)
    .radius = 125, circle.density = 1, circle.friction = .3, circle.restitution = .3, b2body.AddShape(circle), b2body.userData = {
      element: element
    }, b2body.position.Set(Math.random() * stage[2], -200 * Math.random()), b2body.linearVelocity.Set(400 * Math.random() - 200, 400 * Math.random() - 200), bodies.push(world.CreateBody(b2body))
}

function createBall(x, y) {
  x = x || Math.random() * stage[2], y = y || -200 * Math.random();
  var size = 20 + (100 * Math.random() >> 0),
    element = document.createElement("canvas");
  element.width = size, element.height = size, element.style.position = "absolute", element.style.left = "-200px", element.style.top = "-200px", element.style.WebkitTransform = "translateZ(0)", element.style.MozTransform = "translateZ(0)", element.style.OTransform = "translateZ(0)", element.style.msTransform = "translateZ(0)", element.style.transform = "translateZ(0)";
  for (var graphics = element.getContext("2d"), num_circles = 10 * Math.random() >> 0, i = size; i > 0; i -= size / num_circles) graphics.fillStyle = theme[1 + (4 * Math.random() >> 0)], graphics.beginPath(), graphics.arc(.5 * size, .5 * size, .5 * i, 0, PI2, !0), graphics.closePath(), graphics.fill();
  canvas.appendChild(element), elements.push(element);
  var b2body = new b2BodyDef,
    circle = new b2CircleDef;
  circle.radius = size >> 1, circle.density = 1, circle.friction = .3, circle.restitution = .3, b2body.AddShape(circle), b2body.userData = {
    element: element
  }, b2body.position.Set(x, y), b2body.linearVelocity.Set(400 * Math.random() - 200, 400 * Math.random() - 200), bodies.push(world.CreateBody(b2body))
}

function loop() {
  for (getBrowserDimensions() && setWalls(), delta[0] += .5 * (0 - delta[0]), delta[1] += .5 * (0 - delta[1]), world.m_gravity.x = 350 * gravity.x + delta[0], world.m_gravity.y = 350 * gravity.y + delta[1], mouseDrag(), world.Step(timeStep, iterations), i = 0; i < bodies.length; i++) {
    var body = bodies[i],
      element = elements[i];
    if (element.style.left = body.m_position0.x - (element.width >> 1) + "px", element.style.top = body.m_position0.y - (element.height >> 1) + "px", "DIV" == element.tagName) {
      var style = "rotate(" + 57.2957795 * body.m_rotation0 + "deg) translateZ(0)";
      text.style.WebkitTransform = style, text.style.MozTransform = style, text.style.OTransform = style, text.style.msTransform = style, text.style.transform = style
    }
  }
}

function createBox(world, x, y, width, height, fixed) {
  void 0 === fixed && (fixed = !0);
  var boxSd = new b2BoxDef;
  fixed || (boxSd.density = 1), boxSd.extents.Set(width, height);
  var boxBd = new b2BodyDef;
  return boxBd.AddShape(boxSd), boxBd.position.Set(x, y), world.CreateBody(boxBd)
}

function mouseDrag() {
  if (createMode) createBall(mouse.x, mouse.y);
  else if (isMouseDown && !mouseJoint) {
    var body = getBodyAtMouse();
    if (body) {
      var md = new b2MouseJointDef;
      md.body1 = world.m_groundBody, md.body2 = body, md.target.Set(mouse.x, mouse.y), md.maxForce = 3e4 * body.m_mass, mouseJoint = world.CreateJoint(md), body.WakeUp()
    } else createMode = !0
  }
  if (isMouseDown || (createMode = !1, destroyMode = !1, mouseJoint && (world.DestroyJoint(mouseJoint), mouseJoint = null)), mouseJoint) {
    var p2 = new b2Vec2(mouse.x, mouse.y);
    mouseJoint.SetTarget(p2)
  }
}

function getBodyAtMouse() {
  var mousePVec = new b2Vec2;
  mousePVec.Set(mouse.x, mouse.y);
  var aabb = new b2AABB;
  aabb.minVertex.Set(mouse.x - 1, mouse.y - 1), aabb.maxVertex.Set(mouse.x + 1, mouse.y + 1);
  for (var shapes = new Array, count = world.Query(aabb, shapes, 10), body = null, i = 0; i < count; ++i)
    if (0 == shapes[i].m_body.IsStatic() && shapes[i].TestPoint(mousePVec)) {
      body = shapes[i].m_body;
      break
    } return body
}

function setWalls() {
  wallsSetted && (world.DestroyBody(walls[0]), world.DestroyBody(walls[1]), world.DestroyBody(walls[2]), world.DestroyBody(walls[3]), walls[0] = null, walls[1] = null, walls[2] = null, walls[3] = null), walls[0] = createBox(world, stage[2] / 2, -wall_thickness, stage[2], wall_thickness), walls[1] = createBox(world, stage[2] / 2, stage[3] + wall_thickness, stage[2], wall_thickness), walls[2] = createBox(world, -wall_thickness, stage[3] / 2, wall_thickness, stage[3]), walls[3] = createBox(world, stage[2] + wall_thickness, stage[3] / 2, wall_thickness, stage[3]), wallsSetted = !0
}

function getBrowserDimensions() {
  var changed = !1;
  return stage[0] != window.screenX && (delta[0] = 50 * (window.screenX - stage[0]), stage[0] = window.screenX, changed = !0), stage[1] != window.screenY && (delta[1] = 50 * (window.screenY - stage[1]), stage[1] = window.screenY, changed = !0), stage[2] != window.innerWidth && (stage[2] = window.innerWidth, changed = !0), stage[3] != window.innerHeight && (stage[3] = window.innerHeight, changed = !0), changed
}
init(), play();