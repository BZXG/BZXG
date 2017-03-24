/**
 * Created by Administrator on 2017/3/9 0009.
 */
var GLOBAL=GLOBAL||{};

$(function () {
    $("#header").load("header.html");

    // var name="articleid";
    // var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    GLOBAL.articleid=getUrlParams("articleid");
    GLOBAL.type=getUrlParams("type");
    loadArticleData();
    //返回顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            $(".back").fadeIn();
        } else {
            $(".back").fadeOut(0);
        }
    });
    $(".em_8").click(function () {
        $("body,html").animate({"scrollTop": 0}, 300);
    });
    //钢笔动画
    (function () {
        $(".pen").click(function () {
            $(".pen").hide(30, function () {
                $(".bg_1").css("width", "310px");
                $(".bg_1").css("backgroundPositionX", "-600px");
                $(".pen").show();
                $(".bg_1").animate({"width": "730px", "backgroundPositionX": "0px"});
            })
        });
        $("#footer").load("footer.html");
    })();


    
    var arrayRanSkip=["娘娘威武","皇上万岁，万万岁","再点一下试试~","爱你，MUA~"];
    GLOBAL.firstClick=true;//第一次点击
    
    $(".like em").click(function () {
        //判断是否是第一次点击
        if(GLOBAL.firstClick){
            GLOBAL.firstClick=false;
            var index=Math.floor(Math.random()*arrayRanSkip.length);
            var content=arrayRanSkip[index];
            $(".lips").html(content);
            doMove();
        }else if($(".lips").html()=="再点一下试试~"){
            $(".lips").html("让你点就点啊");
            doMove();
        }
        
        //不是第一次点击  再点一下试试~
    });
    function doMove(){
        //让小块移动到上边
        $(".lips").animate({top:0,opacity:1},600,"elasticOut")
            .delay(600)
            .animate({left:-400,opacity:0},600,"backIn",function () {
                $(".lips").css({top:370,left:258});
                $(".dislike").animate({"background-position-y":"-73px"})

            })
    }
    $(".like em").hover(function () {
        $(".kuang").animate({"width":"135px"})
    },function () {
        $(".kuang").animate({"width":"0"})
    })
    
});

function loadArticleData() {
    // alert(GLOBAL.type)
    if(GLOBAL.type){
        
        //可以将json转换为php  通过ajax请求
        var articleData1=articleData[GLOBAL.type+GLOBAL.articleid];
        // alert(JSON.stringify(articleData1));
  -
        $(".titlt_big").html(articleData1.data.typeTitle);
        $(".titlt_smail").html(articleData1.data.typeEntitle);
        $(".titlt_1").html(articleData1.data.title);
        $(".gly").html(articleData1.data.updateAt);
        $(".gly_1").html(articleData1.data.updateByFullName);
        $(".imgs").attr("src",articleData1.data.coverImg);
        $(".content_1").html(articleData1.data.content);
    }
}



//获取页面URL传过来的参数
function getUrlParams(name){

    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return  r[2];
    else
        return "";
}