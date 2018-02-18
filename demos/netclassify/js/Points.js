class Points {
  constructor(){
    this.x=Math.random()-1/2;
    this.y=Math.random()-1/2;
    if (this.x>this.y) {
      this.label=-1
    } else {
      this.label=1
    }
    this.color=this.setColor()
    this.done=false
  }

  setColor(){
    let r=0;
    let g=0;
    let b=0;
    let a=1;
    if (this.label==1) {
      r=255
    } else if (this.label==-1) {
      b=255
    }
    return "rgba("+r+','+g+','+b+','+a+")"
  }

  show(width){
    ctx.beginPath();
    ctx.arc((1/2+this.x)*width,(1/2+this.y)*width,4,0,2*Math.PI)
    ctx.closePath();
    ctx.fillStyle=this.color
    ctx.fill();
    if (this.done) {
      ctx.beginPath();
      ctx.arc((1/2+this.x)*width,(1/2+this.y)*width,3,0,2*Math.PI)
      ctx.closePath();
      ctx.fillStyle="#ff0"
      ctx.fill();
    }
  }
}
