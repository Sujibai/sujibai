var canvas=document.getElementById('mycanvas');
var ctx=canvas.getContext('2d');
ctx.strokeStyle='#fff';
var width=600;
var plans=[];
var total=3;
var epsilon=1e-6
var incy=0;

var _main_=function () {
  drawboard()
  init(total)
  // update(0.0005,plans)
  setInterval("update(0.005,plans)",1/60)
}

var drawboard=function () {
  canvas.width=width;
  canvas.height=width;
  ctx.fillStyle="#eee";
  ctx.fillRect(0,0,width,width)
}

var init=function(total){
  var dtheta=2*Math.PI/total

  for (var i=0;i<total;i++){
    plans[i]=planet()
    plans[i].x=Math.cos(dtheta*i)
    plans[i].y=Math.sin(dtheta*i)
    plans[i].vx=-Math.sin(dtheta*i)/2
    plans[i].vy=Math.cos(dtheta*i)/2
  }

// plans[1].m=1
// plans[1].x=1
// plans[1].y=0.0
// plans[1].vx=0.0
// plans[1].vy=0.5
// plans[0].m=1
// plans[0].x=-1
// plans[0].y=0.0
// plans[0].vx=0.0
// plans[0].vy=-0.6
}

var update=function(delt,plan){
  var n=delt/epsilon
  var r=1
  var plans=plan
  for (var m=0;m<n;m++){
    for (var i=0;i<total;i++){
      for (var j=i+1;j<total;j++){
        var x=plans[i].x-plans[j].x
        var y=plans[i].y-plans[j].y
        r=Math.sqrt(x**2+y**2)
        plans[i].ax-=plans[j].m*x/r**3
        plans[i].ay-=plans[j].m*y/r**3
        plans[j].ax+=plans[i].m*x/r**3
        plans[j].ay+=plans[i].m*y/r**3
      }

    }
    for (var i in plans) {
      plans[i].update(epsilon)
    }
  }
  for (var i in plans) {
    plans[i].show()
  }
}


canvas.onclick=function(e){

}



_main_()
