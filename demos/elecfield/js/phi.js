var phi=function(){
  var o={
    u:0,
    x:0,
    y:0,
  }

  o.rancolor=function(max,min){
    var cole=Math.floor((1/o.u-1/max)/(1/min-1/max)*256*3)
    var r=0
    var b=0
    var g=0
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
    // var r=(o.u-min)*256/(max-min)
    // var r=Math.floor(Math.random()*256);
    return "rgba("+r+','+g+','+b+','+1+")";
  }

  o.show=function(max,min,dx) {
    var color=o.rancolor(max,min)
    ctx.fillStyle=color
    // ctx.fillStyle="#eee";
    ctx.fillRect(width+(o.x-dx/2)*100,width+350+(o.y-dx/2)*100,dx*100,dx*100)
  }

  return o
}
