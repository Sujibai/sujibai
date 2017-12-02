var phi=function(){
  var o={
    v:0,
    x:0,
    y:0,
  }

  o.rancolor=function(){
    var cole=Math.floor((1/o.v-1/min)/(1/max-1/min)*256*3)
    if (cole>=256*2) {
      r=256
      g=256
      b=cole-256*2
    }else if (cole>256) {
      r=256;g=cole-256;b=0
    }
    else {
      r=cole;g=b=0
    }
    // console.log(o.v-0.0015);
    // var r=Math.floor(Math.random()*256);
    return "rgba("+r+','+g+','+b+','+1+")";
  }

  o.show=function() {
    var d=outterwidth/grid
    var color=o.rancolor()
    ctx.fillStyle=color
    ctx.fillRect(o.x-d/2,o.y-d/2,d,d)
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
