var list = document.getElementById("list")
var lis = list.getElementsByTagName("li");
var divs = list.getElementsByTagName("div");
var all = document.getElementById("all");
var div = all.getElementsByTagName("div");
changeCol();//隔行变色
function changeCol(){
    for (var i = 0; i < lis.length; i++) {
        if( i%2 ){//每隔两行变色
            lis[i].style.backgroundColor = "#f7c5ce";
            lis[i].col = "#f7c5ce";
        }else{
            lis[i].style.backgroundColor = "#fbe6ec";
            lis[i].col = "#fbe6ec";
        }
    }
}
var onoff = false;//false对应没选中
var num = 0;//计算当前选中数量
//操作所有li，对应的div选中，全选后最后的全选自动选中
for (var i = 0; i < lis.length; i++) {
    lis[i].index = i;
    lis[i].onoff = false;//定义false没有选中li
    lis[i].onmouseover = function(){
        this.style.backgroundColor = "#e76a81";//鼠标移入，当前这个li的颜色改变
    }

    lis[i].onmouseout = function(){
        if( !this.onoff ){//如果当前移出的li不是被选中的
            this.style.backgroundColor = this.col;//鼠标移出，当前的li没有被选中，li的颜色和之前一样
        }
    }
    lis[i].onclick = function(){//点击li
        if ( !this.onoff ){//当前li没有被选中
            divs[this.index].innerHTML = "√";//div内容为√
        }else{
            divs[this.index].innerHTML = "";//如果当前li已经选中，div内容为空
        }
        this.onoff = !this.onoff;//取反
        if( this.onoff ){//选中增加
            num++;
        }else{
            num--;//选中减少
        }
        if( num == lis.length ){//当所有li全部选中
            checkAll.innerHTML = "√";//最后的全选自动选中
            onoff = true;
        }else{
            checkAll.innerHTML = "";//全选没有选中，所有li都不选中，全不选
            onoff = false;
        }
    }
}
//点击全选
checkAll.onclick = function(){
    for (var i = 0; i < divs.length; i++) {
        if(onoff){//onoff = false
            divs[i].innerHTML = "";//li里的div没有被选中
            lis[i].style.backgroundColor = lis[i].col;//li的颜色不变
            lis[i].onoff = false;
        }else{
            divs[i].innerHTML = "√";//li里的div选中，内容为√
            lis[i].style.backgroundColor = "#e76a81";//li选中后颜色改变
            lis[i].onoff = true;
        }
    }
    if(onoff){
        this.innerHTML = "";//如果divs没有全部选中，最后的div不自动全选
        num = 0;
    }else{
        this.innerHTML = "√";//如果divs全部选中，最后的全选div自动全选
        num = lis.length;
    }
    onoff = !onoff;
}