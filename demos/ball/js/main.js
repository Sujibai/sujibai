var canvas=document.getElementById('mycanvas');
var ctx=canvas.getContext('2d');
ctx.strokeStyle='#fff';
var width=600;
var plans=[];
var r=[];
var r0=[]
var epsilon=1e-6
var alpha0=0.3
var alpha
var k=20
var ene
var flag=0
var flag2=0
var tempflag=0


var _main_=function () {
  init()
  setInterval("update(0.01,plans)",1/60)
}

var init=function(total){
  canvas.width=width*2;
  canvas.height=width*2;

  r0[0]=1.5
  r0[1]=1
  r0[2]=2.5

  plans[0]=planet()
  plans[0].m=1e-4
  plans[0].x=1
  plans[0].y=0
  plans[0].vx=0
  plans[0].vy=0

  plans[1]=planet()
  plans[1].m=2
  plans[1].x=2
  plans[1].y=0.0
  plans[1].vx=0.0
  plans[1].vy=0.0

}

var update=function(delt){
  var n=delt/epsilon
  for (var m=0;m<n;m++){
    calca()
    updateposition(epsilon)
  }
  flag2++
  if (flag2>0) {
    show()
    enegy()
    flag++
    flag2=0
  }

}

var calca=function(){
  var px=0
  var py=0
  r[0]=Math.sqrt(plans[0].x**2+plans[0].y**2)
  px=plans[0].x-plans[1].x
  py=plans[0].y-plans[1].y
  r[1]=Math.sqrt(px**2+py**2)
  r[2]=Math.sqrt((plans[1].x-3)**2+plans[1].y**2)

  if (r[0]>r0[0]) {
    plans[0].ax+=-k*plans[0].x*(r[0]-r0[0])/(r[0]*plans[0].m)
    plans[0].ay+=-k*plans[0].y*(r[0]-r0[0])/(r[0]*plans[0].m)
  }
  if (r[1]>r0[1]) {
    plans[0].ax+=-k*px*(r[1]-r0[1])/(r[1]*plans[0].m)
    plans[0].ay+=-k*py*(r[1]-r0[1])/(r[1]*plans[0].m)
    plans[1].ax+=k*px*(r[1]-r0[1])/(r[1]*plans[1].m)
    plans[1].ay+=k*py*(r[1]-r0[1])/(r[1]*plans[1].m)

  }
  if (r[2]>r0[2]) {
    plans[1].ax+=-k*(plans[1].x-3)*(r[2]-r0[2])/(r[2]*plans[1].m)
    plans[1].ay+=-k*plans[1].y*(r[2]-r0[2])/(r[2]*plans[1].m)
  }
  plans[0].ay+=1
  plans[1].ay+=1

}


var updateposition=function(dt){
  for (var i in plans) {

    plans[i].x=plans[i].x+plans[i].vx*dt
    plans[i].y=plans[i].y+plans[i].vy*dt
    plans[i].vx=plans[i].vx+plans[i].ax*dt
    plans[i].vy=plans[i].vy+plans[i].ay*dt
    plans[i].ax=0
    plans[i].ay=0
    fade(plans[i],dt)
  }
}

var fade=function(particle,dt){
  var v=0
  v=Math.sqrt(particle.vx**2+particle.vy**2)
  alpha=v*alpha0
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
}

var enegy=function(){
  ene=-plans[0].y*plans[0].m-plans[1].y*plans[1].m
  ene+=plans[0].m*(plans[0].vx**2+plans[0].vy**2)/2
  // ene=-plans[1].y*plans[1].m
  ene+=plans[1].m*(plans[1].vx**2+plans[1].vy**2)/2
  ene+=k*((r[0]-r0[0])**2+(r[1]-r0[1])**2+(r[2]-r0[2])**2)/2
  // ene+=k*(r[2]-r0[2])**2/2
  ctx.fillRect(100+flag,200-ene*1,1,1)
  if (flag>1000) {
    flag=0
  }
}

var show=function(){
  ctx.clearRect(width,width-100,2*width,2*width)
  // ctx.fillStyle="#eee";
  // ctx.fillRect(width-a*100,width-b*100,a*200+size,b*200+size)
  ctx.beginPath();
  ctx.moveTo(width, width);
  ctx.lineTo(width+plans[0].x*100,width+plans[0].y*100);
  ctx.lineTo(width+plans[1].x*100,width+plans[1].y*100);
  ctx.lineTo(width+300,width);
  ctx.lineWidth=1;
  // context.fill();//填充
   ctx.stroke();
  ctx.closePath()
  for (var i in plans) {
    plans[i].show()
  }
}


canvas.onclick=function(e){
  // addparticle(e.offsetX,e.offsetY)
	// console.log(e.offsetX,e.offsetY)
  plans[0].m=plans[0].m+0.5
  // plans[0].vx+=1
}



_main_()
