'use strict';
var userName = "";
//@ 进入页面加载
function transferLoadedPanel(){
	catchErrorFun("transferLoadedinit();");
}

//@ 页面离开时加载
function transferUnloadedPanel(){
	flag=6;
	$("#transferMoney").val("");
	$("#fundPassword").val("");
	$("#fundTransfer").val("1");
}

//@ 初始化
function transferLoadedinit(){
	//lotteryBalance 彩票余额
	$("#lotteryBalance").html(localStorageUtils.getParam("lotteryMoney"));

	//GameBalance 棋牌余额
	userName = localStorageUtils.getParam("username");
	var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"DsGetGamerBalance","UserName":"'+ userName +'"}';
	ajaxUtil.ajaxByAsyncPost1(null, param, function (data) {
		data.DsBalance ? $("#gameBalance").html(data.DsBalance) : $("#gameBalance").html('0');
	},null);

	//提交按钮
	$("#transferSubmit").off('click');
	$("#transferSubmit").on("click", function() {
		postTransferSubmit();
	});
}

//@ 输入全部金额
function inputAllMoney() {
	var type = $("#fundTransfer").val();
	if(type == "1"){
		$("#transferMoney").val(strSliceToNum($("#lotteryBalance").text(),2) );
	}else if (type == "2"){
		$("#transferMoney").val(strSliceToNum($("#gameBalance").text(),2));
	}
}

function changeTransferType() {
	$("#transferMoney").val("");
	$("#fundPassword").val("");
}

//@ Submit Button
function postTransferSubmit() {
	var type = $("#fundTransfer").val();
	var transferMoney = Number($("#transferMoney").val());
	var fundPassword = $("#fundPassword").val();

	if(transferMoney == ''){
		toastUtils.showToast("请输入转账金额");
		return;
	} else if(transferMoney > 50000){
		toastUtils.showToast("转账金额不能大于 50000");
		return;
	}else if(transferMoney <= 0){
		toastUtils.showToast("转账金额需大于等于0");
		return;
	} else{
		if (type == "1"){
			if ( transferMoney > Number($("#lotteryBalance").text()) ){
				toastUtils.showToast("彩票余额不足");
				return;
			}
		}else if (type == "2"){
			if ( transferMoney > Number($("#gameBalance").text()) ){
				toastUtils.showToast("棋牌余额不足");
				return;
			}
		}
	}

	if(fundPassword == ''){
		toastUtils.showToast("请输入资金密码");
		return;
	}else{
	}

	var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"DsTransefer","UserName":"'+ userName +'","TranseferType":"'+ type +'","TranseferMoney":'+ transferMoney +',"PayPassWord":"'+ fundPassword +'"}';
	ajaxUtil.ajaxByAsyncPost1(null, param, function (data) {
		if (data.SystemState == 64){
			if (data.ResultCode == "1"){
				toastUtils.showToast("转账成功");
				$("#transferMoney").val("");
				$("#fundPassword").val("");
				setPanelBackPage_Fun("myLottery");
			}else if (data.OrderState == -3 || data.OrderState == -8){
				toastUtils.showToast("支付密码错误");
				$("#fundPassword").val("");
			}
		} else if (data.SystemState == "-1") {
			loginAgain();
		} else if(data.SystemState == 128) {
			toastUtils.showToast("转账失败，稍候请重试");
		} else {
			toastUtils.showToast("转账失败，稍候请重试");
		}
	},null);
}
