var wrap = document.getElementById("wrap");
var scroe = document.getElementById("scroe");
var lose = document.getElementById("lose");
var snum = 0;
var lnum = 0;
var d = 2000;
//封装抖动函数
function shake(obj,attr,fn ){
    var arr=[];
    for( var i = 10; i > 0; i-- ){
        arr.push(-2*i,2*i);
    }
    arr.push(0);
    var num = -1;
    var timer;
    timer = setInterval(function(){
        num ++;
        if(  num ==arr.length){
            clearInterval(timer);
            //当抖动函数结束，执行fn
            fn && fn();
        }
        obj.style[attr] = arr[num]+"px";
    },20)
}
//生成div
function creatRect(){
    //创建一个div
    var div = document.createElement("div");
    div.className = "rect";
    //添加的div的left值是随机的为0-900
    div.style.left = ran(0,900)+"px";
    div.click = true;
    //点击div
    div.onclick = function(){
        if( !this.click ){
            return
        }
        this.click = false;
        d -=200;
        if(d < 600){
            d = 600;
        }
        //先停止下落
        clearInterval(div.timer);
        snum ++;
        scroe.innerHTML = "得分"+snum;
        //然后抖动
        shake(div,"margin-left",function(){
            //div消失
            wrap.removeChild( div );
            //生成新的div
            creatRect();
        });
    }
    wrap.appendChild(div);
    //在添加div后执行运动函数
    //在回调中添加wrap抖动
    move(div,{"top":500},d, function(){
        div.click = false;
        lnum++;
        lose.innerHTML = "失分"+lnum;
        if(lnum ==10){
            alert("游戏结束");
            d = 2000;
            lnum = 0;
            snum = 0;
            scroe.innerHTML = "得分"+snum;
            lose.innerHTML = "失分"+lnum;
        }
        shake(wrap,"margin-top",function(){
            wrap.removeChild(div);
            creatRect();
        });
    });
}
creatRect();

//封装生成范围内随机值
function ran(x,y){
    return Math.random()*(y-x)+x;
}
//运动框架
function move(obj, j, duration, fn,ease) {
    var ease = ease || "linear"
    var oldTime = new Date().getTime();
    var d = duration;
    var s = {};
    for(var attr in j) {
        s[attr] = {};
        s[attr].b = parseFloat(getComputedStyle(obj)[attr]);
        s[attr].c = j[attr] - s[attr].b;
    }
    obj.timer = setInterval(function() {
        var t = new Date().getTime() - oldTime;
        if(t >= d) {
            t = d
        }
        for(var attr in s) {
            var c = s[attr].c;
            var b = s[attr].b;
            var v = Tween[ease](t, b, c, d);
            if(attr == "opacity") {
                obj.style[attr] = v;
            } else {
                obj.style[attr] = v + "px";
            }
        }
        if(t == d) {
            clearInterval(obj.timer);
            fn && fn();
        }
    }, 16)
}