/**
 * Created by Administrator on 2017/3/9 0009.
 */
var GLOBAL=GLOBAL||{};
$(function () {
    $(".head_ul li").hover(function () {
            var index=$(this).index();
            $(".head_ul li").eq(index).addClass("head_active");
        // alert(index)
        },function () {
            var index=$(this).index();
            $(".head_ul li").eq(index).removeClass("head_active");
        }
    );
    //li背景

    $(".head_ul li").click(function () {
        var index=$(this).index();
        GLOBAL.mouseScrollIndex=index+1;
        if (index==4||index==3){
            GLOBAL.mouseScrollIndex=4;
            $(".head_ul li").removeClass("now");
            $(".head_ul li").eq(3).addClass("now");
            $(".head_ul li").eq(4).addClass("now")
        }
        else if(index==5){
            return;
        }
        else {
            GLOBAL.mouseScrollIndex=index+1;
            $(".head_ul li").removeClass("now");
            $(this).addClass("now");
        }
        mouseScrollMove();

    });
    //移动
    function mouseScrollMove() {
        oMainSlide.animate({top:GLOBAL.mouseScrollIndex*-GLOBAL.height});
        if(GLOBAL.mouseScrollIndex==0||GLOBAL.mouseScrollIndex==1){
            $(".head_ul li").removeClass("now");
            $(".head_ul li").eq(0).addClass("now");
        }else if(GLOBAL.mouseScrollIndex==4){
            $(".head_ul li").removeClass("now");
            $(".head_ul li").eq(3).addClass("now");
            $(".head_ul li").eq(4).addClass("now")
        }else {
            $(".head_ul li").removeClass("now");
            $(".head_ul li").eq(GLOBAL.mouseScrollIndex-1).addClass("now");
        }
    }
    //宽高
    function compLateSize() {
        $(".main_warp,.main_block,.main_slide").width($(window).width());
        GLOBAL.height=$(window).height()-50;
        $(".main_warp,.main_block,.main_banner").height($(window).height()-50);
    }
    //窗口大小改变
    $(window).resize(function () {
        compLateSize();
        mouseScrollMove();
    });

//鼠标滚动事件
    window.onmousewheel=mouseScroll;
    compLateSize();
    window.addEventListener("DOMMouseScroll",mouseScroll);
    //向上滚动
   
    function mouseScroll(ev) {
        //判断滚轴   滚动方向
        //事件对象
        var oEvent=ev||window.event;

        //
        if(oEvent.wheelDelta){
            if (oEvent.wheelDelta<0){
                //向下滚动
                mouseScrollDown();
            }else{
                //向上滚动
                mouseScrollUp()
            }
        }else {
            if(oEvent.detail>0){
                //向下滚动
                mouseScrollDown()
            }else {
                //向上滚动
                mouseScrollUp();
            }
        }
    }

        GLOBAL.mouseScrollIndex=0;
    //
    GLOBAL.slidingTimer=null;
    GLOBAL.slidingDelay=2000;
    GLOBAL.slidingGoing=false;
    //第一次滚动  不允许翻页   false
    //不管IE还是火狐  都有次函数处理
    //
    var aWarpBlock=$(".main_block");
    var oMainSlide=$(".main_slide");
    GLOBAL.isFirstSlide=true;
    GLOBAL.firetSlideTimer=null;
        function mouseScrollUp() {
            if(GLOBAL.isFirstSlide){
                if(!GLOBAL.firetSlideTimer){
                    GLOBAL.firetSlideTimer=setTimeout(function () {
                        GLOBAL.isFirstSlide=false;
                        GLOBAL.firetSlideTimer=null;
                    },100)
                }
                return;
            }
            GLOBAL.isFirstSlide=true;
            
            if(!GLOBAL.slidingGoing){
                GLOBAL.slidingGoing=true;
                GLOBAL.slidingTimer=setTimeout(function () {
                    GLOBAL.slidingGoing=false;
                },GLOBAL.slidingDelay)
            }else {
                return;
            }
            

            GLOBAL.mouseScrollIndex--;
            if(GLOBAL.mouseScrollIndex<0){
                GLOBAL.mouseScrollIndex=0
            }
            mouseScrollMove();
            // alert("上")
        }
        //向下滚动
        function mouseScrollDown() {
            // alert("下")
            if(GLOBAL.isFirstSlide){
                if(!GLOBAL.firetSlideTimer){
                    GLOBAL.firetSlideTimer=setTimeout(function () {
                        GLOBAL.isFirstSlide=false;
                        GLOBAL.firetSlideTimer=null;
                    },100)
                }
                return;
            }
            GLOBAL.isFirstSlide=true;
            if(!GLOBAL.wellcomeAnimateOver){
                return;
            }
            if(!GLOBAL.slidingGoing){
                GLOBAL.slidingGoing=true;
                GLOBAL.slidingTimer=setTimeout(function () {
                    GLOBAL.slidingGoing=false;
                },GLOBAL.slidingDelay)
            }else {
                return;
            }


            GLOBAL.mouseScrollIndex++;
            if(GLOBAL.mouseScrollIndex>aWarpBlock.length-1){
                GLOBAL.mouseScrollIndex=aWarpBlock.length-2;
            }
            mouseScrollMove();
        }

    GLOBAL.wellcomeAnimateOver=false;
    dowelcomeAnimate() ;
    function dowelcomeAnimate() {
        setTimeout(function () {
            $('.gif').animate({top:"-25%"},600,function () {
                $('.welcome_animated').each(function (index) {
                    var $this=$(this);
                    setTimeout(function () {
                        $this.show().addClass('animated fadeInUp')
                    },200*index);
                })
            })
        },4000);
        setTimeout(function () {
            $('.gif_box').slideUp();
            GLOBAL.wellcomeAnimateOver=true;
        },7000)
    }
    $('.gif').dblclick(function () {
        $('.gif_box').slideUp();
        GLOBAL.wellcomeAnimateOver=true;
    });
    //1、档动画结束之前，滚轴能操纵轮播图
    //2、当屏幕放大或缩小时   能修正到正确位置
    //3、导航
    //4、双击


    //链接跳转
    //1、确定到底点击了那一页
    (function () {
        var index=location.hash.substr(1);
        //2、如果存在页码，跳过欢迎页
        if(index){
            //取消蓝色欢迎页
            $('.gif_box').hide();
            GLOBAL.wellcomeAnimateOver=true;
            GLOBAL.mouseScrollIndex=index;
            mouseScrollMove();
    }
})();
//概述
    $(".gaishu_you").click(function () {
        $(".banner_warp:not(:animated)").animate({left:"-866px"},function () {   //在动画执行之前先
            $(".model_1").first().appendTo($(this))
            $(this).css("left",0);
        })
    })

    $(".gaishu_zuo").click(function () {
        $(".model_1").last().prependTo($(".banner_warp"))
        $(".banner_warp").css("left","-866px")
        $(".banner_warp:not(:animated)").animate({left:0})
    })
//   
    $(".yun em").hover(function () {
        var index=$(this).index(".yun em");
        $(".yun em").eq(index).addClass("yun_jl yun_active");
    },function () {
        var index=$(this).index(".yun em");
        $(".yun em").eq(index).removeClass("yun_active");
    })
    $(".yun em").click(function () {
        var index=$(this).index(".yun em");
        $(".yun1").hide();
        $(".yun1").eq(index).show();

    })
});