var Game=function(){
  var game={
    actions:{},
    keydowns:{},
    paddle:Paddle(),
    bullets:[],
    planes:[],
  }
  var mycanvas=document.getElementById('my_canvas')
  var context=mycanvas.getContext('2d')
  game.canvas=mycanvas
  game.context=context

//更新状态
  game.update=function(flag){
    for(var i in game.bullets){
      var bulldie=false
      game.bullets[i].update()
      if (game.bullets[i].y<-50){
        game.bullets.splice(i,1)
      }
      for(j in game.planes){
        if(game.bullets[i].hit(game.planes[j])){
          bulldie=true
          game.planes.splice(j,1)
        }
      }
      if(bulldie){
        game.bullets.splice(i,1)
      }
    }

    for(var i in game.planes){
      if (game.planes[i].y>600){
        game.planes.splice(i,1)
      }
      else{
        game.planes[i].update()
      }
    }

    //定时产生子弹
    if(flag%20==0){
      bullet=Bullet(game.paddle)
      game.bullets.push(bullet)
    }

    //定时产生敌人
    if (flag%60==0) {
      plane=Plane()
      game.planes.push(plane)
    }

    //更新母体状态
    game.paddle.update(game.keydowns)
  }

//重绘
  game.draw=function(){
    //重绘所有子弹
    for(var i in game.bullets){
      game.bullets[i].show(context)
    }
    //重绘所有敌人
    for(var i in game.planes){
      game.planes[i].show(context)
    }
    //重绘母体
    game.paddle.show(context)
  }

  //end
  game.end=function(){
      if(game.paddle.isalive(game.planes)){
        return false
      }
      else{
        return true
      }
  }

//监听按下时间
  window.addEventListener('keydown',function(event){
    game.keydowns[event.code]=true
  })

//监听放开事件
  window.addEventListener('keyup',function(event){
    game.keydowns[event.code]=false
  })

  return game
}
