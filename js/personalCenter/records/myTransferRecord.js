//页大小
var PAGESIZE_myTransfer = 20;
//查询开始时间
var startDateTime = "";
//查询结束时间
var endDateTime = "";
var selDateTransferStart;
var selDateTransferEnd;
var userID;
//IsHistory 默认false  是否是历史记录
var IsHistory = false;
var stateType = "0";

/*进入panel时调用*/
function myTransferRecordLoadedPanel(){
    catchErrorFun("myTransferRecordInit();");
}
/*离开panel时调用*/
function myTransferRecordUnloadedPanel(){
    $("#myTransferList").empty();
    //清除本地存储的查询条件
    clearSearchTerm();
    startDateTime = "";
    endDateTime = "";
    stateType = "0";
    if(selDateTransferStart){
        selDateTransferStart.dismiss();
    }
    if(selDateTransferEnd){
        selDateTransferEnd.dismiss();
    }
}

//@ 初始化
function myTransferRecordInit(){
    $("#selectMyTransferID").empty();
    var $select=$('<table><tr>' +
        '<td><select name="searchDate_myTransfer" id="searchDate_myTransfer" data-theme="a" data-mini="true" onchange="dateChange_myTransfer()"><option value="0" selected="selected">当前记录</option><option value="1">历史记录</option></select></td>' +
        '<td><input type="text" id="selectDateTransfer_Stt" readonly/></td>' +
        '<td><input type="text" id="selectDateTransfer_End" readonly/></td></tr>' +
        '<tr><td colspan="3"><select name="searchType_myTransfer" id="searchType_myTransfer" data-theme="a" data-mini="true" onchange="typeChange_myTransfer()">' +
        '<option value="0" selected="selected">状态：全部</option>'+
        '<option value="2">状态：成功</option>'+
        '<option value="3">状态：处理中</option>'+
        '<option value="4">状态：失败</option></select></td></tr></table>');
    $("#selectMyTransferID").append($select);

    //查询开始时间
    selDateTransferStart = new MobileSelectDate();
    selDateTransferStart.init({trigger:'#selectDateTransfer_Stt',min:initDefaultDate(-3,"day"),max:initDefaultDate(0,"day")});
    selDateTransferEnd = new MobileSelectDate();
    selDateTransferEnd.init({trigger:'#selectDateTransfer_End',min:initDefaultDate(-3,"day"),max:initDefaultDate(0,"day")});

    userID = localStorageUtils.getParam("myUserID");
    page = 0;
    hasMorePage = true;//默认还有分页
    var _myScroller =  $("#myTransferScroller").scroller({
        verticalScroll : true,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
    });
    _myScroller.scrollToTop();
    _myScroller.clearInfinite();
    addUseScroller(_myScroller,'myTransferList','getMyTransferNext()');
    //进入时加载
    loadMyTransferRecord();

    // 转账记录查询（右上角搜索）
    $("#queryMyTransferButton").unbind('click');
    $("#queryMyTransferButton").bind('click', function(event) {
        $.ui.popup({
            title:"订单号查询",
            message:'<input type="text" id="myTransferOrderId" maxLength="25"  placeholder="请输入要查找的订单号" />',
            cancelText:"关闭",
            cancelCallback:
                function(){
                },
            doneText:"确定",
            doneCallback:
                function(){
                    var searchOrder = $("#myTransferOrderId").val();
                    if(searchOrder ==""){
                        toastUtils.showToast("请输入要查找的订单号");
                        return;
                    }
                    queryMyTransferOrder(searchOrder);
                },
            cancelOnly:false
        });
    });
}

//@ 日期改变事件
function dateChange_myTransfer() {
    var timeType = $("#searchDate_myTransfer").val();
    switch(timeType) {
        case "0":
            //当前记录
            $("#selectDateTransfer_Stt").val(initDefaultDate(0,'day'));  //View
            $("#selectDateTransfer_End").val(initDefaultDate(0,'day'));
            startDateTime = $("#selectDateTransfer_Stt").val()+hms00;
            endDateTime = $("#selectDateTransfer_End").val()+hms59;
            searchMyTransfer(startDateTime, endDateTime);
            changeDateRange_Transfer(-3,"day",0,"day");   //Controller
            break;
        case "1":
            //历史记录
            $("#selectDateTransfer_Stt").val(initDefaultDate(-4,'day'));  //view
            $("#selectDateTransfer_End").val(initDefaultDate(-4,'day'));
            startDateTime = $("#selectDateTransfer_Stt").val()+hms00;
            endDateTime = $("#selectDateTransfer_End").val()+hms59;
            searchMyTransfer(startDateTime, endDateTime);
            changeDateRange_Transfer(-33,"day",-4,"day");     //Controller
            break;
    }
}

//@ 类型改变事件
function typeChange_myTransfer() {
    stateType = $("#searchType_myTransfer").val();
    searchMyTransfer(startDateTime, endDateTime);
}

//@ 切换当前记录或者历史记录时。
function changeDateRange_Transfer(minNum,minType,maxNum,maxType){
    selDateTransferStart.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
    selDateTransferEnd.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
}

//@ 查询转账记录 - First Page
function searchMyTransfer(startDateTime, endDateTime) {
    page=0;
    searchmyTransfer_Record(startDateTime, endDateTime)
}

//@ next Page
function getMyTransferNext(){
    startDateTime = $("#selectDateTransfer_Stt").val()+hms00;
    endDateTime = $("#selectDateTransfer_End").val()+hms59;
    searchmyTransfer_Record(startDateTime, endDateTime);
}

//@ 查询转账记录
function searchmyTransfer_Record(startDateTime, endDateTime) {
    ajaxUtil.ajaxByAsyncPost(null, '{"InterfaceName":"DsGetUserTransfer","ProjectPublic_PlatformCode":2,"OrderID":"","UserID":'+ userID +',"Source":0,"TransferType":'+ stateType +',"IsHistory":' + IsHistory + ',"InsertTimeMin":"' + startDateTime + '","InsertTimeMax":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_myTransfer + '}',
    myTransfer_searchSuccessCallBack, '正在加载数据...');
}

//@ 根据订单号查找
function queryMyTransferOrder(searchOrder){
    page = 0;
    ajaxUtil.ajaxByAsyncPost(null, '{"InterfaceName":"DsGetUserTransfer","ProjectPublic_PlatformCode":2,"OrderID":"'+searchOrder+'","Source":0,"TransferType":'+ stateType +',"IsHistory":' + IsHistory + ',"InsertTimeMin":"' + startDateTime + '","InsertTimeMax":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_myTransfer + '}',
    myTransfer_searchSuccessCallBack, '正在加载数据...');
}

//@ 通过查询条件加载数据
function loadMyTransferRecord() {
    var conditions = getSearchTerm();
    if (null != conditions) {
        var dataOptions = document.getElementById('searchDate_myTransfer').options;
        for (var i = 0; i < dataOptions.length; i++) {
            dataOptions[i].selected = false;
            if (dataOptions[i].value == conditions.time) {
                dataOptions[i].selected = true;
            }
        }

        var typeOptions = document.getElementById('searchType_myTransfer').options;
        for (var j = 0; j < typeOptions.length; j++) {
            typeOptions[j].selected = false;
            if (typeOptions[j].value == conditions.type) {
                typeOptions[j].selected = true;
            }
        }

        stateType = $("#searchType_myTransfer").val();
        startDateTime = conditions.dateStt + hms00;
        endDateTime = conditions.dateEnd + hms59;
        $("#selectDateTransfer_Stt").val(conditions.dateStt);
        $("#selectDateTransfer_End").val(conditions.dateEnd);
        // 时间选择器
        var dateChange = conditions.time;
        switch (dateChange){
            case "0":
                changeDateRange_Transfer(-3,"day",0,"day");   //Controller
                break;
            case "1":
                changeDateRange_Transfer(-33,"day",-4,"day");     //Controller
                break;
        }

        //根据查询条件查询数据
        searchMyTransfer(startDateTime, endDateTime);
        //重置isDetail标记，表示从记录界面返回
        var searchConditions = getSearchTerm();
        searchConditions.isDetail =  false;
        saveSearchTerm(searchConditions);
    } else {
        initmyTransfer();
    }
}

//@ Init
function initmyTransfer() {
    $("#selectDateTransfer_Stt").val(initDefaultDate(0,"day"));
    $("#selectDateTransfer_End").val(initDefaultDate(0,"day"));
    //查询开始时间
    startDateTime = $("#selectDateTransfer_Stt").val()+hms00;
    //查询结束时间
    endDateTime = $("#selectDateTransfer_End").val()+hms59;
    stateType = "0";
    searchMyTransfer(startDateTime, endDateTime);
}

//@ 每个item点击时，触发该方法，保存当前的查询条件
function onItemClickListener_myTransfer() {
    var searchConditions = {};
    searchConditions.time =  $("#searchDate_myTransfer").val();
    searchConditions.type =  $("#searchType_myTransfer").val();
    searchConditions.dateStt =  $("#selectDateTransfer_Stt").val();
    searchConditions.dateEnd =  $("#selectDateTransfer_End").val();
    searchConditions.isDetail =  true;
    saveSearchTerm(searchConditions);
}

//@ Ajax返回数据
function myTransfer_searchSuccessCallBack(data){
    if (page == 0) {
        $("#myTransferList").empty();
        $("#myTransferScroller").scroller().scrollToTop();
        $("#myTransferScroller").scroller().clearInfinite();
    }
    if(data ==null){
        toastUtils.showToast("没有数据");
        return;
    }

    var info=data.DsUserTransfer;
    if (data.SystemState == 64  && data.DataCount !=0) {
        isHasMorePage(info,PAGESIZE_myTransfer);
        for (var i = 0; i < info.length; i++) {
            var dataSet = {};

            dataSet.orderId = info[i].OrderId;  //订单号
            dataSet.DetailsSource = info[i].DetailsSource;  //资金去向
            dataSet.TransferMoney = info[i].TransferMoney;  //转账金额
            dataSet.InsertTime = info[i].InsertTime;  //转账时间
            dataSet.Marks = info[i].Marks;  //备注
            dataSet.TransferType =  transferState[info[i].TransferType];  //状态

            var $itemLi = $('<li></li>').data('myTransferRecord',dataSet);
            $itemLi.on('click',function() {
                onItemClickListener_myTransfer();
                localStorageUtils.setParam("myTransferRecord",JSON.stringify($(this).data('myTransferRecord')));
                setPanelBackPage_Fun('transferRecordDetail');
            });
            $itemLi.append('<a class="recordList"><dl class="orderList"><dd>资金去向:&nbsp;<span class="red">' + transferDetail(dataSet.DetailsSource) +'</span></dd><dd>转账金额:&nbsp;'+dataSet.TransferMoney+'</dd><dd>转账状态:&nbsp;' + dataSet.TransferType + '</dd><dd>转账时间:&nbsp;' + dataSet.InsertTime +'</dd></dl></a>');
            $("#myTransferList").append($itemLi);
        }
    } else if(data.SystemState == -1){
        loginAgain();
    } else if (data.DataCount ==0) {
        toastUtils.showToast("没有数据");
    }else {
        toastUtils.showToast("网络不给力，请稍后再试");
    }
}

function transferDetail(source) {
    if (source == '300'){
        return "棋牌-->彩票";
    }else if (source == "290"){
        return "彩票-->棋牌";
    }else {
        return "返款";
    }
}

var transferState = {
   "2":"成功",
   "3":"处理中",
   "4":"失败"
};