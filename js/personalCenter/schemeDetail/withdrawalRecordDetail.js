/********** 进入panel时调用  **********/
function withdrawalRecordDetailLoadedPanel(){
	catchErrorFun("withdrawalRecordDetaiInit();");
}

/********** 离开panel时调用  **********/
function withdrawalRecordDetailUnloadedPanel(){
	$("#withdrawalRecordDetaiList").empty();
	unloadAtBettingDetail = false;
}
/********** init  **********/
function withdrawalRecordDetaiInit(){
	$("#withdrawalRecordDetaiList").empty();
	var withdrawalItem = JSON.parse(localStorageUtils.getParam("withdrawal"));
	var $account=$('<li>订单号：<span>'+withdrawalItem.orderId+'</span></li>' +
		'<li>用户名：<span>'+withdrawalItem.accountnum+'</span></li>' +
		'<li>提款金额：<span>'+withdrawalItem.tmoney+'</span></li>' +
		// '<li>提款方式：<span>'+withdrawalItem.withdrawalType+'</span></li>' +
		'<li>提款状态：<span>'+withdrawalItem.state+'</span></li>' +
		'<li>交易时间：<span>'+withdrawalItem.optime+'</span></li>' +
		'<li style="word-break: break-all;">备注：<span>'+withdrawalItem.details+'</span></li>');
     $("#withdrawalRecordDetaiList").append($account);
}