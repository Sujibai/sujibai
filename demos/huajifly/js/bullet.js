var Bullet=function(paddle){
  if(paddle.leftsee){
    var o=Object('./images/huaji1.png')
  }
  else{
    var o=Object('./images/huaji2.png')
  }
  o.x=paddle.x+45
  o.y=paddle.y-20
  o.speed=3
  o.hit=false
  o.update=function(){
    o.y-=o.speed
  }
  o.hit=function(plane){
    var hit=false
    if(-40<plane.x-o.x&&plane.x-o.x<30&&-40<plane.y-o.y&&plane.y-o.y<30){
      hit=true
    }
    else{
      hit=false
    }
    return hit
  }

  return o
}
