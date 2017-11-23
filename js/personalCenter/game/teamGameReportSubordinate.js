//页大小
var PAGESIZE_teamGameReportSubordinate = 20;
//查询开始时间
var startDateTime = "";
//查询结束时间
var endDateTime = "";
//用户名
var userName = "";
//下级类型
var type = 0;
//用户id
var uid = "";
var queryName="";

var selDateGRSubStart;
var selDateGRSubEnd;

/*进入panel时调用*/
function teamGameReportSubordinateLoadedPanel(){
    catchErrorFun("teamGameReportSubordinateInit();");
}
/*离开panel时调用*/
function teamGameReportSubordinateUnloadedPanel(){
    $("#teamGameReportSubordinateList").empty();
    localStorageUtils.removeParam("gameSubordinateId");
    clearSearchTerm();
    startDateTime = "";
    endDateTime = "";
    type = 0;
    page = 0;
    uid = "";
    queryName="";
    userName = "";
    if(selDateGRSubStart){
        selDateGRSubStart.dismiss();
    }
    if(selDateGRSubEnd){
        selDateGRSubEnd.dismiss();
    }
}
function teamGameReportSubordinateInit(){
    $("#selectteamGameReportSubordinateID").empty();
    var $select=$('<table><tr>' +
        '<td><select name="searchDate_teamGameReportSub" id="searchDate_teamGameReportSub" data-theme="a" data-mini="true" onchange="dateChange_teamGameReportSubordinate()"><option value="0" selected="selected">当天时间</option><option value="1">历史时间</option></select></td>' +
        '<td><input type="text" id="selectDateGRSub_Stt" readonly/></td>' +
        '<td><input type="text" id="selectDateGRSub_End" readonly/></td></tr>' +
        '<tr><td colspan="3"><select name="searchType_teamGameReportSub" id="searchType_teamGameReportSub" data-theme="a" data-mini="true" onchange="typeChange_teamGameReportSubordinate()"><option value="0" selected="selected">下级类型：全部</option><option value="1">下级类型：会员</option><option value="2">下级类型：代理</option></select></td></tr></table>');
    $("#selectteamGameReportSubordinateID").append($select);

    selDateGRSubStart = new MobileSelectDate();
    selDateGRSubStart.init({trigger:'#selectDateGRSub_Stt',min:initDefaultDate(0,"day"),max:initDefaultDate(0,"day")});
    selDateGRSubEnd = new MobileSelectDate();
    selDateGRSubEnd.init({trigger:'#selectDateGRSub_End',min:initDefaultDate(0,"day"),max:initDefaultDate(0,"day")});

    uid = localStorageUtils.getParam("gameSubordinateId");
    if(uid == null){
        uid = localStorageUtils.getParam("myUserID");
    }
    type = 0;
    page = 0;
    hasMorePage = true;//默认还有分页
    var _myScroller =  $("#teamGameReportSubordinateScroller").scroller({
        verticalScroll : true,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
    });
    _myScroller.scrollToTop();
    _myScroller.clearInfinite();
    addUseScroller(_myScroller,'teamGameReportSubordinateList','getSearchteamGameReportSubordinate()');
    //进入时加载
    loadBySearchteamGameReportSubordinate();
    //返回
    $("#teamGameReportSubordinateBackId").unbind('click');
    $("#teamGameReportSubordinateBackId").bind('click', function(event) {
        onBackKeyDown();
        setPanelBackPage_Fun('gameReport');
    });

    /**
     * 团队充值查询
     */
    $("#queryteamGameReportSubordinateButtonID").unbind('click');
    $("#queryteamGameReportSubordinateButtonID").bind('click', function(event) {
        $.ui.popup({
            title:"下级统计查询",
            message:'<input type="text" id="teamGameReportSubordinateUserNameId" maxLength="25"  placeholder="请输入要查找的用户名" />',
            cancelText:"关闭",
            cancelCallback:
                function(){
                },
            doneText:"确定",
            doneCallback:
                function(){
                    var searchUser = $("#teamGameReportSubordinateUserNameId").val();
                    var temp = localStorageUtils.getParam("myUserID");
                    if(searchUser ==""){
                        toastUtils.showToast("请输入要查找的用户名");
                        return;
                    }
                    if(uid != temp){
                        toastUtils.showToast("下级代理不支持用户名搜索");
                        return;
                    }
                    queryteamGameReportSubordinateUserNameIdUserName(searchUser);
                },
            cancelOnly:false
        });
    });
}

function getSearchteamGameReportSubordinate(){
    searchteamGameReportSubordinate_Record(startDateTime, endDateTime, type)
}

/**
 * 通过查询条件加载数据
 */
function loadBySearchteamGameReportSubordinate() {
    var conditions = getSearchTerm();
    if (null != conditions) {
        var dataOptions = document.getElementById('searchDate_teamGameReportSub').options;
        for (var i = 0; i < dataOptions.length; i++) {
            dataOptions[i].selected = false;
            if (dataOptions[i].value == conditions.time) {
                dataOptions[i].selected = true;
            }
        }
        var typeOptions = document.getElementById('searchType_teamGameReportSub').options;
        for (var i = 0; i < typeOptions.length; i++) {
            typeOptions[i].selected = false;
            if (typeOptions[i].value == conditions.type) {
                typeOptions[i].selected = true;
            }
        }
        type = $("#searchType_teamGameReportSub").val();
        startDateTime = conditions.dateStt+hms00;
        endDateTime = conditions.dateEnd+hms59;
        $("#selectDateGRSub_Stt").val(conditions.dateStt);
        $("#selectDateGRSub_End").val(conditions.dateEnd);
        // 时间选择器
        var dateChange = conditions.time;
        switch (dateChange){
            case "0":
                changeDateRange_GRSub(0,"day",0,"day");   //Controller
                break;
            case "1":
                changeDateRange_GRSub(-DayRange_3month,"day",-1,"day");     //Controller
                break;
        }

        //根据查询条件查询数据
        searchteamGameReportSubordinate(startDateTime, endDateTime, type);
        //重置isDetail标记，表示从记录界面返回
        var searchConditions = getSearchTerm();
        searchConditions.isDetail =  false;
        saveSearchTerm(searchConditions);
    } else {
        initTeamGameReportSubPage();
    }
}

function initTeamGameReportSubPage() {
    type = 0;
    $("#selectDateGRSub_Stt").val(initDefaultDate(0,"day"));
    $("#selectDateGRSub_End").val(initDefaultDate(0,"day"));
    //查询开始时间
    startDateTime = $("#selectDateGRSub_Stt").val()+hms00;
    //查询结束时间
    endDateTime = $("#selectDateGRSub_End").val()+hms59;
    searchteamGameReportSubordinate(startDateTime, endDateTime, type);
}

/**
 * 每个item点击时，触发该方法，保存当前的查询条件
 */
function onItemClickListener_teamGameReportSubordinate() {
    var searchConditions = {};
    searchConditions.time =  $("#searchDate_teamGameReportSub").val();
    searchConditions.type =  $("#searchType_teamGameReportSub").val();
    searchConditions.dateStt =  $("#selectDateGRSub_Stt").val();
    searchConditions.dateEnd =  $("#selectDateGRSub_End").val();
    searchConditions.isDetail =  true;
    saveSearchTerm(searchConditions);
}

//日期改变事件
function dateChange_teamGameReportSubordinate() {
    var timeType = $("#searchDate_teamGameReportSub").val();
    type = $("#searchType_teamGameReportSub").val();
    switch(timeType) {
        case "0":
            //当天记录
            $("#selectDateGRSub_Stt").val(initDefaultDate(0,'day'));  //View
            $("#selectDateGRSub_End").val(initDefaultDate(0,'day'));
            startDateTime = $("#selectDateGRSub_Stt").val()+hms00;
            endDateTime = $("#selectDateGRSub_End").val()+hms59;
            searchteamGameReportSubordinate(startDateTime, endDateTime,type);
            changeDateRange_GRSub(0,"day",0,"day");   //Controller
            break;
        case "1":
            //历史记录
            $("#selectDateGRSub_Stt").val(initDefaultDate(-1,'day'));  //view
            $("#selectDateGRSub_End").val(initDefaultDate(-1,'day'));
            startDateTime = $("#selectDateGRSub_Stt").val()+hms00;
            endDateTime = $("#selectDateGRSub_End").val()+hms59;
            searchteamGameReportSubordinate(startDateTime, endDateTime,type);
            changeDateRange_GRSub(-DayRange_3month,"day",-1,"day");     //Controller
            break;
    }
}

/*
 *   切换当前记录或者历史记录时。
 **/
function changeDateRange_GRSub(minNum,minType,maxNum,maxType){
    selDateGRSubStart.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
    selDateGRSubEnd.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
}

/**
 *查询团队下级记录
 */
function searchteamGameReportSubordinate_Record(startDateTime, endDateTime, type) {
    var temp = localStorageUtils.getParam("myUserID");
    if(uid != temp){//下级
        ajaxUtil.ajaxByAsyncPost(null, '{"User_ID":"'+uid+'","GetUserType":0,"InterfaceName":"DsGetRePortChild","ProjectPublic_PlatformCode":2,"BeginTime":"' + startDateTime + '","EndTime":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_teamGameReportSubordinate + '}', teamGameReportSubordinate_searchSuccessCallBack, '正在加载数据...');
    }else{
        ajaxUtil.ajaxByAsyncPost(null, '{"UserName":"","User_ID":"'+uid+'","InterfaceName":"DsGetRePortChild","ProjectPublic_PlatformCode":2,"GetUserType":' + type + ',"BeginTime":"' + startDateTime + '","EndTime":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_teamGameReportSubordinate + '}', teamGameReportSubordinate_searchSuccessCallBack, '正在加载数据...');
    }
}
/**
 *查询团队下级记录
 */
function searchteamGameReportSubordinate(startDateTime, endDateTime, type) {
    page=0;
    var temp = localStorageUtils.getParam("myUserID");
    if(uid != temp){//下级
        ajaxUtil.ajaxByAsyncPost(null, '{"User_ID":"'+uid+'","GetUserType":0,"InterfaceName":"DsGetRePortChild","ProjectPublic_PlatformCode":2,"BeginTime":"' + startDateTime + '","EndTime":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_teamGameReportSubordinate + '}', teamGameReportSubordinate_searchSuccessCallBack, '正在加载数据...');
    }else{
        ajaxUtil.ajaxByAsyncPost(null, '{"UserName":"","User_ID":"'+uid+'","InterfaceName":"DsGetRePortChild","ProjectPublic_PlatformCode":2,"GetUserType":' + type + ',"BeginTime":"' + startDateTime + '","EndTime":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_teamGameReportSubordinate + '}', teamGameReportSubordinate_searchSuccessCallBack, '正在加载数据...');
    }
}

//类型改变事件
function typeChange_teamGameReportSubordinate() {
    type = $("#searchType_teamGameReportSub").val();
    startDateTime = $("#selectDateGRSub_Stt").val()+hms00;
    endDateTime = $("#selectDateGRSub_End").val()+hms59;
    searchteamGameReportSubordinate(startDateTime, endDateTime, type);
}

function teamGameReportSubordinate_searchSuccessCallBack(data){
    if (page == 0) {
        $("#teamGameReportSubordinateList").empty();
    }
    if(data ==null){
        toastUtils.showToast("没有数据");
        return;
    }

    if (data.SystemState == 64  && data.DataCount !=0) {
        var info = data.ReportComm;
        isHasMorePage(info,PAGESIZE_teamGameReportSubordinate);
        for (var i = 0; i < info.length; i++) {
            var dataSet = {};
            //用户名
            dataSet.userName = info[i].UserName;
            //投注金额
            dataSet.GamePay = info[i].GamePay;
            //中奖金额
            dataSet.GameGet = info[i].GameGet;
            //uid
            dataSet.userId = info[i].UserID;
            //ChildNum
            dataSet.ChildNum = info[i].ChildNum;
            //用户类型
            if ((parseInt(info[i].Category) & 64) == 64) {
                dataSet.category = "会员";
            } else {
                dataSet.category = "代理";
            }
            //房费
            dataSet.RoomFee = info[i].RoomFee;
            //盈亏
            dataSet.PL = info[i].PL;
            //对战类盈亏
            dataSet.PlayIncome = info[i].PlayIncome;
            //电子类盈亏
            dataSet.SystemIncome = info[i].SystemIncome;


            var $itemLi = $('<li></li>').data('teamGameReportSubordinate',dataSet);
            $itemLi.on('click',function() {
                onItemClickListener_teamGameReportSubordinate();
                localStorageUtils.setParam("teamGameReportSubordinate",JSON.stringify($(this).data('teamGameReportSubordinate')));
                setPanelBackPage_Fun('teamGameReportSubordinateDetail');
            });
            $itemLi.append('<a class="recordList"><dl class="orderList"><dd>用户名：' + dataSet.userName + '</dd><dd>类型：'+dataSet.category+'</dd><dd>投注金额：' + dataSet.GamePay +'</dd><dd>中奖金额：' + dataSet.GameGet +'</dd></dl></a>');
            $("#teamGameReportSubordinateList").append($itemLi);
        }
    } else if(data.SystemState == -1){
        loginAgain();
    } else if (data.DataCount ==0) {
        toastUtils.showToast("没有数据");
    }else {
        toastUtils.showToast("网络不给力，请稍后再试");
    }
}

//根据用户名查找
function queryteamGameReportSubordinateUserNameIdUserName(searchUser){
    page = 0;
    ajaxUtil.ajaxByAsyncPost(null, '{"User_ID":"'+uid+'","UserName":"' + searchUser + '","InterfaceName":"DsGetRePortChild","ProjectPublic_PlatformCode":2,"GetUserType":' + type + ',"BeginTime":"' + startDateTime + '","EndTime":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_teamGameReportSubordinate + '}',
        teamGameReportSubordinate_searchSuccessCallBack, '正在加载数据...');
}

function onBackKeyDown(){
    clearSearchTerm();
    var temp = localStorageUtils.getParam("myUserID");
    localStorageUtils.setParam("gameSubordinateId", temp);
}