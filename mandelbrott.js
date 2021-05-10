var xmin = -2, ymin = -2, scale = 50;
var x, y, i, xt;
var cx, cy;
var pallette = [];
function start(){
  set.start();
  mandel();
}
var set = {
  canvas : document.createElement("canvas"),
  start : function(){
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.canvas.addEventListener("mousedown",zoom,false);
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }
};

function zoom(event){
  xmin = xmin + Math.floor(event.pageX / 4) / scale;
  ymin = -Math.floor(event.pageY / 4) / scale + 200 / scale + ymin;
  console.log(ymin);
  console.log(xmin);
  scale = scale * 2;
  mandel();
}

function mandel(){
  for(x = 0; x < 256; x++) {
    if(x < 85) {
      r = x * 3;
      g = 0;
      b = 0;
    }
    if(x > 84 && x < 171) {
      r = 0;
      g = 3 * (x - 84);
      b = 0;
    }
    if(x > 170){
      r = 0;
      g = 0;
      b = 3 * (x - 170);
    }
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    pallette[x] = "#" + r + g + b;
  }
  for(var x = 0; x < 200; x++) {
    for(var y = 0; y < 200; y++) {
      var i = 0;
      var cx = xmin + x / scale;
      var cy = ymin + y / scale;
      var zx = 0;
      var zy = 0;
      do{
        var xt = zx * zy;
        zx = zx * zx - zy * zy + cx;
        zy = 2 * xt + cy;
        i++;
      } while (i < 255 && (zx * zx + zy * zy) < 4);
      
      var color = i.toString(16);
      
      set.context.beginPath();
      set.context.rect(x * 4, 800 - y * 4, 4, 4);
      set.context.fillStyle = pallette[i];
      set.context.fill();
    }
  }
}