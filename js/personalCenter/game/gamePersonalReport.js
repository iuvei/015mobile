//查询开始时间
var startDateTime = "";
//查询结束时间
var endDateTime = "";
var page=0;
var PAGESIZE_gamePersonalReport=30;

var selDateGPRStart;
var selDateGPREnd;

/*进入panel时调用*/
function gamePersonalReportLoadedPanel(){
    catchErrorFun("gamePersonalReportInit();");
}
/*离开panel时调用*/
function gamePersonalReportUnloadedPanel(){
    clearSearchTerm();
    startDateTime = "";
    endDateTime = "";
    $("#gamePersonalReportDate").empty();
    $("#gamePersonalReportContent").empty();
    if(selDateGPRStart){
        selDateGPRStart.dismiss();
    }
    if(selDateGPREnd){
        selDateGPREnd.dismiss();
    }
}

function gamePersonalReportInit(){
    $("#selectType_gamePersonalReport").empty();

    var $selectType_gamePersonalReport = $('<select name="gamePersonalReportSearchType" id="gamePersonalReportSearchType" data-theme="a" data-mini="true" onchange="gamePersonalReportTypeChange()"><option value="0" selected="selected">类型：每日统计</option><option value="1">类型：汇总统计</option></select>');
    $("#selectType_gamePersonalReport").append($selectType_gamePersonalReport);

    $("#gamePersonalReportContent").empty();

    //不要轻易修改时间控件input的ID值！若修改，和mobile-select-data.js中的方法中的字符串要一一对应才可。
    var $select=$('<table><tr><td><select name="gamePersonalReportSearchDate" id="gamePersonalReportSearchDate" data-theme="a" data-mini="true" onchange="dateChangeGamePersonalReport()"><option value="0" selected="selected">当天记录</option><option value="1">历史记录</option></select></td><td><input type="text" id="selectDateGamePersonalReport_Stt" readonly/></td><td><input type="text" id="selectDateGamePersonalReport_End" readonly/></td></tr></table>');
    $("#gamePersonalReportDate").append($select);

    //查询开始时间
    selDateGPRStart = new MobileSelectDate();
    selDateGPRStart.init({trigger:'#selectDateGamePersonalReport_Stt',min:initDefaultDate(0,"day"),max:initDefaultDate(0,"day")});
    selDateGPREnd = new MobileSelectDate();
    selDateGPREnd.init({trigger:'#selectDateGamePersonalReport_End',min:initDefaultDate(0,"day"),max:initDefaultDate(0,"day")});

    $("#selectDateGamePersonalReport_Stt").val(initDefaultDate(0,"day"));
    $("#selectDateGamePersonalReport_End").val(initDefaultDate(0,"day"));
    //查询开始时间
    startDateTime = $("#selectDateGamePersonalReport_Stt").val()+hms00;
    //查询结束时间
    endDateTime = $("#selectDateGamePersonalReport_End").val()+hms59;

    page = 0;
    hasMorePage = true;//默认还有分页
    var myScroller_report = $("#gamePersonalReportScroller").scroller({
        verticalScroll : true,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
    });
    myScroller_report.scrollToTop();
    myScroller_report.clearInfinite();
    UseScrollerRefresh(myScroller_report,'gamePersonalReportContent','getGamePersonalReport()');
    //进入时加载
    searchTotal_gamePersonalReport(startDateTime,endDateTime);
}

function gamePersonalReportTypeChange() {
    startDateTime = $("#selectDateGamePersonalReport_Stt").val()+hms00;
    endDateTime = $("#selectDateGamePersonalReport_End").val()+hms59;
    searchTotal_gamePersonalReport(startDateTime, endDateTime);
}

function dateChangeGamePersonalReport() {
    var type = $("#gamePersonalReportSearchDate").val();
    switch(type) {
        case "0":
            //当天记录
            $("#selectDateGamePersonalReport_Stt").val(initDefaultDate(0,'day'));  //View
            $("#selectDateGamePersonalReport_End").val(initDefaultDate(0,'day'));
            startDateTime = $("#selectDateGamePersonalReport_Stt").val()+hms00;
            endDateTime = $("#selectDateGamePersonalReport_End").val()+hms59;
            searchTotal_gamePersonalReport(startDateTime, endDateTime);
            changeDateRange_GamePersonalReport(0,"day",0,"day");   //Controller
            break;
        case "1":
            //历史记录
            $("#selectDateGamePersonalReport_Stt").val(initDefaultDate(-1,'day'));  //view
            $("#selectDateGamePersonalReport_End").val(initDefaultDate(-1,'day'));
            startDateTime = $("#selectDateGamePersonalReport_Stt").val()+hms00;
            endDateTime = $("#selectDateGamePersonalReport_End").val()+hms59;
            searchTotal_gamePersonalReport(startDateTime, endDateTime);
            changeDateRange_GamePersonalReport(-DayRange_3month,"day",-1,"day");     //Controller
            break;
    }
}

/*
 *   切换当前记录或者历史记录时。
 **/
function changeDateRange_GamePersonalReport(minNum,minType,maxNum,maxType){
    selDateGPRStart.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
    selDateGPREnd.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
}

/*
 * 下拉页面刷新我的报表记录
 * */
function getGamePersonalReport() {
    ajaxUtil.ajaxByAsyncPost(null, '{"UserID":-1,"ProjectPublic_PlatformCode":2,"Type":1,"InterfaceName":"DsMyRePort","BeginTime":"' + startDateTime + '","EndTime":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_gamePersonalReport +'}', gamePersonalReportSuccessCallBack, '正在加载数据...');
}

function searchTotal_gamePersonalReport(startDateTime,endDateTime) {
    page=0;
    ajaxUtil.ajaxByAsyncPost(null, '{"UserID":-1,"ProjectPublic_PlatformCode":2,"Type":1,"InterfaceName":"DsMyRePort","BeginTime":"' + startDateTime + '","EndTime":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_gamePersonalReport +'}', gamePersonalReportSuccessCallBack, '正在加载数据...');
}

/**
 * 查询个人报表方法回调函数
 */
function gamePersonalReportSuccessCallBack(data) {
    if (data.SystemState == 64) {
        gamePersonalReportChangeShow(data);
    } else if (data.SystemState == -1) {
        loginAgain();
    } else {
        toastUtils.showToast("网络不给力，请稍后再试");
    }
}

/*
 * 显示列表或者统计数据
 */
function gamePersonalReportChangeShow(data) {
    var selectedShow = $("#gamePersonalReportSearchType").val();

    if(data.ReportComm && selectedShow == "1") {
        //Total
        $("#gamePersonalReportContent").empty();
        var $totalInfo = $('<ul class="recordDetail"><li>合 计：<span id="gameDate"></span></li><li>投注金额：<span id="gameConsume"></span></li><li>中奖金额：<span id="gameGet"></span></li><li>房 费：<span id="gameHouseFee"></span></li><li>盈 亏：<span id="totalPL"></span></li></ul>');
        $("#gamePersonalReportContent").append($totalInfo);

        // $("#gameDate").html(data.ReportComm[0].HisDate);
        $("#gameDate").html("- - -");
        $("#gameConsume").html(Number(data.ReportComm[0].GamePay.toFixed(3).slice(0,-1)));
        $("#gameGet").html(Number(data.ReportComm[0].GameGet.toFixed(3).slice(0,-1)));
        $("#gameHouseFee").html(Number(data.ReportComm[0].RoomFee.toFixed(3).slice(0,-1)));
        $("#totalPL").html(Number(data.ReportComm[0].PL.toFixed(3).slice(0,-1)));
    }
    if(data.ReportComm.length==0 && selectedShow=="1"){
        toastUtils.showToast("没有数据");
    }

    //List
    if(data.Reportlst && selectedShow == "0") {
        $("#gamePersonalReportContent").empty();

        for(var j=0;j<data.Reportlst.length;j++){
            var $liContent=$('<li></li>');
            var reportList=data.Reportlst;
            $liContent.append('<ul class="recordDetail"><li>日 期：<span>'+ reportList[j].HisDate.split(" ")[0]
                +'</span></li><li>投注金额：<span>'+ Number(reportList[j].GamePay.toFixed(3).slice(0,-1))
                +'</span></li><li>中奖金额：<span >'+ Number(reportList[j].GameGet.toFixed(3).slice(0,-1))
                +'</span></li><li>房 费：<span>'+ Number(reportList[j].RoomFee.toFixed(3).slice(0,-1))
                +'</span></li><li>盈 亏：<span>'+ Number(reportList[j].PL.toFixed(3).slice(0,-1))
                +'</span></li></ul>');

            $("#gamePersonalReportContent").append($liContent);
        }
    }
    if(data.Reportlst.length==0 && selectedShow =="0" ){
        toastUtils.showToast("没有数据");
    }
}