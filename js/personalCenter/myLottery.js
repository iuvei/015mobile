/**
 *页面初始化
 */
function myLotteryLoadedPanel() {
    catchErrorFun("myLottery_init();");
}
//离开页面时
function myLotteryUnloadedPanel() {
     flag = 6;
    $("#testAccount").remove();
}

var hms00=" 00:00:00";
var hms59=" 23:59:59";
var page = 1;
var hasMorePage = true;//默认还有分页
//用户名
var userName="";
//彩票余额
var lotteryMoney = '0';
//钱包中心余额
var walletMoney = '0';
var temp = "0";
var flag = 6;
var isAgent=false;
var userRechargeTypeList=new Array();
var IsTestAccount;
//三个月前+1天
var DayRange_3month = parseInt((new Date(initDefaultDate(-1,'day')) - new Date(initDefaultDate(-3,'month'))+1)/(24*60*60*1000));
var DayRange_1month3day = parseInt((new Date(initDefaultDate(3,'day')) - new Date(initDefaultDate(-1,'month')))/(24*60*60*1000)); //zhuiHao

//@ 入口函数
function myLottery_init(){
    userName = localStorageUtils.getParam("username");
    //契约分红 和 契约日工资
    var IsDaywages = localStorageUtils.getParam("IsDayWages");
    var IsContract = localStorageUtils.getParam("IsContract");

    if ((IsDaywages == "false" && IsContract == "false")||(IsContract == null && IsDaywages == null)){
    // if ( IsDaywages == "false" || IsDaywages == null ){
        $("#showContractManage").hide();
    }else {
        $("#showContractManage").show();
    }

        //获取金额
    ajaxUtil.ajaxByAsyncPost(null,'{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetUserAllMoney"}',function(data){
            if (data.state) {
                var info = data.Context;
                lotteryMoney = data.lotteryMoney;
                walletLockMoney = data.freezeMoney;
                localStorageUtils.setParam("lotteryMoney",parseFloat(lotteryMoney));
                localStorageUtils.setParam("walletLockMoney", parseFloat(walletLockMoney));

                // $("#username_top").html(userName);
                $("#lotteryMoney_top").html(parseFloat(lotteryMoney));
                $("#walletLockMoney").html(parseFloat(walletLockMoney));
           }else if (data.SystemState == "-1" || data == -666) {
                loginAgain();
                return;
            } else {
                toastUtils.showToast("当前网络不给力，请稍后再试");
                localStorageUtils.setParam("lotteryMoney", "0.00");
                $("#lotteryMoney").html("0.00");
            }

            //充值
            $("#my_rechargeId").off('click');
            $("#my_rechargeId").on('click', function() {
                flag = 1;
                CheckPayOutPwdAndTransferPwdloaded();
            });

            //提款
            $("#my_withdrawId").off('click');
            $("#my_withdrawId").on('click', function() {        
                flag = 2;
                CheckPayOutPwdAndTransferPwdloaded();
            });

            //转账
            $("#my_transferId").off('click');
            $("#my_transferId").on('click', function() {
                flag = 4;
                CheckPayOutPwdAndTransferPwdloaded();
            });
            //棋牌
            $("#gameId").off('click');
            $("#gameId").on('click', function() {
                flag = 5;
                createInitPanel_Fun('gameReport');
            });

        },'正在加载数据');

       //获取用户信息
    ajaxUtil.ajaxByAsyncPost(null,'{"ProjectPublic_PlatformCode":2,"UserName":"' + userName + '","InterfaceName":"GetUserDetailNew"}',function(data){
                    if (data.SystemState == "64") {
                        var realName = data.UserRealName;
                        var userEmail = data.EMail;
                        var userQQ = data.QQ;
                        var userPhone = data.Mobile;
                        var userBank = data.BankCode;
                        var userBankNo = data.CardNumber;
                        var userFandian = data.QARebate;
                        var userProv = data.Province;
                        var userCity = data.City;
                        var userLevel = data.UserLevel;
                        var childCount = data.ChildCount;
                        var teamMemberCount = data.TeamMemberCount;
                        var myUserID = data.MyUserID;
                        var headPortrait = data.HeadPortrait;  //头像
                        var NickName = data.NickName;
                        isAgent = data.IsAgent;
                        IsTestAccount = data.UserType;  //0为正式账户，1为试玩账户

                        // 昵称
                        if (NickName){
                            $("#username_top").html(NickName);
                        }else{
                            $("#username_top").html(userName);  //用户名
                        }
                        $("#modifyNickName").off('click');
                        $("#modifyNickName").on('click',function () {
                            modifyNickName(NickName);
                        });

                        //试玩账户
                        var NickWidth = $("#username_top").css("width");
                        if (IsTestAccount) {
                            if ($("#testAccount")){ $("#testAccount").remove(); }
                            $("#username_top").parent('p').append('<span id="testAccount" style="position: relative;left:'+NickWidth+';color: #eb1d35;">(试玩)</span>');
                        }

                        //棋牌游戏和转账
                        var _mode = localStorageUtils.getParam("Mode");
                        if ((_mode & 32) != 32 || IsTestAccount == 1) {
                            $("#my_transferId").hide();
                            $("#myLotteryTop").children('a').css('width',"50%");
                            $("#IsShowTransfer").hide();
                            $("#gameId").parent('li').hide();
                        }else{
                            $("#my_transferId").show();
                            $("#myLotteryTop").children('a').css('width',"33%");
                            $("#IsShowTransfer").show();
                            $("#gameId").parent('li').show();
                        }

                        //头像
                        $("#headPortrait").empty();
                        if (!headPortrait){
                            headPortrait = 1;
                        }
                        $("#headPortrait").append('<img src="././images/headIcons/show_'+headPortrait+'.png" style="width: 70px;height: 70px;"/>');

                        localStorageUtils.setParam("MYRebate", data.MyRebate);
                        localStorageUtils.setParam("IsShowTran", data.IsShowTran);
                        localStorageUtils.setParam("username", data.UserName);
                        localStorageUtils.setParam("realName", realName);
                        localStorageUtils.setParam("myUserID", myUserID);
                        localStorageUtils.setParam("userEmail", userEmail);
                        localStorageUtils.setParam("userQQ", userQQ);
                        localStorageUtils.setParam("userPhone", userPhone);
                        localStorageUtils.setParam("userBank", userBank);
                        localStorageUtils.setParam("userBankNo", userBankNo);
                        localStorageUtils.setParam("userFandian", userFandian);
                        localStorageUtils.setParam("userProv", userProv);
                        localStorageUtils.setParam("userCity", userCity);
                        localStorageUtils.setParam("userLevel", userLevel);
                        localStorageUtils.setParam("childCount", childCount);
                        localStorageUtils.setParam("teamMemberCount", teamMemberCount);
                        localStorageUtils.setParam("headPorNow",headPortrait);
                        localStorageUtils.setParam("drawMinMoney",data.DrawMinMoney);
                        localStorageUtils.setParam("drawMaxMoney",data.DrawMaxMoney);
                        localStorageUtils.setParam("drawBeginTime",data.DrawBeginTime);
                        localStorageUtils.setParam("drawEndTime",data.DrawEndTime);
                        localStorageUtils.setParam("UserLevel",data.UserLevel);
                    } else if (data.SystemState == "-1") {
                        loginAgain();
                    } else {
                         toastUtils.showToast('当前网络不给力，请稍后再试');
                    }
        },'正在加载数据');

    //获取充值银行信息
    ajaxUtil.ajaxByAsyncPost(null,'{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetUserGroupPaymentNew"}',getUserPayment_callBack,'正在加载数据');

   CheckPayOutPwdAndTransferPwdloaded();

    //代理管理
    $("#proxyId").off('click');
    $("#proxyId").on('click', function() {       
        flag = 3;
        CheckPayOutPwdAndTransferPwdloaded();
    });

    //@ 退出登录
    $("#destroyLogin").off('click');
    $("#destroyLogin").on('click', function() {
        $.ui.actionsheet(
            [{
                text: '您确定要退出吗?',
                cssClasses: '',
                handler: function () {
                }
            }, {
                text: '确定',
                cssClasses: 'themeColor',
                handler: function () {
                    var params='{"ProjectPublic_PlatformCode":2,"LoginType":1,"InterfaceName":"AddUserLoginLog"}';
                    ajaxUtil.ajaxByAsyncPost(null,params,function(data){
                        log.v(data);
                         if (data.SystemState == 64) {
                             toastUtils.showToast('登出成功');
                             var username = localStorageUtils.getParam("LoginUsername");
                             var password = localStorageUtils.getParam("LoginPasswd");
                             window.localStorage.clear();
                             localStorageUtils.setParam("LoginUsername",username);
                             localStorageUtils.setParam("LoginPasswd",password);
                             localStorageUtils.setParam("isLogin","false");
                             createInitPanel_Fun("lotteryHallPage");
                         }
                    },'正在登出...');
                }
            }]
        );
    });

    //@ 站内信 stationEmail
    getStationEmailCount();
    $("#stationEmail").off('click');
    $("#stationEmail").on('click', function() {
        createInitPanel_Fun("EmailLists");
    });
}

//@ 充值信息返回数据
function getUserPayment_callBack(data) {
    if (data.SystemState == "64") {
        var payInType = data.payInType;   //已选
        var allRecType = data.allRecType;  //All
        var test=[];
        userRechargeTypeList=[];
        localStorageUtils.removeParam("userRechargeTypeList");

        //手机端允许显示的支付方式
        if(payInType != null){
            for (var i=0; i < payInType.length; i++) {
                if(rechargeID.hasOwnProperty(payInType[i].id) && rechargeID[payInType[i].id]['IsMobile']){
                    var obj= {};
                    userRechargeTypeList.push(payInType[i].id);
                    obj.id=payInType[i].id;
                    obj.maxRecMoney=payInType[i].maxRecMoney;
                    obj.minRecMoney=payInType[i].minRecMoney;
                    test.push(obj);
                }
            }
        }
        var listitem = JSON.stringify(test);
        localStorageUtils.setParam("userRechargeTypeList", listitem);
        localStorageUtils.setParam("payInType", payInType);  // 已选
        localStorageUtils.setParam("allRecType",jsonUtils.toString(allRecType));  // All
    }
}

//检测用户支付密码是否填写完毕
function CheckPayOutPwdAndTransferPwdloaded() {
    var param = '{"ProjectPublic_PlatformCode":2,"UserName":"' + userName + '","InterfaceName":"CheckPayOutPwdAndTransferPwd"}';
    ajaxUtil.ajaxByAsyncPost1(null, param, successCallBack_CheckPayOutPwdAndTransferPwd,null);
}

//查询是否有提款密码
function successCallBack_CheckPayOutPwdAndTransferPwd(data) {
    if (data.Result == "1") {
        var context = data.Context;
        temp = context[0].PayOutPassWord;
        // temp == 1:有资金密码
        if (temp == "1") {
            if (0 == flag) {
                $.mobile.changePage("myWalletCenter.html", {
                    transition : "none"
                });
            } else if (1 == flag) {  //充值
                //判断后台选择的银行，当有一个或多个被选中时，方可进入充值模块，否则else提示
                if (IsTestAccount){
                    toastUtils.showToast("试玩账户不能充值");
                }else{
                    if(userRechargeTypeList.length > 0){
                        createInitPanel_Fun('charge');
                    }else{
                        toastUtils.showToast("手机客户端暂不支持充值功能，请用电脑登录网页进行充值");
                        return;
                    }
                }
            } else if (2 == flag) {  //提款
                if (IsTestAccount){
                    toastUtils.showToast("试玩账户不能提款");
                }else{
                    if (localStorageUtils.getParam("realName") == "" || localStorageUtils.getParam("userBank") == ""){
                        toastUtils.showToast('请完善银行卡资料');
                    }else {
                        createInitPanel_Fun('withdrawal');
                    }
                }
            }else if(3 == flag){  //代理
                if(isAgent){
                    createInitPanel_Fun('proxyManage');
                    }else{
                        toastUtils.showToast("你不是代理用户,没有权限操作此功能");
                      }
            }else if (4 == flag) {  //转账
                if (IsTestAccount){
                    toastUtils.showToast("试玩账户不能转账");
                }else{
                    createInitPanel_Fun('transfer');
                }
            }
        } else {
            // 充值和代理无需绑定银行卡和资金密码，亦可点击进入页面
            if (1 == flag) {
                //判断后台选择的银行，当有一个或多个被选中时，方可进入充值模块，否则else提示
                if (IsTestAccount){
                    toastUtils.showToast("试玩账户不能充值");
                }else{
                    if(userRechargeTypeList.length > 0){
                        createInitPanel_Fun('charge');
                    }else{
                        toastUtils.showToast("手机客户端暂不支持充值功能，请用电脑登录网页进行充值");
                        return;
                    }
                }
            }else if(3 == flag){
                if(isAgent){
                    createInitPanel_Fun('proxyManage');
                }else{
                    toastUtils.showToast("你不是代理用户,没有权限操作此功能");
                }
            }else if(2 == flag){
                if (IsTestAccount){
                    toastUtils.showToast("试玩账户不能提款");
                }else{
                    toastUtils.showToast("请完善银行资料并设置资金密码");
                }
            }else if(4 == flag){
                if (IsTestAccount){
                    toastUtils.showToast("试玩账户不能转账");
                }else{
                    toastUtils.showToast("请设置资金密码");
                }
            }
        }
        localStorageUtils.setParam("isHasPayPwd", context[0].PayOutPassWord);
    } else if (data.Result == "-1") {
        loginAgain();
    }else if (data.SystemState=="-1"){
        toastUtils.showToast("请重新登录");
    } else {
        toastUtils.showToast("当前网络不给力，请稍后再试");
    }
}

//@ 读取站内信 未读的数量
function getStationEmailCount() {
    myUserID = localStorageUtils.getParam("myUserID");
    var param = '{"ProjectPublic_PlatformCode":2,"UserID":'+ myUserID +',"InterfaceName":"GetStationEmailCount"}';
    ajaxUtil.ajaxByAsyncPost1(null, param, function (data) {
       if (data.SystemState == 64){
           var count = data.Count;
           if (count > 0){
               $("#EmailUnreadCount").attr('class','showUnreadCount');
           }else{
               $("#EmailUnreadCount").removeAttr('class');
           }
       }
    },null);
}

//@ 修改昵称
function modifyNickName(NickName) {
    NickName = NickName ? NickName : userName;

    setTimeout(function () {
        $.ui.popup({
            title:"修改昵称",
            message:'<p style="text-align: left;padding-left: 16px;">用户名：<span>'+userName+'</span></p><p>昵称：<input style="width:76%;" type="text" id="modifyNick" maxLength="25" minlength="4" onkeyup="this.value=limitLength(this,25)" onblur="this.value=limitLength(this,25)" placeholder="'+ NickName +'" /></p>',
            cancelText:"关闭",
            cancelCallback:
                function(){
                },
            doneText:"确定",
            doneCallback:
                function(){
                    var Nick = $("#modifyNick").val();
                    if(Nick == ""){
                        toastUtils.showToast("请输入昵称");
                        return;
                    }else{
                        if(Nick.length < 4 || Nick.length > 25){
                            toastUtils.showToast("请输入4 - 25个字符");
                            return;
                        }else if(/[\':;*?~`!@#$%^&+={}\[\]\<\>\(\),\.]/.test(Nick)){
                            toastUtils.showToast("只能由汉字、字母、数字中的任意一种或多种组成");
                            return;
                        }
                    }
                    var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"ModifyUserInfo","IsShow":0,"NickName":"'+Nick+'","Type":1}';
                    ajaxUtil.ajaxByAsyncPost1(null, param, function (data) {
                        if (data.SystemState == 64) {
                            if (data.ModifyComplete) {
                                toastUtils.showToast("修改成功");
                                $("#username_top").html(Nick);
                            }else if(data.Result == -1) {
                                toastUtils.showToast("此昵称已存在");
                            }else {
                                toastUtils.showToast("修改失败，稍候请重试");
                            }
                        } else if (data.SystemState == 32) {
                            toastUtils.showToast("修改失败，请检查数据");
                        } else {
                            toastUtils.showToast("当前网络不给力，请稍后再试");
                        }
                    },null);
                },
            cancelOnly:false
        });
    },350);
}