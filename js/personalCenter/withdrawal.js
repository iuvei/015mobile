/*
 * @Author: Administrator
 * @Date:   2016-02-22 15:04:48
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-02-22 15:06:17
 */

'use strict';
//用户名
var userName = "";
//钱包余额
var walletMoney = "0.0000";
//冻结金额
var walletLockMoney = "0.0000";
//真实姓名
var realUserNameWithdraw = "";
//提款金额
var withdrawalMoneyWithdraw = "";
//提款银行
var userBankWithdraw = "";
//银行卡号
var userBankNoWithdraw = "";
//提款密码
var withdrawalPasswd = "";
var drawMinMoney,drawMaxMoney;

var drawBeginTime,drawEndTime;

//是否有真实姓名
var isHasPay = false;
/**
 * 进入页面加载
 * [withdrawalLoadedPanel description]
 * @return {[type]} [description]
 */
function withdrawalLoadedPanel(){
	catchErrorFun("withdrawalLoadedinit();");
}
/**
 * 页面离开时加载
 * [withdrawalUnloadedPanel description]
 * @return {[type]} [description]
 */
function withdrawalUnloadedPanel(){
	flag=6;
	// $("#realUserNameWithdrawId").val("");
	$("#withdrawalMoneyWithdrawId").val("");
	$("#withdrawalPasswdId").val("");
}
/**
 * 初始化
 * [withdrawalLoadedinit description]
 * @return {[type]} [description]
 */
function withdrawalLoadedinit(){
	userName = localStorageUtils.getParam("username");
	walletMoney = localStorageUtils.getParam("lotteryMoney");
	realUserNameWithdraw = localStorageUtils.getParam("realName");
	userBankWithdraw = localStorageUtils.getParam("userBank");
	userBankNoWithdraw = localStorageUtils.getParam("userBankNo");
	drawMinMoney = localStorageUtils.getParam("drawMinMoney");
	drawMaxMoney = localStorageUtils.getParam("drawMaxMoney");

	drawBeginTime = localStorageUtils.getParam("drawBeginTime");
	drawEndTime = localStorageUtils.getParam("drawEndTime");

	$("#withdrawalUser").html(userName);
	$("#walletMoneyId").html(walletMoney + " 元");
	$("#userBankWithdraw").html(bankValue[userBankWithdraw]["name"]);
	$("#userBankNoWithdraw").html(replaceStr(userBankNoWithdraw, 0, userBankNoWithdraw.length - 4, "*"));
	$("#drawMinMoney").html(drawMinMoney);
	$("#drawMaxMoney").html(drawMaxMoney);

	if(drawEndTime==drawBeginTime){
		$("#drawBeginTime").html("全天24小时");
		$("#drawEndTime").html("");
	}else{
		$("#drawBeginTime").html(time2Str(drawEndTime));
		$("#drawEndTime").html(" - "+time2Str(drawBeginTime));
	}

	//提交按钮
	$("#withdrawalSubmitId").off('click');
	$("#withdrawalSubmitId").on("click", function() {
		postwithdrawalSubmit();
	});
}

function time2Str(drawTime){
	if(parseInt(drawTime)>=0 && parseInt(drawTime) < 6){
		return "凌晨"+drawTime+":00";
	}else if(parseInt(drawTime)>=6 && parseInt(drawTime) < 12){
		return "上午"+drawTime+":00";
	}else if(parseInt(drawTime)>=12 && parseInt(drawTime) < 18){
		return "下午"+drawTime+":00";
	}else if(parseInt(drawTime)>=18 && parseInt(drawTime) <= 24){
		return "晚上"+drawTime+":00";
	}
}

/**
 * 提交按钮
 * [chargeInit description]
 * @return {[type]} [description]
 */
function postwithdrawalSubmit(){
	var currentTime = new Date();
	var hour = currentTime.getHours();
	if(hour < parseInt(drawEndTime) && hour >=  parseInt(drawBeginTime)){
		toastUtils.showToast("当前时间不支持提款");
		return;
	}

	// var userTemp = $("#realUserNameWithdrawId").val();
	withdrawalMoneyWithdraw = $("#withdrawalMoneyWithdrawId").val();
	withdrawalPasswd = $("#withdrawalPasswdId").val();

	/*if (userTemp == "") {
		toastUtils.showToast("请输入真实姓名！");
		return;
	}else if(/\s/.exec(userTemp)!=null){
		toastUtils.showToast("真实姓名中不可包含空格");
		return;
	}*/

	if (withdrawalMoneyWithdraw == "") {
		toastUtils.showToast("请输入提款金额");
		return;
	}
	if (withdrawalPasswd == "") {
		toastUtils.showToast("请输入资金密码");
		return;
	}
	/*if (userTemp != realUserNameWithdraw) {
		toastUtils.showToast("提款姓名不正确");
		return;
	}*/
	if (realUserNameWithdraw != "" && userBankWithdraw != "" && userBankNoWithdraw != "") {
		var floatMoney = parseFloat(withdrawalMoneyWithdraw);
		if (floatMoney > parseFloat(drawMaxMoney) || floatMoney < parseFloat(drawMinMoney)) {
			toastUtils.showToast("提款金额不正确");
			return;
		}

		if (floatMoney > parseFloat(walletMoney)) {
			toastUtils.showToast("可提款金额不足");
			return;
		}
		var param='{"InterfaceName":"AddDrawingsInfo","ProjectPublic_PlatformCode":2,"UserRealName":"' + realUserNameWithdraw + '","DrawingsMoney":"' + withdrawalMoneyWithdraw + '",PayPassWord:"' + withdrawalPasswd + '"}';
		ajaxUtil.ajaxByAsyncPost(null,param,saveSuccessCallBackAddDrawingsInfo,"数据提交中...",null);
	} else {
		toastUtils.showToast("请先完善银行卡资料并设置提款密码");
		createInitPanel_Fun('personalInfo');
	}
}

/**
 * Description 提款回调函数
 * @param
 * @return data 服务端返数据
 */
function saveSuccessCallBackAddDrawingsInfo(data) {
	var state = data.Result;
	if (state == "-2") {
		toastUtils.showToast("资金密码错误");
	} else if (data.SystemState == "-1") {
		loginAgain();
	} else if (state == "-1") {
		toastUtils.showToast("不是真实姓名");
	} else if (state == "9") {
		toastUtils.showToast("该用户不允许提款");
	} else if (state == "-5") {
		toastUtils.showToast("提现成功,请等待后台处理");
		// $("#realUserNameWithdrawId").val("");
		$("#withdrawalMoneyWithdrawId").val("");
		$("#withdrawalPasswdId").val("");
		searchYuE();
	}else if(state == "-6"){
		toastUtils.showToast("提款金额有误");
	}else if(state == "-7"){
		toastUtils.showToast("当前用户已被冻结暂时不允许提款操作");
	}else if(state == "-8"){
		toastUtils.showToast("超过提款次数,暂时不能提款!");
	}else if(state == "-9"){
		toastUtils.showToast("提款超出上限!");
	}else if(state == "10"){
		toastUtils.showToast("您还没有完成与下级的分红契约，无法提款!");
	}else {
		toastUtils.showToast("提款失败，稍候请重试");
	}
}

/**
 * Description 查询用户余额回调函数
 * @param
 * @return data 服务端返数据
 */
function searchSuccessCallBack_withdrawal(data) {
	if (data.state) {
		walletMoney = data.lotteryMoney;
		walletLockMoney = data.freezeMoney;
		localStorageUtils.setParam("walletMoney", parseFloat(walletMoney));
		localStorageUtils.setParam("walletLockMoney", parseFloat(walletLockMoney));
		$("#walletMoneyId").html(parseFloat(walletMoney) + "元");
	} else if (data.Result == "-1") {
		loginAgain();
	} else if (data.SystemState == "-2") {
		toastUtils.showToast("您的账号已在别处登录!");
		loginAgain();
	} else {
		toastUtils.showToast("当前网络不给力，请稍后再试");
	}
}

//查询余额
function searchYuE() {
	ajaxUtil.ajaxByAsyncPost(null, '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetUserAllMoney"}', searchSuccessCallBack_withdrawal, '正在加载数据...', null);
}


function ValidateNumber(e, pnumber) {
	if (!/^\d+[.]?\d*$/.test(pnumber))
	{
		e.value = /^\d+[.]?\d*/.exec(e.value);
	}
	var withdrawalMoneyWithdraw = $("#withdrawalMoneyWithdrawId").val();
	var temp=withdrawalMoneyWithdraw.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
	$("#withdrawalMoneyWithdrawId").val(temp);
	return false;
}
/*验证真实姓名中不可输入空格*/
function realNameNoSpaceWdraw(e,realNameText) {
	var reg = /\s/;
	if(reg.exec(realNameText)!=null){
		$("#realUserNameWithdrawId").val(realNameText.replace(/(^\s*)|(\s*$)/g,""));
	}
}
