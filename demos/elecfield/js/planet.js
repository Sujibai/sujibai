var planet=function(){
  var o={
    m:1,
    q:1,
    x:0,
    y:0,
    vx:0,
    vy:0,
    ax:0,
    ay:0,
  }

  o.show=function() {
    ctx.fillStyle="#333";
    ctx.fillRect(width+o.x*100,width+o.y*100,size,size)
  }


  return o
}
