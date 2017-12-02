var canvas=document.getElementById('myCanvas');
var pi=document.getElementById('pi')
var ctx=canvas.getContext('2d');
ctx.strokeStyle='#000';
var width=550;
var total=0;
var incy=0;

var _main_=function () {
  drawboard();
  thou();
}

var drawboard=function () {
  pi.innerHTML ='pi';
  canvas.width=width;
  canvas.height=width;
  ctx.strokeStyle='#333';
    ctx.beginPath();
    ctx.arc(width/2,width/2,width/2,0,2*Math.PI)
    ctx.closePath();
    ctx.moveTo(0,0);
    ctx.lineTo(width,0);
    ctx.lineTo(width,width);
    ctx.lineTo(0,width);
    ctx.lineTo(0,0);
    ctx.moveTo(100,100)
    ctx.lineTo(100,100)
    ctx.stroke();
}

var point=function(){
    x=width*Math.random()
    y=width*Math.random()
    ctx.strokeStyle='#333';
    ctx.fillRect(x,y,1,1)
    ctx.stroke();
    total++;
    if(x**2+y**2<=width**2){
      incy++;
    }
}

var thou=function(){
  for(var i=0;i<1000;i++){
    point();
  }
  pi.innerHTML=total+'点：  '+incy*4/total;
}

canvas.onclick=function(e){
  thou()
}



_main_()
