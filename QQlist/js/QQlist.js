var arr = [
    [
        "我的好友",[
        "小佳love",
        "从来就是这么正经",
        "leo是个胖子",
        "momo不是陌陌"
    ]
    ],
    [
        "企业好友",[
        "习近平",
        "普京",
        "奥巴马"
    ]
    ],
    [
        "黑名单",[
        "安倍",
        "杜特尔特",
    ]
    ]
];
var list = document.getElementById("list");
var str = "";
for (var i = 0; i < arr.length; i++) {
    str += "<h2><span></span>"+arr[i][0]+"</h2><ul>";
    for (var j = 0; j < arr[i][1].length; j++) {
        str += "<li style='width:280px'>"+ arr[i][1][j] +"</li>";
    }
    str += "</ul>";
}
list.innerHTML = str;
var h2s = list.getElementsByTagName("h2");
var uls = list.getElementsByTagName("ul");
for (var i = 0; i < h2s.length; i++) {
    h2s[i].onoff = false;//false对应的是隐藏
    //							true 对应的是显示
    h2s[i].index = i;
    h2s[i].onclick = function(){
        if( this.onoff == true ){//点击的那个是显示的
            this.className = "";//关掉它
            this.onoff = false;
            uls[this.index].style.display = "none";
        }else{//点击的那个是隐藏的
            //				全部关闭
            for (var i = 0; i < h2s.length; i++) {
                h2s[i].className = "";
                h2s[i].onoff = false;
                uls[i].style.display = "none";
            }
            //				打开点击的那个
            this.className = "active";
            this.onoff = true;
            uls[this.index].style.display = "block";
        }
    }
}