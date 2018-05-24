let addList=function(position,data){
    let link= document.createElement("i");
    link.setAttribute("class","iconfont "+data.icon);
    link.setAttribute("id",data.id);
    link.onclick=function(){
        var keywords=encodeURI(document.getElementById('text').value);
        if (iscontrol) {
            if (keywords&&data.url1) {
                open(data.url1+keywords)//open in new tab
            }
            else {
                open(data.url0);
            }
        }
        else{
            if (keywords&&data.url1&&!iscontrol) {
                location.href=data.url1+keywords;//open in this tab
            }
            else {
                location.href=data.url0;
            }
        }
    }
    let td=document.createElement("td");
    td.appendChild(link);
    position.appendChild(td);
}
let iscontrol=false

document.onkeydown = function (e) {
    if (e.key=="Control") {
        iscontrol=true
    }
}

document.onkeyup = function (e) {
    if (e.key=="Control") {
        iscontrol=false
    }
}

let mainc=document.getElementById("maintab")
let index=0
let column=5
for (var i = 0; i < Math.ceil(maindata.length/column); i++) {
    
    let line=document.createElement("tr");
    for (let j = 0; j < column; j++) {
        console.log(index);
        if (index<maindata.length) {
            addList(line,maindata[index])
            index+=1
        }
    }
    mainc.appendChild(line)
}
