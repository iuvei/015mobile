var lotteryMoney = "0.00";
 //代理用户名
var proxyUserName = "";
    //代理用户ID
var thisUserID = "";
var money=0;
//备注信息
var beizhu="";
var MYRebate;

/*进入panel时调用*/
function proxyChargeLoadedPanel(){
	catchErrorFun("proxyChargeInit();");
}
/*离开panel时调用*/
function proxyChargeUnloadedPanel(){
  $("#proxyLimitDetailsList").empty();
  $("#payMoneyID").val("");
  $("#passwordID").val("");
  $("#beizhuId_").val("");
  $("#baizhuID").empty();
}

function proxyChargeInit(){
    proxyUserName = localStorageUtils.getParam("proxyUserName");
    thisUserID = localStorageUtils.getParam("proxyUserId");
    MYRebate=localStorageUtils.getParam("MYRebate");
    $("#welcomeUser_dl").html(proxyUserName);

    if (Number(MYRebate) < 1950){
        $("#baizhuID").append('<option selected="selected" value="转账">转账</option>'+
            '<option value="分红">分红</option>'+
            '<option value="奖励">奖励</option>'+
            // '<option value="dailyWages">日工资</option>'+
            '<option value="others">其他</option>');
    }else{
        $("#baizhuID").append('<option selected="selected" value="转账">转账</option>'+
            '<option value="分红">分红</option>'+
            '<option value="奖励">奖励</option>'+
            '<option value="dailyWages">日工资（计入报表）</option>'+
            '<option value="others">其他</option>');
    }

    getUserMoney();
    beizhuType();

    $("#proxyChargesubmit").off('click');
    $("#proxyChargesubmit").on("click", function() {
      setSubmitPost();
    });
}

function setSubmitPost(){
    var IsShowTran=localStorageUtils.getParam("IsShowTran");


    if(IsShowTran != "1"){
        toastUtils.showToast("您没有权限给下级充值!");
        return;
    }
     /*if(MYRebate < 1956){
        toastUtils.showToast("您没有权限给下级充值!");
        return;
     }*/

    money = $("#payMoneyID").val();
    var passwd = $("#passwordID").val();
    if (money == "") {
         toastUtils.showToast("金额不能为空!");
        return;
    }else if(parseInt(lotteryMoney)=='0'){
        toastUtils.showToast("您当前彩票余额为零,不可以充值!");
        return;
    }else if (50000 < money || money < 1 ) {
         toastUtils.showToast("金额只能在1-50000!");
        return;
    }else if(parseInt(lotteryMoney) < money){
        toastUtils.showToast("充值金额大于当前账户可用金额，请重新输入!");
        return;
    }
    if (passwd == "") {
        toastUtils.showToast("密码不能为空!");
        return;
    }
    if($("#baizhuID").val() == "others"){
        if($("#beizhuId_").val() ==""){
          toastUtils.showToast("请输入备注信息!");
          return;
        }
        if(getBeizhuLen($("#beizhuId_").val())  > 10){
            toastUtils.showToast("备注信息长度不得超过10个字符!");
          return;
        }else{
          beizhu=$("#beizhuId_").val();
        }
    }else{
        if ($("#baizhuID").val() == "dailyWages"){
            var myUserId = localStorageUtils.getParam("myUserID");
            var userName = jsonUtils.toString(localStorageUtils.getParam("username"));
            var paramDWage = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"DailyWagesTransefer","DailyWages":"' + money + '","UserName":' + userName + ',"UserID":"' + myUserId + '","Password":"' + passwd + '","ToUserName":"' + proxyUserName + '","ToUserID":"' + thisUserID + '"}';
            ajaxUtil.ajaxByAsyncPost(null, paramDWage, AddTransferInfoLotteryTransfer, '正在提交数据中...');
            return;
        }else{
            beizhu=$("#baizhuID").val();
        }
    }
        ajaxUtil.ajaxByAsyncPost(null, '{"ProjectPublic_PlatformCode":2,"InterfaceName":"AddTransferInfo_LotteryTransfer","TransferMoney":"' + money + '","TargetUserID":' + thisUserID + ',"TargetUserName":"' + proxyUserName + '","Password":"' + passwd + '","Mark":"' + beizhu + '"}', AddTransferInfoLotteryTransfer, '正在提交数据中...');
}


//给下级充值回调函数
function AddTransferInfoLotteryTransfer(data) {
    if (data.SystemState==64) {
       if(data.StateResult){
        getUserMoney();
            $("#payMoneyID").val("");
            $("#passwordID").val("");
            $("#beizhuId_").val("");
            toastUtils.showToast("充值成功!");
       }else{
         toastUtils.showToast("充值失败!");
       }
    }else if(data.ErrorState == "-4"){
        toastUtils.showToast("当前用户已被冻结无法进行转账操作!");
    }else if(data.ErrorState == "-5"){
        toastUtils.showToast("资金密码输错次数过多，用户已被冻结!");
    }else if(data.ErrorState == "-6"){
        toastUtils.showToast("您还没有完成与下级的分红契约，无法给下级转账!");
    }else if(data.SystemState == -1){
        loginAgain();
    }else{
        if(data.ErrorState){
            toastUtils.showToast("资金密码错误!");
        }else{
            toastUtils.showToast("当前网络不给力，请稍后再试!");
        }
    }
}

function getUserMoney(){
   ajaxUtil.ajaxByAsyncPost(null,'{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetUserAllMoney"}', GetUserAllMoney_proxy, '正在加载数据...');
}
//金额回调函数
function GetUserAllMoney_proxy(data) {
    if (data.state) {
        var info = data.Context;
        lotteryMoney = data.lotteryMoney;
        localStorageUtils.setParam("lotteryMoney", lotteryMoney);
        if (lotteryMoney != null || typeof (lotteryMoney) != "undefined") {
            $("#lotteryMoney_dl").html(lotteryMoney + "元");
        } else {
            $("#lotteryMoney_dl").html("0.00" + "元");
        }
    }
}

//当备注为其他时显示输入框
function beizhuType(){
    if($("#baizhuID").val() =="others"){
      document.getElementById('beizhuxinxiID').style.display = "";  
      $("#beizhuId_").val("");
    }else{
      document.getElementById('beizhuxinxiID').style.display = "none";  
    }
}
function  getBeizhuLen(str) {  
   var len = 0;
    for (var i=0; i<str.length; i++) { 
     var c = str.charCodeAt(i); 
    //单字节加1 
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
       len++; 
     } 
     else { 
      len+=2; 
     } 
    } 
    return len;
}
//充值输入框验证
function ValidateNumberSub(e, pnumber) {
    if (!/^\d+[.]?\d*$/.test(pnumber)){
        //检测正则是否匹配
        e.value = /^\d+[.]?\d*/.exec(e.value);
    }
    var payMoney = $("#payMoneyID").val();
    var temp=payMoney.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    $("#payMoneyID").val(temp);
    return false;
}