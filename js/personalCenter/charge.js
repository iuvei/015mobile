/*
 * @Author: Administrator
 * @Date:   2015-02-08 11:22:01
 * @Last Modified by:   Administrator
 * @Last Modified time: 2015-10-20 16:13:17
 */
//用户名
var userName = "";
//币种
var moneyType = "";
//是否注册真实姓名
var isHasName = false;
//充值金额
var payMoney = "";
//充值银行名称
var payName = "";
//充值银行
var bank = "";
//支付类型
var type = "";
var test;
var bankID;
/**
 * 进入页面加载
 * [chargeLoadedPanel description]
 * @return {[type]} [description]
 */
function chargeLoadedPanel() {
    catchErrorFun("chargeInit();");
}
/**
 * 页面离开时加载
 * [chargeUnloadedPanel description]
 * @return {[type]} [description]
 */
function chargeUnloadedPanel() {
    flag=6;
    $("#tonghangzz").empty();
    $("#tonghangpayMoney").val("");
    $('#show_charge_tip').html('');
}
/**
 * 初始化
 * [chargeInit description]
 * @return {[type]} [description]
 */
function chargeInit(){
    $("#tonghangzz").empty();
    localStorageUtils.setParam("loginState","2");
    Array.prototype.S = String.fromCharCode(2);
    Array.prototype.in_array = function(e) {
        var r = new RegExp(this.S + e + this.S);
        return (r.test(this.S + this.join(this.S) + this.S));
    };
    var bettingIndex = localStorageUtils.getParam("userRechargeTypeList"); //网银充值checked
    //获取字符串格式的银行信息并转化为JSON格式使用
    var allRecType = jsonUtils.toJson(localStorageUtils.getParam("allRecType"));
    test = JSON.parse(bettingIndex);
    var testDIV = "";
    //获取后台银行名称，并将选中的选项展示到页面
    for (var i = 0; i < test.length; i++) {
        for(var j=0;j<allRecType.length;j++){  //** 获取银行名称 start
            if(test[i].id == allRecType[j].Pay){
                if(i==0){
                    bankID=test[i].id;
                    testDIV += '<a onclick="to_change('+test[i].id+');"><dd><div class="userName">' + allRecType[j].PayName + '</div><div id="chongzhi' + test[i].id + '"   class="checkBoxA"></div></dd></a>';
                    setValiDate(test[i].maxRecMoney,test[i].minRecMoney);
                }else{
                    testDIV += '<a onclick="to_change('+test[i].id+');"><dd><div class="userName">' + allRecType[j].PayName + '</div><div id="chongzhi' + test[i].id + '"  class="checkBox"></div></dd></a>';
                }
            }
        }  //** 获取银行名称 end
    }
    $("#tonghangzz").append(testDIV);

    ajaxUtil.ajaxByAsyncPost(null, '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetUserAllMoney"}', GetUserAllMoney_charge, null);
    userName = localStorageUtils.getParam("username");
    moneyType = localStorageUtils.getParam("moneyType");
    $(".redtext").html(moneyType);

    ajaxUtil.ajaxByAsyncPost(null, '{"ProjectPublic_PlatformCode":2,"UserName":"' + userName + '","InterfaceName":"GetUserDetailNew"}', successCallBack_GetUserDetail, null);

    //提交按钮
    $("#tonghangsubmit").off('click');
    $("#tonghangsubmit").on("click", function() {
        postSubmit();
    });

    $('#textID').show();
}
//选择银行，当前银行被选中
function to_change(id){
    bankID=id;
    for (var j = 0; j < test.length; j++) {
        $('#chongzhi'+test[j].id+'').removeClass('checkBoxA');
        $('#chongzhi'+test[j].id+'').addClass('checkBox');
        if(id == test[j].id){
            $('#chongzhi'+test[j].id+'').removeClass('checkBox');
            $('#chongzhi'+test[j].id+'').addClass('checkBoxA');
            $("#textID").html("充值金额(重要提示：范围为"+test[j].minRecMoney+"-"+test[j].maxRecMoney+")");
        }
    }
    //扫码付:wechat,qqpay,alipay
    if ($.inArray(id,[65,66,67]) != -1){
        $('#show_charge_tip').html('温馨提示：尊敬的会员您好，该通道支付充值，凡是10的倍数的金额会加0.01，例如您充值100元，会变成充值100.01，您支付成功也是100.01，上分也是100.01；目的是为了提高充值成功率。谢谢合作! ');
        $('#textID').show();
    }else if(id == 68){
        $('#show_charge_tip').html('扫码付单笔限额提醒：<br>1、工商银行，农业银行，建设银行，中国银行，光大银行，上海银行，招商银行，民生银行，邮政储蓄银行，平安银行，中信银行：单笔限额为 [50-50000].<br/>2、华夏银行，兴业银行，交通银行，浦发银行：单笔限额为 [1000-50000].<br>3、广发银行，北京银行：单笔限额为 [350-50000].');
        $('#textID').hide();
    } else {
        $('#show_charge_tip').html('');
        $('#textID').show();
    }
}

function setValiDate(maxRecMoney, minRecMoney){
    $("#textID").html("充值金额(重要提示：范围为"+ minRecMoney +"-"+ maxRecMoney +")");
}

function getValiDate(bankID,payMoney){
    var temp=true;
    for (var j = 0; j < test.length; j++) {
        if(bankID == test[j].id){
            if (parseFloat(payMoney) > test[j].maxRecMoney || parseFloat(payMoney) < test[j].minRecMoney) {
                toastUtils.showToast('充值金额范围'+test[j].minRecMoney+"-"+test[j].maxRecMoney);
                temp=false;
                return;
            }
        }
    }
    return temp;
}

//获取用户名和账户余额
function GetUserAllMoney_charge(data) {
    if (data.state) {
        var info = data.Context;
        var lotteryMoney = data.lotteryMoney;
        $("#welcomeUser").html(data.userName);
        localStorageUtils.setParam("lotteryMoney", parseFloat(lotteryMoney));
        if (lotteryMoney != null || typeof (lotteryMoney) != "undefined") {
            $("#lotteryMoney").html(parseFloat(lotteryMoney) + "元");
        } else {
            $("#lotteryMoney").html("0.0000" + "元");
        }
    }
}

/**
 * Description 查询用户信息回调函数
 * @return data 服务端返数据
 */
function successCallBack_GetUserDetail(data) {
    if (data.SystemState == 64) {
        if (data.UserRealName != "") {
            isHasName = true;
        } else {
            isHasName = false;
        }
    } else if (data.Result == "-1") {
        loginAgain();
    } else if (data.SystemState == "-1") {
        loginAgain();
    } else {
        toastUtils.showToast("当前网络不给力，请稍后再试");
    }
}

//@提交按钮
function postSubmit(){
    var RechargeType = rechargeID[bankID]['typeID'] ? rechargeID[bankID]['typeID'] : 6;

    // 快捷支付方式 Or 第三方在线支付方式
    payMoney = $("#tonghangpayMoney").val();
    if (payMoney == "") {
        toastUtils.showToast("请输入充值金额");
        return;
    }else if(!getValiDate(bankID,payMoney)){
        return;
    }

    if (rechargeID[bankID]['fastPay'] || rechargeID[bankID]['onlinePay'] ){
        var message = $('<select></select>');
        $.each(rechargeID[bankID]['name'], function (key, val) {
            message.append('<option value="'+ val +'">'+ bankValue[val].name +'</option>');
        });
        setTimeout(function () {
            $.ui.popup({
                title:"请选择银行",
                message: message,
                cancelText:"关闭",
                cancelCallback:
                    function(){
                    },
                doneText:"确定",
                doneCallback:
                    function(){
                    bank = message.val();
                    submitPaymentInfo(bank,RechargeType);
                    },
                cancelOnly:false
            });
        },300);
    }else{
        bank = rechargeID[bankID]['name'];
        submitPaymentInfo(bank,RechargeType);
    }
}

//@ 提交充值信息
function submitPaymentInfo(bank, RechargeType) {
    payMoney = $("#tonghangpayMoney").val();
    localStorageUtils.setParam("chargetype", bank);

    if (payMoney == "") {
        toastUtils.showToast("请输入充值金额");
        return;
    }
    if(!getValiDate(bankID,payMoney)){
        return;
    }
    var param='{"ProjectPublic_PlatformCode":2,"InterfaceName":"AddRechargeInfo",RechargeMoney:"' + payMoney + '",BankCode:"' + bank + '",RechargeType:"' + RechargeType + '"}';
    ajaxUtil.ajaxByAsyncPost(null,param,saveSuccessCallBackAddRechargeInfo,"数据提交中...",null);
}

/**网银支付
 * Description 充值回调函数
 * @return data 服务端返数据
 */
function saveSuccessCallBackAddRechargeInfo(data) {
    if (data.Result == "1") {
        var info = data.Context;
        for (var i = 0; i < info.length; i++) {
            var bankURL = info[i].BankUrl;
            var payBank = info[i].PayBank;  //充值银行
            var payBankName = info[i].PayBankName;
            var payBankAccount = info[i].PayBankAccount;
            var payMoney = info[i].PayMoney;
            var fuyan=info[i].PayFuYan;
            var payName=info[i].PayName;  //从后台获取银行名称
            var pType=info[i].PType;  //获取PType值
            var mValue=info[i].MValue;
            var OrderID = info[i].OrderID;

            if(pType == "15") {   //***** start
                if (bankURL == "" || payBank == "") {
                    toastUtils.showToast("系统繁忙,请稍后再试!");
                } else {
                    localStorageUtils.setParam("bankURL", bankURL);
                    localStorageUtils.setParam("payBank", payBank);
                    localStorageUtils.setParam("payBankName", payBankName);
                    localStorageUtils.setParam("payName", payName);
                    localStorageUtils.setParam("payBankAccount", payBankAccount);
                    localStorageUtils.setParam("payBankMoney", payMoney);
                    localStorageUtils.setParam("fuyan", fuyan);
                    localStorageUtils.setParam("pType", pType); //充值类型
                    localStorageUtils.setParam("OrderID", OrderID);
                    createInitPanel_Fun("chargeDetailConfirm");
                }
            }else {   //在线支付方式
                if (mValue == "" && bankURL == "") {
                    toastUtils.showToast("系统繁忙,请稍后再试!");
                }else{
                    localStorageUtils.setParam("payBankMoney", payMoney); //充值金额
                    localStorageUtils.setParam("pType", pType); //充值类型
                    localStorageUtils.setParam("bankURL", bankURL); //URL
                    localStorageUtils.setParam("mValue", mValue); //URL
                    createInitPanel_Fun("chargeDetailConfirm");
                }
            }  //**** end
        }
    } else if (data.SystemState == "-1") {
        loginAgain();
    } else if (data.Result == "-5"||data.Result == "-1") {
        toastUtils.showToast("系统繁忙,请稍后再试!");
    } else {
        toastUtils.showToast("充值申请失败，稍候请重试");
    }
}

function jineOcl(el){
    payMoney =el.value;
    if (payMoney == "") {
        toastUtils.showToast("请输入正确的充值金额");
        return;
    }
    var temp=payMoney.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    $("#tonghangpayMoney").val(temp);
}

function ValidateNumber12(e, pnumber) {
    if (!/^\d+[.]?\d*$/.test(pnumber))
    {
        //检测正则是否匹配
        e.value = /^\d+[.]?\d*/.exec(e.value);
    }
    var payMoney = $("#tonghangpayMoney").val();
    var temp=payMoney.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    $("#tonghangpayMoney").val(temp);
    return false;
}