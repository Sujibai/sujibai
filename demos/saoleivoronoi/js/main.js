var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
var width=610;
var height=610;
let rown=17
let randoffset=0.08
var centerx=width/2
let centery=height/2
var scalex
let scaley
let isover=true
let gaming=false
let PointNumb=rown**2
let p=[]
let bigp=[]
let pointPond=[]
let temptran=[]
let traingle=[]
let blocks=[]
let traingleedge=[]
let blockedge=[]
let total=0
let count=0

var _main_=function () {
  initCanvas()
  ctx.fillStyle = "#000";
  ctx.font = "normal 80px 微软雅黑";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  px=canvas.width/2
  py=canvas.height/2
  ctx.fillText("Start",px,py);
  
  
}

let initCanvas=function(){
  canvas.width=width;
  canvas.height=height;
  ctx.strokeStyle='#666';
  ctx.fillStyle="#67ccff"
  ctx.fillRect(0,0,width,height)
  ctx.stroke()
  scalex=(canvas.width-10)/2*1.06
  scaley=(canvas.height-10)/2*1.06
}

let setup=function(){
  p=[]
  bigp=[]
  pointPond=[]
  temptran=[]
  traingle=[]
  blocks=[]
  traingleedge=[]
  blockedge=[]
  total=0
  count=0
  initPoints()
  initTraingle()
  initBlocks()
  reDraw()
  isover=false
}

let start=function(e){
  let index=getindex(e)
  let flag=p[index].block
  if (flag) {
    gaming=true
    initbomb(index)
    puton(p[index].block,0)
    reDraw()
  }
}

let initPoints=function(){
  for (let i = 0; i < PointNumb; i++) {
    let tempx=i%rown*2/rown-(rown-1)/rown+Math.random()*randoffset-randoffset/2
    let tempy=Math.floor(i/rown)*2/rown-(rown-1)/rown+Math.random()*randoffset-randoffset/2
    pointPond[i]=new Point(tempx,tempy)
  }
  pointPond.sort(compare("x"))
  for (let i = 0; i < 3; i++) {
    bigp[i]=new Point()
  }
  bigp[0].x=-3
  bigp[0].y=-1
  bigp[1].x=3
  bigp[1].y=-1
  bigp[2].x=0
  bigp[2].y=5
  p=pointPond
  for (let i = 0; i < PointNumb; i++) {
    p.blockindex=i
  }
}

function compare(pro) { 
  return function (obj1, obj2) { 
      var val1 = obj1[pro]; 
      var val2 = obj2[pro]; 
      if (val1 > val2 ) {
          return 1; 
      } else if (val1 < val2 ) { 
          return -1; 
      } else { 
          return 0; 
      } 
  } 
} 

let initTraingle=function(){
  let temp=new Traingle(bigp)
  temptran.push(temp)
  traingle.push(temp)
  for (let i = 0; i < p.length; i++) {
    let localp=[]
    let edge=[]
    for (let j = temptran.length-1; j > -1; j--) {
      // console.log(i,temptran);
      
      if (p[i].x>temptran[j].x+temptran[j].rad) {
        traingle.push(temptran[j])
        temptran.splice(j,1)
      } else{
        let dis=Math.sqrt((p[i].x-temptran[j].x)**2+(p[i].y-temptran[j].y)**2)
        if (dis<temptran[j].rad) {
          edge.push(new Edge([temptran[j].points[0],temptran[j].points[1]]))
          edge.push(new Edge([temptran[j].points[0],temptran[j].points[2]]))
          edge.push(new Edge([temptran[j].points[1],temptran[j].points[2]]))
          localp.push(temptran[j].points[0])
          localp.push(temptran[j].points[1])
          localp.push(temptran[j].points[2])
          temptran.splice(j,1)
          // console.log("fuck");
        }
      }
    }
    localp=localpone(localp)
    edge=edgeone(edge)
    local(p[i],edge,localp)
  }
  finaltran()
}

let initBlocks=function(){
  for (let i = 0; i < PointNumb; i++) {
    let el=(rown-1)/rown-randoffset/2
    let flag=p[i].x<el&&p[i].x>-el&&p[i].y<el&&p[i].y>-el
    if (flag) {
      let tempblock=new Block(p[i])
      blocks.push(tempblock)
      p[i].block=tempblock
    }
    
  }//绑定中心点
  for (let i = 0; i < traingle.length; i++) {
    for (let j = 0; j < traingle[i].edges.length; j++) {
      traingleedge.push(traingle[i].edges[j])//存储所有三角边
    }
  }
  edgeone(traingleedge)//边去重
  
  for (let i = 0; i < traingle.length; i++) {
    for (let j = 0; j < traingle[i].edges.length; j++) {
      for (let k = 0; k < traingleedge.length; k++) {
        if (traingle[i].edges[j].points[0]==traingleedge[k].points[0]&&traingle[i].edges[j].points[1]==traingleedge[k].points[1]) {
          traingleedge[k].traingles.push(traingle[i])//边绑定三角
        }
      }
    }
  }
  for (let i = 0; i < traingleedge.length; i++) {//方块绑定三角边
    if (traingleedge[i].points[0].block) {
      traingleedge[i].points[0].block.clines.push(traingleedge[i])
    }
    if (traingleedge[i].points[1].block) {
      traingleedge[i].points[1].block.clines.push(traingleedge[i])    }
  }

  for (let i = 0; i < blocks.length; i++) {//获取voronoi边界
    let el=(rown-1)/rown-randoffset/2
    let flag=blocks[i].point.x<el&&blocks[i].point.x>-el&&blocks[i].point.y<el&&blocks[i].point.y>-el
    if (flag) {
      for (let j = 0; j < blocks[i].clines.length; j++) {
        if (blocks[i].clines[j].traingles.length==2) {
          let tempedge=new Edge([blocks[i].clines[j].traingles[0].outcenter,blocks[i].clines[j].traingles[1].outcenter])
          blockedge.push(tempedge)
          blocks[i].edges.push(tempedge)
        }
      }
    }
  }
  blockedge=edgeone(blockedge)
  
  for (let i = 0; i < blocks.length; i++) {
    let el=(rown-1)/rown-randoffset/2
    let flag=blocks[i].point.x<el&&blocks[i].point.x>-el&&blocks[i].point.y<el&&blocks[i].point.y>-el
    if (flag) {
      blocks[i].edges=edgeone(blocks[i].edges)
      blocks[i].getedgepoints()
  }}

}

let initbomb=function(index){
  for (let i = 0; i < blocks.length; i++) {
    let pos=Math.random()
    if (pos<data.bombrates) {
      blocks[i].isbomb=true
    }
  }
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].getneighbor()
  }
  p[index].block.isbomb=false
  for (let i = 0; i < p[index].block.neighbors.length; i++) {
    p[index].block.neighbors[i].isbomb=false
  }
  for (let i = 0; i < blocks.length; i++) {
    if (!blocks[i].isbomb) {
      total+=1
    }
    blocks[i].getbomb()
    blocks[i].update()
  }
}

let local=function(point,edge,localp){
  let e=[]
  for (let i = 0; i < edge.length; i++) {
    let temp=new Traingle([edge[i].points[0],edge[i].points[1],point])
    let flag=true
    for (let j = 0; j < localp.length; j++) {
      if (localp[j]!=point&&localp[j]!=edge[i].points[0]&&localp[j]!=edge[i].points[1]) {
        let dis=Math.sqrt((localp[j].x-temp.x)**2+(localp[j].y-temp.y)**2)
        if (dis<temp.rad) {
          flag=false
          break
        }
      }
    }
    if (flag) {
      temptran.push(temp)
    }
  }
}

let finaltran=function(){
  for (let i = temptran.length-1; i > -1; i--) {
    traingle.push(temptran[i])
    temptran.splice(i,1)
  }
  for (let i = traingle.length-1; i > -1; i--) {
    if (allatedge(traingle[i])) {
      traingle.splice(i,1)
      continue
    }
    for (let j = 0; j < 3; j++) {
      if (inarray(traingle[i].points[j],bigp)) {
        traingle.splice(i,1)
        break
      }
    }
  }
}

let allatedge=function(trang){
  let el=(rown-1)/rown-randoffset/2
  if (trang.points[0].x<-el&&trang.points[1].x<-el&&trang.points[2].x<-el) {
    return true
  }
  if (trang.points[0].x>el&&trang.points[1].x>el&&trang.points[2].x>el) {
    return true
  }
  if (trang.points[0].y<-el&&trang.points[1].y<-el&&trang.points[2].y<-el) {
    return true
  }
  if (trang.points[0].y>el&&trang.points[1].y>el&&trang.points[2].y>el) {
    return true
  }
  return false
}

//去重
let localpone=function(localp){
  for (let i = 0; i < localp.length; i++) {
    for (let j = localp.length-1; j > i; j--) {
      if (localp[i]==localp[j]) {
        localp.splice(j,1)
      }
    }
  }
  return localp
}


//边界去重
let edgeone=function(edge){
  for (let i = 0; i < edge.length; i++) {
    for (let j = edge.length-1; j > i; j--) {
      if (edge[i].points[0]==edge[j].points[0]&&edge[i].points[1]==edge[j].points[1]) {
        //如果边界线段的两个端点都相同，去除一个
        edge.splice(j,1)
      }
    }
  }
  return edge
}

//判断元素是否在数组内
function inarray(a,ar) {
  for (let i = 0; i < ar.length; i++) {
    if (a==ar[i]) {
      return true
    }
  }
  return false
}


//重绘
let reDraw=function(){

  let godie=false
  //清屏  
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle="#fff"
  ctx.fillRect(0,0,width,height)

  //重绘所有方块
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].update()
    blocks[i].area()
  }

  //重绘所有边界
  for (let i = 0; i < blockedge.length; i++) {
    blockedge[i].show()
  }

  if (isover=="WIN"||isover=="DIE") {//输出结束语
    console.log("over");
    ctx.fillStyle = "#000";
    ctx.font = "normal 100px 微软雅黑";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(isover,canvas.width/2,canvas.height/2);
  }
}


//获取鼠标事件e位置的对应方块索引
let getindex=function(e){
  let x=(e.offsetX-centerx)/scalex
  let y=(canvas.height-e.offsetY-centery)/scaley
  let dis=[]
  let index=[]
  let minindex=0
  //获取到所有方块对应点的距离存入dis，其索引存入index
  for (let i = 0; i < p.length; i++) {
    dis.push(Math.sqrt((p[i].x-x)**2+(p[i].y-y)**2))
    index.push(i)
  }
  let mindis=dis[0]
  minindex=0
  //比较点击处到各方快点的距离，找出最小值对应的索引并返回
  for (let i = 0; i < dis.length; i++) {
    if (dis[i]<mindis) {
      mindis=dis[i]
      minindex=index[i]
    }
  }
  return minindex
}

//翻开方块，输入对应方块flag和点击类型but
let puton=function(flag,but){
    //如果左键炸弹，结束游戏输出DIE
    if (flag.isbomb) {
      flag.ison=true
      gaming=false
      isover="DIE"
    }

  if (!flag.isbomb&&!flag.ison) {
    //对应方块不是炸弹且没有被翻开
    // console.log(flag.ison);
    flag.ison=true//将对应方块翻开
    flag.update()//更新方块状态
    count+=1//已翻开数+1
    if(count==total){//如果全部翻开，结束游戏并显示WIN
      gaming=false
      isover="WIN"
    }
    console.log(count,total);//输出已翻开方块和总方块数目
    
    //处理周围炸弹数为0的情况，递归调用puton翻开周围所有方块
    if (flag.bombnumb==0) {
      for (let i = 0; i < flag.neighbors.length; i++) {
        if (!flag.neighbors[i].ison) {
          puton(flag.neighbors[i],0)
        }
      }
      reDraw()
      return
    }
  }else if (!flag.isbomb&&flag.ison) {
    //打开辅助
    let neighbormarknumb=0
    for (let i = 0; i < flag.neighbors.length; i++) {//获取被标记的邻居数
      if (flag.neighbors[i].ismarked) {
        neighbormarknumb+=1
      }
    }
    if (neighbormarknumb==flag.bombnumb) {//如果被标记数和总数相等
      for (let i = 0; i < flag.neighbors.length; i++) {//获取被标记的邻居数
        if (!flag.neighbors[i].ismarked&&!flag.neighbors[i].ison) {
          console.log(flag.neighbors[i].ismarked,flag.neighbors[i].ison);
          puton(flag.neighbors[i],0)
        }
      }
    }
  }
  reDraw()//重绘
}

//进行标记和取消标记
let mark=function(flag,but){
  if (flag.ismarked==true) {
    flag.ismarked=false
  } else if (flag.ismarked==false){
    flag.ismarked=true
  }
}


//处理游戏进行时的鼠标事件
let mouse=function(e){
  let minindex=getindex(e)//获取点击位置的方块索引
  let flag=p[minindex].block
  if (flag) {
    //如果对应方块存在就进行翻动（打开或标记）处理
    if (e.button==0) {
      puton(flag,e.button)
    }else{
      mark(flag,e.button)
    }
  }
  wating(e)
}

let onthis=function(e){
  let minindex=getindex(e)
  if (p[minindex].block) {
    reDraw()
    p[minindex].block.highlight()
    for (let i = 0; i < p[minindex].block.neighbors.length; i++) {
      p[minindex].block.neighbors[i].highlight()
    }
  }
}

//设定延迟高亮处理
let wating=function(e){
  let fff=false
  if (typeof(t1)!="undefined") {
    window.clearInterval(t1); 
  }
  
  t1=setInterval(function fuck() {
    if (fff&&!isover) {
      
      onthis(e)
      window.clearInterval(t1); 
    }
    fff=true
  }, data.watingtime);
}

//配合html屏蔽右键菜单
function doNothing(){  
  window.event.returnValue=false;  
  return false;  
}

//作弊功能，翻开全部方块
let cheat=function(){
  for (let i = 0; i < blocks.length; i++) {
    if (!blocks[i].isbomb) {
      blocks[i].ison=true
    }else{
      blocks[i].ismarked=true
    }
    reDraw()
  }
}

//总鼠标事件，进行游戏的状态判断
canvas.onmousedown=function(e){
  console.log(gaming,isover);
  
  if (gaming) {
    mouse(e)
  }else if(isover){
    setup()
  }else if(!isover&&!gaming){
    start(e)
  }
}
//hover事件处理
canvas.onmousemove=function(e){
  if (!isover) {
    
    wating(e)
  }
}

_main_()
