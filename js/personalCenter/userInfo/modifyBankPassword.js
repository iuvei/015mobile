
'use strict';
//是否有付款密码
var isHasPayPwd = "0";
//旧密码、新密码、确认密码、旧资金密码、新资金密码、确认资金密码
var oldWithdrawalPasswd, newWithdrawalPasswd, confirmWithdrawalPasswd = "";
//用户名
var userName = "";
/**
 * 进入页面加载
 * [modifyBankPasswordLoadedPanel description]
 * @return {[type]} [description]
 */
function modifyBankPasswordLoadedPanel () {
	 catchErrorFun("modifyBankPasswordInit();");
}
/**
 * 页面离开时加载
 * [modifyBankPasswordUnloadedPanel description]
 * @return {[type]} [description]
 */
function modifyBankPasswordUnloadedPanel(){
		$("#newWithdrawalPasswd").val("");
		$("#confirmWithdrawalPasswd").val("");
		$("#oldWithdrawalPasswd").val("");
}
/**
 * 初始化
 * [modifyBankPasswordInit description]
 * @return {[type]} [description]
 */
function modifyBankPasswordInit(){
		isHasPayPwd = localStorageUtils.getParam("isHasPayPwd");
		userName = localStorageUtils.getParam("username");

		if (isHasPayPwd == "1") {
			$("#hide").show();
		} else {
			$("#hide").hide();
		}

	//修改资金密码按钮点击事件
    $("#modifyBankWpdmitId").off('click');
	$("#modifyBankWpdmitId").on('click', function() {		
		newWithdrawalPasswd = $("#newWithdrawalPasswd").val();
		confirmWithdrawalPasswd = $("#confirmWithdrawalPasswd").val();
		if ("1" == isHasPayPwd) {
			oldWithdrawalPasswd = $("#oldWithdrawalPasswd").val();
			if (oldWithdrawalPasswd == "") {
				toastUtils.showToast("原始资金密码不能为空");
				return;
			}
		}
		if (newWithdrawalPasswd == "") {
			toastUtils.showToast("新资金密码不能为空");
			return;
		} else if (newWithdrawalPasswd.length < 6) {
			toastUtils.showToast("新资金密码长度不能小于6位");
			return;
		}
		if (confirmWithdrawalPasswd == "") {
			toastUtils.showToast("确认资金密码不能为空");
			return;
		} else if (confirmWithdrawalPasswd != newWithdrawalPasswd) {
			toastUtils.showToast("确认资金密码与新资金密码不一致");
			return;
		}
		var test = /^[a-zA-Z0-9]{6,20}$/;
		//正则表达式
		if (!test.exec(confirmWithdrawalPasswd)) {
			toastUtils.showToast("资金密码只能为字母和数字");
			return false;
		}
		
		//字母验证
			var zm =/^[a-zA-Z]+$/;
			//数字验证
			var sz =/^[0-9]*$/;
			//有数字和英文字母组合
			var zmsz =/^[0-9a-zA-Z]+$/;
			var newPwd = confirmWithdrawalPasswd;
			var zm1 = zm.test(newPwd);
			var sz1 = sz.test(newPwd);
			var zmsz1 = zmsz.test(newPwd);
			//提取字符串中的数字
            var shuzi = newPwd.replace(/[^0-9]/ig,""); 
            //提取字符串中的字母
			var zimu=newPwd.match(/^[a-z|A-Z]+/gi,"");
			if(isChina(newPwd)){
				toastUtils.showToast("密码只能为(6-16)位字母和数字混合组成");
				return false;
			}								
			if(zm1){
				toastUtils.showToast("密码只能为(6-16)位字母和数字混合组成");
				return false;
			}
			if(sz1){
				toastUtils.showToast("密码只能为(6-16)位字母和数字混合组成");
				return false;
			}
			if(shuzi=="" && zimu==null){
				toastUtils.showToast("密码只能为(6-16)位字母和数字混合组成");
				return false;
			}
			if(newPwd.length < 6){
				toastUtils.showToast("密码只能为(6-16)位字母和数字混合组成");
				return false;
			}											
		if ("1" == isHasPayPwd) {   //Type:0 -- 登录和资金密码可以一致，Type:1 -- 登录和资金密码不可一致。
		    var param = '{"ProjectPublic_PlatformCode":2,"Type":1,"LogPassword":"' + oldWithdrawalPasswd + '","NewPassword":"' + confirmWithdrawalPasswd + '","InterfaceName":"ModifyPayPass"}';
		    ajaxUtil.ajaxByAsyncPost1(null, param, changeWithdrawalPwdCallBack_zj,null);
		} else {
		    var param_zj = '{"ProjectPublic_PlatformCode":2,"Type":1,"NewPassword":"' + confirmWithdrawalPasswd + '","InterfaceName":"ModifyPayPass"}';
		    ajaxUtil.ajaxByAsyncPost1(null, param_zj, changeWithdrawalPwdCallBack_zj,null);
		}
	});		
}

	/**
	 * Description 修改资金密码回调函数
	 * @param
	 * @return data 服务端返数据
	 */
	function changeWithdrawalPwdCallBack_zj(data) {
		if (data.Result == "1") {
			localStorageUtils.setParam("isHasPayPwd", '1');
            toastUtils.showToast("资金密码修改成功");
			if ("1" == isHasPayPwd) {
				$("#oldWithdrawalPasswd").attr("value", "");
				$("#newWithdrawalPasswd").attr("value", "");
				$("#confirmWithdrawalPasswd").attr("value", "");
			} else {
				$("#newWithdrawalPasswd").attr("value", "");
				$("#confirmWithdrawalPasswd").attr("value", "");
			}
              setPanelBackPage_Fun("personalInfo");						
		} else if (data.Result == "-1") {
			toastUtils.showToast("原始资金密码不正确");
		} else if (data.Result == "-2") {
			toastUtils.showToast("资金密码不能和登录密码一致");
		} else if(data.ErrorState == "-4"){
			toastUtils.showToast("当前用户已被冻结");
		} else if(data.ErrorState == "-5"){
			toastUtils.showToast("密码输错次数过多，用户已被冻结!");
		} else {
			toastUtils.showToast("资金密码修改失败");
		}
	}