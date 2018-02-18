var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
var width=500;
var height=500;
let points=[]
let p=new Perceptron()
n=0


var _main_=function () {
  init()
  intr=setInterval("update()",1000/60)

}

var update=function(){
  ctx.clearRect(0,0,width,width)
  p.train([points[n].x,points[n].y],points[n].label)
  points[n].done=true
  n+=1
  draw()
  if(n === 3000){
    clearInterval(intr);
    console.log("end");
  }
}

var init=function(){
  canvas.width=width;
  canvas.height=height;
  for (var i = 0; i < 3000; i++) {
    points[i]=new Points()
  }
  draw()
}

var draw=function(){
  for (var i = 0; i < points.length; i++) {
    points[i].show(width)
  }
  p.show()
  ctx.beginPath();
  ctx.strokeStyle='#666';
  ctx.lineWidth=2;
  ctx.moveTo(0,0);
  ctx.lineTo(width,width);
  ctx.stroke();
    ctx.closePath();
}

canvas.onmousedown=function(e){
  // update()
}

_main_()
