//控制箭头方向
$("p").on("mousedown",function(){
    $(this.nextElementSibling).toggle();
    $(this).toggleClass("down","item_name");
})

