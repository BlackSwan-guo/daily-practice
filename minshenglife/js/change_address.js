var lis = document.getElementsByClassName("details_list");
function changeCol() {
    for (var i = 0; i < lis.length; i++) {
        if (i % 2) {
            lis[i].style.backgroundColor = "#fff";
            lis[i].col = "#fff";
        } else {
            lis[i].style.backgroundColor = "#f8f8f8";
            lis[i].col = "#f8f8f8";
        }
    }
}
changeCol();

//控制箭头方向
$("p").on("mousedown",function(){
    $(this.nextElementSibling).toggle();
    $(this).toggleClass("down","item_name");
})

//全选全不选
var all = document.getElementById("all");
var singels = document.getElementsByClassName("singel");
for( var i = 0; i < singels.length;i++ ){
    singels[i].onoff = false;
    singels[i].tap = function () {
        this.backgroundColor="#f2d4cc";
        this.onoff = !this.onoff;
        if( this.onoff ){
            num++;
        }else{
            num--;
        }
        if( num == singels.length ){
            all.style.backgroundColor = "#f2d4cc";
            onoff = true;
        }else{
            all.style.backgroundColor = "#fafafa";
            onoff = false;
        }
    }
}
var onoff = false;
var num = 0;
all.tap = function(){
    for (var i = 0; i < singels.length; i++) {
        if(onoff){
            singels[i].style.backgroundColor = "#fafafa";
            singels[i].onoff = false;
        }else{
            singels[i].style.backgroundColor ="#f2d4cc";
            singels[i].onoff = true;
        }
    }
    if(onoff){
        all.style.backgroundColor = "#fafafa";
        num = 0;
    }else{
        num = singels.length;
    }
    onoff = !onoff;
}

