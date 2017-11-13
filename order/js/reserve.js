/**
 * 包厢预订
 * @authors lauzean
 * @date    2017-08-28 15:30:21
 * @version $Id$
 */
!function (win, $) {
	function DatePicker(){
		this.init();
	}
	DatePicker.prototype.getSelectDateTime = function(){
		return $("#ddsj").html();
	}
	DatePicker.prototype.init = function(argument){
		//获取当天
		var currDate = new Date();//"2017-02-24";//Utils.dateNow();
		var days = 7;
		var dateArr = new Array();
		dateArr.push(this.dateToJson(currDate, true));
		var tempDate = currDate;
		for (var i = 0; i < (days - 1); i++) {
			tempDate = this.addDate(tempDate, 1);
			dateArr.push(this.dateToJson(tempDate));
		}
		//渲染日期
		var sHtmlTpl = new Array();
		sHtmlTpl.push('{{#');
		sHtmlTpl.push('	for(var i = 0; i < d.length; i++){');
		sHtmlTpl.push('	var data = d[i];');
		sHtmlTpl.push('}}');
		sHtmlTpl.push('	<li class="swiper-slide {{i==0?"on" : ""}}" date="{{data.fullDate}}"><p class="week">{{data.week}}</p><p class="date">{{data.date}}</p></li>');
		sHtmlTpl.push('{{#');
		sHtmlTpl.push('	}');
		sHtmlTpl.push('}}');
		var $datePicker = $("#date_picker");
		var $dateTime = $("#date_time");
		var setArrivalTime = function(){
			var date = $datePicker.find("li.on").attr("date");
			var time = $dateTime.find("li.on").attr("time");
			var dateTime = date + " " + time;
			var sDates = date.split("-");
			var sTimes = time.split(":");
			$("#arrivalTime").html(sDates[1] + "月" + sDates[2] + "日 " + sTimes[0] + "点" + sTimes[1] + "分").attr({
				"dateTime" : dateTime
			});
		}
		$datePicker.html(laytpl(sHtmlTpl.join('')).render(dateArr));
		$datePicker.find("li").click(function(event) {
			$(this).addClass('on').siblings().removeClass('on');
			setArrivalTime();
		});
		$dateTime.find('li').click(function(event) {
			$(this).addClass('on').siblings().removeClass('on');
			setArrivalTime();
		});
	}
	DatePicker.prototype.dateToJson = function(_date, bCurrDay){
		//获取日期
		var sDate = Utils.dateFormat(_date, "MM-dd");
		var sFullDate = Utils.dateFormat(_date, "yyyy-MM-dd");
		//获取星期
		var nWeekDay = _date.getDay();
		if(bCurrDay){
			return {
				date : sDate,
				week : "今日",
				fullDate : sFullDate
			}
		}
		var sWeek;
		switch (nWeekDay) {
			case 0:
				sWeek = "日";
				break;
			case 1:
				sWeek = "一";
				break;
			case 2:
				sWeek = "二";
				break;
			case 3:
				sWeek = "三";
				break;
			case 4:
				sWeek = "四";
				break;
			case 5:
				sWeek = "五";
				break;
			case 6:
				sWeek = "六";
				break;
			default:
				// statements_def
				break;
		}
		sWeek = "周" + sWeek;
		return {
			date : sDate,
			week : sWeek,
			fullDate : sFullDate
		}
	}
	DatePicker.prototype.addDate = function(date, days){
		var d = new Date(date); 
		d.setDate(d.getDate() + days);
		return d;
	}
	
	//加载包厢
	function loadBizBox(){
		var nBizId = YDUI.util.getQueryString("id");
		var nBoxId = YDUI.util.getQueryString("boxid");
		/*Utils.ajaxRender({
			url: "/club/biz/findbizbox",
			data: {id: nBizId, boxid: nBoxId},
			cont: 'biz_box',
			tpl: 'biz_box_tpl'
		}, function(){
			$("#box_photos").previewImage().slider({
		        speed: 1000,
		        autoplay: 5000,
		        lazyLoad: false
		    });
		    var dp = new DatePicker();
			var swiper = new Swiper('.swiper-container', {
			    /!*pagination: '.swiper-pagination',*!/
			    slidesPerView: 5,
			    paginationClickable: true,
			    spaceBetween: 5,
			    freeMode: true
			});

		});*/
		/*bindElEvent();*/
	}

	bindElEvent();
	function bindElEvent(){
		//人数
		var $detailAdd = $(".detailAdd");
		var $detailReduce = $(".detailReduce");
		var $peoples = $("#peoples");
		$detailAdd.click(function(event) {
			$(this).addClass('on');
			$detailReduce.removeClass('on');
			var n = parseInt($peoples.val()) - 1;
			if(n <= 1){
				n = 1
			}
			$peoples.val(n);
		});
		$detailReduce.click(function(event) {
			$(this).addClass('on');
			$detailAdd.removeClass('on');
			var n = parseInt($peoples.val()) + 1;
			if(n >= 100){
				n = 100
			}
			$peoples.val(n);
		});
		//性别
		/*$("#sex li").click(function(event) {
			$(this).addClass('selected').siblings().removeClass('selected');
		});*/
		//预订
		$("#btn_order").click(function(event) {
			var $arrivalTime = $("#arrivalTime");
			var $peoples = $("#peoples");
			var $trueName = $("#trueName");
			var $sex = $("#sex");
			var $phone = $("#phone");
			var dialog = win.YDUI.dialog;
			if(!$trueName.val()){
				$trueName.focus();
				dialog.toast('请填写您的姓氏！', 'none', 1500);
				return;
			}
			if(!$phone.val()){
				$phone.focus();
				dialog.toast('请填写您的手机号码！', 'none', 1500);
				return;
			}
			if(!(/^1(3|4|5|7|8)\d{9}$/.test($phone.val()))){
				$phone.focus();
				dialog.toast('手机号码格式不正确！', 'none', 1500);
				return;
			}
			if(!$arrivalTime.attr("dateTime")){
				dialog.toast('请选择到店时间!', 'none', 1500);
				return;
			}
			//var currUser = Utils.getCurrLoginUser() || {};
			/*Utils.ajax({
				url: '/club/order/save',
				data: {
					/!*vid: currUser.id || 0,
					account: currUser.account || "",*!/
					bid: $("#bid").val(),
					boxId : $("#boxId").val(),
					phone : $phone.val(),
					arrivalTime : $arrivalTime.attr("dateTime"),
					trueName : $trueName.val(),
					sex : 0,
					peoples : $peoples.val()
				}
			}, function(res){
				if(res.success){
					Utils.urlHistory();
					dialog.toast('预订成功！', 'success', 1000, function(){
						location.href = "order.html";
					});
				}
			});*/
		});
	}
}(window, jQuery);
