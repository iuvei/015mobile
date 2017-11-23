//@Date: 2016-11-29

'use strict';
// var hasBundledBank = false;
// 进入页面加载
function showBankInfoLoadedPanel(){
	catchErrorFun("showBankInfoInit();");
}

// 页面离开时加载
function showBankInfoUnloadedPanel(){
	$("#bundledBanks").empty();
}

// 初始化
function showBankInfoInit(){
	myUserID = localStorageUtils.getParam("myUserID");
	userName = localStorageUtils.getParam("username");
	isHasPayPwd = localStorageUtils.getParam("isHasPayPwd");
	realName = localStorageUtils.getParam("realName");
	// var defaultBank = localStorageUtils.getParam("userBank");
	// var defaultBankNo = localStorageUtils.getParam("userBankNo");

	if (!realName){
		$("#tipsToAddBank").show();
		if ($("#addBanks").css('display')=='none'){
			$("#addBanks").show();
		}
	}else{
		$("#tipsToAddBank").hide();
		showBanks();
	}
}

/* 动态加载所有已绑定银行卡的信息 */
function showBanks() {
	//接口调用，判断用户有几张卡已绑定
	var params='{"ProjectPublic_PlatformCode":2,"UserID":'+myUserID+',"InterfaceName":"GetBankCardList"}';
	ajaxUtil.ajaxByAsyncPost1(null, params,function (data) {
		//生成银行卡列表
		var bankCardList = data["BankCardList"];
		var thisCard = new Array();
		if (bankCardList.length > 0){
			var showlength = bankCardList.length>5 ? 5 : bankCardList.length;  //前端最多显示5张
			for(var k= 0; k<showlength; k++){
				var info = bankCardList[k];
				if (info.Isdefault == 1){
					var $bankList = $('<li class="defaultBank"><table><tbody><tr><td><img src="'+bankValue[info.BankCode].logo
						+'"></td><td><h4>'+bankValue[info.BankCode].name
						+'</h4><p><b>'+realName.substring(1,0)+"**"
						+'</b></p></td></tr></tbody></table><p style="margin-top:-4px;"><b>**** **** **** </b><span style="font-size:21px;">'
						+replaceStr(info.CardNumber,0,info.CardNumber.length-4,"")+'</span></p></li>');
				}else {
					$bankList = $('<li><table><tbody><tr><td><img src="'+bankValue[info.BankCode].logo
					+'"></td><td><h4>'+bankValue[info.BankCode].name
					+'</h4><p><b>'+realName.substring(1,0)+"**"
					+'</b></p></td></tr></tbody></table><p style="margin-top:-4px;"><b>**** **** **** </b><span style="font-size:21px;">'
					+replaceStr(info.CardNumber,0,info.CardNumber.length-4,"")+'</span></p></li>');
				}
				$("#bundledBanks").append($bankList);
				thisCard.push(info);
			}
			/*
			//非默认卡，最多显示4张
			$.each(bankCardList,function (index,info) {
				if (info.Isdefault == 0 && index < 5){
					var $bankList = $('<li><table><tbody><tr><td><img src="'+bankValue[info.BankCode].logo
						+'"></td><td><h4>'+bankValue[info.BankCode].name
						+'</h4><p><b>'+realName.substring(1,0)+"**"
						+'</b></p></td></tr></tbody></table><p style="margin-top:-4px;"><b>**** **** **** </b><span style="font-size:21px;">'
						+replaceStr(info.CardNumber,0,info.CardNumber.length-4,"")+'</span></p></li>');
					$("#bundledBanks").append($bankList);
					thisCard.push(info);
				}
			});
			// 默认卡
			$.each(bankCardList,function (index,info) {
				if (info.Isdefault == 1){
					var $bankList = $('<li><table><tbody><tr><td><img src="'+bankValue[info.BankCode].logo
						+'"></td><td><h4>'+bankValue[info.BankCode].name
						+'</h4><p><b>'+realName.substring(1,0)+"**"
						+'</b></p></td></tr></tbody></table><p style="margin-top:-4px;"><b>**** **** **** </b><span style="font-size:21px;">'
						+replaceStr(info.CardNumber,0,info.CardNumber.length-4,"")+'</span></p></li>');
					if ($("#bundledBanks li").size()==0){
						$("#bundledBanks").append($bankList);
						thisCard.push(info);
					}else{
						$bankList.insertBefore($("#bundledBanks li:first-child"));
						thisCard.splice(0,0,info);
					}
					
					if ($("#bundledBanks li").size()>5){
						$("#bundledBanks li:last-child").remove();
					}
				}
			});*/
		}

		//最大绑定5张卡
		var bankNum = $("#bundledBanks li").size();
		if (bankNum > 4 || bankCardList.length > 4){
			$("#addBanks").hide();
		}else{
			$("#addBanks").show();
		}

		//设置默认卡
		$("#bundledBanks li").off("click");
		$("#bundledBanks li").on("click",function() {
			var cardIndex = $(this).index();//当前索引值
		  	if($(this).context.className != "defaultBank"){
				$.ui.actionsheet(
					[{
						text: '是否设置此卡为默认卡?',
						cssClasses: '',
						handler: function () {
						}
					}, {
						text: '确定',
						cssClasses: 'themeColor',
						handler: function () {
							var params = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"SetDefaultBankCard","BankCardId":' + thisCard[cardIndex]["ID"] + ' ,"CardNumber":"' + thisCard[cardIndex]["CardNumber"] + '"}';
							ajaxUtil.ajaxByAsyncPost(null, params, setDefaultBankCallBack, '正在设置...');
						}
					}]
				);
			}
		});

	},'正在查询...');
}

// 设置默认卡后的CallBack
function setDefaultBankCallBack(data) {
	if (data.SystemState == 64){
		if (data.Result.toLowerCase() == "true"){
			toastUtils.showToast("设置默认卡成功");
			$("#bundledBanks").empty();
			showBanks();
		}
		if (data.Result.toLowerCase() == "false"){
			toastUtils.showToast("设置默认卡失败");
		}
	}
}