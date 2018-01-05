$(document).ready(function () {
    // enable fileupload plugin
    $('input[name="files[]"]').fileuploader({
        limit: 1,
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'],
        changeInput: ' ',
        theme: 'thumbnails',
        enableApi: true,
        addMore: true,
        thumbnails: {
            box: "<div class='fileuploader-items'>\
                      <ul class='fileuploader-items-list'>\
					      <li class='fileuploader-thumbnails-input'><div class='fileuploader-thumbnails-input-inner'>+</div></li>\
                      </ul>\
                  </div>",
            item: "<li class='fileuploader-item'>\
				       <div class='fileuploader-item-inner'>\
                           <div class='thumbnail-holder'>${image}</div>\
                           <div class='actions-holder'>\
                               <a class='fileuploader-action fileuploader-action-remove' title='Remove'><i class='remove'></i></a>\
                           </div>\
                       	   <div class='progress-holder'>${progressBar}</div>\
                       </div>\
                   </li>",
            item2: "<li class='fileuploader-item'>\
				       <div class='fileuploader-item-inner'>\
                           <div class='thumbnail-holder'>${image}</div>\
                           <div class='actions-holder'>\
                               <a class='fileuploader-action fileuploader-action-remove' title='Remove'><i class='remove'></i></a>\
                           </div>\
                       </div>\
                   </li>",
            startImageRenderer: true,
            canvasImage: false,
            _selectors: {
                list: '.fileuploader-items-list',
                item: '.fileuploader-item',
                start: '.fileuploader-action-start',
                retry: '.fileuploader-action-retry',
                remove: '.fileuploader-action-remove'
            },
            onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                    api = $.fileuploader.getInstance(inputEl.get(0));

                if (api.getFiles().length >= api.getOptions().limit) {
                    plusInput.hide();
                }

                plusInput.insertAfter(item.html);


                if (item.format == 'image') {
                    item.html.find('.fileuploader-item-icon').hide();
                }
            },
            onItemRemove: function (html, listEl, parentEl, newInputEl, inputEl) {
                var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                    api = $.fileuploader.getInstance(inputEl.get(0));

                html.children().animate({'opacity': 0}, 200, function () {
                    setTimeout(function () {
                        html.remove();

                        if (api.getFiles().length - 1 < api.getOptions().limit) {
                            plusInput.show();
                        }
                    }, 100);
                });

            }
        },
        afterRender: function (listEl, parentEl, newInputEl, inputEl) {
            var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                api = $.fileuploader.getInstance(inputEl.get(0));

            plusInput.on('click', function () {
                api.open();
            });
        }
    });
});

/*输入故事文本框*/
$('.storiesarea_mask').click(function () {
    $(this).hide();
    $('.storiesarea_txt').focus();
})

/*提交*/
function submitBtn() {
    /*loading加载*/
    layer.open({
        type: 2
        ,content: '加载中',
        time:0.5
    });
    var form = document.getElementById("tf");
    var fd = new FormData(form);
    console.log(fd);
    // var results = {"msg":"success","files":["\/images\/bdcx.jpg","\/images\/bdcx.jpg","\/images\/bdcx.jpg"],"content":"\u63d0\u4ea4\u6545\u4e8b\u3002\u3002\u3002"};
    var photoarea = document.getElementsByClassName("photoarea");
    var dataObj = eval(data);
    if (dataObj.msg == 'success') {
      $('.fileuploader').remove();
      $('.photoarea_tips').remove();
      $('.photoarea_nunlimit').remove();
      $('.storiesarea_txt').hide();
        var str = '';
        function createImg() {
            for(var i = 0; i <data.files.length;i++){
                console.log(data.files.length)
                str +="<div class='showImg fl'>\n" +
                    "            <img class='showImg' src='." + data.files[i] + "'>\n" +
                    "        </div>";
                console.log(str);
            }
            return str;
        }
        $('.boxs').html();
        $('.photoarea').append(createImg());
        $('.storiesarea').html();
        $('.storiesarea').append("<div class=\"storiesarea_txt textlimit\">故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域故事区域2423435fdgfdgvdbdx</div>");
        /*隐藏提交按钮*/
        $('.active_submit').hide();
    } else {
        alert(dataObj.msg);
    }
}