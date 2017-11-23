//查询开始时间
var startDateTime = "";
//查询结束时间
var endDateTime = "";

var selDateGRAStart;
var selDateGRAEnd;

/*进入panel时调用*/
function teamGameReportAllLoadedPanel(){
    catchErrorFun("teamGameReportAllInit();");
}
/*离开panel时调用*/
function teamGameReportAllUnloadedPanel(){
    clearSearchTerm();
    startDateTime = "";
    endDateTime = "";
    $("#teamGameReportAllDataId").empty();
    $("#teamGameReportAllUlId").empty();
    if(selDateGRAStart){
        selDateGRAStart.dismiss();
    }
    if(selDateGRAEnd){
        selDateGRAEnd.dismiss();
    }
}

function teamGameReportAllInit(){
    $("#teamGameReportAllDataId").empty();
    var $ReportAllLData=$('<table><tr>' +
        '<td><select name="myGRASearchDate" id="myGRASearchDate" data-theme="a" data-mini="true" onchange="typeChange_teamGameReportAll()">' +
        '<option value="0" selected="selected">当天时间</option><option value="1">历史时间</option></select></td>' +
        '<td><input type="text" id="selectDateGRA_Stt" readonly/></td>' +
        '<td><input type="text" id="selectDateGRA_End" readonly/></td></tr></table>');
    $("#teamGameReportAllDataId").append($ReportAllLData);

    $("#teamGameReportAllUlId").empty();
    var $ReportAllLUL=$('<ul class="recordDetail"><li>合 计：<span>- - -</span></li>' +
        '<li>投注金额：<span id="game_cost_all"></span></li>' +
        '<li>中奖金额：<span id="game_get_all"></span></li>' +
        '<li>房 费：<span id="game_room_fee"></span></li>' +
        '<li>对战类盈亏：<span id="game_PL_all"></span></li>' +
        '<li>电子类盈亏：<span id="game_income_all"></span></li></ul>');
    $("#teamGameReportAllUlId").append($ReportAllLUL);

    selDateGRAStart = new MobileSelectDate();
    selDateGRAStart.init({trigger:'#selectDateGRA_Stt',min:initDefaultDate(0,"day"),max:initDefaultDate(0,"day")});
    selDateGRAEnd = new MobileSelectDate();
    selDateGRAEnd.init({trigger:'#selectDateGRA_End',min:initDefaultDate(0,"day"),max:initDefaultDate(0,"day")});

    $("#selectDateGRA_Stt").val(initDefaultDate(0,"day"));
    $("#selectDateGRA_End").val(initDefaultDate(0,"day"));
    //查询开始时间
    startDateTime = $("#selectDateGRA_Stt").val()+hms00;
    //查询结束时间
    endDateTime = $("#selectDateGRA_End").val()+hms59;

    searchTotal_teamGameReportAll(startDateTime,endDateTime);
}

function typeChange_teamGameReportAll() {
    var type = $("#myGRASearchDate").val();
    switch(type) {
        case "0":
            //当天记录
            $("#selectDateGRA_Stt").val(initDefaultDate(0,'day'));  //View
            $("#selectDateGRA_End").val(initDefaultDate(0,'day'));
            startDateTime = $("#selectDateGRA_Stt").val()+hms00;
            endDateTime = $("#selectDateGRA_End").val()+hms59;
            searchTotal_teamGameReportAll(startDateTime, endDateTime);
            changeDateRange_GRA(0,"day",0,"day");   //Controller
            break;
        case "1":
            //历史记录
            $("#selectDateGRA_Stt").val(initDefaultDate(-1,'day'));  //view
            $("#selectDateGRA_End").val(initDefaultDate(-1,'day'));
            startDateTime = $("#selectDateGRA_Stt").val()+hms00;
            endDateTime = $("#selectDateGRA_End").val()+hms59;
            searchTotal_teamGameReportAll(startDateTime, endDateTime);
            changeDateRange_GRA(-DayRange_3month,"day",-1,"day");     //Controller
            break;
    }
}

function searchTotal_teamGameReportAll(startDateTime,endDateTime) {
    var uid = localStorageUtils.getParam("myUserID");

    ajaxUtil.ajaxByAsyncPost(null, '{"UserName":"","ProjectPublic_PlatformCode":2,"UserID":"'+uid+'","isCurrent":1,"ISself":0,"InterfaceName":"DsGetRePort","BeginTime":"' + startDateTime + '","EndTime":"' + endDateTime + '"}', teamGameReportAllSuccessCallBack, '正在加载数据...');
}

/*
 *   切换当前记录或者历史记录时。
 **/
function changeDateRange_GRA(minNum,minType,maxNum,maxType){
    selDateGRAStart.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
    selDateGRAEnd.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
}

/**
 * 查询下级统计方法回调函数
 */
function teamGameReportAllSuccessCallBack(data) {
    if (data.SystemState == 64) {
        $("#game_cost_all").html(Number(data.GamePay.toFixed(3).slice(0,-1)));
        $("#game_get_all").html(Number(data.GameGet.toFixed(3).slice(0,-1)));
        $("#game_room_fee").html(Number(data.RoomFee.toFixed(3).slice(0,-1)));
        $("#game_PL_all").html(Number(data.PlayIncome.toFixed(3).slice(0,-1)));
        $("#game_income_all").html(Number(data.SystemIncome.toFixed(3).slice(0,-1)));
    } else if (data.SystemState == -1) {
        loginAgain();
    } else {
        toastUtils.showToast("网络不给力，请稍后再试");
    }
}