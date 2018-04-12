class Traingle {
    constructor(points){
        this.color="#000"
        this.points=points
        this.points.sort(compare("x"))
        this.edges=[]
        this.edges.push(new Edge([this.points[0],this.points[1]]))
        this.edges.push(new Edge([this.points[0],this.points[2]]))
        this.edges.push(new Edge([this.points[1],this.points[2]]))
        this.getCircle()
        this.googtraingle=true
        this.isTraingle()
      //   for (let i = 0; i < this.points.length; i++) {
      //     this.points[i].traingles.push(this)
      // }
      }

    getCircle(){
      this.x=0
      this.y=0
      let x0=this.points[0].x
      let y0=this.points[0].y
      let x1=this.points[1].x
      let y1=this.points[1].y
      let x2=this.points[2].x
      let y2=this.points[2].y
      let divmot=2*(x0*(y1-y2)+x1*(y2-y0)+x2*(y0-y1))
      this.x+=(x0**2+y0**2)*(y1-y2)+(x1**2+y1**2)*(y2-y0)+(x2**2+y2**2)*(y0-y1)
      this.x/=divmot
      this.y+=(x0**2+y0**2)*(x2-x1)+(x1**2+y1**2)*(x0-x2)+(x2**2+y2**2)*(x1-x0)
      this.y/=divmot
      this.outcenter=new Point(this.x,this.y)
      this.rad=Math.sqrt((this.x-x0)**2+(this.y-y0)**2)
    }

    isTraingle(){
      let k1=(this.points[2].y-this.points[1].y)/(this.points[2].x-this.points[1].x)
      let k2=(this.points[1].y-this.points[0].y)/(this.points[1].x-this.points[0].x)
      if (k1==k2) {
        this.googtraingle=false
      }
    }

    show(){
        ctx.beginPath();
        ctx.fillStyle="#67ccff";
        ctx.strokeStyle=this.color;
        ctx.lineWidth=1;
        let px=scalex*this.points[0].x+centerx
        let py=canvas.height-(scaley*this.points[0].y+centery)
        ctx.moveTo(px,py)
        px=scalex*this.points[1].x+centerx
        py=canvas.height-(scaley*this.points[1].y+centery)
        ctx.lineTo(px,py)
        px=scalex*this.points[2].x+centerx
        py=canvas.height-(scaley*this.points[2].y+centery)
        ctx.lineTo(px,py)
        px=scalex*this.points[0].x+centerx
        py=canvas.height-(scaley*this.points[0].y+centery)
        ctx.lineTo(px,py)
        ctx.stroke();
        // ctx.fill()
        ctx.closePath();
    }

    showCircle(){
        let px=scalex*this.outcenter.x+centerx
        let py=canvas.height-(scaley*this.outcenter.y+centery)
        let r=Math.min(scalex,scaley)*this.rad
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.strokeStyle=this.color;
        ctx.lineWidth=1;
        ctx.arc(px,py,r,0,2*Math.PI)
        ctx.stroke();
        // ctx.fill()
        ctx.closePath();
    }
  
  }
  