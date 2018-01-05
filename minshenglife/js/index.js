var mySwiper = new Swiper('.swiper-container', {
    autoplay: 2000,//可选选项，自动滑动
    pagination : '.swiper-pagination',//分页器
    //paginationElement : 'li',//分页器小点的标签
    observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true,//修改swiper的父元素时，自动初始化swiper
    autoplayDisableOnInteraction : false,
})