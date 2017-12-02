var planet=function(){
  var o={
    m:1,
    x:0,
    y:0,
    vx:0,
    vy:0,
    ax:0,
    ay:0,
    size:5,
  }

  o.show=function() {
    ctx.fillStyle="#333";
    // ctx.fillRect(width+o.x*100,width+o.y*100,o.size,o.size)
    ctx.beginPath();
    ctx.arc(width+o.x*100,width+o.y*100,2+o.m*2,0,2*Math.PI)
    ctx.fill()
    ctx.closePath();
    ctx.fillRect(o.x*100,width+o.y*100,1,1)
  }


  return o
}
