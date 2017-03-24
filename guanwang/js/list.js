/**
 * Created by Administrator on 2017/3/9 0009.
 */
//GLOBAL存储全局变量    避免系统变量和全局变量冲突
var GLOBAL=GLOBAL||{};
$(function () {
    $("#header").load("header.html");
    //钢笔动画
    (function () {
        $(".pen").click(function () {
            $(".pen").hide(10,function () {
                $(".list_pen").css("width","120px");
                $(".list_pen").css("backgroundPositionX","-900px");
                $(".pen").show();
                $(".list_pen").animate({"width":"1100px","backgroundPositionX":"0px"});
            })
        });
        //返回顶部
        $(window).scroll(function () {
            if($(window).scrollTop()>500){
                $(".back").fadeIn();
            }else {
                $(".back").fadeOut(0);
            }
        });
        $(".em_8").click(function () {
            $("body,html").animate({"scrollTop":0},300);
        });
        //加载goon
        loadArticleList();
        $(".goon").click(function () {

            $(".more i").removeClass(".moremore_1").addClass(".moremore");
            if(GLOBAL.pageStart<GLOBAL.pageCount){
                loadArticleList();
            }else {
                $(".more img").attr("src","images/list_gomore_bg_nomore.jpg");
            }

        })
        
    })();
    $("#footer").load("footer.html");

    // loadArticleList();
    //事件委托    将子元素发生的事件交给父级去执行
    //事件流       事件捕获阶段-》事件目标阶段-》事件冒泡阶段
    $("#ArticleList").delegate(".li_one","click",function () {
        var articleId=$(this).attr("articleid");
        window.open("article.html?articleid="+articleId+"&type=xiaoniaoNews")
    })
    
});
function loadArticleList() {
    //清假数据
    if(!GLOBAL.pageStart) {
        GLOBAL.pageStart = 0;
        $("#ArticleList").html("");
    }
    $.ajax({
        url:"http://localhost/listData.php",
        type:"GET",//默认就是GET
        data:{
            page:GLOBAL.pageStart
        },
        success:function (data) {
            // alert(typeof data);string
            // stroing->json
            // JSON.stringify(JSON.parse(data))
            showData(JSON.parse(data))
        }
    })
}
function showData(data) {
    var list=data.data.list;
    for(var i=0;i<list.length;i++){
        var model=$("#itemHtml").html();
        model=model.replace("$articleCover$",list[i].coverImg)
                .replace("$articleTitle$",list[i].title)
                .replace("$updateTime$",list[i].creatAt)
                .replace("$articleId$",list[i].sysId)
                .replace("$describe$",list[i].describe);
        $("#ArticleList").append(model);
        $("#ArticleList .li_one:even").css("margin-left",0);


    }
    var count=data.data.count;
    GLOBAL.pageStart++;
    GLOBAL.pageCount=Math.ceil(count/data.data.pageSize);
    if(GLOBAL.pageStart>=GLOBAL.pageCount){
            //fadeTo
            $(".goon").fadeTo(100,0.3);
            $(".more i").addClass(".moremore_1").removeClass(".moremore")
        }
}


// function loadArticleList() {
//     //第一次加载数据  将列表清空
//     //pageStart 数据开始位置
//     if(!GLOBAL.pageStart){
//         GLOBAL.pageStart=0;
//         $("#ArticleList").html("");
//     }
//     // GLOBAL.pageStart++;
//     //请求到的数据
//     var result=listData["listData0"+GLOBAL.pageStart];
//     var list=result.data.list;
//     if(!list||!list.length){
//         $("#ArticleList").html("没有可加载数据")
// }else {
//         //模板
//         for(var i=0;i<list.length;i++){
//             var model=$("#itemHtml").html();
//             var updateTime=list[i].creatAt||list[i].updateTime;
//             model=model.replace("$articleCover$",list[i].coverImg)
//                 .replace("$articleTitle$",list[i].title)
//                 .replace("$updateTime$",list[i].creatAt)
//                 .replace("$articleId$",list[i].sysId)
//                 .replace("$describe$",list[i].describe);
//             $("#ArticleList").append(model);
//             $("#ArticleList>div:even").css("margin-left",0);
//         }
//         GLOBAL.pageStart++;
//         //判断是否有数据可以继续加载
//         var count=result.data.count;
//         GLOBAL.pageCount=Math.ceil(count/result.data.pageSize);
//         if(GLOBAL.pageStart>=GLOBAL.pageCount){
//             //fadeTo
//             $(".goon").fadeTo(100,0.3);
//             $(".more i").addClass(".moremore_1").removeClass(".moremore")
//         }
//     }
// }