var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
var width=1140;
var height=760;
var x=[]
var y=[]
var zx=[]
var zy=[]
var color=[]
var count
var xnumb
var ynumb
var over=false

var _main_=function () {
  initCanvas()
  initp()
  setInterval("update()",500)
}

var initCanvas=function(){
  canvas.width=width;
  canvas.height=height;
}

var initp=function(){
  count=0
  xnumb=Math.floor(width/2)
  ynumb=Math.floor(height/2)
  for (var i = -xnumb; i < xnumb; i++) {
    x[i]=[];y[i]=[];
    zx[i]=[];zy[i]=[];
    color[i]=[]
    for (var j = -ynumb; j < ynumb; j++) {
            x[i][j]=i/xnumb*3/2-1/2
            y[i][j]=j/ynumb
            zx[i][j]=0
            zy[i][j]=0
            color[i][j]=0
    }
  }
  draw()
}

var getColor=function(cole){
    var red
    var blue
    var green
    var a=1
    if (cole<24) {
      blue=cole*10;green=0;red=0
    }else if (cole<36) {
        blue=240;green=(cole-24)*20;red=0
    }else if (cole<48) {
      blue=240;green=240;red=(cole-36)*20
    }
    else {
      over=true
      red=240;green=240;blue=240
      console.log("over");
    }

      return "rgba("+red+','+green+','+blue+','+a+")";
}

var draw=function(){
  ctx.clearRect(0,0,width,height)
  for (var i = -xnumb; i < xnumb; i++) {
    for (var j = -ynumb; j < ynumb; j++) {
      ctx.fillStyle=getColor(color[i][j])
      ctx.fillRect(xnumb+i,ynumb+j,1,1)
    }
  }
}

var update=function(){
  var a
  var b
  var r
  if (!over) {
    console.log("running");
    for (var i = -xnumb; i < xnumb; i++) {
      for (var j = -ynumb; j < ynumb; j++) {
        a=zx[i][j];b=zy[i][j];
        r=Math.sqrt(a**2+b**2)
        if (r>2) {
          zx[i][j]=a
          zy[i][j]=b
        }
        else {
          color[i][j]++
          zx[i][j]=a**2-b**2+x[i][j];
          zy[i][j]=2*a*b+y[i][j];
        }
      }
    }
    draw()
    console.log(count,"done");
  }
}


canvas.onclick=function(e){
  // update()
}

_main_()
