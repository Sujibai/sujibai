var Plane=function(){
  var o=Object('./images/plane.png')
  o.y=0
  o.x=Math.random()*940+20
  o.speed=3
  o.update=function(){
    o.y+=o.speed
  }
  return o
}
