//页大小
var PAGESIZE_myAccoun = 20;
//查询开始时间
var startDateTime = "";
//查询结束时间
var endDateTime = "";
//用户名
var userName = "";
//收支类型
var type = 0;
//IsHistory 默认false  是否是历史记录
var IsHistory=false;
var selectDateEE;
var selectDateEF;

/*进入panel时调用*/
function myAccountRecordLoadedPanel(){
	catchErrorFun("myAccountRecordInit();");
}
/*离开panel时调用*/
function myAccountRecordUnloadedPanel(){
	$("#myAccountRecordList").empty();
    //查询开始时间
      startDateTime = "";
    //查询结束时间
      endDateTime = "";
    //收支类型
      type = 0;
    //IsHistory 默认false  是否是历史记录
      IsHistory=false;
	//清除本地存储的查询条件
	 clearSearchTerm();
    if(selectDateEE){
        selectDateEE.dismiss();
    }
    if(selectDateEF){
        selectDateEF.dismiss();
    }
}
function myAccountRecordInit(){
    $("#selectType_account").empty();
    $("#selectAccountID").empty();

    var $selectType_account=$('<select name="myAccountRecordsearchType" id="myAccountRecordsearchType" data-theme="a" data-mini="true" onchange="typeChangeAccount()"><option value="0" selected="selected">全部</option><option value="18">充值</option><option value="26">提款</option><option value="3">转账</option><option value="1">投注</option><option value="2">中奖</option><option value="4">撤单</option><option value="5">撤奖</option><option value="6">活动</option><option value="7">下级返点</option><option value="8">自身投注返点</option><option value="9">给下级充值</option><option value="10">来自上级的充值</option><option value="11">管理员添加</option></select>');

    if (localStorageUtils.getParam("IsDayWages") == "true"){
        $selectType_account.append('<option value="29">日工资</option>');
    }
    if (localStorageUtils.getParam("IsContract") == "true"){
        $selectType_account.append('<option value="28">分红</option>');
    }
    $("#selectType_account").append($selectType_account);

    var $select=$('<table><tr><td><select name="myAccountRecordsearchDate" id="myAccountRecordsearchDate" data-theme="a" data-mini="true" onchange="dateChangeAccount()"><option value="0" selected="selected">当前记录</option><option value="1">历史记录</option></select></td><td><input type="text" id="selectDateAccount_Stt" readonly/></td><td><input type="text" id="selectDateAccount_End" readonly/></td></tr></table>');
    $("#selectAccountID").append($select);

    selectDateEE = new MobileSelectDate();
    selectDateEE.init({trigger:'#selectDateAccount_Stt',min:initDefaultDate(-3,"day"),max:initDefaultDate(0,"day")});
    selectDateEF = new MobileSelectDate();
    selectDateEF.init({trigger:'#selectDateAccount_End',min:initDefaultDate(-3,"day"),max:initDefaultDate(0,"day")});

	userName = localStorageUtils.getParam("username");
	page = 0;
	hasMorePage = true;//默认还有分页
    var _myScroller =  $("#myAccountRecordScroller").scroller({
        verticalScroll : true,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
    });
    _myScroller.scrollToTop();
	_myScroller.clearInfinite();
    addUseScroller(_myScroller,'myAccountRecordList','getAccountRecord()');
    //进入时加载
    loadBySearchItemsAccount();
}
function getAccountRecord(){
    startDateTime = $("#selectDateAccount_Stt").val()+hms00;
    endDateTime = $("#selectDateAccount_End").val()+hms59;
    searchAccount_acc(startDateTime, endDateTime, type);
}
/**
 * Description 查询账户历史记录回调函数
 */
function searchSuccessCallBackmyAccount(data) {
    if (page == 0) {
        $("#myAccountRecordList").empty();
        $("#myAccountRecordScroller").scroller().scrollToTop();
        $("#myAccountRecordScroller").scroller().clearInfinite();
    }
   if(data ==null){
    	 toastUtils.showToast("没有数据");
    	 return;
    }

    if (data.SystemState == 64 && data.DataCount!=0) {
    	var info=data.UfInfo;
        isHasMorePage(info,PAGESIZE_myAccoun);
        for (var i = 0; i < info.length; i++) {
        	var text = "";
            var dataSet = new Object();
                dataSet.orderId = info[i].OrderID;
                //金额
                //dataSet.ufmoney = bigNumberUtil.getBalanceRealMoney(info[i].UseMoney,4);
                if(info[i].UseMoney == 0 && info[i].DetailsSource == 257){    //转盘活动未中奖时
                    dataSet.ufmoney =info[i].Marks;
                    //dataSet.ufmoney =info[i].UseMoney+"元"; //显示金额
                    // dataSet.ufmoney = "再接再厉";  //显示提示语
                }else{
                    dataSet.ufmoney =info[i].UseMoney+"元";
                }
                dataSet.ufmoney_ = info[i].UseMoney;
                dataSet.DetailsSource = info[i].DetailsSource;
               // dataSet.ufmoney =info[i].UseMoney;// changeTwoDecimal_f(info[i].UseMoney);
                //交易时间
                dataSet.optime = info[i].InsertTime;
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
			var $itemLi = $('<li></li>').data('account',dataSet);
				$itemLi.on('click',function() {
					onItemClickListener_Account();				
					localStorageUtils.setParam("account",JSON.stringify($(this).data('account')));
					setPanelBackPage_Fun('accountDetails');
				});
				$itemLi.append('<a class="recordList"><dl class="orderList"><dd>账户:&nbsp;' + userName + '</dd><dd>金额:&nbsp;<span class="red">' + dataSet.ufmoney +'</span></dd><dd>类型:&nbsp;'+dataSet.tranType+'</dd><dd>时间:&nbsp;' + dataSet.optime +'</dd></dl></a>');

			$("#myAccountRecordList").append($itemLi);
      }
    } else if(data.SystemState == -1){
    	loginAgain();
    } else if (data.DataCount ==0) {
         toastUtils.showToast("没有数据");
    } else {
    	toastUtils.showToast("当前网络不给力，请稍后再试");
    }
}

/**
 * 查询账户信息
 * @param startDateTime 查询开始时间
 * @param endDateTime 查询结束时间
 * @param type 查询收支类型
 */
function searchAccount(startDateTime, endDateTime, type) {
    page=0;
    var paramssearch = '{"InterfaceName":"DailyWagesGetUserFundList","ProjectPublic_PlatformCode":2,"IsHistory":' + IsHistory + ',"Source":' + type + ',"insertTimeMin":"' + startDateTime + '","insertTimeMax":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_myAccoun + '}';
    ajaxUtil.ajaxByAsyncPost1(null, paramssearch, searchSuccessCallBackmyAccount,null);    
}
/**
 * 查询账户信息
 * @param startDateTime 查询开始时间
 * @param endDateTime 查询结束时间
 * @param type 查询收支类型
 */
function searchAccount_acc(startDateTime, endDateTime, type) {
    var paramssearch = '{"InterfaceName":"DailyWagesGetUserFundList","ProjectPublic_PlatformCode":2,"IsHistory":' + IsHistory + ',"Source":' + type + ',"insertTimeMin":"' + startDateTime + '","insertTimeMax":"' + endDateTime + '","CurrentPageIndex":' + page + ',"CurrentPageSize":' + PAGESIZE_myAccoun + '}';
    ajaxUtil.ajaxByAsyncPost1(null, paramssearch, searchSuccessCallBackmyAccount,null);    
}
//日期改变事件
function dateChangeAccount() {
    var selectedIndex = $("#myAccountRecordsearchDate").val();
    switch(selectedIndex) {
        case "0":
            //当前记录
            $("#selectDateAccount_Stt").val(initDefaultDate(0,'day'));  //View
            $("#selectDateAccount_End").val(initDefaultDate(0,'day'));
            startDateTime = $("#selectDateAccount_Stt").val()+hms00;
            endDateTime = $("#selectDateAccount_End").val()+hms59;
            type = $("#myAccountRecordsearchType").val();
            IsHistory=false;
            localStorageUtils.setParam("IsHistory",IsHistory);
            searchAccount(startDateTime, endDateTime, type);
            changeDateRange_account(-3,"day",0,"day");   //Controller
            break;
        case "1":
            //历史记录
            $("#selectDateAccount_Stt").val(initDefaultDate(-4,'day'));  //View
            $("#selectDateAccount_End").val(initDefaultDate(-4,'day'));
            startDateTime = $("#selectDateAccount_Stt").val()+hms00;
            endDateTime = $("#selectDateAccount_End").val()+hms59;
            type = $("#myAccountRecordsearchType").val();
            IsHistory=true;
            localStorageUtils.setParam("IsHistory",IsHistory);
            searchAccount(startDateTime, endDateTime, type);
            changeDateRange_account(-33,"day",-4,"day");   //Controller
            break;
    }
}
/*
 *   切换当前记录或者历史记录时。
 **/
function changeDateRange_account(minNum,minType,maxNum,maxType){
    selectDateEE.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
    selectDateEF.setMinAndMax(initDefaultDate(minNum,minType),initDefaultDate(maxNum,maxType));
}

//玩法类型改变事件
function typeChangeAccount() {
    type = $("#myAccountRecordsearchType").val();
    startDateTime = $("#selectDateAccount_Stt").val()+hms00;
    endDateTime = $("#selectDateAccount_End").val()+hms59;
    searchAccount(startDateTime, endDateTime, type);
}              
/**
 * 通过查询条件加载数据 
 */
function loadBySearchItemsAccount() {
	var conditionsAccount = getSearchTerm();
	if (null != conditionsAccount) {
	    if(unloadAtBettingDetail == true){
	        initAccountRecordsPage();
        }else{
		var dataOptions = document.getElementById('myAccountRecordsearchDate').options;
		for (var i = 0; i < dataOptions.length; i++) {
			dataOptions[i].selected = false;
			if (dataOptions[i].value == conditionsAccount.time) {
				dataOptions[i].selected = true;
			}
		}
		var typeOptions = document.getElementById('myAccountRecordsearchType').options;
		for (var i = 0; i < typeOptions.length; i++) {
			typeOptions[i].selected = false;
			if (typeOptions[i].value == conditionsAccount.type) {
				typeOptions[i].selected = true;
			}
		}
        type = conditionsAccount.type;
        startDateTime = conditionsAccount.dateStt+hms00;
        endDateTime = conditionsAccount.dateEnd+hms59;
        $("#selectDateAccount_Stt").val(conditionsAccount.dateStt);
        $("#selectDateAccount_End").val(conditionsAccount.dateEnd);
        // 时间选择器
        var dateChange = conditionsAccount.time;
        switch (dateChange){
            case "0":
                IsHistory=false;
                localStorageUtils.setParam("IsHistory",IsHistory);
                changeDateRange_account(-3,"day",0,"day");   //Controller
                break;
            case "1":
                IsHistory=true;
                localStorageUtils.setParam("IsHistory",IsHistory);
                changeDateRange_account(-33,"day",-4,"day");   //Controller
                break;
        }
        //根据日期查询条件查询数据
        searchAccount(startDateTime, endDateTime, type);
		//重置isDetail标记，表示从记录界面返回
		var searchconditionsAccount = getSearchTerm();
    	searchconditionsAccount.isDetail =  false;
    	saveSearchTerm(searchconditionsAccount);
        }
	} else {
        initAccountRecordsPage();
	}
}
function initAccountRecordsPage() {
    IsHistory=false;
    localStorageUtils.setParam("IsHistory",IsHistory);
    $("#selectDateAccount_Stt").val(initDefaultDate(0,"day"));
    $("#selectDateAccount_End").val(initDefaultDate(0,"day"));
    //查询开始时间
    startDateTime = $("#selectDateAccount_Stt").val()+hms00;
    //查询结束时间
    endDateTime = $("#selectDateAccount_End").val()+hms59;
    type = 0;
    searchAccount(startDateTime, endDateTime, type);
}
/**
 * 每个item点击时，触发该方法，保存当前的查询条件 
 */
function onItemClickListener_Account() {
	var searchconditionsAccount = {};
	searchconditionsAccount.time =  $("#myAccountRecordsearchDate").val();
	searchconditionsAccount.type =  $("#myAccountRecordsearchType").val();
    searchconditionsAccount.dateStt = $("#selectDateAccount_Stt").val();
    searchconditionsAccount.dateEnd = $("#selectDateAccount_End").val();
	searchconditionsAccount.isDetail =  true;
	saveSearchTerm(searchconditionsAccount);
}