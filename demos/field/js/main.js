var canvas=document.getElementById('mycanvas');
var ctx=canvas.getContext('2d');
var innerwidth=300;
var outterwidth=600
var particles=[];
var total=3;
var phis
var grid=200
var minv
var maxv

var _main_=function () {
  drawboard()
  init(total)
  calcphi()
  update()
  // setInterval("update(0.005,plans)",1/60)
}

var drawboard=function () {
  canvas.width=outterwidth;
  canvas.height=outterwidth;
  ctx.fillStyle="#eee";
  ctx.fillRect(0,0,outterwidth,outterwidth)
  ctx.fillStyle="#ddd"
  ctx.fillRect((outterwidth-innerwidth)/2,(outterwidth-innerwidth)/2,innerwidth,innerwidth)
}

var init=function(total){
  //初始化电荷
  for (var i=0;i<total;i++){
    particles[i]=particle()
    // particles[i].x=i*200
    // particles[i].y=0
    particles[i].show()
  }
  particles[0].x=-200
  particles[1].x=200
  particles[2].y=200
  //初始化势
  d=outterwidth/grid
  phis=[]
  for (var i=0;i<grid;i++){
    phis[i]=[]
    for (var j = 0; j < grid;j++) {
      phis[i][j]=phi()
      phis[i][j].x=(i+0.5)*d
      phis[i][j].y=(j+0.5)*d
      // phis[i][j].show()
    }
  }
  //初始化最小最大值
  max=1/d
  min=Math.sqrt(2)/outterwidth
  // min=-max
}

var calcphi=function(){
  var r=1
  for (var k in particles) {
    for (var i=0;i<grid;i++){
      for (var j = 0; j < grid;j++) {
        r=Math.sqrt((phis[i][j].x-outterwidth/2-particles[k].x)**2+(phis[i][j].y-outterwidth/2-particles[k].y)**2)
        phis[i][j].v+=particles[k].q/r
      }
    }
  }
}

var update=function(){
  for (var i=0;i<grid;i++){
    for (var j = 0; j < grid;j++) {
      phis[i][j].show()
    }
  }
  for (var i in particles) {
    particles[i].show()
  }

}


canvas.onclick=function(e){

}



_main_()
