var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
ctx.strokeStyle='#000';
var width=600;
let isover=true
let isstarted=false
var ndim=15
let blockwidth=25
let blocks=[]
let total=0
let totalon=0

var _main_=function () {
  init()
}

var init=function(){
  drawboard();
  initblock()
}

let initblock=function(){
  for (let i = 0; i < 27; i++) {
    blocks[i]=[]
    for (let j = 0; j < 8; j++) {
      blocks[i][j]=new Block(i,j,blockwidth)
      blocks[i][j].show()
    }
  }
  ctx.fillStyle = "#000";
  ctx.font = "normal 80px 微软雅黑";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText("Start",canvas.width/2,canvas.height/2);
}

var drawboard=function () {
  canvas.width=width+20;
  canvas.height=width+10;
}

let update=function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 8; j++) {
      blocks[i][j].update()
      blocks[i][j].show()
    }
  }
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 8; j++) {
      if (blocks[i][j].ison&&blocks[i][j].isbomb) {
        over("Fail")
      }
    }
  }
  if (totalon==total) {
    over("You Win")
  }
}

let getindex=function(x,y){
  let i =0
  let j=0

  let n1=Math.floor((y-3)/(blockwidth*Math.sqrt(3)/2))
  let n2=Math.floor((x-5)/(blockwidth/2))

  if (n2%3) {
    if (Math.floor(n2/3)%2==0) {
      i=Math.floor((y-3)/(blockwidth*Math.sqrt(3)))*2
      j=Math.floor(n2/6)
    } else {
      i=Math.floor((y-3)/(blockwidth*Math.sqrt(3))-1/2)*2+1
      j=Math.floor(n2/6-1/2)
    }
  }else{
    x1=(x-5)%(blockwidth/2)
    y1=(y-3)%(blockwidth*Math.sqrt(3)/2)
    let adi=Math.floor(n2/3+1)%2
    i=Math.floor((y-3)/(blockwidth*Math.sqrt(3))-adi/2)*2+adi
    j=Math.floor(n2/6-adi)
    if (Math.floor(n2/3)%2==n1%2) {
      let cond=y1+Math.sqrt(3)*x1>(blockwidth*Math.sqrt(3)/2)
      if (cond) {
        i+=1
        if (Math.floor(n2/3)%2==0) {
          j+=1
        }
      }
    } else {
      let cond=y1<Math.sqrt(3)*x1
      if (cond) {
        i-=1
        if (Math.floor(n2/3)%2==0) {
          j+=1
        }
      }
    }
  }
  return [i,j]
}

let puton=function(x,y,flag){
  [i,j]=getindex(x,y)
  if (typeof(blocks[i])!="undefined"&&typeof(blocks[i][j])!="undefined"&&!blocks[i][j].ison) {
    if (flag==0) {
      blocks[i][j].ison=true
      totalon+=1
    }else{
      if (blocks[i][j].ismarked) {
        blocks[i][j].ismarked=false
      }else{
        blocks[i][j].ismarked=true
      }
    }
    update()
  }
}

let setbomb=function(){
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 8; j++) {
      blocks[i][j].ison=false
      blocks[i][j].ismarked=false
      blocks[i][j].isbomb=false
      let pos=Math.random()
        if (pos<0.28) {
          blocks[i][j].isbomb=1
        }
    }
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 8; j++) {
      blocks[i][j].update()
      blocks[i][j].show()
    }
  }
}

let deletebomb=function(i,j){
  blocks[i][j].isbomb=false
  if (i%2) {
    if (typeof(blocks[i-1])!="undefined"&&typeof(blocks[i-1][j])!="undefined") {
      blocks[i-1][j].isbomb=false
    }
    if (typeof(blocks[i-1])!="undefined"&&typeof(blocks[i-1][j+1])!="undefined") {
      blocks[i-1][j+1].isbomb=false
    }
    if (typeof(blocks[i+1])!="undefined"&&typeof(blocks[i+1][j])!="undefined") {
      blocks[i+1][j].isbomb=false
    }
    if (typeof(blocks[i+1])!="undefined"&&typeof(blocks[i+1][j+1])!="undefined") {
      blocks[i+1][j+1].isbomb=false
    }
  }else{
    if (typeof(blocks[i-1])!="undefined"&&typeof(blocks[i-1][j])!="undefined") {
      blocks[i-1][j].isbomb=false
    }
    if (typeof(blocks[i-1])!="undefined"&&typeof(blocks[i-1][j-1])!="undefined") {
      blocks[i-1][j-1].isbomb=false
    }
    if (typeof(blocks[i+1])!="undefined"&&typeof(blocks[i+1][j])!="undefined") {
      blocks[i+1][j].isbomb=false
    }
    if (typeof(blocks[i+1])!="undefined"&&typeof(blocks[i+1][j-1])!="undefined") {
      blocks[i+1][j-1].isbomb=false
    }
  }
  if (typeof(blocks[i-2])!="undefined"&&typeof(blocks[i-2][j])!="undefined") {
    blocks[i-2][j].isbomb=false
  }
  if (typeof(blocks[i+2])!="undefined"&&typeof(blocks[i+2][j])!="undefined") {
    blocks[i+2][j].isbomb=false
  }
}

let setup=function(x,y){
  // setbomb()
  [i0,j0]=getindex(x,y)
  deletebomb(i0,j0)
  total=0
  totalon=0
  isover=false
  isstarted=true
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 8; j++) {
      if (blocks[i][j].isbomb==false) {
        blocks[i][j].numb=getbomb(i,j)
        total+=1
      }
    }
  }
  puton(x,y,0)
  
}

let getbomb=function(i,j){
  let n=0
  if (i%2) {
    if (typeof(blocks[i-1])!="undefined"&&typeof(blocks[i-1][j])!="undefined") {
      n+=blocks[i-1][j].isbomb
    }
    if (typeof(blocks[i-1])!="undefined"&&typeof(blocks[i-1][j+1])!="undefined") {
      n+=blocks[i-1][j+1].isbomb
    }
    if (typeof(blocks[i+1])!="undefined"&&typeof(blocks[i+1][j])!="undefined") {
      n+=blocks[i+1][j].isbomb
    }
    if (typeof(blocks[i+1])!="undefined"&&typeof(blocks[i+1][j+1])!="undefined") {
      n+=blocks[i+1][j+1].isbomb
    }
  }else{
    if (typeof(blocks[i-1])!="undefined"&&typeof(blocks[i-1][j])!="undefined") {
      n+=blocks[i-1][j].isbomb
    }
    if (typeof(blocks[i-1])!="undefined"&&typeof(blocks[i-1][j-1])!="undefined") {
      n+=blocks[i-1][j-1].isbomb
    }
    if (typeof(blocks[i+1])!="undefined"&&typeof(blocks[i+1][j])!="undefined") {
      n+=blocks[i+1][j].isbomb
    }
    if (typeof(blocks[i+1])!="undefined"&&typeof(blocks[i+1][j-1])!="undefined") {
      n+=blocks[i+1][j-1].isbomb
    }
  }
  
  if (typeof(blocks[i-2])!="undefined"&&typeof(blocks[i-2][j])!="undefined") {
    n+=blocks[i-2][j].isbomb
  }
  if (typeof(blocks[i+2])!="undefined"&&typeof(blocks[i+2][j])!="undefined") {
    n+=blocks[i+2][j].isbomb
  }
  return n
}

let over =function(char){
  isover=true
  isstarted=false
  ctx.fillStyle = "#000";
  ctx.font = "normal 100px 微软雅黑";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(char,canvas.width/2,canvas.height/2);
}

let cheat=function(){
  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 8; j++) {
      if (!blocks[i][j].isbomb) {
        blocks[i][j].ison=true
      }
      else{
        blocks[i][j].ismarked=true
      }
    }
  }
    totalon=total
    update()
}

let mouse=function(e){
  if (isover) {
    setbomb()
    isover=false
  }else if(!isover&&!isstarted&&e.button==0){
    setup(e.offsetX,e.offsetY)
  }else if(!isover&&isstarted){
    puton(e.offsetX,e.offsetY,e.button)
  }
}

function doNothing(){  
  window.event.returnValue=false;  
  return false;  
}

canvas.onmousedown=function(e){
  // mouse(e.offsetX,e.offsetY,e.button)
  mouse(e)
}

_main_()
