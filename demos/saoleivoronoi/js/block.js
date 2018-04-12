class Block {
    constructor(point){
        this.point=point
        this.traingles=[]
        this.clines=[]
        this.edges=[] 
        this.edgepoints=[]
        this.color="#67ccff"
        this.x=Math.random()*2-1
        this.y=Math.random()*2-1
        this.ison=false
        this.ismarked=false
        this.isbomb=false
        this.neighbors=[]
        this.bombnumb=0
        this.neighbornumb=0
      }

    getedgepoints(){
        let curpoint=this.edges[0].points[0]
        this.edgepoints.push(curpoint)
        let checked=[]
        for (let i = 0; i < this.edges.length; i++) {
            for (let j = 0; j <this.edges.length; j++) {                
                if (!inarray(j,checked)&&this.edges[j].points[0].x==curpoint.x&&this.edges[j].points[0].y==curpoint.y) {
                    curpoint=this.edges[j].points[1]
                    this.edgepoints.push(curpoint)
                    checked.push(j)
                    break
                }
                if (!inarray(j,checked)&&this.edges[j].points[1].x==curpoint.x&&this.edges[j].points[1].y==curpoint.y) {
                    curpoint=this.edges[j].points[0]
                    this.edgepoints.push(curpoint)
                    checked.push(j)
                    break
                }
            }
        }
    }

    getneighbor(){
        for (let i = 0; i < this.clines.length; i++) {
            let neighborpoint=false
            if (this.clines[i].points[0]==this.point) {
                neighborpoint=this.clines[i].points[1]
            }
            if (this.clines[i].points[1]==this.point) {
                neighborpoint=this.clines[i].points[0]
            }
            // typeof(neighborpoint)!="undefined"
            if (neighborpoint&&neighborpoint.block) {
                this.neighbors.push(neighborpoint.block)
                this.neighbornumb+=1
            }
        }
    }

    getbomb(){
        for (let i = 0; i < this.neighbors.length; i++) {
                if (this.neighbors[i].isbomb) {
                    this.bombnumb+=1
                }
        }
    }

    update(){
        if (this.ison) {
            if (this.isbomb) {
                this.color="#f00"
            }else{
                this.color="#5DAC81"}
        } else {
            if (this.ismarked) {
                this.color="#FBE251"
            } else {
                this.color="#67ccff"}
        }
        // if (this.isbomb) {
        //     this.color="#f00"
        // }else if(!this.ison){
        //     this.color="#67ccff"
        // }
    }


    highlight(){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.strokeStyle='#ff0';
        ctx.lineWidth=2;
        let px=scalex*this.edgepoints[0].x+centerx
        let py=canvas.height-(scaley*this.edgepoints[0].y+centery)
        ctx.moveTo(px,py)
        for (let i = 1; i < this.edgepoints.length; i++) {
            px=scalex*this.edgepoints[i].x+centerx
            py=canvas.height-(scaley*this.edgepoints[i].y+centery)
            ctx.lineTo(px,py)
        }
        px=scalex*this.edgepoints[0].x+centerx
        py=canvas.height-(scaley*this.edgepoints[0].y+centery)
        ctx.lineTo(px,py)
        ctx.stroke();
        // ctx.fill()
        ctx.closePath();
    }


    area(){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.strokeStyle='#000';
        ctx.lineWidth=2;
        let px=scalex*this.edgepoints[0].x+centerx
        let py=canvas.height-(scaley*this.edgepoints[0].y+centery)
        ctx.moveTo(px,py)
        for (let i = 1; i < this.edgepoints.length; i++) {
            px=scalex*this.edgepoints[i].x+centerx
            py=canvas.height-(scaley*this.edgepoints[i].y+centery)
            ctx.lineTo(px,py)
        }
        px=scalex*this.edgepoints[0].x+centerx
        py=canvas.height-(scaley*this.edgepoints[0].y+centery)
        ctx.lineTo(px,py)
        // ctx.stroke();
        ctx.fill()
        if (this.ison&&!this.isbomb) {
            ctx.fillStyle = "#000";
            ctx.font = "normal 20px 微软雅黑";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            px=scalex*this.point.x+centerx
            py=canvas.height-(scaley*this.point.y+centery)
            ctx.fillText(this.bombnumb,px,py);
        }
        ctx.closePath();
    }
  }
  