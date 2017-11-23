
//返回银行链接地址
var bankURL = "";
//充值银行
var payBank = "";
//充值银行名称
var payBankName = "";
//充值银行账户
var payBankAccount = "";
//充值金额
var payMoney = "";
//币种
var moneyType = "";
//附言
var fuyan="";
//PType
var pType="";
/**
 * 进入页面加载
 * [chargeDetailConfirmLoadedPanel description]
 * @return {[type]} [description]
 */
function chargeDetailConfirmLoadedPanel() {
    catchErrorFun("chargeDetailConfirmInit();");
}
/**
 * 页面离开时加载
 * [chargeDetailConfirmUnloadedPanel description]
 * @return {[type]} [description]
 */
function chargeDetailConfirmUnloadedPanel() {
    $('#changeSubmit').html('立即付款');
    $('#changeSubmit').show();
    $('#shuomingID').hide();
    $('#remitSubmit').show();

    $('#remitName').val('');
    $('#remitTime').val('');
}

/**
 * 初始化
 * [chargeDetailConfirmInit description]
 */
function chargeDetailConfirmInit(){
    var chargetype=localStorageUtils.getParam("chargetype");
    moneyType = localStorageUtils.getParam("moneyType");
    bankURL = localStorageUtils.getParam("bankURL");
    payBank = localStorageUtils.getParam("payBank");

    if(payBank){
        if(payBank.indexOf(",")>0){
            payBankVal=payBank.split(",");
        }else{
            payBankVal=payBank;
        }
    }
    payBankName = localStorageUtils.getParam("payBankName");
    payBankAccount = localStorageUtils.getParam("payBankAccount");
    payMoney = localStorageUtils.getParam("payBankMoney");
    fuyan = localStorageUtils.getParam("fuyan");
    pType=localStorageUtils.getParam("pType"); //pType
    mValue=localStorageUtils.getParam("mValue"); //mValue值区分银联或者在线支付方式

    var allRecType = jsonUtils.toJson(localStorageUtils.getParam("allRecType"));
    for(var j=0;j<allRecType.length;j++){
        if(pType==allRecType[j].Pay){
            var payName = allRecType[j].PayName; //后台银行名称
            var payValue = allRecType[j].Pay;  //pay值匹配
        }
    }
    //************* 银联支付方式 **************
    if(pType=="15"){
        $("#chargeInfo2").hide();  //隐藏chargeInfo2
        $("#chargeInfo1").show();  //显示chargeInfo1

        $("#shuomingID").show();
        $("#remitInfo").show();
        $("#changeSubmit").hide();
        $("#remitSubmit").show();

        //招商银行
        if(chargetype=="cmb"){
            $('#changeSubmit').html('支付宝转账');
            $('#changeSubmit').show();
            $("#remitSubmit").show();

            $('#changeSubmit').off('click');
            $('#changeSubmit').on('click',function () {
                window.open("https://shenghuo.alipay.com/send/payment/fill.htm", "_self");
            });
        }

        $("#cashUser").val(payBankName);

        $("#cashBank").val(payBankVal[0]);

        if(payBankVal[1]){
            $("#showKaiHuBank").show();
            $("#kaiHuBank").val(payBankVal[1]);
        }else{
            $("#showKaiHuBank").hide();
        }

        $("#cashBankNo").val(payBankAccount);
        $("#cash").val(payMoney);
        $("#fuyan").val(fuyan);

        if (payBank == "农业银行ABC") {
            $("#khdz").show();
            if (payBankName == "张铸山" || payBankName == "杨玉琴") {
                $("#yhkhdz").val("河南分行营业部管城区支行紫荆山分理处");
            }
        } else if (payBank == "招商银行CMB") {
            $("#khdz").show();
            if (payBankName == "符传林") {
                $("#yhkhdz").val("郑州分行花园路支行");
            } else if (payBankName == "刘玉至") {
                $("#yhkhdz").val("郑州分行紫荆山路支行");
            }
        } else {
            $("#khdz").hide();
        }

        //打款信息
        $('#remitMoney').val(payMoney);

        $("#remitSubmit").off('click');
        $("#remitSubmit").on("click", function() {
            var remitName = $('#remitName').val().trim();
            var remitTime = $('#remitTime').val().trim();
            var OrderID= localStorageUtils.getParam("OrderID");
            if (!remitName || remitName == ''){
                toastUtils.showToast('请填写真实姓名');
                return;
            }
            if (!remitTime || remitTime == ''){
                toastUtils.showToast('请填写转账时间');
                return;
            }else if (!(/^([0-1][0-9]|2[0-3])([0-5][0-9])$/.test(remitTime))){
                toastUtils.showToast('转账时间格式不正确');
                return;
            }

            var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"AddOrderReminder","PayRealName":"'+remitName+'","TransferAmount":"' +payMoney+ '","TransferTime":"'+remitTime+'","ReceiveName":"' + payBankName + '","ReceiveBank":"' + payBankVal[0] + '","ReceiveCardNumber":"' + payBankAccount + '","OrderNumber":"' + OrderID + '","PayCarNumber":""}';
            ajaxUtil.ajaxByAsyncPost1(null, param, function (data) {
                if (data.SystemState == 64 && data.Result == 1){
                    toastUtils.showToast("提交审核成功");
                    $('#remitSubmit').hide();
                }else{
                    toastUtils.showToast("提交审核失败");
                }
            },null);
        });


        //************  在线支付方式（区别于my18类的银行充值） ***************
    }else if(rechargeID[pType]['IsOnline']){
        $("#chargeInfo1").hide();  //隐藏chargeInfo1
        $("#chargeInfo2").show();  //显示chargeInfo2
        $("#remitInfo").hide();

        if(pType==payValue){
            $("#chargeInfo2 #payMethod").html(payName);
            $("#chargeInfo2 #payValue").html(payMoney + "元");
        }
        //点击-立即付款
        $("#changeSubmit").off('click');
        $("#changeSubmit").on("click", function() {
            var param = {};
            var mvalue2=mValue.split("$");
            for(var i= 0;i<mvalue2.length;i+=2){
                param[mvalue2[i]] = mvalue2[i+1];
            }
            post(bankURL,param);
            IsChargeSucceed();
        });

        function post(URL, PARAMS) {
            var temp_form = document.createElement("form");
            temp_form .action = URL;
            temp_form .target = "_self";
            temp_form .method = "get";
            temp_form .style.display = "none";
            for (var x in PARAMS) {
                var opt = document.createElement("textarea");
                opt.name = x;
                opt.value = PARAMS[x];
                temp_form .appendChild(opt);
            }
            //添加到body中，解决Firefox中无法打开新窗口的问题
            document.body.appendChild(temp_form);
            temp_form .submit();
        }
    }
}
/*
 *  弹窗再次确认用户是否完成充值。
 * */
function IsChargeSucceed(){
    $.ui.popup(
        {
            title:"提示",
            message:'请您在新打开的网上银行页面完成充值',
            cancelText:"已完成充值",
            cancelCallback:
                function(){
                    createInitPanel_Fun("myChargeRecord",true);
                },
            doneText:"充值遇到问题",
            doneCallback:
                function(){
                    createInitPanel_Fun("charge",true);
                },
            cancelOnly:false
        });
}
