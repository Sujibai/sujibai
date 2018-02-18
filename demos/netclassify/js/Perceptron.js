class Perceptron {
  constructor(){
    this.weight=[]
    for (var i = 0; i < 2; i++) {
      this.weight[i]=Math.random()-1/2
    }
    // this.bias=Math.random()/4-1/16
    this.bias=0
    this.percent=1/500
  }

  guess(input){
    let output=this.bias
    for (var i = 0; i < input.length; i++) {
      output+=this.weight[i]*input[i]
    }
    if (output>0) {
      output=-1
    } else {
      output=1
    }
    return output
  }

  train(inputs,target){
    let guess=this.guess(inputs)
    let error=guess-target
    for (var i = 0; i < inputs.length; i++) {
      this.weight[i]+=error*inputs[i]*this.percent
    }
    // console.log(guess,target,error);
  }

  show(){
    let starty=-(-1/2*this.weight[0]+this.bias)/this.weight[1]
    let endy=-(1/2*this.weight[0]+this.bias)/this.weight[1]
    ctx.beginPath();
    ctx.strokeStyle='#000';
    ctx.lineWidth=2;
    ctx.moveTo(0,starty*width+width/2);
    ctx.lineTo(width,endy*width+width/2);
    ctx.stroke();
    ctx.closePath();
  }

}
