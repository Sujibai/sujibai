var planet=function(){
  var o={
    m:1,
    x:0,
    y:0,
    vx:0,
    vy:0,
    ax:0,
    ay:0,
  }

  o.show=function() {
    ctx.fillStyle="#333";
    ctx.fillRect(width/2+o.x*width/8,width/2+o.y*width/8,1,1)
  }

  o.update=function(dt) {
    o.vx=o.vx+o.ax*dt
    o.vy=o.vy+o.ay*dt
    o.x=o.x+o.vx*dt
  	o.y=o.y+o.vy*dt
	o.ax=0
	o.ay=0
  }

  return o
}
