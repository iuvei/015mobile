/********** 进入panel时调用  **********/
function teamAccountDetailsLoadedPanel(){
	catchErrorFun("teamAccountDetailsInit();");
}

/********** 离开panel时调用  **********/
function teamAccountDetailsUnloadedPanel(){
	$("#teamAccountDetailsList").empty();
	unloadAtBettingDetail = false;
}

function teamAccountDetailsInit(){
	$("#teamAccountDetailsList").empty();

	var teamAcctItem = JSON.parse(localStorageUtils.getParam("teamAccount"));
    var $account = $('<li>用户名：<span>'+ teamAcctItem.userName +
		'</span></li><li>订单号：<span>'+ teamAcctItem.orderId +
		'</span></li><li>交易类型：<span>'+ teamAcctItem.tradeType +
		'</span></li><li>交易金额：<span>'+ teamAcctItem.tradeMoney +
		'</span></li><li>余额：<span>'+ teamAcctItem.thenBalance +
		'</span></li><li>备注：<span>'+ teamAcctItem.details +
		'</span></li><li>交易时间：<span>'+ teamAcctItem.insertTime +'</span></li>');

	$("#teamAccountDetailsList").append($account);
}