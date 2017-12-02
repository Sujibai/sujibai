var canvas=document.getElementById('mycanvas');
var ctx=canvas.getContext('2d');
ctx.strokeStyle='#fff';
var width=600;
var plans=[];
var total=100;//总粒子数
var epsilon0=1e-4//时间间隔
var epsilon=epsilon0
var a=4//电极宽
var b=1//电极高
var v=[]//速度
var v0=4//初始速度
var flag=0
var size=2//粒子大小
var alpha=0.1//速度衰减项
var beta=3/4//碰撞衰减项

var _main_=function () {
  init(total)
  setInterval("update(0.01,plans)",1/10)
}

var init=function(total){
  canvas.width=width*2;
  canvas.height=width*2;
  var dtheta=2*Math.PI/total
  for (var i=0;i<total;i++){
    plans[i]=planet()
    plans[i].x=Math.cos(dtheta*i)
    plans[i].y=Math.sin(dtheta*i)
    plans[i].vx=-v0*Math.sin(dtheta*i)/2
    plans[i].vy=v0*Math.cos(dtheta*i)/2
    // plans[i].vx=plans[i].vy=v0
  }
// plans[1].m=2
// plans[1].x=0.0
// plans[1].y=0.0
// plans[1].vx=0.0
// plans[1].vy=0.0
// plans[0].m=1
// plans[0].x=3
// plans[0].y=0.0
// plans[0].vx=-v0
// plans[0].vy=0.1
}

var update=function(delt){
  var n=delt/epsilon
  for (var m=0;m<n;m++){
    calca()
    updateposition(epsilon)
  }
  // calcepsilon()
  show()
}

var calca=function(){
  var r=1
  var px=1
  var py=1
  for (var i=0;i<plans.length;i++){
    for (var j=i+1;j<plans.length;j++){
      px=plans[i].x-plans[j].x
      py=plans[i].y-plans[j].y
      r=Math.sqrt(px**2+py**2)
      plans[i].ax+=plans[j].m*px/r**3
      plans[i].ay+=plans[j].m*py/r**3
      plans[j].ax+=-plans[i].m*px/r**3
      plans[j].ay+=-plans[i].m*py/r**3
    }
  }
}

var updateposition=function(dt){
  for (var i in plans) {
    plans[i].vx=plans[i].vx+plans[i].ax*dt
    plans[i].vy=plans[i].vy+plans[i].ay*dt
    plans[i].x=plans[i].x+plans[i].vx*dt
    plans[i].y=plans[i].y+plans[i].vy*dt
    plans[i].ax=0
    plans[i].ay=0
    fade(plans[i],dt)
  }
}

var fade=function(particle,dt){
  var v
  v=Math.sqrt(particle.vx**2+particle.vy**2)
  alpha=v/10
  if (particle.vx>0) {
    particle.vx-=alpha*dt
  } else if(particle.vx<0) {
    particle.vx+=alpha*dt
  }
  if (particle.vy>0) {
    particle.vy-=alpha*dt
  } else if (particle.vy<0) {
    particle.vy+=alpha*dt
  }
  if (particle.x<-a) {
    particle.x=-a
    particle.vx=-particle.vx*beta
  }
  if (particle.x>a) {
    particle.x=a
    particle.vx=-particle.vx*beta
  }
  if (particle.y<-b) {
  particle.y=-b
  particle.vy=-particle.vy*beta
  }
  if (particle.y>b) {
  particle.y=b
  particle.vy=-particle.vy*beta
  }
}

var calcepsilon=function(){
  var vmax=1
  for (var i in plans) {
    v[i]=plans[i].vx**2+plans[i].vy**2
  }
  vmax=Math.floor(Math.max.apply(Math,v)/v0)
  if (vmax>1) {
    epsilon=epsilon0/vmax
    // console.log(vmax);
  }
  else {
    epsilon=epsilon0
  }
}

var show=function(){
  ctx.clearRect(0,0,2*width,2*width)
  ctx.fillStyle="#eee";
  ctx.fillRect(width-a*100,width-b*100,a*200+size,b*200+size)
  for (var i in plans) {
    plans[i].show()
  }
}

var addparticle=function(x,y){
  var newparticle=planet()
  newparticle.x=(x-width)/100
  newparticle.y=(y-width)/100
  plans.push(newparticle)
}

canvas.onclick=function(e){
  if (e.offsetX>width-a*100&&e.offsetX<width+a*100&&e.offsetY>width-b*100&&e.offsetY<width+b*100) {
    addparticle(e.offsetX,e.offsetY)
  }
}



_main_()
