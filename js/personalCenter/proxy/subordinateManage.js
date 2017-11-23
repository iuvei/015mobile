
/*离开panel时调用*/
function subordinateManageUnloadedPanel(){
}

/*进入panel时调用*/
function subordinateManageLoadedPanel(){
    catchErrorFun("subordinateManageInit();");
}

/*入口函数*/
function subordinateManageInit() {
    clearSearchTerm("sub");
    var proxyMemberInfo = jsonUtils.toObject(localStorageUtils.getParam("proxyMember"));
    var proxyUsername = proxyMemberInfo.username;
    localStorageUtils.setParam("subordinateName",proxyUsername);// 日工资
    localStorageUtils.setParam("proxyUserName", proxyMemberInfo.username); //下级充值
    localStorageUtils.setParam("proxyUserId", proxyMemberInfo.userId);
    localStorageUtils.setParam("proxyparentID", proxyMemberInfo.parentID);
    ajaxUtil.ajaxByAsyncPost(null, '{"UserName":"'+proxyUsername+'","InterfaceName":"ShowDailyWagesSetting","ProjectPublic_PlatformCode":2}', getDailywages, '正在提交数据中...');

    // 没有资金密码时，无法给下级充值
    $("#chargeForProxy").off('click');
    $("#chargeForProxy").on('click', function(){
        if(localStorageUtils.getParam("isHasPayPwd") == "0"){
            toastUtils.showToast("请设置资金密码");
        } else {
            createInitPanel_Fun('proxyCharge');
        }
    });
}

/*获取日工资信息，并返回数据*/
function getDailywages(data) {
    if (data.SystemState == 64) {
        if (data.ShowDailyWages){
            // $("#IsShowDailywages").show();
            var MySettlementRatio = data.MySettlementRatio;  //自身日工资比例
            var LowerLevelSettlementRatio = data.LowerLevelSettlementRatio;  //直属下级日工资比例
            var LowerLevelState = data.LowerLevelState;  //直属下级日工资状态 1开启 0关闭
            localStorageUtils.setParam("myDailywages",MySettlementRatio);
            localStorageUtils.setParam("subordinateBili",LowerLevelSettlementRatio);
            localStorageUtils.setParam("dailywagesState",LowerLevelState);
        }else{
            $("#IsShowDailywages").hide();
        }
    } else {
        $("#IsShowDailywages").hide();
        toastUtils.showToast("网络不给力，请稍后再试");
    }
}