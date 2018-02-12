var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
ctx.strokeStyle='#000';
var width=600;
var ndim=15
var bomb=[]
var numb=[]
var total
var isover=false
var on=[]
var marked=[]

var _main_=function () {
  init()
}

var init=function(){
  drawboard();
  initBomb()
  initBlock()
}

var drawboard=function () {
  canvas.width=width+1;
  canvas.height=width+1;
  ctx.strokeStyle='#666';
  ctx.fillStyle="#ddd"
  ctx.lineWidth=1;
  for (var i = 0; i < ndim; i++) {
    for (var j = 0; j < ndim; j++) {
        ctx.fillRect(i*width/ndim+1,j*width/ndim+1,width/ndim-2,width/ndim-2)
    }
  }

  for (var i = 0; i < ndim+1; i++) {
    ctx.moveTo(i*width/ndim,0);
    ctx.lineTo(i*width/ndim,width);
    ctx.moveTo(0,i*width/ndim);
    ctx.lineTo(width,i*width/ndim);
    ctx.stroke();
  }
}

var initBomb=function(){
  for (var i = 0; i < ndim; i++) {
    bomb[i]=[]
    for (var j = 0; j < ndim; j++) {
        ctx.fillRect(i*width/ndim+1,j*width/ndim+1,width/ndim-2,width/ndim-2)
        pos=Math.random()
        if (pos>0.2) {
          bomb[i][j]=false
        }else {
          bomb[i][j]=true
        }
    }
  }
}

var initBlock=function(){
  total=0
  for (var i = 0; i < ndim; i++) {
    numb[i]=[];on[i]=[];marked[i]=[]
    for (var j = 0; j < ndim; j++) {
      on[i][j]=false
      marked[i][j]=false
      if (!bomb[i][j]) {
        numb[i][j]=calcij(i,j)
        total++
      }
      else {
        numb[i][j]="\u2617"
      }
    }
  }
}

var drawij=function(i,j){
    if (ndim>15) {
      ctx.font = "normal 20px 微软雅黑";
    }
    else {
      ctx.font = "normal 30px 微软雅黑";
    }
    ctx.fillStyle = "#222";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.clearRect(i*width/ndim+1,j*width/ndim+1,width/ndim-2,width/ndim-2);
    ctx.fillText(numb[i][j],(i+1/2)*width/ndim,(j+1/2)*width/ndim,width/ndim);
}

var mark=function(i,j){
  if (on[i][j]) {
    return
  }
  if (ndim>15) {
    ctx.font = "normal 20px 微软雅黑";
  }
  else {
    ctx.font = "normal 30px 微软雅黑";
  }
  if (marked[i][j]) {
    marked[i][j]=false
    ctx.fillStyle="#ddd"
    ctx.clearRect(i*width/ndim+1,j*width/ndim+1,width/ndim-2,width/ndim-2);
    ctx.fillRect(i*width/ndim+1,j*width/ndim+1,width/ndim-2,width/ndim-2)
  }
  else {
    marked[i][j]=true
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "tomato";
    ctx.fillText("\u26A0",(i+1/2)*width/ndim,(j+1/2)*width/ndim,width/ndim);
  }
}

var calcij=function(x,y){
  var n=0
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (typeof(bomb[x+i])=="undefined"||typeof(bomb[x+i][y+j])=="undefined") {
          n=n
      }
      else if (bomb[x+i][y+j]) {
        n++
      }
    }
  }
  return n
}

var puton=function(i,j,flag){
  if (flag==0) {
    on[i][j]=true
    drawij(i,j)
    if (bomb[i][j]) {
      over()
    }
    if (numb[i][j]==0) {
      auto(i,j)
    }
  }else if (flag==2) {
    mark(i,j)
  }
  var count=0
  for (var i = 0; i < ndim; i++) {
    for (var j = 0; j < ndim; j++) {
      if (on[i][j]) {
        count++
      }
    }
  }
  if (count>=total) {
    over()
  }
}

var auto=function(x,y){
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (typeof(bomb[x+i])=="undefined"||typeof(bomb[x+i][y+j])=="undefined") {
      }
      else if(!on[x+i][y+j]){
        puton(x+i,y+j,0)
      }
    }
  }
}

var mouse=function(e){
  var x=e.offsetX;
  var y=e.offsetY;
  var i=Math.floor(x*ndim/width);
  var j=Math.floor(y*ndim/width);
  puton(i,j,e.button)
}

var over=function(){
    ctx.fillStyle = "#000";
    ctx.font = "normal 90px 微软雅黑";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("RETRY",width/2,width/2);
    isover=true
}

function doNothing(){  
        window.event.returnValue=false;  
        return false;  
    }

canvas.onmousedown=function(e){
  if (isover) {
    isover=false
    _main_()
  }
  else {
    mouse(e)
  }
}

_main_()
