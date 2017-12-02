var Paddle=function(){
    var o=Object('./images/paddle1.png')
    o.leftsee=true
    o.x=450
    o.y=480
    o.alive=true
    //更新状态
    o.update=function(direction){
      o.speed=5
      if (direction.KeyA||direction.ArrowLeft)
      {
        if(o.x<=-12){
          o.speed=0
        }
          o.image.src='./images/paddle1.png'
          o.leftsee=true
          o.x -= o.speed
      }
      else if (direction.KeyD||direction.ArrowRight){
        o.speed=5
        if(o.x>=885){
          o.speed=0
        }
        o.image.src='./images/paddle2.png'
        o.leftsee=false
        o.x += o.speed
      }
    }

    //死亡
    o.isalive=function(planes){
      for(var i in planes)
      if(planes[i].x-o.x>-30&&planes[i].x-o.x<100&&planes[i].y-o.y>-20&&planes[i].y-o.y<100){
        // console.log(plane)
        o.alive =false

        return o.alive
      }
      else{
        return o.alive
      }
    }


    return o
}
