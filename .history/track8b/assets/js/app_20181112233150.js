var self = window;
(function(self) {
  var canvas, ctx, piccanvas, picctx,
  // some config vars - for slow-motion lower the speed/damping, set clearScreenBetweenDraws to false if you want to 'draw', for powerful comps you can increase the canvas size cw/ch, set pw/ph to 200 or more, load in a larger image etc
    cw = 1400, ch = 600, pw = 250, ph = 250, damping=0.7,easeBackSteps=23,speed=30, clearScreenBetweenDraws=true, // default to false on IE10 
     //   imgsrc = 'https://i.imgur.com/SW2QCrt.jpg',
    
              imgsrc = 'https://i.imgur.com/SW2QCrt.jpg',
    
    // other vars
    offsetX = 120, offsetY = 10, cw2pw2 = cw/2 -pw/2, ch2ph2 = ch/2 -ph/2,
    ww = 100, wh = 100, img, picData, imgData, dummy, FPS = 60, fl = 250, md = false,
    pixels, mouseX = 0, mouseY = 0, Uint8ClampedArraySupported,
    iData,pData,iWidth,pWidth;

  function init() {
    if (window.Uint8ClampedArray) {
      Uint8ClampedArraySupported=true;
    }else{
      Uint8ClampedArraySupported=false;
    }
    addListeners();
    ww =window.innerWidth;// document.body.offsetWidth;
    wh = document.body.offsetHeight;
    console.log(ww,window.innerWidth,wh,window.innerHeight);
    offsetX=(ww/2 -cw/2);
    offsetY=(wh/2 -ch/2);
    if(offsetY<40){offsetY=40}
   // offsetX=10;offsetY=50;
    piccanvas = document.createElement('canvas');
    picctx = piccanvas.getContext('2d');
    piccanvas.width = pw;
    piccanvas.height = ph;
    img = new Image();
    img.crossOrigin = '';
    img.src = imgsrc;
    img.onload = imageOnLoad;

  }

  function imageOnLoad(a) {
    picctx.drawImage(img, 0, 0, pw, ph);
    picData = picctx.getImageData(0, 0, pw, ph);
    onPicReady();
  }

  function onPicReady() {
    createMainCanvas();
    imgData = ctx.createImageData(cw, ch);
    iData=imgData.data,pData=picData.data,iWidth=imgData.width,pWidth=picData.width;
     makeDataObject();
    if(Uint8ClampedArraySupported && clearScreenBetweenDraws){dummy = new Uint8ClampedArray(cw * ch * 4)}
    cw2pw2 = cw/2 -pw/2;
    ch2ph2 = ch/2 -ph/2,
    
    displayImageData();
  }

  function createMainCanvas() {
    var body = document.querySelector('body');
    canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    canvas.style.position = 'absolute';
    canvas.style.border = '1px solid #F5F3E8';
    canvas.style.top = offsetY + "px";
    canvas.style.left = offsetX + "px";
    ctx = canvas.getContext('2d');
    body.appendChild(canvas);
  }

  function displayImageData() {
////////////////
    if(Uint8ClampedArraySupported && clearScreenBetweenDraws){imgData.data.set(dummy);}
      var cnt = 0;
      for (var y = 0; y < pw; y++) {
        for (var x = 0; x < ph; x++) {
          var p = pixels[cnt];
          if (p.x > cw) {p.x -=cw ;}
          else if (p.x < 0) {p.x += cw;}
          if (p.y > ch) {p.y -= ch;}
          else if (p.y < 0) {p.y += ch;}

          if (!md) {
          var dx = p.ox - p.x;
          var dy = p.oy - p.y;
          if(Math.abs(dx)>1 || Math.abs(dy)>1){
          p.vx = dx / easeBackSteps; p.vy = dy / easeBackSteps;
                                    }else{p.vx = dx; p.vy = dy; }
          p.x += p.vx; p.y += p.vy;
          p.vx *= damping; p.vy *= damping;
        }else{
          var dx = mouseX - offsetX - cw2pw2 - p.x;
          var dy = mouseY - offsetY - ch2ph2 - p.y;
          if(dx==0 && dy==0){trace(cnt);dx=5;dy=5;}
          var acel = speed / (dx * dx + dy * dy);
          p.vx += (acel * dx); p.vy += (acel * dy);
          p.x += p.vx; p.y += p.vy;
          p.vx *= damping; p.vy *= damping;
        }
          var i = (p.ox + p.oy * pWidth) * 4;
          var scale = fl / (fl + p.z);
          var vx = Math.floor(cw2pw2 + p.x * scale);
          var vy = Math.floor(ch2ph2 + p.y * scale);
          if (vx > cw){vx -= cw;}
          else if (vx < 0){vx += cw;}
          if (vy > ch){vy -= ch;}
          else if (vy < 0){vy += ch;}
          var j = (vx + vy * iWidth) * 4;
          iData[j++] = pData[i++];
          iData[j++] = pData[i++];
          iData[j++] = pData[i++];
          iData[j] = pData[i];
          cnt++;
        }
      } // end x/y !md loop

    ctx.putImageData(imgData, 0, 0);
    requestAnimFrame(displayImageData);
  }

  function makeDataObject() {
    pixels = [];
    for (var y = 0; y < pw; y++) {
      for (var x = 0; x < ph; x++) {
        var obj = {};
        obj.x = x; obj.y = y;
        obj.ox = x; obj.oy = y;
        obj.z = 0;//Math.random()*10;
        obj.vx = 0; obj.vy = 0;
        obj.i = (x + y * pWidth) * 4;
        pixels.push(obj);
      }
    }
  }

  function trace(a) {console.log(a); }
  function onMouseDown(event) {event.preventDefault(); md = true; }
  function onMouseUp(event) {event.preventDefault(); md = false; }
  function onMouseMove(event) {event.preventDefault(); mouseX = event.clientX; mouseY = event.clientY; }
  function addListeners() {
    var touchEnabled = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    if (touchEnabled == true) {
      console.log("touchEnabled");
      document.addEventListener('touchmove', onTouchMove, false);
      document.addEventListener('touchstart', onMouseDown, false);
      document.addEventListener('touchend', onMouseUp, false);
    } else {
      console.log("mouseEnabled");
      document.addEventListener('mousemove', onMouseMove, false);
      document.addEventListener('mousedown', onMouseDown, false);
      document.addEventListener('mouseup', onMouseUp, false);
    }
  }

  function onTouchMove(event) {event.preventDefault(); var touch = event.touches[0]; mouseX = touch.clientX; mouseY = touch.clientY; }

  /*
   * Request new frame by Paul Irish.
   * 60 FPS.
   */
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / FPS);
    };
  })();
  window.addEventListener ? window.addEventListener('load', init, false) : window.onload = init;
})(self);