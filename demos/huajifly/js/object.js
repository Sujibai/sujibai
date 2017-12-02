var Object=function(path){
  var image = new Image()
  image.src=path
  var o={
    image:image,
    x:0,
    y:0,
    speed:5,
  }

  o.show=function(context) {
    context.drawImage(o.image,o.x,o.y)
  }
  return o
}
