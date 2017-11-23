//页大小
var PAGESIZE_myAccoun = 20;
//查询开始时间
var startDateTime = "";
//查询结束时间
var endDateTime = "";
//用户名
var userName = "";
//代理用户名
var thisUserName = "";
//代理用户ID
var thisUserID = "";
//收支类型
var type_proxyAccount = 0;
//IsHistory 默认false  是否是历史记录
var IsHistory=false;

var selDatePARStart;
var selDatePAREnd;

/*进入panel时调用*/
function proxyAccountRecordLoadedPanel(){
	catchErrorFun("proxyAccountRecordInit();");
}
/*离开panel时调用*/
function proxyAccountRecordUnloadedPanel(){
	$("#proxyAccountRecordList").empty();
	//清除本地存储的查询条件
    clearSearchTerm();      
    startDateTime = "";
    endDateTime = "";
    if(selDatePARStart){
        selDatePARStart.dismiss();
    }
    if(selDatePAREnd){
        selDatePAREnd.dismiss();
    }
}
function proxyAccountRecordInit(){
    $("#selectType_proxyAccount").empty();
    var $selectType_proxyAccount = $('<select name="proxyAccountSearchType" id="proxyAccountSearchType" data-theme="a" data-mini="true" onchange="typeChangeProxy()"><option value="0" selected="selected">全部</option><option value="18">充值</option><option value="26">提款</option><option value="3">转账</option><option value="1">投注</option><option value="2">中奖</option><option value="4">撤单</option><option value="5">撤奖</option><option value="6">活动</option><option value="7">下级返点</option><option value="8">自身投注返点</option><option value="9">给下级充值</option><option value="10">来自上级的充值</option><option value="11">管理员添加</option></select>');

    if (localStorageUtils.getParam("IsDayWages") == "true"){
        $selectType_proxyAccount.append('<option value="29">日工资</option>');
    }
    if (localStorageUtils.getParam("IsContract") == "true"){
        $selectType_proxyAccount.append('<option value="28">分红</option>');
    }
    $("#selectType_proxyAccount").append($selectType_proxyAccount);

	$("#selectproxyAccountID").empty();
    //不要轻易修改时间控件input的ID值！若修改，和mobile-select-data.js中的方法中的字符串要一一对应才可。
    var $select=$('<table><tr><td><select name="proxyAccountSearchDate" id="proxyAccountSearchDate" data-theme="a" data-mini="true" onchange="dateChangeProxyAccount()"><option value="0" selected="selected">当前记录</option><option value="1">历史记录</option></select></td><td><input type="text" id="selDateProxyAccount_Stt" readonly/></td><td><input type="text" id="selDateProxyAccount_End" readonly/></td></tr></table>');
    $("#selectproxyAccountID").append($select);

	//查询开始时间
    selDatePARStart = new MobileSelectDate();
    selDatePARStart.init({trigger:'#selDateProxyAccount_Stt',min:initDefaultDate(-3,"day"),max:initDefaultDate(0,"day")});
    selDatePAREnd = new MobileSelectDate();
    selDatePAREnd.init({trigger:'#selDateProxyAccount_End',min:initDefaultDate(-3,"day"),max:initDefaultDate(0,"day")});

    userName = localStorageUtils.getParam("username");
    thisUserName = localStorageUtils.getParam("proxyUserName");
    thisUserID = localStorageUtils.getParam("proxyUserId");
	page = 0;

	hasMorePage = true;//默认还有分页
    var _myScroller =  $("#proxyAccountRecordScroller").scroller({
        verticalScroll : true,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
    });
    _myScroller.scrollToTop();
	_myScroller.clearInfinite();
    addUseScroller(_myScroller,'proxyAccountRecordList','nextPage_loadBySearchItemsProxyAccount()');
    //进入时加载
    loadBySearchItemsproxyAccount();
}

function nextPage_loadBySearchItemsProxyAccount(){
    startDateTime = $("#selDateProxyAccount_Stt").val()+hms00;
    endDateTime = $("#selDateProxyAccount_End").val()+hms59;
    nextPage_searchProxyAccount(startDateTime, endDateTime, type_proxyAccount);
}

/**
 * Description 查询账户历史记录回调函数
 * @param
 * @return data 服务端返数据
 */
function searchSuccessCallBackmyproxyAccount(data) {
    if (page == 0) {
        $("#proxyAccountRecordList").empty();
        $("#proxyAccountRecordScroller").scroller().scrollToTop();
        $("#proxyAccountRecordScroller").scroller().clearInfinite();          
    }
   if(data ==null){
    	 toastUtils.showToast("没有数据");
    	 return;
    }

    if (data.SystemState == 64 && data.DataCount!=0) {
    	var info=data.UfInfo;
        isHasMorePage(info,PAGESIZE_myAccoun);
        for (var i = 0; i < info.length; i++) {
            var dataSet = new Object();
               //订单号
                dataSet.orderId = info[i].OrderID;
                //金额
                //dataSet.ufmoney = bigNumberUtil.getBalanceRealMoney(info[i].UseMoney,4);
                if(info[i].UseMoney == 0 && info[i].DetailsSource == 257){
                    dataSet.ufmoney =info[i].Marks;
                }else{
                    dataSet.ufmoney =info[i].UseMoney+"元";
                }
                dataSet.ufmoney_ = info[i].UseMoney;
                dataSet.DetailsSource = info[i].DetailsSource;                            
                //交易时间
                dataSet.optime = info[i].InsertTime;
                dataSet.operid = info[i].InsertTime;
                //手续费
                dataSet.poundage =info[i].poundage;// changeTwoDecimal_f(info[i].poundage);
                //用户余额
                dataSet.cbalaces = info[i].ThenBalance;//changeTwoDecimal_f(info[i].ThenBalance);
                //属性:投注、派奖
                dataSet.ufproperty = info[i].DetailsSource;
                dataSet.cztype = info[i].DetailsSource;
                //类型
                dataSet.tranType = getShouZhiByID(info[i].DetailsSource,info[i].RechargeType);
                //备注
                dataSet.details = remarkZH(info[i].Marks+"", info[i].DetailsSource, userName);
			var $itemLi = $('<li></li>').data('proxyAaccount',dataSet);
				$itemLi.on('click',function() {
					onItemClickListener_proxyAccount();				
					localStorageUtils.setParam("proxyAaccount",JSON.stringify($(this).data('proxyAaccount')));
					setPanelBackPage_Fun('proxyAccountRecordDetail');
				});
				$itemLi.append('<a class="recordList"><dl class="orderList"><dd>账户:&nbsp;' +info[i].UserName + '</dd><dd>金额:&nbsp;<span class="red">' + dataSet.ufmoney +'</span></dd><dd>类型:&nbsp;'+dataSet.tranType+'</dd><dd>时间:&nbsp;' + dataSet.optime +'</dd></dl></a>');

			$("#proxyAccountRecordList").append($itemLi);
      }
    } else if(data.SystemState == -1){
    	loginAgain();
    } else if (data.DataCount ==0) {
         toastUtils.showToast("没有数据");
        return;
    } else {
    	toastUtils.showToast("当前网络不给力，请稍后再试");
        return;
    }
}
/**
 * 查询账户信息
 * @param startDateTime 查询开始时间
 * @param endDateTime 查询结束时间
 * @param type 查询收支类型
 */
function nextPage_searchProxyAccount(startDateTime, endDateTime, type) {
    var paramssearch = '{"InterfaceName":"DailyWagesGetUserFundList","ProjectPublic_PlatformCode":2,"IsHistory":' + IsHistory + ',"ThisUserName":"' + thisUserName + '","UserID":' + thisUserID + ',"Source":' + type + ',"insertTimeMin":"' + startDateTime + '","insertTimeMax":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_myAccoun + '}';
    ajaxUtil.ajaxByAsyncPost(null, paramssearch, searchSuccessCallBackmyproxyAccount,"加载中...");    
}
/**
 * 查询账户信息
 * @param startDateTime 查询开始时间
 * @param endDateTime 查询结束时间
 * @param type 查询收支类型
 */
function searchProxyAccount(startDateTime, endDateTime, type) {
    page=0;
    var paramssearch = '{"InterfaceName":"DailyWagesGetUserFundList","ProjectPublic_PlatformCode":2,"IsHistory":' + IsHistory + ',"ThisUserName":"' + thisUserName + '","UserID":' + thisUserID + ',"Source":' + type + ',"insertTimeMin":"' + startDateTime + '","insertTimeMax":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_myAccoun + '}';
    ajaxUtil.ajaxByAsyncPost(null, paramssearch, searchSuccessCallBackmyproxyAccount,"加载中...");    
}
//日期改变事件
function dateChangeProxyAccount() {
    page = 0;
    var selectedIndex = $("#proxyAccountSearchDate").val();
    switch(selectedIndex) {
        case "0":
            //当前记录
            $("#selDateProxyAccount_Stt").val(initDefaultDate(0,'day'));  //View
            $("#selDateProxyAccount_End").val(initDefaultDate(0,'day'));
            startDateTime = $("#selDateProxyAccount_Stt").val()+hms00;
            endDateTime = $("#selDateProxyAccount_End").val()+hms59;
            type_proxyAccount = $("#proxyAccountSearchType").val();
            IsHistory=false;
            localStorageUtils.setParam("IsHistory",IsHistory);
            searchProxyAccount(startDateTime, endDateTime, type_proxyAccount);
            changeDateRange_proxyAccount(-3,"day",0,"day");   //Controller
            break;
        case "1":
            //历史记录
            $("#selDateProxyAccount_Stt").val(initDefaultDate(-4,'day'));  //view
            $("#selDateProxyAccount_End").val(initDefaultDate(-4,'day'));
            startDateTime = $("#selDateProxyAccount_Stt").val()+hms00;
            endDateTime = $("#selDateProxyAccount_End").val()+hms59;
            type_proxyAccount = $("#proxyAccountSearchType").val();
            IsHistory=true;
            localStorageUtils.setParam("IsHistory",IsHistory);
            searchProxyAccount(startDateTime, endDateTime, type_proxyAccount);
            changeDateRange_proxyAccount(-33,"day",-4,"day");     //Controller
            break;
    }
}

/*
 *   切换当前记录或者历史记录时。
 **/
function changeDateRange_proxyAccount(minNum,minType,maxNum,maxType){
    selDatePARStart.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
    selDatePAREnd.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
}

//玩法类型改变事件
function typeChangeProxy() {
    page = 0;
    type_proxyAccount = $("#proxyAccountSearchType").val();
    startDateTime = $("#selDateProxyAccount_Stt").val()+hms00;
    endDateTime = $("#selDateProxyAccount_End").val()+hms59;
    searchProxyAccount(startDateTime, endDateTime, type_proxyAccount);
}              
/**
 * 通过查询条件加载数据 
 */
function loadBySearchItemsproxyAccount() {
	var conditions = getSearchTerm();
	if (null != conditions && !conditions.fromPage) { //015-解决代理会员和此页面Storage混淆问题
		var dataOptions = document.getElementById('proxyAccountSearchDate').options;
		for (var i = 0; i < dataOptions.length; i++) {
			dataOptions[i].selected = false;
			if (dataOptions[i].value == conditions.time) {
				dataOptions[i].selected = true;
			}
		}
		var typeOptions = document.getElementById('proxyAccountSearchType').options;
		for (var i = 0; i < typeOptions.length; i++) {
			typeOptions[i].selected = false;
			if (typeOptions[i].value == conditions.type) {
				typeOptions[i].selected = true;
			}
		}
        type_proxyAccount = $("#proxyAccountSearchType").val();
        startDateTime = conditions.dateStt+hms00;
        endDateTime = conditions.dateEnd+hms59;
        $("#selDateProxyAccount_Stt").val(conditions.dateStt);
        $("#selDateProxyAccount_End").val(conditions.dateEnd);
        // 时间选择器
        var dateChange = conditions.time;
        switch (dateChange){
            case "0":
                IsHistory=false;
                localStorageUtils.setParam("IsHistory",IsHistory);
                changeDateRange_proxyAccount(-3,"day",0,"day");   //Controller
                break;
            case "1":
                IsHistory=true;
                localStorageUtils.setParam("IsHistory",IsHistory);
                changeDateRange_proxyAccount(-33,"day",-4,"day");   //Controller
                break;
        }
        searchProxyAccount(startDateTime, endDateTime, type_proxyAccount);
		//重置isDetail标记，表示从记录界面返回
		var searchConditions = getSearchTerm();
    	searchConditions.isDetail =  false;
    	saveSearchTerm(searchConditions);
	} else {
        initProxyAccountRecordsPage();
	}
}

function initProxyAccountRecordsPage() {
    IsHistory=false;
    localStorageUtils.setParam("IsHistory",IsHistory);
    type_proxyAccount="0";
    $("#selDateProxyAccount_Stt").val(initDefaultDate(0,"day"));
    $("#selDateProxyAccount_End").val(initDefaultDate(0,"day"));
    //查询开始时间
    startDateTime = $("#selDateProxyAccount_Stt").val()+hms00;
    //查询结束时间
    endDateTime = $("#selDateProxyAccount_End").val()+hms59;
    searchProxyAccount(startDateTime, endDateTime, type_proxyAccount);
}

/**
 * 每个item点击时，触发该方法，保存当前的查询条件 
 */
function onItemClickListener_proxyAccount() {
	var searchConditions = {};
	searchConditions.time =  $("#proxyAccountSearchDate").val();
	searchConditions.type =  $("#proxyAccountSearchType").val();
	searchConditions.dateStt =  $("#selDateProxyAccount_Stt").val();
	searchConditions.dateEnd =  $("#selDateProxyAccount_End").val();
	searchConditions.isDetail =  true;
	saveSearchTerm(searchConditions);
}