/**
 * Created by xiao on 2017/2/15.
 */
var min_width = 60;
var max_width = 280;    
var CHANGEBGCOLOR = null;
var CHANGEWZ = null;
var WZ = null;
var titlText = document.getElementById("title_text");
var titleResult = document.getElementById("title_result_txt");
// var btn = document.getElementById("btn");

var alertReady = true;

window.onload = function(){
    //阻止微信下拉
    function preventTouch() {
        event.preventDefault();
    }
    document.addEventListener('touchmove', preventTouch);

    var oTitle = document.getElementById("title");
    var oLogo = document.getElementById("logo");

    $(".result_img").css('height',parseFloat($("body").width()*0.84*27/16 - 50)+'px');
    $(".result_img").css('marginTop',-parseFloat($("body").width()*0.84*27/16 - 35) / 2+'px');

    /*底部导航的高度*/
    $(".fix_btn a").css({
        height:parseFloat($(".fix_btn").height())+'px',
        lineHeight:parseFloat($(".fix_btn").height())+'px'
    });

    var list_parent_h = parseFloat($("body").height())*0.76;
    // $(".WZ_CHOOSE .list").css('height',list_parent_h*0.38+'px');
    // $(".WZ_CHOOSE2 .list").css('height',list_parent_h*0.38+'px');
    // 拖拽层级
    zIndex = 10;

    /*一键生成返回*/
    $(".result_back").click(function(){
        $(".result_box").fadeOut();
    });

    /*一键生成*/
    $('.create_btn').click(function(){
        $(".result_box").fadeIn();
        $(".loading").removeClass('hidden');
        $(".result_img").addClass('hidden');
        var logo = $("#logo");
        var title = $("title");
        var body_el = $("body");
        var el_img = $("#element_img");
        var el_img2 = $("#element_img2");
        var el_text = $("#scaling_el");

        var body_bg = $(".body img").attr("src");

        $.post(
            'test2.json',
            {
                /*title*/
                title_axis_x:title.css('left'),
                title_axis_y:title.css('top'),
                title_width:title.css('width'),
                title_height:title.css('height'),
                title_color:title.css('color'),
                title_lineHeight:title.css('lineHeigh'),
                title_fontSize:title.css('fontSize'),
                title_content:title.find('.edit_text').text(),
                title_scale:title.attr('d2_scale'),
                title_rotate:title.attr('data-rotate'),

                /*logo*/
                logo_axis_x:logo.css('left'),
                logo_axis_y:logo.css('top'),
                logotitle_width:logo.css('width'),
                logotitle_height:logo.css('height'),
                logo_scale:logo.attr('d2_scale'),
                logo_rotate:logo.attr('data-rotate'),

                /*图片元素1*/
                el_img_axis_x:el_img.css('left'),
                el_img_axis_y:el_img.css('top'),
                el_img_width:el_img.attr('data-width'),
                el_img_height:el_img.attr('data-height'),
                el_img_borderColor:el_img.css('borderColor'),
                el_img_borderWidth:el_img.css('borderWidth'),
                el_img_pic:el_img.find('img').prop('src'),
                el_img_scale:el_img.attr('d2_scale'),
                el_img_rotate:el_img.attr('data-rotate'),
                /*图片元素2*/
                el_img_axis_x2:el_img2.css('left'),
                el_img_axis_y2:el_img2.css('top'),
                el_img_height2:el_img2.attr('data-width'),
                el_img_height2:el_img2.attr('data-height'),
                el_img_borderColor2:el_img2.css('borderColor'),
                el_img_borderWidth2:el_img2.css('borderWidth'),
                el_img_pic2:el_img2.find('img').prop('src'),
                el_img_scale2:el_img2.attr('d2_scale'),
                el_img_rotate2:el_img2.attr('data-rotate'),

               /* *//*文字元素*//*
                el_text_axis_x:el_text.css('left'),
                el_text_axis_y:el_text.css('top'),
                el_text_width:el_text.css('width'),
                el_text_height:el_text.css('height'),
                el_text_color:el_text.css('color'),
                el_text_lineHeight:el_text.css('lineHeigh'),
                el_text_fontSize:el_text.css('fontSize'),
                el_text_content:el_text.find('.edit_text').text(),
                el_text_title_scale:el_text.attr('d2_scale'),
                el_text_title_rotate:el_text.attr('data-rotate'),*/

                /*整个body*/
                body_bg:body_bg,
                body_bg_size:body_el.css('backgroundSize')
            },
            function(result){
                $(".loading").addClass('hidden');
                $(".result_img").removeClass('hidden');
                $(".result_img img").prop('src','images/theme1.jpg');
            }
        )
    });

    /*编辑框的出现*/
    $('.drag_pos').bind('touchstart',function(){
        $('.edit_box').hide();
        $('.drag_pos_dashed').show();
        $('.rotate_el').hide();
        $(this).find('.edit_box').show();
        $(this).find('.drag_pos_dashed').hide();
        $(this).find('.rotate_el').show();

    });

    $('#title').bind('click',function(){
        // $('#title').css("zIndex",120);
        $('.titleMask').css("zIndex",zIndex++);
        $('.titleMask').fadeIn();
        txt_edit($('#title'));
        $('.titleMask li').find('button').bind('touchstart');
    });

    /*旋转*/
    var d = 0;
    var rotate_el = document.getElementById('rotate_el');
    var rotate_el2 = document.getElementById('rotate_el2');
    var oElement_img = document.getElementById("element_img");
    var oElement_img2 = document.getElementById("element_img2");
    scaleORrotate(oElement_img,rotate_el);
    scaleORrotate(oElement_img2,rotate_el2);

    /*缩放*/
    var d1 = 0;
    var d2 = 1;
    var scaling_el = document.getElementById("scaling_el");
    var scaling_el1 = document.getElementById("scaling_ele");
//    scaleORrotate(scaling_el,scaling_el1);

    //文字块修改背景和边框
    $('#element_img').on("click",function(){

        if(!alertReady) return ;

        CHANGEWZ = null;
        WZ = $('#element_img');
        var obj = $('.WZ_CHOOSE');

        $(obj).find(".default_bg_div").off("click");
        $(obj).find(".upload_img_box").off("click");
        $(".WZ_border button").off("click");
        $('.WZ_color p .color_change').off("click");

        setTimeout(function(){
            CHANGEWZ = function (obj,WZ){
                $(obj).fadeIn();
                $(obj).css("zIndex",zIndex++);
                var INITBG = $(WZ).find("img").attr("src") ;
                var imgBl = true;
                var CHANGEBG = INITBG;
                var isChange = false;

                $(obj).find(".upload_img_box .checked").removeClass("on");
                $(obj).find(".default_bg_div").removeClass("on");


                //图片选择
                $(obj).find(".default_bg_div").each(function(){
                    if($(this).find("img").attr("src") == INITBG){
                        $(this).addClass("on");
                        imgBl = true;
                        isChange = false;
                        return false;
                    }
                });
                $(obj).find(".upload_img_box img").each(function(){
                    if( $(this).attr("src") == INITBG){
                        $(this).parent().find(".checked").addClass("on");
                        imgBl = false;
                        isChange = true;
                        return false;
                    }
                });

                //色彩选择
                $(obj).find(".default_bg_div").on("click",divClick);

                //图片选择
                $(obj).find(".upload_img_box").on("click",clickBox);



                var BORDER_W = $(WZ).css("borderWidth");
                var BORDER_C = rgbToHex($(WZ).css("borderColor"));

                console.log(BORDER_C+"----"+BORDER_W);
                $(".WZ_border span i").text(parseInt(BORDER_W));
               // $(".WZ_color p input").val(BORDER_C);
                $(".WZ_border button").on("click",bClick);

                $('.WZ_color p .color_change').on("click",changeFn);


                //边框样式
                var BORDER_S = $(WZ).css("borderStyle");
                $(".border_style select").val(BORDER_S);
                $(".border_style select").on("change",borderStyleChange);
                function borderStyleChange(){
                    console.log($(this).val());
                    var stl = $(this).val();
                    $(WZ).css("border",parseInt($(".WZ_border span i").html()) + "px "+stl+" " +  $(WZ).css("borderColor"));
                    choiceSize(WZ);

                }
                function clickBox(){
                    if($(this).find(".checked").hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        //图片选择
                        CHANGEBG = INITBG;

                    }else{
                        isChange = true;;
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).find(".checked").addClass("on");
                        //图片选择

                        CHANGEBG = $(this).find("img").attr("src");
                    }
                }

                function divClick(){
                    if($(this).hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");

                        CHANGEBG = INITBG;

                    }else{
                        isChange = false;
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).addClass("on");
                        CHANGEBG = $(this).find("img").attr("src");
                    }
                }

                function bClick(){
                    var BW = parseInt($(".WZ_border span i").html());
                    console.log("--->",BW)
                    var TYPE = $(this).val();
                    if(TYPE === "-"){
                        if(BW <= 0){
                            BW = 0;
                        }else{
                            BW -= 1;
                        }
                    }else if(TYPE ==="+"){
                        BW = parseInt(BW) + 1;
                    }
                    $(".WZ_border span i").html(BW);
                    $(WZ).css("border",BW + "px "+$(WZ).css("borderStyle")+"  " +  $(WZ).css("borderColor"));
                    choiceSize(WZ);
                }

                function changeFn(){
                    $(".colpick_full").show();
                    $(".colpick_current_color").css("backgroundColor",$(WZ).css("borderColor"));
                    $(".colpick_submit").on("click",change);
                    function change(){
                        console.log($(WZ).attr("id"));
                        $(WZ).css("border", parseInt($(".WZ_border span i").html())+ "px "+$(WZ).css("borderStyle")+" " +$(".colpick_current_color").css("backgroundColor"));
                        $(".colpick_full").hide();
                        $(".colpick_submit").off("click",change);
                    }
                    choiceSize(WZ);
                }


                $(obj).find(".close").on("click",function(){
                    console.log(BORDER_W,"----",BORDER_C);
                    $(WZ).css("border",parseInt(BORDER_W) + "px "+BORDER_S+" " + BORDER_C);

                    $(obj).fadeOut();


                    $(obj).find(".default_bg_div").off("click",divClick);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    $(".WZ_border button").off("click",bClick);
                    $('.WZ_color p .color_change').off("click",changeFn);
                    $(".border_style select").off("change",borderStyleChange);

                });

                $(obj).find("button.sure_btn").on("click",function(){
                    $(obj).fadeOut();
                    $(obj).find(".default_bg_div").off("click",divClick);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    $(".WZ_border button").off("click",bClick);

                    $('.WZ_color p .color_change').off("click",changeFn);
                    $(".border_style select").off("change",borderStyleChange);



                    if(CHANGEBG != INITBG){
                        if(isChange){
                            $(WZ).find("img").attr("src",CHANGEBG) ;
                            resetImgFather(WZ);
                            var data = getImgSize(CHANGEBG,WZ);
                            setImgS(data, $(WZ).find("img"));
                            resetDivSize(data,WZ);
                            choiceSize(WZ);
                        }else{
                            $(WZ).find("img").attr("src",CHANGEBG) ;
                            resetImgOriginal(WZ);
                            choiceSize(WZ);
                        }
                    }
                });
            }
            CHANGEWZ(obj,WZ)
        },1);
    });


    $('#element_img2').on("click",function(){
        if(!alertReady) return ;
        CHANGEWZ = null;
        WZ = $('#element_img2');
        var obj = $('.WZ_CHOOSE2');

        $(obj).find(".default_bg_div").off("click");
        $(obj).find(".upload_img_box").off("click");
        $(".WZ_border button").off("click");
        $('.WZ_color p .color_change').off("click");

        setTimeout(function(){
            CHANGEWZ = function (obj,WZ){
                $(obj).fadeIn();
                $(obj).css("zIndex",zIndex++);
                var INITBG = $(WZ).find("img").attr("src") ;
                var imgBl = true;
                var CHANGEBG = INITBG;
                var isChange = false;

                $(obj).find(".upload_img_box .checked").removeClass("on");
                $(obj).find(".default_bg_div").removeClass("on");


                //图片选择
                $(obj).find(".default_bg_div").each(function(){
                    if($(this).find("img").attr("src") == INITBG){
                        $(this).addClass("on");
                        imgBl = true;
                        isChange = false;
                        return false;
                    }
                });
                $(obj).find(".upload_img_box img").each(function(){
                    if( $(this).attr("src") == INITBG){
                        $(this).parent().find(".checked").addClass("on");
                        imgBl = false;
                        isChange = true;
                        return false;
                    }
                });

                //色彩选择
                $(obj).find(".default_bg_div").on("click",divClick);

                //图片选择
                $(obj).find(".upload_img_box").on("click",clickBox);



                var BORDER_W = $(WZ).css("borderWidth");
                var BORDER_C = rgbToHex($(WZ).css("borderColor"));
                console.log(BORDER_C+"----"+BORDER_W);
                $(".WZ_border span i").text(parseInt(BORDER_W));
                //$(".WZ_color p input").val(BORDER_C);
                $(".WZ_border button").on("click",bClick);

                $('.WZ_color p .color_change').on("click",changeFn);

                //边框样式
                var BORDER_S = $(WZ).css("borderStyle");
                $(".border_style select").val(BORDER_S);
                $(".border_style select").on("change",borderStyleChange);
                function borderStyleChange(){
                    console.log($(this).val());
                    var stl = $(this).val();
                    $(WZ).css("border",parseInt($(".WZ_border span i").html()) + "px "+stl+" " +  $(WZ).css("borderColor"));
                    choiceSize(WZ);

                }

                function clickBox(){

                    if($(this).find(".checked").hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        //图片选择
                        CHANGEBG = INITBG;

                    }else{
                        isChange = true;
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).find(".checked").addClass("on");
                        //图片选择
                        CHANGEBG = $(this).find("img").attr("src");
                    }
                }

                function divClick(){
                    if($(this).hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        CHANGEBG = INITBG;
                    }else{
                        isChange = false;
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).addClass("on");
                        CHANGEBG = $(this).find("img").attr("src");
                    }
                }

                function bClick(){
                    var BW = parseInt($(".WZ_border span i").html());
                    console.log("--->",BW)
                    var TYPE = $(this).val();
                    if(TYPE === "-"){
                        if(BW <= 0){
                            BW = 0;
                        }else{
                            BW -= 1;
                        }
                    }else if(TYPE ==="+"){
                        BW = parseInt(BW) + 1;
                    }
                    $(".WZ_border span i").html(BW);
                    $(WZ).css("border",BW + "px solid " + $(WZ).css("borderColor"));
                    choiceSize(WZ);
                }

                function changeFn(){
                    $(".colpick_full").show();
                    $(".colpick_current_color").css("backgroundColor",$(WZ).css("borderColor"));
                    $(".colpick_submit").on("click",change);
                    function change(){
                        console.log($(WZ).attr("id"))
                        $(WZ).css("border", parseInt($(".WZ_border span i").html())+ "px solid " +$(".colpick_current_color").css("backgroundColor"));
                        $(".colpick_full").hide();
                        $(".colpick_submit").off("click",change);
                    }
                    choiceSize(WZ);
                }


                $(obj).find(".close").on("click",function(){
                    console.log(BORDER_W,"----",BORDER_C);
                    $(WZ).css("border",parseInt(BORDER_W) + "px solid " + BORDER_C);
                    
                    $(obj).fadeOut();


                    $(obj).find(".default_bg_div").off("click",divClick);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    $(".WZ_border button").off("click",bClick);
                    $('.WZ_color p .color_change').off("click");
                    $(".border_style select").off("change",borderStyleChange);
                });

                $(obj).find("button.sure_btn").on("click",function(){
                    $(obj).fadeOut();
                    $(obj).find(".default_bg_div").off("click",divClick);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    $(".WZ_border button").off("click",bClick);
                    $(".border_style select").off("change",borderStyleChange);
                    $('.WZ_color p .color_change').off("click");


                    if(CHANGEBG != INITBG){
                        if(isChange){
                            $(WZ).find("img").attr("src",CHANGEBG) ;
                            resetImgFather(WZ);
                            var data = getImgSize(CHANGEBG,WZ);
                            setImgS(data, $(WZ).find("img"));
                            resetDivSize(data,WZ);
                            choiceSize(WZ);
                        }else{
                            $(WZ).find("img").attr("src",CHANGEBG) ;
                            resetImgOriginal(WZ);
                            choiceSize(WZ);
                        }
                    }
                });
            }
            CHANGEWZ(obj,WZ)
        },1);
    });

    /*拖拽*/
    drag(oTitle);
    drag(oLogo);
    drag(oElement_img);
    drag(oElement_img2);
    //初始化编辑框
    initEditBox();

    /*添加移除class*/
    $('.fontSize span').click(function () {
        var _index = $(this).parents('.modify-options').attr('data-num');
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('.edit_text').eq(_index).css('fontSize',$(this).text());
        $(this).parents('li').find('i').text($(this).text());
    });
   

    /*底部三个按钮事件*/
    $('.bg_choose_btn').click(function () {
        $('.BG_CHOOSE').fadeIn();
        CHANGEBGCOLOR = null;
        setTimeout(function(){

            CHANGEBGCOLOR = function (obj){
                console.log("body");
                $(obj).css("zIndex",zIndex++);
                $(obj).find(".upload_img_box .checked").removeClass("on");
                $(obj).find(".default_bg_div").removeClass("on");


                var INITBG = $(".body").find("img").attr("src") ;

                var bgBl = true;


                $(obj).find(".default_bg_div").each(function(){
                    if($(this).find("img").attr("src") == INITBG){
                        $(this).addClass("on");
                        bgBl = true;
                        return false;
                    }
                })
           
                //图片选择
                $(obj).find(".upload_img_box img").each(function(){
                    if( $(this).attr("src") ==INITBG){
                        $(this).parent().find(".checked").addClass("on");
                        bgBl = false;
                        return false;
                    }
                 });
                


                //自带图片选择
                $(obj).find(".default_bg_div").on("click",clickDiv);
                //图片选择
                $(obj).find(".upload_img_box").on("click",clickBox);
                function clickBox(){
                    if($(this).find(".checked").hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        //图片选择
                        $(".body img").attr("src", INITBG);
                        if(bgBl){
                            resetBgImg();
                        }else{
                            setImgS(getImgSize(INITBG,"body"),".body img");
                        }

                        
                    }else{
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");
                        $(this).find(".checked").addClass("on");
                        //图片选择
                        $(".body img").attr("src",$(this).find("img").attr("src"));
                        setImgS(getImgSize($(this).find("img").attr("src"),"body"),".body img");
                    }
                }

                function clickDiv(){
                    if($(this).hasClass("on")){
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");

                        $(".body img").attr("src", INITBG);
                        if(bgBl){
                            resetBgImg();
                        }else{
                            setImgS(getImgSize(INITBG,"body"),".body img");
                        }
                        
                    }else {
                        $(obj).find(".upload_img_box .checked").removeClass("on");
                        $(obj).find(".default_bg_div").removeClass("on");

                        $(this).addClass("on");
                        $(".body img").attr("src", $(this).find("img").attr("src"));


                        resetBgImg();
                        

                    }
                }

                $(obj).find(".close").on("click",function(){
                    $(obj).fadeOut();

                    //图片选择
                    $(".body img").attr("src", INITBG);


                    if(bgBl){
                        resetBgImg();
                    }else{
                        setImgS(getImgSize(INITBG,"body"),".body img");
                    }

                    $(obj).find(".default_bg_div").off("click",clickDiv);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    CHANGEBGCOLOR = null;

                });
                $(obj).find("button.sure_btn").on("click",function(){
                    $(obj).fadeOut();
                    $(obj).find(".default_bg_div").off("click",clickDiv);
                    $(obj).find(".upload_img_box").off("click",clickBox);
                    CHANGEBGCOLOR = null;
                });
            }

            CHANGEBGCOLOR('.BG_CHOOSE');
        },1);
    });
//    随机按钮
    $(".randomBg_btn").click(upData);

    var scaling_el_n1 = document.getElementById("rotate_el_n1");
    scaleORrotate(oTitle,scaling_el_n1);
    var scaling_el_n2 = document.getElementById("rotate_el_n2");
    scaleORrotate(oLogo,scaling_el_n2);


//    颜色选择器
    $('#picker').colpick();
    $(".colpick_full").hide();
    //点击body关闭颜色选择框
    $(".colpick_full").on("click",function(e){
       e.stopPropagation();
    });
//更新页面数据
    upData();

    //删除元素
    $(".delete_d").on("click",function(){
        $(this).parent().parent().addClass("hidden");
    })

    //限制body的高度
    $('body').css("height",$(window).height() + "px");
    //重置title的属性宽高
    $('#title').attr({
        "data-width":parseFloat($("#title").css("width")),
        "data-height":parseFloat($("#title").css("height"))
    })
};



/*拖拽封装函数*/
function drag(oDiv){
    $(oDiv).on("touchstart",function(ev){

        var disX = ev.targetTouches[0].pageX - oDiv.offsetLeft;
        var disY = ev.targetTouches[0].pageY - oDiv.offsetTop;
        var oDivIndex = zIndex++;
        if($(oDiv) == $("#logo")){
            $(oDiv).css("zIndex",oDivIndex + 999);
        }else{
            $(oDiv).css("zIndex",oDivIndex);
        }
        
        function fnMove(ev){
            //位置
            var scale = $(oDiv).attr("d2_scale") || 1;
            scale = 1 + (scale - 1)/2;
            var l = ev.targetTouches[0].pageX - disX;
            var t = ev.targetTouches[0].pageY - disY;
            //位置限制
            if(t <= 4 * scale + ($(oDiv).attr("data-height") * scale - $(oDiv).attr("data-height")) ){
                t =  4 * scale + ($(oDiv).attr("data-height") * scale - $(oDiv).attr("data-height"));
            }
           /* if(t >= $(window).height() - $(oDiv).height()){
                t = $(window).height() - $(oDiv).height()
            }*/

            console.log( t)
             if(t >= $(window).height() - $(oDiv).attr("data-height") * scale - 4 * scale){
                t = $(window).height() - $(oDiv).attr("data-height") * scale - 4 * scale;
            }
            if(l <= 4 * scale + ($(oDiv).attr("data-width") * scale - $(oDiv).attr("data-width"))){
                l = 4 * scale + ($(oDiv).attr("data-width") * scale - $(oDiv).attr("data-width"));
            }
            /*if(l >= $(window).width() - $(oDiv).width()){
                l = $(window).width() - $(oDiv).width();
            }*/
            if(l >= $(window).width() - $(oDiv).attr("data-width") * scale - 4 * scale){
                l = $(window).width() - $(oDiv).attr("data-width") * scale - 4 * scale;
            }
            oDiv.style.left = l + "px";
            oDiv.style.top = t + "px";
        }
        function fnEnd(){
            //释放资源
            $(oDiv).off("touchmove",fnMove);
            $(oDiv).off("touchend",fnEnd);
        }

        $(oDiv).on("touchmove",fnMove);
        $(oDiv).on("touchend",fnEnd);

        //ev.preventDefault();
    });
}
//点击修改---出现选择框
function chang(obj) {
    obj.on("click",function(){
        console.log("111");
        if(obj.hasClass("border_add")) {
            obj.removeClass("border_add");
        }else{
            obj.addClass("border_add");
        }
    });
}
/*文字编辑封装函数*/
function txt_edit(obj){
    var border = obj.css("borderWidth");
    var fontSize = obj.find('.edit_text').css("fontSize");
    var color = obj.find('.edit_text').css("color");
    var content = obj.find('.edit_text').text();
    // $(".content_inp").val(content);
    $('.modify-options li').eq(0).find('i').text(color);
    $('.modify-options li').eq(1).find('i').html(fontSize);
    //初始化

    /*$(".content_inp").bind("input propertychange change", function (event) {
        var _index = $(this).parents('.modify-options').attr('data-num');
        if (event.type != "propertychange" || event.originalEvent.propertyName == "value") {
            $('.edit_text').eq(_index).html($(this).val());
        }
    });*/
    titlText.value = titleResult.innerText;
    /*btn.onclick = function(){
     console.log(tat.value);
     div.innerHTML = tat.value;
     }*/
    titlText.oninput = function(){
        console.log(titlText.value);
        titleResult.innerHTML = titlText.value;
        if($(this).parents(".modify-options").hasClass("titleMask")){
            $("#title").css({
                lineHeight:parseInt($("#title_result_txt").css("fontSize")) + 10 + "px",
                //height:$("#title_result_txt").outerHeight() + "px"
            });
            $("#title").find(".edit_box").css({
                height:$("#title_result_txt").outerHeight() + "px"
            });
        }
    }

    //修改字体颜色
    $('.color_change').bind("click",function () {
        var _this = this;
        $(".colpick_full").show();
        //点击body关闭颜色选择框
        setTimeout(function(){
            $("body").on("click",clickCloseColor);
        },0)
        $(".colpick_current_color").css("backgroundColor",obj.find('.edit_text').css("color"));
        $(".colpick_submit").on("click",function(){
            obj.find('.edit_text').css("color",$(".colpick_current_color").css("backgroundColor"));
            $(_this).parent().find('i').html($(".colpick_current_color").css("backgroundColor"));
            $(".colpick_full").hide();
            //点击body关闭颜色选择框
            $("body").off("click",clickCloseColor);
        })

    });
    //修改字体大小
    $('.add_minus_font').bind("touchstart",function (ev) {
        event.stopPropagation();
        var type = $(this).html();
        var num = parseInt($(this).parent().find('i').html());
        if(type == "-"){
            if(num > 12){
                num = num -2;
                $(this).parent().find('i').html(num + "px");
            }
        }else{
            if(num < 50){
                num = num + 2;
                $(this).parent().find('i').html(num + "px");
            }

        }
        obj.css("fontSize",num+"px");
        obj.find('.title_txt').css("fontSize",num+"px");
       
        choiceSize(obj);

    });
    //修改边框
    $('.add_minus').bind("touchstart",function (ev) {
        event.stopPropagation();
        var type = $(this).html();
        var num = parseFloat($(this).parent().find('i').html());
        if(type == "-"){
            if(num!=0){
                $(this).parent().find('i').html(--num + "px");
            }
        }else{
            $(this).parent().find('i').html(++num + "px");
        }
        obj.css("border",num+"px #000 solid");
        choiceSize(obj);
    });

    $('.sure_btn').on("touchstart",function () {
        $('.modify-options').fadeOut();
        $(obj).css("zIndex",1);
        $('.modify-options li').find('button').unbind('touchstart');
    });
}

/*旋转封装函数*/
function a2d(n){
    return n*180/Math.PI;
}
function scaleORrotate(oDiv1,oDiv2){
    var d1 = 0;
    var d2 = 1;
    oDiv2.addEventListener("touchstart",function(ev){
        event.stopPropagation();
        var oldD = d1;
        var oldD2 = d2;
        var isSOR = 0;//判断是选择还是缩放
        var isFirstIn = true; //首次进入
        $('.edit_box').hide();
        $(this).prev().show();
        function getD(ev){
            var x1 = oDiv1.offsetLeft + oDiv1.offsetWidth/2;
            var y1 = oDiv1.offsetTop + oDiv1.offsetHeight/2;

            var x2 = ev.targetTouches[0].pageX;
            var y2 = ev.targetTouches[0].pageY;

            var x = x2 - x1;
            var y = y1 - y2;
            var z = a2d(Math.atan2(y,x));
            return {x:x,y:y,z:z};
        }
        var downD = getD(ev);
        function fnMove(ev){
            var a = downD.x - getD(ev).x;
            var b = downD.y - getD(ev).y;
            var c = Math.abs(Math.abs(a) - Math.abs(b));
            if(Math.abs(a) > 10 || Math.abs(b) > 10 ){
                if(isFirstIn){
                    if(c > 5){
                        isSOR = 1;//旋转
                    }else{
                        isSOR = 2;//缩放
                    }
                }
                isFirstIn = false;
            }

            //禁止了旋转
            //d1 = (oldD + downD.z - getD(ev).z);

            if(d1 <= 0 && d1 > -20){
                d2 = oldD2 - (downD.x - getD(ev).x)/500;
            }
            else if(d1 <= 20 && d1 > 0){
                d2 = oldD2 + (downD.y - getD(ev).y)/500;
            }

            if(d2 <= min_width / parseFloat(oDiv1.offsetWidth)){
                d2 = min_width / parseFloat(oDiv1.offsetWidth);
            }
            if(Math.abs(d2) >= max_width / parseFloat(oDiv1.offsetWidth)){
                d2 = max_width / parseFloat(oDiv1.offsetWidth);
            }
            //禁止旋转
            //oDiv1.style.transform = "rotate("+d1+"deg)" +"scale("+d2+")";
            oDiv1.style.transform = "scale("+d2+")";

            oDiv1.setAttribute('d2_num',Math.round(d2*1000)/1000);
            oDiv1.setAttribute('d2_scale',Math.round(d2*1000)/1000);
            //禁止了旋转
            //oDiv1.setAttribute('d2_rotate',Math.round(d1*1000)/1000);
            console.log(oDiv1.getAttribute('d2_num'));
            alertReady = false;
        }

        function fnEnd(){
            oDiv2.removeEventListener("touchmove",fnMove,false);
            oDiv2.removeEventListener("touchend",fnEnd,false);
            setTimeout(function(){
                alertReady = true;
            },1000)
        }
        oDiv2.addEventListener("touchmove",fnMove,false);
        oDiv2.addEventListener("touchend",fnEnd,false);
        ev.preventDefault();
    },false);
}
//上传添加方法
function fn1(obj1){
        var obj = $(obj1).parents(".Bg_choose");
        console.log(obj.attr("class"));
        if(obj.hasClass("BG_CHOOSE")){
            CHANGEBGCOLOR = null;
            $(obj).find(".default_bg_div").off("click");
            $(obj).find(".upload_img_box").off("click");



            setTimeout(function(){

                CHANGEBGCOLOR = function (obj){
                    console.log("body");
                    $(obj).css("zIndex",zIndex++);
                    $(obj).find(".upload_img_box .checked").removeClass("on");
                    $(obj).find(".default_bg_div").removeClass("on");

                    var INITBG =   $(".body img").attr("src");

                    var bgBl = true;


                    $(obj).find(".default_bg_div").each(function(){
                        if($(this).find("img").attr("src") == INITBG){
                            bgBl = true;
                            return false;
                        }
                    })

                    //图片选择
                    $(obj).find(".upload_img_box img").each(function(){
                        if( $(this).attr("src") ==INITBG){
                            bgBl = false;
                            return false;
                        }
                    });




                    //上传的最后一个选中
                    var _this =  $(obj).find(".upload_img_box img").eq( $(obj).find(".upload_img_box img").length -1);
                    _this.parent().find(".checked").addClass("on");
                    $(".body").css("background","none");
                    $(".body").addClass("on");
                    $(".body img").attr("src",_this.attr("src"));
                    $("body").attr("data-src",_this.attr("src"));
                    setImgS(getImgSize(_this.attr("src"),"body"),".body img");


                    //色彩选择
                    $(obj).find(".default_bg_div").on("click",clickDiv);
                    //图片选择
                    $(obj).find(".upload_img_box").on("click",clickBox);
                    function clickBox(){
                        if($(this).find(".checked").hasClass("on")){
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            //图片选择
                            $(".body img").attr("src", INITBG);

                            if(bgBl){
                                resetBgImg();
                            }else{
                                setImgS(getImgSize(INITBG,"body"),".body img");
                            }
                        }else{
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            $(this).find(".checked").addClass("on");
                            //图片选择
                            $(".body img").attr("src",$(this).find("img").attr("src"));
                            setImgS(getImgSize($(this).find("img").attr("src"),"body"),".body img");
                        }
                    }

                    function clickDiv(){
                        if($(this).hasClass("on")){
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");

                            $(".body img").attr("src", INITBG);
                            if(bgBl){
                                resetBgImg();
                            }else{
                                setImgS(getImgSize(INITBG,"body"),".body img");
                            }

                        }else {
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");

                            $(this).addClass("on");
                            $(".body img").attr("src", $(this).find("img").attr("src"));
                            resetBgImg();
                        }
                    }

                    $(obj).find(".close").on("click",function(){
                        $(obj).fadeOut();

                        //图片选择
                        $(".body img").attr("src", INITBG);
                        if(bgBl){
                            resetBgImg();
                        }else{
                            setImgS(getImgSize(INITBG,"body"),".body img");
                        }

                        $(obj).find(".default_bg_div").off("click",clickDiv);
                        $(obj).find(".upload_img_box").off("click",clickBox);
                        CHANGEBGCOLOR = null;

                    });
                    $(obj).find("button.sure_btn").on("click",function(){
                        $(obj).fadeOut();
                        $(obj).find(".default_bg_div").off("click",clickDiv);
                        $(obj).find(".upload_img_box").off("click",clickBox);
                        CHANGEBGCOLOR = null;
                    });
                }

                 CHANGEBGCOLOR('.BG_CHOOSE');
            },1);
        }else {
            
            if(!alertReady) return ;
            
            CHANGEWZ = null;

            $(obj).find(".default_bg_div").off("click");
            $(obj).find(".upload_img_box").off("click");
            $(".WZ_border button").off("click");
            $('.WZ_color p .color_change').off("click");

            setTimeout(function(){
                CHANGEWZ = function (obj,WZ){
                    $(obj).fadeIn();
                    $(obj).css("zIndex",zIndex++);
                    var INITBG = $(WZ).find("img").attr("src") ;
                    var imgBl = true;
                    var CHANGEBG = '';
                    var isChange = true;

                    $(obj).find(".upload_img_box .checked").removeClass("on");
                    $(obj).find(".default_bg_div").removeClass("on");


                    //图片选择
                    $(obj).find(".default_bg_div").each(function(){
                        if($(this).find("img").attr("src") == INITBG){
                            imgBl = true;
                            return false;
                        }
                    });
                    $(obj).find(".upload_img_box img").each(function(){
                        if( $(this).attr("src") == INITBG){
                            imgBl = false;
                            return false;
                        }
                    });


                    //上传的最后一个选中
                    var _this =  $(obj).find(".upload_img_box img").eq( $(obj).find(".upload_img_box img").length -1);
                    _this.parent().find(".checked").addClass("on");
                    CHANGEBG = _this.attr("src");

                    //色彩选择
                    $(obj).find(".default_bg_div").on("click",divClick);

                    //图片选择
                    $(obj).find(".upload_img_box").on("click",clickBox);



                    var BORDER_W = $(WZ).css("borderWidth");
                    var BORDER_C = rgbToHex($(WZ).css("borderColor"));
                    console.log(BORDER_C+"----"+BORDER_W);
                    $(".WZ_border span i").text(parseInt(BORDER_W));
                    //$(".WZ_color p input").val(BORDER_C);
                    $(".WZ_border button").on("click",bClick);

                    $('.WZ_color p .color_change').on("click",changeFn);


                    //边框样式
                    var BORDER_S = $(WZ).css("borderStyle");
                    $(".border_style select").val(BORDER_S);
                    $(".border_style select").on("change",borderStyleChange);
                    function borderStyleChange(){
                        console.log($(this).val());
                        var stl = $(this).val();
                        $(WZ).css("border",parseInt($(".WZ_border span i").html()) + "px "+stl+" " +  $(WZ).css("borderColor"));
                        choiceSize(WZ);

                    }

                    function clickBox(){
                        if($(this).find(".checked").hasClass("on")){
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            //图片选择
                            CHANGEBG = INITBG;



                        }else{
                            isChange = true;
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            $(this).find(".checked").addClass("on");
                            //图片选择
                            CHANGEBG = $(this).find("img").attr("src");
                        }
                    }

                    function divClick(){
                        if($(this).hasClass("on")){
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            CHANGEBG = INITBG;
                        }else{
                            isChange = false;
                            $(obj).find(".upload_img_box .checked").removeClass("on");
                            $(obj).find(".default_bg_div").removeClass("on");
                            $(this).addClass("on");
                            CHANGEBG = $(this).find("img").attr("src");
                        }
                    }

                    function bClick(){
                        var BW = parseInt($(".WZ_border span i").html());
                        console.log("--->",BW)
                        var TYPE = $(this).val();
                        if(TYPE === "-"){
                            if(BW <= 0){
                                BW = 0;
                            }else{
                                BW -= 1;
                            }
                        }else if(TYPE ==="+"){
                            BW = parseInt(BW) + 1;
                        }
                        $(".WZ_border span i").html(BW);
                        $(WZ).css("border",BW + "px solid " + $(WZ).css("borderColor"));
                        choiceSize(WZ);
                    }

                    function changeFn(){
                        $(".colpick_full").show();
                        $(".colpick_current_color").css("backgroundColor",$(WZ).css("borderColor"));
                        $(".colpick_submit").on("click",change);
                        function change(){
                            console.log($(WZ).attr("id"))
                            $(WZ).css("border", parseInt($(".WZ_border span i").html())+ "px solid " +$(".colpick_current_color").css("backgroundColor"));
                            $(".colpick_full").hide();
                            $(".colpick_submit").off("click",change);
                        }
                        choiceSize(WZ);
                    }


                    $(obj).find(".close").on("click",function(){
                        console.log(BORDER_W,"----",BORDER_C);
                        $(WZ).css("border",parseInt(BORDER_W) + "px solid " + BORDER_C);
                        $(obj).fadeOut();


                        $(obj).find(".default_bg_div").off("click",divClick);
                        $(obj).find(".upload_img_box").off("click",clickBox);
                        $(".WZ_border button").off("click",bClick);
                        $('.WZ_color p .color_change').off("click");
                        $(".border_style select").off("change",borderStyleChange);
                    });

                    $(obj).find("button.sure_btn").on("click",function(){
                        $(obj).fadeOut();
                        $(obj).find(".default_bg_div").off("click",divClick);
                        $(obj).find(".upload_img_box").off("click",clickBox);
                        $(".WZ_border button").off("click",bClick);

                        $('.WZ_color p .color_change').off("click");
                        $(".border_style select").off("change",borderStyleChange);


                        if(CHANGEBG != INITBG){
                            if(isChange){
                                $(WZ).find("img").attr("src",CHANGEBG) ;
                                resetImgFather(WZ);
                                var data = getImgSize(CHANGEBG,WZ);
                                setImgS(data, $(WZ).find("img"));
                                resetDivSize(data,WZ);
                                choiceSize(WZ);
                            }else{
                                $(WZ).find("img").attr("src",CHANGEBG) ;
                                resetImgOriginal(WZ);
                                choiceSize(WZ);
                            }
                        }
                    });
                }
                CHANGEWZ(obj,WZ)
            },1);
        }
}


//随机数
function rnd(min,max){
    return min + Math.floor(Math.random() * (max -min));
}

//RGB转化成16进制 #
var rgbToHex = function(rgb) {
    // rgb(x, y, z)
    var color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
    var hex = "#";
    for (var i = 0; i < 3; i++) {
        // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
        // 'color[i]' 是数组，要转换成字符串.
        // 如果结果是一位数，就在前面补零。例如： A变成0A
        hex += ("0" + Number(color[i]).toString(16)).slice(-2);
    }
    return hex;
}
//修改选择框的大小
function choiceSize(obj){
    var w = parseInt($(obj).css("width"));
    var h = parseInt($(obj).css("height"));
    var b = parseInt($(obj).css("borderWidth"));
    console.log("--->",w+"H:",h+"B:",b)
    $(obj).find('.edit_box').css({
        top: -b -2 + "px",
        left: -b - 2 + "px"
    });
    $(obj).find('.drag_pos_dashed').css({
        top: -b - 1 + "px",
        left: -b - 1 + "px"
    });
}


//初始化编辑框样式
function initEditBox(){

    $(".edit_box").each(function(){
        $(this).parent().css({
            '-webkit-box-sizing': "border-box",
            '-moz-box-sizing': "border-box",
            boxSizing: "border-box"
        });
        $(this).css({
            width:$(this).parent().outerWidth() + "px",
            height:$(this).parent().outerHeight() + "px"
        })
    })

    $(".drag_pos_dashed").each(function(){
        $(this).parent().css({
            '-webkit-box-sizing': "border-box",
            '-moz-box-sizing': "border-box",
            boxSizing: "border-box"
        });
        $(this).css({
            width:$(this).parent().outerWidth() + "px",
            height:$(this).parent().outerHeight() + "px"
        })
    })
}
/*计算比例系数*/
function constrainFn(bgW,bgH,obj){
    var ScreenH = parseFloat($("body").height()) * 0.94;
    var ScreenW = parseFloat($("body").width());
    var scaleW = bgW / ScreenW;
    var scaleH = bgH / ScreenH;
    return {
        l:obj.l / scaleW,
        t:obj.t / scaleH,
        w:obj.w / scaleW,
        h:obj.h / scaleH
    }
};

//根据后台更新页面
function upData() {
    $(".body").removeClass("on");


    $.get(
        "test1.json",
        function(data){

            console.log(data);
            var logo = $("#logo");
            var title = $("#title");
            var el_img = $("#element_img");
            var el_img2 = $("#element_img2");
            var el_text = $("#scaling_el");
            var bgH = data.base.bgheight;
            var bgW = data.base.bgwidth;


            //所有元素显示
            logo.removeClass("hidden");
            title.removeClass("hidden");
            el_img.removeClass("hidden");
            el_img2.removeClass("hidden");
            logo.css("border","none");
            title.css("border","none");
            el_img.css("border","none");
            el_img2.css("border","none");

            //员工信息
            var user = $(".user_info p");
            var user_img = $(".leftImgBox");
            var user_qr = $(".code_div");
            var user_name = user.eq(0);
            var user_nickname = user.eq(1);
            var user_sraffNo = user.eq(2);
            var user_mobile = user.eq(3);

            if(data.base.show_user_headimg == 1){
                user_img.removeClass("hidden");
                user_img.find("img").attr("src",data.userinfo.headimgurl);
            }else{
                user_img.addClass("hidden");
            }
            if(data.base.show_user_qr == 1){
                user_qr.removeClass("hidden");
                user_qr.find("img").attr("src",data.userinfo.qr);
            }else{
                user_qr.addClass("hidden");
            }

            if(data.userinfo.name != null){
                user_name.removeClass("hidden");
                user_name.text("姓名："+data.userinfo.name);
            }else{
                user_name.addClass("hidden");
            }

            if(data.base.show_user_nickname == 1){
                user_nickname.removeClass("hidden");
                user_nickname.text("昵称："+data.userinfo.nickname);
            }else{
                user_nickname.addClass("hidden");
            }

            if(data.base.show_user_no == 1){
                user_sraffNo.removeClass("hidden");
                user_sraffNo.text("工号："+data.userinfo.staffNo);
            }else{
                user_sraffNo.addClass("hidden");
            }

            if(data.base.show_user_mobile == 1){
                user_mobile.removeClass("hidden");
                user_mobile.text("电话："+data.userinfo.mobile);
            }else{
                user_mobile.addClass("hidden");
            }

            //民生logo
            var minLogo = $(".minsheng_qr");
            if(data.base.show_qr == 1){
                minLogo.removeClass("hidden");
                minLogo.find("img").attr("src",data.base.qr_img_url);
            }

            //天气和口号
            var weather = $(".information");
            var slogan = $(".slogan");
            if(data.base.show_weather == 1){
                weather.removeClass("hidden");
                weather.text(data.weather.city+":"+data.weather.weather+"--"+data.weather.temp1+"~"+data.weather.temp2);
            }else{
                weather.addClass("hidden");
            }

            if(data.base.watchword != null){
                slogan.removeClass("hidden");
                slogan.text(data.base.watchword);
            }else{
                slogan.addClass("hidden");
            }







            /*title*/
            var title11  = constrainFn(bgW,bgH,{
                l:data.title.axis_x,
                t:data.title.axis_y,
                w:data.title.width,
                h:data.title.height
            });
            title.css({
                top:title11.t+'px',
                width:title11.w+'px',
                left:title11.l+'px',
                //height:title11.h+'px',
                color:'#'+data.title.font_color,
                lineHeight:title11.h+'px',
                fontSize:data.title.font_size+'px',
                zIndex:"10"
            });

            title.find('.edit_text').html(data.title.content);
            if(data.title.exist) {
                title.show();
            }else{
                title.hide();
            }
            $(title).css({
                lineHeight:parseInt($("#title_result_txt").css("fontSize")) + 10 + "px",
            });
            $(title).find(".edit_box").css({
                height:$("#title_result_txt").outerHeight() + "px"
            });
            title.attr("data-width",title11.w);
            title.attr("data-height",title11.h);
            /*logo*/
            logo.css({
                top:data.logo.axis_y+'px',
                width:data.logo.width+'px',
                left:data.logo.axis_x+'px',
                height:data.logo.height+'px',
                zIndex:"999"
            });
            if(data.logo.exist) {
                logo.show();
            }else{
                logo.hide();
            }
            logo.attr("data-width",data.logo.width);
            logo.attr("data-height",data.logo.height);
            /*图片元素1*/
            var img1  = constrainFn(bgW,bgH,{
                l:data.element2.axis_x,
                t:data.element2.axis_y,
                w:data.element2.width,
                h:data.element2.height
            });
            el_img.css({
                top:img1.t+'px',
                width:img1.w+'px',
                left:img1.l+'px',
                height:img1.h+'px',
                borderWidth:data.element2.border_width+'px',
                borderColor:'#'+data.element2.border_color,
                zIndex:"1"
            });
            el_img.find('img').prop('src',data.element2.pic);
            el_img.attr("data-src",data.element2.pic);
            el_img.attr("data-width",img1.w);
            el_img.attr("data-height",img1.h);

            el_img.attr("data-width2",img1.w);
            el_img.attr("data-height2",img1.h);
            if(data.element2.exist) {
                el_img.show();
            }else{
                el_img.hide();
            }
            /*图片元素2*/
            var img2  = constrainFn(bgW,bgH,{
                l:data.element1.axis_x,
                t:data.element1.axis_y,
                w:data.element1.width,
                h:data.element1.height
            });
            el_img2.css({
                top:img2.t+'px',
                width:img2.w+'px',
                left:img2.l+'px',
                height:img2.h+'px',
                borderWidth:data.element1.border_width+'px',
                borderColor:'#'+data.element1.border_color,
                zIndex:"1"
            });
            el_img2.find('img').prop('src',data.element1.pic);
            el_img2.attr("data-src",data.element1.pic);
            el_img2.attr("data-width",img2.w);
            el_img2.attr("data-height",img2.h);

            el_img2.attr("data-width2",img2.w);
            el_img2.attr("data-height2",img2.h);
            if(data.element1.exist) {
                el_img2.show();
            }else{
                el_img2.hide();
            }

            $(".body").css("background","none");
            $(".body img").attr("src",data.base.background);

            //初始化编辑框样式
            var arr = [
                {w:title11.w,h:title11.h},
                {w:data.logo.width,h:data.logo.height},
                {w:img1.w,h:img1.h},
                {w:img2.w,h:img2.h}
            ]
            console.log(arr)
            $(".edit_box").each(function(index){
                $(this).parent().css({
                    '-webkit-box-sizing': "border-box",
                    '-moz-box-sizing': "border-box",
                    boxSizing: "border-box",
                    transform:"none"
                });
                $(this).css({
                    width:arr[index].w + "px",
                    height:arr[index].h + "px"
                })
                $(this).css({
                    top: - 2 + "px",
                    left: - 2 + "px"
                });

            })


            $(".drag_pos_dashed").each(function(index){
                $(this).parent().css({
                    '-webkit-box-sizing': "border-box",
                    '-moz-box-sizing': "border-box",
                    boxSizing: "border-box",
                    transform:"none"
                });
                $(this).css({
                    width:arr[index].w + "px",
                    height:arr[index].h + "px"
                })
                $(this).css({
                    top: - 1 + "px",
                    left: - 1 + "px"
                });

            })

        }
    );
}

//点击body关闭颜色选择框
function clickCloseColor(){
    $(".colpick_full").hide();
    $("body").off("click",clickCloseColor);
};
//获取上传图片原始大小,计算比例
function getImgSize(src,obj){
    var ImgW ;
    var ImgH ;
    var ScreenH;
    if($(obj) == $("body")){
        ScreenH = parseFloat($(obj).height()) * 0.94;
    }else{
        ScreenH = parseFloat($(obj).css("height"));
    }
    var ScreenW = parseFloat($(obj).width());

    var oImg = $(".hiddenImg");

    oImg.attr("src",src);
    ImgW = parseFloat(oImg.css("width"));
    ImgH = parseFloat(oImg.css("height"));
    console.log(ImgW,ImgH)
    console.log(constrainImg({"ImgW":ImgW,"ImgH":ImgH,"ScreenH":ScreenH,"ScreenW":ScreenW}))
    return constrainImg({"ImgW":ImgW,"ImgH":ImgH,"ScreenH":ScreenH,"ScreenW":ScreenW}) ;




}
//计算图片比例后大小
function constrainImg(data){
    var wScale = data.ImgW / data.ScreenW;
    var hScale = data.ImgH / data.ScreenH;

    console.log(data)
    if(wScale <= 1 && hScale <= 1){
        return {w:data.ImgW,h:data.ImgH};
    }else if(wScale > 1 && hScale <= 1){
        return {w:data.ImgW / wScale,h:data.ImgH / wScale};
    }else if(wScale <= 1 && hScale > 1){
        return {w:data.ImgW / hScale,h:data.ImgH / hScale};
    }else if(wScale > 1 && hScale > 1){
        if(wScale >= hScale){
            return {w:data.ImgW / wScale,h:data.ImgH / wScale};
        }else{
            return {w:data.ImgW / hScale,h:data.ImgH / hScale};
        }

    }
}
//设置图片位置信息
function setImgS(data,obj){
    $(obj).css({
        "width":data.w + "px",
        "height":data.h + "px",
        "marginTop":-data.h/2 + "px",
        "marginLeft":-data.w/2 + "px",
        "position":"absolute",
        "top":"50%",
        "left":"50%",
        "maxHeight":"inherit"
    })
}
//重置图片框框大小
function resetDivSize(data,obj){
    $(obj).css({
        "width":data.w + "px",
        "height":data.h + "px"
    })
    $(obj).attr({
        "data-width":data.w,
        "data-height":data.h
    });
    $(obj).find(".edit_box").css({
        "width":data.w + "px",
        "height":data.h + "px"
    })
    $(obj).find(".drag_pos_dashed").css({
        "width":data.w + "px",
        "height":data.h + "px"
    })
}

//恢复图片父集大小
function resetImgFather(WZ){
    $(WZ).css({
        "width":$(WZ).attr("data-width2") + "px",
        "height":$(WZ).attr("data-height2") + "px"
    });
    $(WZ).attr({
        "data-width":$(WZ).attr("data-width2"),
        "data-height":$(WZ).attr("data-height2")
    });
}

//恢复背景图片大小
function resetBgImg(){
    $(".body img").css({
        "width":"100%",
        "height":"100%",
        "marginTop":"0px",
        "marginLeft":"0px",
        "position":"absolute",
        "top":"0",
        "left":"0",
        "maxHeight":"100%"
    })
}
//恢复图片元素大小
function resetImgOriginal(WZ){
    $(WZ).css({
        "width":$(WZ).attr("data-width2") + "px",
        "height":$(WZ).attr("data-height2") + "px"
    });
    $(WZ).find(".edit_box").css({
        "width":$(WZ).attr("data-width2") + "px",
        "height":$(WZ).attr("data-height2") + "px"
    })
    $(WZ).find(".drag_pos_dashed").css({
        "width":$(WZ).attr("data-width2") + "px",
        "height":$(WZ).attr("data-height2") + "px"
    })
    $(WZ).attr({
        "data-width":$(WZ).attr("data-width2"),
        "data-height":$(WZ).attr("data-height2")
    });
    $(WZ).find("img").css({
        "width":"100%",
        "height":"100%",
        "marginTop":"0px",
        "marginLeft":"0px",
        "position":"absolute",
        "top":"0",
        "left":"0",
        "maxHeight":"100%"
    })
}















































































