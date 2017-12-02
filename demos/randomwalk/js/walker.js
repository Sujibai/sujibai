var Walker = function(){
  var walker={
    x:windowWidth/2,
    y:windowHeight/2,
    choice:0,
  }

  walker.walk =function(){
    choice=int(random(4))
    if(choice==0){
      walker.x-=1
    }
    else if (choice==1) {
      walker.x+=1
    }
    else if (choice==2) {
      walker.y-=1
    }
    else if (choice==3) {
      walker.y+=1
    }
  }

  walker.show =function(){
    stroke(0)
    point(walker.x,walker.y)
  }

  return walker
}
