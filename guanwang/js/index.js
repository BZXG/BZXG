/**
 * Created by Administrator on 2017/3/9 0009.
 */
$(function () {
    $("#header").load("header.html");
    //函数自执行
    //banner
    (function () {
       var oBanner=$(".banner") ;
        var arrBannerOne=oBanner.find(".banner_one");
        var arrNav=oBanner.find(".ul_3 li");
        var oNext=oBanner.find(".right_1");
        var oPrev=oBanner.find(".left_1");
        var index=0;
        arrNav.click(function () {
            index=$(this).index();
            arrBannerOne.stop().fadeOut().eq(index).fadeIn();
            arrNav.removeClass("active");
            $(this).addClass("active");
            animate();
        });
        animate();
        function animate(){
            $(".banner_one").hide();
            $(".banner_one").eq(index).show();
            $(".banner_one .img_3").hide();
            $(".banner_one .img_3").eq(index).show();
            var aImg=$(".banner_one .img_3").eq(index).find("img");
            // var aImg.hide();
            aImg.eq(0).show().addClass("animated fadeInLeft");
            setTimeout(function () {
                aImg.eq(1).show().addClass("animated fadeInRight");
                aImg.eq(2).show().addClass("animated fadeIn");
            },300)
        }
        oNext.click(function () {
            index++;
                if(index>2){
                    index=0;
                }
            arrBannerOne.stop().fadeOut().eq(index).fadeIn();
            arrNav.removeClass("active");
            arrNav.eq(index).addClass("active");
            animate();
        });
        oPrev.click(function () {
            index--;
            if(index<0){
                index=2;
            }
            arrBannerOne.stop().fadeOut().eq(index).fadeIn();
            arrNav.removeClass("active");
            arrNav.eq(index).addClass("active");
            animate();
        })
    })();
    //主要产品
    (function () {
       var oChanpin=$(".main_box .main").not();
        var arrContent=oChanpin.find($(".main_box .main_nav"));
        var arrNav=oChanpin.find($(".left_2 li"));
        var oNext=oChanpin.find(".right_1");
        var oPrev=oChanpin.find(".left_1");
        var index=0;
        arrNav.click(function () {
            var action="";
           if($(this).index()>index){
               action="fadeInRight";
           }else {
               action="fadeInLeft";
           }
          
            index=$(this).index();
            move(action);
        });
        oPrev.click(function () {
            index--;
            if(index<=0){
                index=arrContent.length-1;
            }
            move("fadeInLeft")
        });
        oNext.click(function () {
            index++;
            if(index>arrContent.length-1){
                index=0;
            }
            move("fadeInRight")
        });
        function move(action) {
            arrContent.hide().eq(index).show();
            arrNav.removeClass("active1").eq(index).addClass("active1");
            arrContent.eq(index).find("img,span,p").removeClass("fadeInLeft fadeInRight").addClass("animated "+action)
        }
    })();
    //业务范围
    (function () {
        $(".img_5,.right_3 em").hover(
            function () {
                $(this).addClass("tada animated")
            },function () {
                $(this).removeClass("tada animated")
            }
        );
        $(".simple .img_5").click(function () {
            // 当前项是展开的
            var index=$(this).index(".img_5");
            if($(".simple").eq(index).hasClass("show")){
                $(".content").slideUp(300);
                $(".right_3 em").removeClass("zhankai");
                $(".simple").removeClass("show");
            }else {
                $(".content").slideUp(300).eq(index).delay(300).slideDown(300);
                $(".simple").removeClass("show").eq(index).addClass("show");
                $(".right_3 em").removeClass("zhankai").eq(index).addClass("zhankai");
            }
            }
        );
        $(".right_3 em").click(function () {
            var index=$(this).index(".right_3 em");
            if($(".simple").eq(index).hasClass("show")){
                $(".content").slideUp(300);
                $(".simple").removeClass("show");
                $(".right_3 em").removeClass("zhankai");
            }else {
                $(".simple").removeClass("show").eq(index).addClass("show");
                $(".right_3 em").removeClass("zhankai").eq(index).addClass("zhankai");
                $(".content").slideUp(300).eq(index).delay(300).slideDown(300);
            }
        });
        

        
    })();
    //团队介绍
    (function () {
        var oTeam=$(".team");
        var oTeamBanner=oTeam.find(".team_banner");
        var oTeamOne=oTeamBanner.find(".team_one");
        var arrNav_1=oTeamBanner.find(".ul_4 li");
        var oNext_1=oTeamBanner.find(".right_1");
        var oPrev_1=oTeamBanner.find(".left_1");
        var index=0;
        oNext_1.click(function () {
            if(index+2>oTeamOne.length){
                index=-1;
            }
            index++;
            if(index<oTeamOne.length){
                $(".team_warp").stop().animate({"left":-1100*(index)})
            }
            arrNav_1.removeClass("active_1").eq(index).addClass("active_1");

        });
        oPrev_1.click(function () {
            if(index-1<0){
                index=oTeamOne.length;
            }
            index--;
            if(index>=0){
                $(".team_warp").stop().animate({"left":-1100*(index)})
            }
            arrNav_1.removeClass("active_1").eq(index).addClass("active_1");
        });
        $(".left_5").hover(function () {
            var index=$(this).index(".left_5");
            $(".jiahao").eq(index).fadeIn();
        },function () {
            var index=$(this).index(".left_5");
            $(".jiahao").eq(index).fadeOut();
        })
    })();
    //返回顶部
    (function () {
        $(window).scroll(function () {
            if($(window).scrollTop()>500){
                $(".back").fadeIn();
            }else {
                $(".back").fadeOut(0);
            }
        });
            $(".em_8").click(function () {
                $("body,html").animate({"scrollTop":0},300);
            })
    })();
    $("#footer").load("footer.html");
});
