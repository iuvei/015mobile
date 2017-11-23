/** teamAccount
 */
//页大小
var PAGESIZE_teamAccount = 20;
//查询开始时间
var startDateTime = "";
//查询结束时间
var endDateTime = "";
//用户名
var userName = "";
var type_teamAccount = 0;
var IsHistory = false;
var selDateTAStart;
var selDateTAEnd;
/*进入panel时调用*/
function teamAccountLoadedPanel(){
    catchErrorFun("teamAccountRecordsInit();");
}
/*离开panel时调用*/
function teamAccountUnloadedPanel(){
    $("#teamAccountList").empty();
    //清除本地存储的查询条件
    clearSearchTerm();
    startDateTime = "";
    endDateTime = "";
    type_teamAccount = 0;
    IsHistory=false;
    if(selDateTAStart){
        selDateTAStart.dismiss();
    }
    if(selDateTAEnd){
        selDateTAEnd.dismiss();
    }
}

function teamAccountRecordsInit(){
    $("#teamAccountSelect").empty();

    var $select=$('<table><tr>' +
        '<td><select name="searchDate_teamAccount" id="searchDate_teamAccount" data-theme="a" data-mini="true" onchange="dateChange_teamAccount()"><option value="0" selected="selected">当前记录</option><option value="1">历史记录</option></select></td>' +
        '<td><input type="text" id="selectDateTA_Stt" readonly/></td>' +
        '<td><input type="text" id="selectDateTA_End" readonly/></td></tr>' +
        '<tr><td colspan="3"><select name="searchType_teamAccount" id="searchType_teamAccount" data-theme="a" data-mini="true" onchange="typeChange_teamAccount()"><option value="0" selected="selected">全部</option><option value="18">充值</option>'+
        '<option value="26">提款</option><option value="3">转账</option><option value="1">投注</option>'+
        '<option value="2">中奖</option><option value="4">撤单</option>'+
        '<option value="5">撤奖</option><option value="6">活动</option>'+
        '<option value="7">下级返点</option><option value="8">自身投注返点</option>'+
        '<option value="9">给下级充值</option><option value="10">来自上级的充值</option>'+
        '<option value="11">管理员添加</option></select>'+
        '</td></tr></table>');

    if (localStorageUtils.getParam("IsDayWages") == "true"){
        $select.find('td:last-child').children('select').append('<option value="29">日工资</option>');
    }
    if (localStorageUtils.getParam("IsContract") == "true"){
        $select.find('td:last-child').children('select').append('<option value="28">分红</option>');
    }
    $("#teamAccountSelect").append($select);

    //查询开始时间
    selDateTAStart = new MobileSelectDate();
    selDateTAStart.init({trigger:'#selectDateTA_Stt',min:initDefaultDate(-3,"day"),max:initDefaultDate(0,"day")});
    selDateTAEnd = new MobileSelectDate();
    selDateTAEnd.init({trigger:'#selectDateTA_End',min:initDefaultDate(-3,"day"),max:initDefaultDate(0,"day")});

    userName = localStorageUtils.getParam("username");
    myUserID = localStorageUtils.getParam("myUserID");
    page = 0;
    hasMorePage = true; //默认还有分页
    type_teamAccount = $("#searchType_teamAccount").val();

    var _teamScroller =  $("#teamAccountScroller").scroller({
        verticalScroll : true,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
    });
    _teamScroller.scrollToTop();
    _teamScroller.clearInfinite();
    addUseScroller(_teamScroller,'teamAccountList','getteamAccountRecords()');
    //进入时加载
    loadBySearchItemsTeamAccount();

    /**
     * 团队投注查询（右上角搜索）
     */
    $("#teamAccountSearchBtn").unbind('click');
    $("#teamAccountSearchBtn").bind('click', function(event) {
        $.ui.popup({
            title:"团队账变查询",
            message:'<input type="text" id="teamAccount_searchByName" maxLength="25"  placeholder="请输入要查找的用户名" />',
            cancelText:"关闭",
            cancelCallback:
                function(){
                },
            doneText:"确定",
            doneCallback:
                function(){
                    var searchUser = $("#teamAccount_searchByName").val();
                    if(searchUser ==""){
                        toastUtils.showToast("请输入要查找的用户名");
                        return;
                    }
                    queryteamAccountUserName(searchUser);
                },
            cancelOnly:false
        });
    });
}

/********** 查询投注记录 **********/
function getteamAccountRecords(){
    nextPage_teamAccount(startDateTime, endDateTime, type_teamAccount);
}

/********** 创建投注记录列表  *********/
function createteamAccountRecordsList(data){
    // console.log("调用查询teamAccount历史投注记录方法返回的数据" + JSON.stringify(data));
    if (page == 0) {
        $("#teamAccountList").empty();
        $("#teamAccountScroller").scroller().scrollToTop();
        $("#teamAccountScroller").scroller().clearInfinite();
    }
    if(data ==null){
        toastUtils.showToast("没有数据");
        return;
    }
    if (data.SystemState == 64 && data.DataCount!=0) {
        var UfInfo = data.UfInfo;
        isHasMorePage(UfInfo,PAGESIZE_teamAccount);

        for (var i = 0; i < UfInfo.length; i++) {
            var dataSet = new Object();
            dataSet.userName = UfInfo[i].UserName;  // 用户名
            dataSet.orderId = UfInfo[i].OrderID;  // 订单号
            dataSet.tradeType = getShouZhiByID(UfInfo[i].DetailsSource, UfInfo[i].RechargeType);  //交易类型
            //转盘活动未中奖时的金额显示
            if(UfInfo[i].UseMoney == 0 && UfInfo[i].DetailsSource == 257){
                dataSet.tradeMoney = UfInfo[i].Marks;
            }else{
                dataSet.tradeMoney = UfInfo[i].UseMoney;  // 交易金额
            }
            dataSet.thenBalance = UfInfo[i].ThenBalance;  // 余额
            dataSet.details = remarkZH(UfInfo[i].Marks+"", UfInfo[i].DetailsSource, userName);  // 备注
            dataSet.insertTime = UfInfo[i].InsertTime;  // 交易时间

            var $itemLi = $('<li></li>').data('teamAccount',dataSet);
            $itemLi.on('click',function() {
                onItemClickListener_teamAccount();
                localStorageUtils.setParam("teamAccount",JSON.stringify($(this).data('teamAccount')));
                setPanelBackPage_Fun('teamAccountDetails');
            });
            $itemLi.append('<a class="recordList"><dl class="orderList"><dd>用户名:&nbsp;' + dataSet.userName + '</dd><dd>交易金额:&nbsp;<span class="red">' + dataSet.tradeMoney +'</span></dd><dd>类型:&nbsp;'+dataSet.tradeType+'</dd><dd>时间:&nbsp;' + dataSet.insertTime +'</dd></dl></a>');
            $("#teamAccountList").append($itemLi);
        }
    } else if (data.SystemState == -1) {
        loginAgain();
    } else if (data.DataCount == 0) {
        toastUtils.showToast("没有数据");
        return;
    } else {
        toastUtils.showToast("当前网络不给力，请稍后再试");
        return;
    }
}
//玩法类型改变事件
function typeChange_teamAccount() {
    type_teamAccount = $("#searchType_teamAccount").val();
    startDateTime = $("#selectDateTA_Stt").val()+hms00;
    endDateTime = $("#selectDateTA_End").val()+hms59;
    searchTeamAccount(startDateTime, endDateTime, type_teamAccount);
}
/**
 * 查询历史投注记录信息（滚动刷新后的列表）
 * @param startDateTime 查询开始时间
 * @param endDateTime 查询结束时间
 */
function nextPage_teamAccount(startDateTime, endDateTime, type_teamAcct) {
    var params = '{"InterfaceName":"GetTeamAccountChanged","Source":'+type_teamAcct+',"ProjectPublic_PlatformCode":2,"ThisUserName":"","insertTimeMin":"' + startDateTime + '","IsHistory":' + IsHistory + ',"insertTimeMax":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_teamAccount + '}';
    ajaxUtil.ajaxByAsyncPost1(null, params, createteamAccountRecordsList,null);
}

/**
 * 查询历史投注记录信息（通过改变彩种，时间等查询条件时刷新的结果）
 * @param startDateTime 查询开始时间
 * @param endDateTime 查询结束时间
 */
function searchTeamAccount(startDateTime, endDateTime, type_teamAcct) {
    page=0;
    var params = '{"InterfaceName":"GetTeamAccountChanged","Source":'+type_teamAcct+',"ProjectPublic_PlatformCode":2,"ThisUserName":"","insertTimeMin":"' + startDateTime + '","IsHistory":' + IsHistory + ',"insertTimeMax":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_teamAccount + '}';
    ajaxUtil.ajaxByAsyncPost1(null, params, createteamAccountRecordsList,null);
}
/**
 * 日期改变事件
 * [dateChange_teamAccount description]
 * @return {[type_teamAccount]} [description]
 */
function dateChange_teamAccount() {
    var timeType = $("#searchDate_teamAccount").val();
    type_teamAccount = $("#searchType_teamAccount").val();
    switch(timeType) {
        case "0":
            //当前记录
            $("#selectDateTA_Stt").val(initDefaultDate(0,'day'));  //View
            $("#selectDateTA_End").val(initDefaultDate(0,'day'));
            startDateTime = $("#selectDateTA_Stt").val()+hms00;
            endDateTime = $("#selectDateTA_End").val()+hms59;
            IsHistory = false;
            searchTeamAccount(startDateTime, endDateTime,type_teamAccount);
            changeDateRange_TA(-3,"day",0,"day");   //Controller
            break;
        case "1":
            //历史记录
            $("#selectDateTA_Stt").val(initDefaultDate(-4,'day'));  //view
            $("#selectDateTA_End").val(initDefaultDate(-4,'day'));
            startDateTime = $("#selectDateTA_Stt").val()+hms00;
            endDateTime = $("#selectDateTA_End").val()+hms59;
            IsHistory = true;
            searchTeamAccount(startDateTime, endDateTime,type_teamAccount);
            changeDateRange_TA(-33,"day",-4,"day");     //Controller
            break;
    }
}

/*
 *   切换当前记录或者历史记录时。
 **/
function changeDateRange_TA(minNum,minType,maxNum,maxType){
    selDateTAStart.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
    selDateTAEnd.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
}


//根据用户名模糊查找
function queryteamAccountUserName(searchUser){
    page = 0;
    type_teamAccount = $("#searchType_teamAccount").val();
    var params = '{"InterfaceName":"GetTeamAccountChanged","Source":'+type_teamAccount+',"ProjectPublic_PlatformCode":2,"ThisUserName":"' + searchUser + '","insertTimeMin":"' + startDateTime + '","insertTimeMax":"' + endDateTime + '","IsHistory":' + IsHistory + ',"CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_teamAccount + '}';
    ajaxUtil.ajaxByAsyncPost1(null, params, createteamAccountRecordsList,null);
}

/**
 * 通过查询条件加载数据
 */
function loadBySearchItemsTeamAccount() {
    var conditionsTeamAccount = getSearchTerm();
    if (null != conditionsTeamAccount) {
        if(unloadAtBettingDetail == true){
            initTeamAccountRecordsPage();
        }else{
            var dataOptions = document.getElementById('searchDate_teamAccount').options;
            for (var i = 0; i < dataOptions.length; i++) {
                dataOptions[i].selected = false;
                if (dataOptions[i].value == conditionsTeamAccount.time) {
                    dataOptions[i].selected = true;
                }
            }
            var typeOptions = document.getElementById('searchType_teamAccount').options;
            for (var i = 0; i < typeOptions.length; i++) {
                typeOptions[i].selected = false;
                if (typeOptions[i].value == conditionsTeamAccount.type) {
                    typeOptions[i].selected = true;
                }
            }
            type_teamAccount = conditionsTeamAccount.type;
            startDateTime = conditionsTeamAccount.dateStt + hms00;
            endDateTime = conditionsTeamAccount.dateEnd + hms59;
            $("#selectDateTA_Stt").val(conditionsTeamAccount.dateStt);
            $("#selectDateTA_End").val(conditionsTeamAccount.dateEnd);
            // 时间选择器
            var dateChange = conditionsTeamAccount.time;
            switch (dateChange){
                case "0":
                    IsHistory=false;
                    localStorageUtils.setParam("IsHistory",IsHistory);
                    changeDateRange_TA(-3,"day",0,"day");   //Controller
                    break;
                case "1":
                    IsHistory=true;
                    localStorageUtils.setParam("IsHistory",IsHistory);
                    changeDateRange_TA(-33,"day",-4,"day");     //Controller
                    break;
            }
            //根据日期查询条件查询数据
            searchTeamAccount(startDateTime, endDateTime, type_teamAccount);
            //重置isDetail标记，表示从记录界面返回
            var searchconditionsTeamAccount = getSearchTerm();
            searchconditionsTeamAccount.isDetail =  false;
            saveSearchTerm(searchconditionsTeamAccount);
        }
    } else {
        initTeamAccountRecordsPage();
    }
}

function initTeamAccountRecordsPage() {
    IsHistory = false;
    localStorageUtils.setParam("IsHistory",IsHistory);
    $("#selectDateTA_Stt").val(initDefaultDate(0,"day"));
    $("#selectDateTA_End").val(initDefaultDate(0,"day"));
    //查询开始时间
    startDateTime = initDefaultDate(0,"day") + hms00;
    //查询结束时间
    endDateTime = initDefaultDate(0,"day") + hms59;
    type_teamAccount = 0;
    searchTeamAccount(startDateTime, endDateTime, type_teamAccount);
}
/**
 * 每个item点击时，触发该方法，保存当前的查询条件
 */
function onItemClickListener_teamAccount() {
    var searchconditionsTeamAccount = {};
    searchconditionsTeamAccount.time =  $("#searchDate_teamAccount").val();
    searchconditionsTeamAccount.type =  $("#searchType_teamAccount").val();
    searchconditionsTeamAccount.dateStt = $("#selectDateTA_Stt").val();
    searchconditionsTeamAccount.dateEnd = $("#selectDateTA_End").val();
    searchconditionsTeamAccount.isDetail =  true;
    saveSearchTerm(searchconditionsTeamAccount);
}
