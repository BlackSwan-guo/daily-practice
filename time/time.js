var clock = document.getElementById("clock");
var str = "";
for (var i = 0; i < 60; i++) {//生成时针，分针，秒针
    if( i%5 == 0 ){
        str += "<div class='dot' style='transform:rotate("+ (6*i) +"deg);height:20px;'></div>";
    }else{
        str += "<div class='dot' style='transform:rotate("+ (6*i) +"deg)'></div>";
    }

}
clock.innerHTML = str;
var hour = document.getElementById("hour");
var min = document.getElementById("min");
var sec = document.getElementById("sec");
change();
setInterval(change,10);
function change(){
    var t = new Date();
    var s = t.getSeconds();//秒
    var m = t.getMinutes();//分
    var h = t.getHours();//小时
    var ms = t.getMilliseconds();//毫秒
    sec.style.transform = "rotate("+ (s+ms/1000)*6 +"deg)";
    min.style.transform = "rotate("+ (m+s/60)*6 +"deg)";
    hour.style.transform = "rotate("+ (h+m/60)*30 +"deg)";
}