/**
 * ydui工具扩展
 * @authors Your Name (you@example.org)
 * @date    2017-08-22 10:26:45
 * @version $Id$
 */
var web_root_path = "http://wx.qqclubs.cn";
var web_login_url = "/login.html";
var Utils = {};
//微信初始化
Utils.wxInit = function(_options){
    $.ajax({
        url: '/club/wx/getwxconfig',
        type: 'post',
        dataType: 'json',
        data: {returnurl: location.href},
        async: false,
        success: function(result){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.appid, // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.noncestr, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名，见附录1
                jsApiList: ['getLocation', 'previewImage', 'openLocation','onMenuShareTimeline', 
                'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            if(_options){
                wx.ready(function(){
                    _options.onready();
                });
                wx.error(function(res){
                    _options.onerror(res);
                });
            }
        }
    });
}
Utils.ajax = function(options, callback, tips) {
    options = options || {};
    $.ajax({
        url: options.url,
        type: options.type || 'post',
        data: options.data,
        dataType: options.dataType || 'json',
        cache: false,
        async: options.async || true,
        success: options.success || function(res) {
        	var dialog = YDUI.dialog;
        	//忽略错误，将结果返回
        	var bIgnoreErr = options.ignoreErr || false;
            if (res.success || bIgnoreErr) {
                callback && callback(res || {});
            } else {
                //登录校验置前，未登录跳转到登录页
                if (res.success == false && res.message == "您没登录，请先登录！") {
                    location.href = web_login_url;
                    Utils.urlHistory(options.data);
                    return;
                }
                //权限校验，无权限跳转至无权限页面
                /*if(res.noAccessAuth){
                	location.href="personal.html#noAccessAuth/" + res.friendId;
                	return;
                }*/
                //弹出服务端响应的错误信息
                dialog.toast(res.message || ((tips || 'Error') + ': 系统错误'), 'error', 1000, function () {
	                callback && callback(res || {});
	            });
            }
        },
        error: function(err, msg) {
            window.console && console.log && console.error('DATE_ERROR：' + msg);
        }
    });
}
//普通渲染
Utils.ajaxRender = function(options, fn) {
	//var dialog = YDUI.dialog;
    //dialog.loading.open('正在努力加载...');
    //临时保存检索条件
    YDUI.listParmas = options;
    Utils.ajax({
        url: options.url,
        type: options.type || "post",
        data: options.data
    }, function(result) {
        if(!result.success){
            //dialog.loading.close();
            return;
        }
        laytpl($('#' + options.tpl).html()).render(result, function(html) {
            $('#' + options.cont).html(html);
            //dialog.loading.close();
            //渲染之后的回调函数
            if (fn) fn(result);
        });
        
    });
}
//无限滚动刷新渲染
Utils.ajaxRenderScroll = function(options, fn){
    //options.data.currPage = options.data.currPage || 1;
    //options.pageType = options.pageType || 1;
    options.data = options.data || {};
    var $cont = $('#' + options.cont);
    $cont.html("");
    options.data.pageSize = options.data.pageSize || 10;
    var sHtmlTpl = $('#' + options.tpl).html();
    $('#' + options.scrollview).infiniteScroll({
        binder: '#' + options.scrollview,
        pageSize: options.data.pageSize,
        initLoad: true,
        loadingHtml: '<strong>加载中...</strong>', /* 当然也可以<img src="../img/loading.gif" /> */
        doneTxt: options.doneTxt || "",
        /*backposition: true,
        jumpLink: '.biz_link',*/
        loadListFn: function () {
            var def = $.Deferred();
            //console.log(options.data);
            Utils.ajax({
                url: options.url,
                type: options.type || "post",
                data: options.data,
                dataType: "json"
            }, function(result) {
                var ldata = result.data.ldata || result.data.content;
                var currPage = result.data.startPage || result.data.number;
                var totalPages = result.data.totalPages;
                $cont.append(laytpl(sHtmlTpl).render({
                    "ldata" : ldata,
                    "currPage" : currPage,
                    "totalPages" : totalPages
                }));
                /*if(currPage >= totalPages){
                    //用于控制滚动不再加载数据
                    YDUI.pageScrollEnd = true;
                    $(".list-loading").hide();
                    return;
                }
                YDUI.pageScrollEnd = false;*/
                /* 获取数据，并插入页面后，调用resole，并传入当前获取的记录列表集合 */
                def.resolve(ldata, currPage, totalPages);
                /* 页码自增1 */
                options.data.currPage = currPage + 1;
                //渲染之后的回调函数
                if (fn) fn(result);
            });
            return def.promise();
        },
        /**
         * 当前从详情页返回列表页时调用此方法
         * @param listData 该次所需加载的数据集合
         * @param retPage 该次加载的页码
         */
        loadStorageListFn: function (listData, retPage) {
            var def = $.Deferred();
            options.data.currPage = retPage;
            listData.forEach(function (val) {
                $cont.append(laytpl(sHtmlTpl).render({
                    "ldata" : val.list,
                    "currPage" : val.page
                }));
            });
           
            def.resolve();
            return def.promise();
        }
    });
}
//获取缩略图、传入文件名、缩略图宽度
Utils.getImgThumb = function(_sFile, _size){
    if(!_sFile){
        return "";
    }
    if(!_size){
        _size = "116";
    }
    var sExt = _sFile.substring(_sFile.lastIndexOf("."), _sFile.length);
    return _sFile.replace(sExt, "_" + _size + sExt);
}
Utils.getTrueImg = function(_sFile){
    return Utils.getImgThumb(_sFile, "640");
}
Utils.getImgThumb376 = function(_sFile){
    return Utils.getImgThumb(_sFile, "376");
}
Utils.getImgThumb116 = function(_sFile){
    return Utils.getImgThumb(_sFile, "116");
}
var rad = function(d) {
    return d * Math.PI / 180.0;
}
//根据经纬度计算距离
Utils.getDistance = function( lat1,  lng1,  lat2,  lng2) {
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var  b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    s = parseFloat(s).toFixed(2);
    return s;
}
var url_history = "url_history";
var curr_login_user = "curr_login_user";
//历史url记录，使用场景：当某个页面需要登录才能操作时，先跳转至登录页面，登录后，根据记录的历史url进行跳回
Utils.urlHistory = function(_params){
    var localStorage = YDUI.util.localStorage;
    var urlHistory = {
        currUrl : location.href,
        params : _params
    }
    localStorage.set(url_history, urlHistory);
}
//获取历史地址
Utils.getUrlHistory = function(){
    var localStorage = YDUI.util.localStorage;
    var urlHistory = localStorage.get(url_history);
    if(urlHistory){
        return urlHistory;
    }
    return {currUrl : "index.html"};
}
//每个页面都记录当前地址和历史地址
//Utils.urlHistory();
//设置、获取当前登录用户
Utils.setCurrLoginUser = function(_user){
    YDUI.util.localStorage.set(curr_login_user, _user);
}
Utils.getCurrLoginUser = function(){
    //return YDUI.util.localStorage.get(curr_login_user);
    var loginUser = {};
    $.ajax({
        url: "/club/user",
        type: "post",
        async: false,
        success: function(res){
            if(res.success && res.data){
                loginUser = res.data;
            }
        }   
    });
    return loginUser;
}
//获取商家标签库
Utils.getBizTags = function(){
    var tags = [];
    $.ajax({
        url : 'club/index/gettags',
        type: 'post',
        dataType : 'json',
        async : false,
        success : function(res){
            if(res.success){
                tags = res.data;
            }
        }
    });
    return tags;
}
/** 
 * 时间对象的格式化; 
 */
Date.prototype.format = function(format) {
    /* 
     * eg:format="yyyy-MM-dd hh:mm:ss"; 
     */
    var o = {
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()
            // millisecond  
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
Utils.dateFormat = function(_timestamp, _format){
    return (new Date(_timestamp)).format(_format || "yyyy-MM-dd hh:mm:ss");
}
Utils.dateNow = function(_format){
    return (new Date()).format(_format || "yyyy-MM-dd hh:mm:ss");
}
Utils.getMonthBeforeFormatAndDay = function(date, num, day) {
    //var date = new Date();
    date = date || new Date();
    date.setMonth(date.getMonth() + (num*1), 1);
    //读取日期自动会减一，所以要加一
    var mo = date.getMonth() + 1;
    //小月
    if (mo == 4 || mo == 6 || mo == 9 || mo == 11) {
        if (day > 30) {
            day = 30
        }
    }
    //2月
    else if (mo == 2) {
        if (isLeapYear(date.getFullYear())) {
            if (day > 29) {
                day = 29
            } else {
                day = 28
            }
        }
        if (day > 28) {
            day = 28
        }
    }
    //大月
    else {
        if (day > 31) {
            day = 31
        }
    }

    retureValue = date.format('yyyy-MM-' + (day < 10 ? '0' + day : day));

    return retureValue;
}

//JS判断闰年代码
function isLeapYear(Year) {
    if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
    } else { return (false); }
}
var bizBoxTypes = {"data":[{"id":1,"dName":"至尊豪华包"},{"id":3,"dName":"大包"},{"id":4,"dName":"中包"},{"id":5,"dName":"小包"}],"success":true}
Utils.getBizBoxTypeDesc = function(_id){
    var data = bizBoxTypes.data;
    if(data && data.length > 0){
        for(var i in data){
            var type = data[i];
            if(type.id == _id){
                return type.dName;
            }
        }
    }
    return "";
}
Utils.getBizBoxType = function(_id){
    return  bizBoxTypes.data;
}
//图片预览(jq插件)
/**
 * InfiniteScroll Plugin
 */
!function (window) {
    $.fn.previewImage = function(){
        var $this = $(this);
        //获取图片列表
        var _urls = [];
        var $images = $this.find('img');
        $images.each(function(index, el) {
            var imgUrl = $(el).attr("url");
            if(imgUrl){
                _urls.push(web_root_path + Utils.getTrueImg(imgUrl));
            }
        });
        $images.click(function(event) {
            var currImgUrl = $(this).attr("url");
            if(currImgUrl){
                wx.previewImage({
                    current: web_root_path + Utils.getTrueImg(currImgUrl), // 当前显示图片的http链接
                    urls: _urls// 需要预览的图片http链接列表
                });
            }
            
        });
        return $this;
    }
}(window);
