/********** 进入panel时调用  **********/
function accountDetailsLoadedPanel(){
	catchErrorFun("accountDetailsInit();");
}

/********** 离开panel时调用  **********/
function accountDetailsUnloadedPanel(){
	$("#accountDetailsList").empty();
	unloadAtBettingDetail = false;
}
/********** init  **********/
function accountDetailsInit(){
	$("#accountDetailsList").empty();
	var accountItem = JSON.parse(localStorageUtils.getParam("account"));
	    var $account;
        if(accountItem.ufmoney_ == 0 && accountItem.DetailsSource==257){
            $account=$('<li>流水号：<span>'+accountItem.orderId+'</span></li><li>交易金额：<span>'+accountItem.ufmoney+'</span></li><li>彩票余额：<span>'+accountItem.cbalaces+'元</span></li><li>交易类型：<span>'+accountItem.tranType+'</span></li><li>备注：<span>'+accountItem.details+'</span></li><li>交易时间：<span>'+accountItem.optime+'</span></li>');
        	 $("#accountDetailsList").append($account);
        }else{
        	$account=$('<li>流水号：<span>'+accountItem.orderId+'</span></li><li>交易金额：<span>'+accountItem.ufmoney+'</span></li><li>彩票余额：<span>'+accountItem.cbalaces+'元</span></li><li>交易类型：<span>'+accountItem.tranType+'</span></li><li>备注：<span>'+accountItem.details+'</span></li><li>交易时间：<span>'+accountItem.optime+'</span></li>');
            $("#accountDetailsList").append($account);
        }
	
    
}