var canvas=document.getElementById('mycanvas');
var ctx=canvas.getContext('2d');
ctx.strokeStyle='#fff';
var width=2000;
var p=[];
var m=[];
var n=4000;
var flag=0;
var go=1;
var isdraw=0;

var _main_=function () {
  init()
  setInterval("update()",1/60)
}

var init=function(){
  canvas.width=width;
  canvas.height=width;
  for (var i = 0; i < n; i++) {
    p[i]=100
  }
}

function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

var update=function(){
  for (var k = 0; k < 100; k++) {
    for (var i = 0; i < p.length; i++) {
      // if (p[i]>=1) {
        var j=Math.floor(n*Math.random())
        p[i]-=1
        p[j]+=1
      // }
    }
  }
  draw()
  dist()

}

var draw=function(){
  p=bubbleSort(p)
  var x=100
  ctx.clearRect(0,0,width,width)
  for (var i = 0; i < p.length/10; i++) {
    ctx.fillStyle="#000";
    ctx.fillRect(x,width/2-p[i*10]/4,2,p[i*10]/4)
    x=x+3
  }
}

var dist=function(){
  // ctx.clearRect(0,0,width,width)
  var max=0
  var min=0
  var step=0
  var x=300
  max=Math.max.apply(Math,p)
  min=Math.min.apply(Math,p)
  // console.log(max,min);
  step=(max-min)/50
  for (var i = 0; i < 50; i++) {
    m[i]=0
  }
  for (var i = 0; i < p.length; i++) {
    var j=Math.floor((p[i]-min)/step)
    // console.log(p[i]-min,max,min,j,step);
    m[j]++
  }
  for (var i = 0; i < 50; i++) {
    ctx.fillRect(x,800-m[i]/5,4,m[i]/5)
    x=x+5
  }
}



canvas.onclick=function(e){
  dist()
}



_main_()
