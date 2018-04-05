class Block {
    constructor(i,j,blockwidth){
      this.row=i
      this.col=j
      this.width=blockwidth
      this.x=(this.col*3+1/2)*this.width+(this.row%2)*3*this.width/2+5
      this.y=this.row*(this.width*Math.sqrt(3)/2)+3
      this.color="#67ccff"
      this.ison=false
      this.ismarked=false
      this.isbomb=false
      this.numb=0
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
        // }
    }

    show(){
        let len=this.width-1
        let px=this.x
        let py=this.y
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.strokeStyle='#000';
        ctx.lineWidth=2;
        ctx.moveTo(px,py);
        px+=len
        ctx.lineTo(px,py);
        px+=len/2
        py+=len*Math.sqrt(3)/2
        ctx.lineTo(px,py);
        px-=len/2
        py+=len*Math.sqrt(3)/2
        ctx.lineTo(px,py);
        px-=len
        ctx.lineTo(px,py);
        px-=len/2
        py-=len*Math.sqrt(3)/2
        ctx.lineTo(px,py);
        px+=len/2
        py-=len*Math.sqrt(3)/2
        ctx.lineTo(px,py);
        // ctx.stroke();
        ctx.fill()
        // if(true){
        if (this.ison&&!this.isbomb) {
            ctx.fillStyle = "#000";
            ctx.font = "normal 28px 微软雅黑";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(this.numb,this.x+len/2,this.y+len*Math.sqrt(3)/2);
        }
        ctx.closePath();

    }
  
  }
  