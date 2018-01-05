$(function () {

    $(".fileupload").change(function () {

        if (typeof (FileReader) != "undefined") {

            var dvPreview = $(".imgPreview");

            dvPreview.html("");

            var regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;

            $($(this)[0].files).each(function () {

                var file = $(this);

                if (regex.test(file[0].name.toLowerCase())) {

                    var reader = new FileReader();

                    reader.onload = function (e) {

                        var img = $("");

                        img.attr("src", e.target.result);

                        dvPreview.append(img);

                    }

                    reader.readAsDataURL(file[0]);

                } else {

                    alert(file[0].name + " 不是图片类型的文件.");

                    dvPreview.html("");

                    return false;

                }

            });

        } else {

            alert("这个浏览器不支持HTML5 FileReader.");

        }

    });

});