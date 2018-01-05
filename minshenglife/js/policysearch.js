//隔行变色
var lis = document.getElementsByClassName("clearfix");
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

//显示保险详细信息 下拉菜单
$(".policyname").on("mousedown",function(){
    $(this.nextElementSibling).toggle();
    $(this).toggleClass("down","item_name");
})

//tab切换 有效保单与无效保单
$(".policy").on("click",function(){
    $(this).addClass( "on" ).siblings().removeClass("on");
    $(".indate-list").eq($(this).index(".policy") ).addClass("show").siblings().removeClass("show");
})
