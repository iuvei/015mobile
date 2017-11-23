var accessToken = window.location.hash.substring(1);//获取路径中的access token
 /**
 *加载数据
 */
function lotteryHallLoadedPanel() {
    getKefu();
    var params = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetUserAllMoney"}';
       ajaxUtil.ajaxByAsyncPost1(null, params, function(data){
            if(data.SystemState == "-2" || data.SystemState == "-1" || data == -666) {
                loginAgain();
            }else{
                if(localStorageUtils.getParam("isLogin") == 'true') {
                    checkOut_clearData();
                    checkOut_clearData_mmc();
                    getGongGao3();
                    lunbo();
                    init();
                    //账户余额
                    localStorageUtils.setParam("lotteryMoney", data.lotteryMoney);
                    localStorageUtils.setParam("dandianLg", "true");

                    //客服
                    var kefuURL = localStorageUtils.getParam("kefuURL") + "&info=" + encodeURIComponent("userId=" + localStorageUtils.getParam("myUserID") + "&name=" + localStorageUtils.getParam("username") + "&memo=");
                    var le = kefuURL.length;
                    if (le > 10) {
                        document.getElementById('kefuID').style.display = "";
                    }

                    $("#kefuID").off('click');
                    $("#kefuID").on('click',function (event) {
                        window.open(kefuURL,"_self");
                    });
                }
            }
       },null);

    $("#wodecaipiao").off('click');
    $("#wodecaipiao").on('click', function(){
        callMyLottery_Fun();
    });

     //公告
     $("#bulletinId").off('click');
     $("#bulletinId").on('click', function(){
         if(localStorageUtils.getParam("isLogin") == "true"){
             createInitPanel_Fun('gonggao',true);
         } else {
             setPanelBackPage_Fun("loginPage");
         }
     });

     //开奖
    $("#awardHallId").off('click');
    $("#awardHallId").on('click', function(){
        if(localStorageUtils.getParam("isLogin") == "true"){
            createInitPanel_Fun("awardHallPage", true);
        } else {
            setPanelBackPage_Fun("loginPage");
        }
    });    
}

function lotteryHallUnloadedPanel() {
    $("#activitiesScroller").empty();
    $("#ActiveIcons").empty();
    if (inter_t1){
        clearInterval(inter_t1);
    }
    if (timeout_t2){
        clearTimeout(timeout_t2);
    }
    if (timeout_t3){
        clearTimeout(timeout_t3);
    }
}

function lunbo(){
    var elem = document.getElementById('huadong');
    window.mySwipe = Swipe(elem, {
        auto: 3000,
        continuous: true,
        disableScroll: true,
        stopPropagation: true,
        callback: function(index, element) {
            $(".xiaoyuandian ul li").length <= index ? index -= $(".xiaoyuandian ul li").length : "";
            $(".xiaoyuandian ul li").eq(index).addClass("active").siblings().removeClass("active");
        }
    });
    $(".xiaoyuandian ul li").click(
        function(){
            mySwipe.slide($(this).index(),500);
        }
    );
}

function init(){
     $("#newAwardList").empty();
     $("#lottery_jjc").empty();
    var arr=localStorageUtils.getParam("saleLottery").split(",");
    if(arr.indexOf("21") != -1){
        arr.splice(arr.indexOf("21"),1); //去掉江苏骰宝
    }
    if(arr.indexOf("87") != -1){
        arr.splice(arr.indexOf("87"),1); //去掉吉林骰宝
    }
    if(arr.indexOf("88") != -1){
        arr.splice(arr.indexOf("88"),1); //去掉安徽骰宝
    }
    if(arr.indexOf("89") != -1){
        arr.splice(arr.indexOf("89"),1); //去掉湖北骰宝
    }
    //首页彩种排序
    for (var i = 0; i < IndexLottery.length;i++){
        var title = '<div style="font-size: 15px;padding: 15px 0px 10px 20px;border-bottom:1px solid #ddd;">'+IndexLottery[i].category+'</div>';
        $("#lottery_jjc").append(title);
        var len = IndexLottery[i].lottery.length;
        var temp = [];
        for(var z = 0; z < len;z++){
            if($.inArray(IndexLottery[i].lottery[z],arr) >= 0){
                temp.push(IndexLottery[i].lottery[z]);
            }
        }

        var length = parseInt(temp.length)  % 3 == 0 ? parseInt(temp.length / 3) : parseInt(temp.length / 3) + 1;
        for (var j = 0; j < length;j++){
            var range = 0;
            if (j == length - 1) {
                range = temp.length % 3 == 0 ? 3 : temp.length % 3;
            } else {
                range = 3;
            }
            var text  = '';
            for (var k = 0; k < range; k++) {
                var index= (j * 3) + k;
                var page = LotteryInfo.getLotteryTagById(temp[index]) + "Page";
                var linkhref = "createInitPanel_Fun('"+page+"')";

                var HaltSaleLottery = localStorageUtils.getParam("HaltSale_ID").split(',');
                if ( HaltSaleLottery && HaltSaleLottery.length > 0 && ($.inArray(temp[index],HaltSaleLottery) != -1 )){
                    linkhref = "toastUtils.showToast('该彩种已停售')";
                }

                var lotteryName = LotteryInfo.getLotteryNameById(temp[index]);
                var imageSrc = LotteryInfo.getLotteryLogoById(temp[index]);
                if (k == 0) {
                    text += '<ul><li><a  onclick='+linkhref+'><img src="' + imageSrc + '" class="marLR_18" /><br /><span>'+lotteryName+'</span></a></li>';
                } else if (k == 1) {
                    text += '<li><a   onclick='+linkhref+'><img src="' + imageSrc + '" class="marLR_18" /><br /><span>'+lotteryName+'</span></a></li>';
                } else if (k == 2) {
                    text += '<li><a  onclick='+linkhref+'><img src="' + imageSrc + '" class="marLR_18" /><br /><span>'+lotteryName+'</span></a></li></ul>';
                }
            }
            $("#lottery_jjc").append(text);
        }
    }
  //版权所有，年份显示
    var copyrightYear = initDefaultDate(0,'year');
    $("#copyrightYear").html(copyrightYear.split('/')[0]);
}

/**
 * [downloadApp_Fun description]
 * @return {[type]} [description]
 */
function downloadApp_Fun(){
    createInitPanel_Fun("app");
}


/**
 * [downloadApp_Fun description]
 * @return {[type]} [description]
 */
function loginComputerLink(){
    window.location.href='/';
}

/*
 函数startmarquee的参数：
 scrollHeight：文字一次向上滚动的距离或高度；
 speed：滚动速度；
 delay：滚动停顿的时间间隔；
 index：可以使封装后的函数应用于页面当中不同的元素；(暂时不用，使用时可加入到参数列表里)
 */
var inter_t1;
var timeout_t3;
var timeout_t2;
function startMarquee(scrollHeight,speed,delay){
    var p=false;
    //对象中的实际内容被复制了一份，包含了两个ul
    var scrollerContent=document.getElementById("activitiesScroller");
    scrollerContent.innerHTML+=scrollerContent.innerHTML;
    //鼠标滑过，停止滚动;
    scrollerContent.onmouseover=function(){p=true};
    //鼠标离开，开始滚动;
    scrollerContent.onmouseout=function(){p=false};
    //文字内容顶端与滚动区域顶端的距离，初始值为0；
    scrollerContent.scrollTop = 0;
    //每隔一段时间，setInterval便会执行一次scrolling函数；speed越大，滚动时间间隔越大，滚动速度越慢；
    function start(){
        inter_t1=setInterval(scrolling,speed);
        if(!p){ scrollerContent.scrollTop += 1;}
    }
    function scrolling(){
        if(scrollerContent.scrollTop%scrollHeight!=0){
            scrollerContent.scrollTop += 1;
            if(scrollerContent.scrollTop>=scrollerContent.scrollHeight/2) scrollerContent.scrollTop = 0;
        }else{
            clearInterval(inter_t1);
            if (timeout_t2){
                clearTimeout(timeout_t2);
            }
            timeout_t2 = setTimeout(start,delay);
        }
    }
    timeout_t3 = setTimeout(start,delay);
}

/*获取公告前三条*/
function  getGongGao3() {
    $("#activitiesScroller").empty();
    $("#ActiveIcons").empty();
    var page = 0;
    ajaxUtil.ajaxByAsyncPost1(null,'{"ProjectPublic_PlatformCode":2,"CurrentPageIndex":"' + page + '","CurrentPageSize":3,"InterfaceName":"GetNewsInfoFlex"}',function(data){
        if (data.SystemState == 64 && data.DataCount !=0) {
            $(".ActivitesGonggao").css('display','');
            var Info=data.ModelList;
            var $strong =$('<strong>&nbsp;公告：</strong>');
            var $gongGaoicon = $('<img src="././images/img-mod/gongGaoIcon.png"/>');
            var $itemUL = $('<ul></ul>');
            $.each(Info, function(key, val) {
                var itemli = '<li data-news='+val.MerchantNews_ID+'>'+val.NewsTittle+'</li>' ;
                $itemUL.append(itemli);
            });
            $("#ActiveIcons").append($gongGaoicon);
            $("#ActiveIcons").append($strong);
            $("#activitiesScroller").append($itemUL);
            //公告滚动效果
            startMarquee(40,40,3000);
            $("#activitiesScroller li").on('click',function () {
                localStorageUtils.setParam("MerchantNews_ID",$(this).data("news"));
                createInitPanel_Fun('gonggaoDetail');
            })
        }else if(data.SystemState == 32 && data.DataCount == 0){
            $(".ActivitesGonggao").css('display','none');
        }
    },null);
}