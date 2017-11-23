'use strict';
/* 加载收件箱和发件箱列表 */

//@ 全局变量
var Email_pageSize = 20;
var emailSource;

//@ 进入页面时
function EmailListsLoadedPanel() {
    catchErrorFun("EmailLists_init();");
}
//@ 离开页面时
function EmailListsUnloadedPanel() {
    $("#messageLists").empty();
    localStorageUtils.setParam("emailSource",0);
    localStorageUtils.removeParam("receiverId");//use for sendEmail
}

//@ 入口函数
function EmailLists_init() {
    myUserID = localStorageUtils.getParam("myUserID");
    emailSource = localStorageUtils.getParam("emailSource");
    if (!emailSource){
        emailSource = 0;  //0-收件箱; 1-发件箱.
    }
    changeStationEmailStyle();
    page = 0;
    hasMorePage = true;
    getNextPage(emailSource);
}

//@ 切换收件箱或者发件箱
function changeStationEmailStyle() {
    //初始化
    if (emailSource == 0){    //收件箱
        var Source = "get";
        getRecEmail();
    }else if (emailSource == 1){  //发件箱
        Source = "send";
        getSendEmail();
    }
    $("#"+Source+"EmailBtn").css({"color":"#FF9e00","borderBottom":"1px solid #FF9e00"});
    $("#"+Source+"EmailBtn").siblings("li").css({"color":"#666666","borderBottom":"1px solid #fff"});

    //Click to change(Receive or Send)
    $("#EmailStyle > li").off('click');
    $("#EmailStyle > li").on('click',function () {
        $(this).css({"color":"#FF9e00","borderBottom":"1px solid #FF9e00"});
        $(this).siblings("li").css({"color":"#666666","borderBottom":"1px solid #fff"});
        $("#messageLists").empty();
        var clickedID = $(this).context.id;
        if (clickedID == "getEmailBtn"){
            emailSource = 0;
            getRecEmail();
        }else if (clickedID == "sendEmailBtn"){
            emailSource = 1;
            getSendEmail();
        }
        getNextPage(emailSource);
    });

}
//@ 加载下一页
function getNextPage(source){
    var _myScroller =  $("#EmailContentScroller").scroller({
        verticalScroll : true,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
    });
    _myScroller.scrollToTop();
    _myScroller.clearInfinite();
    if (source == 0){
        addUseScroller(_myScroller,'messageLists','getRecEmail_next()');
    }else if (source == 1){
        addUseScroller(_myScroller,'messageLists','getSendEmail_next()');
    }
}

//@ 初次获取收件箱列表
function getRecEmail() {
    page = 0;
    var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetStationEmailReceiveBox","UserID":"'+myUserID+'","CurrentPageIndex":' + page + ',"CurrentPageSize":' + Email_pageSize + '}';
    ajaxUtil.ajaxByAsyncPost1(null, param, getRecEmailCallback,'正在加载数据...');
}
//收件箱-nextPage
function getRecEmail_next(){
    var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetStationEmailReceiveBox","UserID":"'+myUserID+'","CurrentPageIndex":' + page + ',"CurrentPageSize":' + Email_pageSize + '}';
    ajaxUtil.ajaxByAsyncPost1(null, param, getRecEmailCallback,'正在加载数据...');
}

//@ 收件箱CallBack
function getRecEmailCallback(data) {
    if (page == 0) {
        $("#messageLists").empty();
        $("#EmailContentScroller").scroller().scrollToTop();
        $("#EmailContentScroller").scroller().clearInfinite();
    }
    if (data.SystemState == 64){
        var recEmailLists = data.EmailReceiveBoxs;
        isHasMorePage(recEmailLists,Email_pageSize);
        //有站内信时
        if (data.DataCount > 0){
            $("#hasEmails").show();
            $("#noEmails").hide();
        $.each(recEmailLists,function (key,val) {
            var emailDetailInfo = {};
            emailDetailInfo.id = val['ID'];
            emailDetailInfo.IsSend = 0;
            //未读
            if (val.EmailState == 2){
                var $receiveLi = $('<li>发送人：<span>'+ showSendPerson(val.SendPersonLevel,val.SendPerson) +'</span><small>'+ val.SendDateTime +'</small><p><i class="showUnreadList"></i><span>'+ val.Title +'</span></p><span class="emailBtnRight"></span></li>');
            }else{    //已读,Others
                $receiveLi = $('<li>发送人：<span>'+ showSendPerson(val.SendPersonLevel,val.SendPerson) +'</span><small>'+ val.SendDateTime +'</small><p><i></i><span>'+ val.Title +'</span></p><span class="emailBtnRight"></span></li>');
            }
            //点击进入详情页
            $receiveLi.on('click',function () {
                localStorageUtils.setParam("emailDetailInfo",jsonUtils.toString(emailDetailInfo));
                setPanelBackPage_Fun('EmailDetails');
            });

            $("#messageLists").append($receiveLi);
        });
        }else{  //无站内信时
            // $("#hasEmails").hide();
            // $("#noEmails").show();
        }
    } else if(data.SystemState == -1){
        loginAgain();
    } else{
        toastUtils.showToast("获取数据失败");
    }
}
//@ 收件箱-发送人显示
function showSendPerson(level,person) {
    if (level == 3){
        return "系统消息";
    } else if (level == 2){
        return "上级";
    } else{
        return person;
    }
}

//@ 初次获取发件箱列表
function getSendEmail() {
    page = 0;
    var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetStationEmailSendBox","UserID":"'+ myUserID +'","CurrentPageIndex":' + page + ',"CurrentPageSize":' + Email_pageSize + '}';
    ajaxUtil.ajaxByAsyncPost1(null, param, getSendEmailCallback,'正在加载数据...');
}
//发件箱-nextPage
function getSendEmail_next(){
    var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetStationEmailSendBox","UserID":"'+myUserID+'","CurrentPageIndex":' + page + ',"CurrentPageSize":' + Email_pageSize + '}';
    ajaxUtil.ajaxByAsyncPost1(null, param, getSendEmailCallback,'正在加载数据...');
}

//@ 发件箱CallBack
function getSendEmailCallback(data) {
    if (page == 0) {
        $("#messageLists").empty();
        $("#EmailContentScroller").scroller().scrollToTop();
        $("#EmailContentScroller").scroller().clearInfinite();
    }
    if (data.SystemState == 64){
        var sendEmailLists = data.EmailSendBoxs;
        isHasMorePage(sendEmailLists,Email_pageSize);
        if (data.DataCount > 0){
            $("#hasEmails").show();
            $("#noEmails").hide();
            $.each(sendEmailLists,function (key,val) {
                var emailDetailInfo = {};
                emailDetailInfo.id = val['ID'];
                emailDetailInfo.IsSend = 1;
                //发送成功
                if (val.Sign == 0){
                    var $sendLi = $('<li>收件人：<span>'+ showRecPerson(val.SendPersonLevel) +'</span><small>'+ val.SendDateTime +'</small><p><span>'+ val.Title +'</span></p><span class="emailBtnRight"></span></li>');
                }
                //点击进入详情页
                $sendLi.on('click',function (){
                    localStorageUtils.setParam("emailDetailInfo",jsonUtils.toString(emailDetailInfo));
                    setPanelBackPage_Fun('EmailDetails');
                });
                $("#messageLists").append($sendLi);
            });
        }else{
            // $("#hasEmails").hide();
            // $("#noEmails").show();
        }
    } else if(data.SystemState == -1){
        loginAgain();
    } else{
        toastUtils.showToast("获取数据失败");
    }
}

//@ 发件箱-收件人显示
function showRecPerson(level) {
    if (level == 1){
        return "上级";
    }else{
        return "下级";
    }
}
