//查询开始时间
var startDateTime = "";
//查询结束时间
var endDateTime = "";

var selDateGRSStart;
var selDateGRSEnd;

/*进入panel时调用*/
function teamGameReportSelfLoadedPanel(){
    catchErrorFun("teamGameReportSelfInit();");
}

/*离开panel时调用*/
function teamGameReportSelfUnloadedPanel(){
    clearSearchTerm();
    startDateTime = "";
    endDateTime = "";
    $("#teamGameReportSelfDataId").empty();
    $("#teamGameReportSelfULId").empty();
    if(selDateGRSStart){
        selDateGRSStart.dismiss();
    }
    if(selDateGRSEnd){
        selDateGRSEnd.dismiss();
    }
}

//@ 初始化
function teamGameReportSelfInit(){
    $("#teamGameReportSelfDataId").empty();
    $("#teamGameReportSelfULId").empty();

    var $ReportSelfLData=$('<table><tr>' +
        '<td><select name="myGRSSearchDate" id="myGRSSearchDate" data-theme="a" data-mini="true" onchange="typeChange_teamGameReportSelf()">' +
        '<option value="0" selected="selected">当天时间</option><option value="1">历史时间</option></select></td>' +
        '<td><input type="text" id="selectDateGRS_Stt" readonly/></td>' +
        '<td><input type="text" id="selectDateGRS_End" readonly/></td></tr></table>');
    $("#teamGameReportSelfDataId").append($ReportSelfLData);

    var $SelfUL=$('<ul class="recordDetail"><li>用户名：<span id="game_username"></span></li>' +
        '<li>投注金额：<span id="game_cost_self"></span></li>' +
        '<li>中奖金额：<span id="game_get_self"></span></li>' +
        '<li>房费：<span id="game_room_fee_self"></span></li>' +
        '<li>对战类盈亏：<span id="game_PL_self"></span></li>' +
        '<li>电子类盈亏：<span id="game_income_self"></span></ul>');
    $("#teamGameReportSelfULId").append($SelfUL);

    selDateGRSStart = new MobileSelectDate();
    selDateGRSStart.init({trigger:'#selectDateGRS_Stt',min:initDefaultDate(0,"day"),max:initDefaultDate(0,"day")});
    selDateGRSEnd = new MobileSelectDate();
    selDateGRSEnd.init({trigger:'#selectDateGRS_End',min:initDefaultDate(0,"day"),max:initDefaultDate(0,"day")});

    $("#selectDateGRS_Stt").val(initDefaultDate(0,"day"));
    $("#selectDateGRS_End").val(initDefaultDate(0,"day"));
    //查询开始时间
    startDateTime = $("#selectDateGRS_Stt").val()+hms00;
    //查询结束时间
    endDateTime = $("#selectDateGRS_End").val()+hms59;
    searchTotal_teamGameReportSel(startDateTime,endDateTime);
}

//@ 切换当前和历史记录
function typeChange_teamGameReportSelf() {
    var type = $("#myGRSSearchDate").val();
    switch(type) {
        case "0":
            //当天记录
            $("#selectDateGRS_Stt").val(initDefaultDate(0,'day'));  //View
            $("#selectDateGRS_End").val(initDefaultDate(0,'day'));
            startDateTime = $("#selectDateGRS_Stt").val()+hms00;
            endDateTime = $("#selectDateGRS_End").val()+hms59;
            searchTotal_teamGameReportSel(startDateTime, endDateTime);
            changeDateRange_GRS(0,"day",0,"day");   //Controller
            break;
        case "1":
            //历史记录
            $("#selectDateGRS_Stt").val(initDefaultDate(-1,'day'));  //view
            $("#selectDateGRS_End").val(initDefaultDate(-1,'day'));
            startDateTime = $("#selectDateGRS_Stt").val()+hms00;
            endDateTime = $("#selectDateGRS_End").val()+hms59;
            searchTotal_teamGameReportSel(startDateTime, endDateTime);
            changeDateRange_GRS(-DayRange_3month,"day",-1,"day");     //Controller
            break;
    }
}

function searchTotal_teamGameReportSel(startDateTime,endDateTime) {
    var uid = localStorageUtils.getParam("myUserID");
    ajaxUtil.ajaxByAsyncPost(null, '{"UserName":"","UserID":"'+uid+'","ProjectPublic_PlatformCode":2,"isCurrent":"1","ISself":"1","InterfaceName":"DsGetRePort","BeginTime":"' + startDateTime + '","EndTime":"' + endDateTime + '"}', teamGameReportSelfSuccessCallBack, '正在加载数据...');
}

//@  切换当前记录或者历史记录时。
function changeDateRange_GRS(minNum,minType,maxNum,maxType){
    selDateGRSStart.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
    selDateGRSEnd.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
}

//@ 查询下级统计方法回调函数
function teamGameReportSelfSuccessCallBack(data) {
    if (data.SystemState == 64) {
        $("#game_username").html(data.UserName);

        $("#game_cost_self").html(Number(data.GamePay.toFixed(3).slice(0,-1)));
        $("#game_get_self").html(Number(data.GameGet.toFixed(3).slice(0,-1)));
        $("#game_room_fee_self").html(Number(data.RoomFee.toFixed(3).slice(0,-1)));
        $("#game_PL_self").html(Number(data.PlayIncome.toFixed(3).slice(0,-1)));
        $("#game_income_self").html(Number(data.SystemIncome.toFixed(3).slice(0,-1)));
    } else if (data.SystemState == -1) {
        loginAgain();
    } else {
        toastUtils.showToast("网络不给力，请稍后再试");
    }
}