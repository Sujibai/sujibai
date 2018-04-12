class Edge {
    constructor(points){
        this.color="#fff"
        this.points=points
        this.points.sort(compare("x"))
        this.traingles=[]
        this.blocks=[]
      }

    show(){
        let px=scalex*this.points[0].x+centerx
        let py=canvas.height-(scaley*this.points[0].y+centery)
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.strokeStyle=this.color;
        ctx.lineWidth=2;
        ctx.moveTo(px,py)
        px=scalex*this.points[1].x+centerx
        py=canvas.height-(scaley*this.points[1].y+centery)
        ctx.lineTo(px,py)
        ctx.stroke();
        // ctx.fill()
        ctx.closePath();

    }
  
  }
  