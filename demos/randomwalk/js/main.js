  var w

function setup() {
  createCanvas(windowWidth,windowHeight)
  background(255)
  w=new Walker()
}

function draw() {
  w.walk()
  w.show()
}
