var particle=function(){
  var o={
    q:1,
    m:1,
    x:0,
    y:0,
    vx:0,
    vy:0,
    ax:0,
    ay:0,
  }

  o.show=function() {
    ctx.fillStyle="#ff0000";
    ctx.fillRect(outterwidth/2+o.x,outterwidth/2+o.y,3,3)
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
