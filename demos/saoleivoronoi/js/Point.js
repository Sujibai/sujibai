class Point {
    constructor(x,y){
        this.color="#000"
        this.x=x
        this.y=y
        this.block=false
        this.edges=[]
        this.traingles=[]
        // this.r=Math.sqrt(Math.random())
        // this.theta=Math.random()*2*Math.PI
        // this.x=this.r*Math.cos(this.theta)
        // this.y=this.r*Math.sin(this.theta)

        // this.x=Math.random()*2-1
        // this.y=Math.random()*2-1
      }

    update(){
    }

    show(){
        let px=scalex*this.x+centerx
        let py=canvas.height-(scaley*this.y+centery)
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.strokeStyle='#000';
        ctx.lineWidth=2;
        ctx.arc(px,py,2,0,2*Math.PI)
        // ctx.stroke();
        ctx.fill()
        ctx.closePath();

    }
  
  }
  