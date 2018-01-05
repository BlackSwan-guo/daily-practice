//tab切换 有效保单与无效保单
$(".info").on("click",function(){
    $(this).addClass( "on" ).siblings().removeClass("on");
    $(".apply-list").eq($(this).index(".info") ).addClass("show").siblings().removeClass("show");
})

$("p").on("mousedown",function(){
    $(this.nextElementSibling).toggle();
    $(this).toggleClass("finished","change");
})