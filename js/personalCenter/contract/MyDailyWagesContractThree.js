
var myUserName;
var myUserID;

/*进入panel时调用*/
function MyDailyWagesContractThreeLoadedPanel(){
    catchErrorFun("MyDailyWagesContractThreeInit();");
}

/*离开panel时调用*/
function MyDailyWagesContractThreeUnloadedPanel(){
    $("#myDailyWages_notModify").empty();
    $("#myDailyWages_Modified").empty();
    $("#edit_time").empty();
}

function MyDailyWagesContractThreeInit() {
    myUserID = localStorageUtils.getParam("myUserID");
    myUserName = localStorageUtils.getParam("username");
    ajaxUtil.ajaxByAsyncPost1(null,'{"InterfaceName":"InitDayWagesThreeData","ProjectPublic_PlatformCode":2,"UserID":"'+ myUserID +'"}', function (data) {

        if (data.SystemState == 64){

            var myOldData = data.Before_DayWagesRules;  //列表数据
            var myNewData = data.After_DayWagesRules;
            var initDailyWages = data.InitDayWagesRules;

            //@ 修改前
            $("#myDailyWages_notModify").append('<ul class="recordDetail my-daywage-ctt-three"><li><span>日工资标准</span><span>销量</span><span>活跃人数</span></li></ul>');
            if (myOldData.length > 0){
                $.each(myOldData,function (key,val) {
                    var $oldItem = $('<li><span>'+ val.DayWageStandard +
                        '</span><span>'+val.DaySales+'</span><span>'+val.ActiveNumber+' </span></li>');
                    $("#myDailyWages_notModify ul").append($oldItem);
                });
            }else {
                var noOldItem = $('<li><span>无数据</span><span>无数据</span><span>无数据</span></li>');
                $("#myDailyWages_notModify ul").append(noOldItem);
            }

            //@ 修改后
            $("#myDailyWages_Modified").append('<ul class="recordDetail my-daywage-ctt-three"><li><span>日工资标准</span><span>销量</span><span>活跃人数</span></li></ul>');
            $("#myDailyWages_Modified").parent('div').show();  //显示修改后数据
            $("#dailyWageRules").hide();  //隐藏日工资规则

            if (myNewData.length > 0){
                $("#edit_time").append('修改时间：'+data.EditTime);
                $.each(myNewData,function (key,val) {
                    var $newItem = $('<li><span>'+ val.DayWageStandard +
                        '</span><span>'+val.DaySales+'</span><span>'+val.ActiveNumber+'</span></li>');
                    $("#myDailyWages_Modified ul").append($newItem);
                });
                $("#myDailyWages_Modified").append('<a class="loginBtn" style="margin-top:40px;" onclick="AgreeMyDailyWages(1)">同意</a>');

            }else {
                $("#myDailyWages_Modified").parent('div').hide();  //隐藏修改后数据

                $("#dailyWageRules").show();  //显示日工资规则
                $("#dailyWageRules").empty();
                var $title = '<h3 style="text-align: center;margin:10px 0 -6px;">日工资规则</h3>',
                    $table = showDailyWageRules(myOldData[0].DayWagesProportion, initDailyWages),
                    $hint = '<h4 class="hintText">1. 当日投注量大于500元为活跃用户;</h4><h4 class="hintText">2. 如果没有达到签约档次，会自动找低一档匹配.</h4>';
                $("#dailyWageRules").append($title).append($table).append($hint);
            }

        }else if(data.SystemState == -1){
            loginAgain();
        }else {
            toastUtils.showToast("当前网络不给力，请稍后再试");
        }
    }, '正在加载数据...');
}

//@ 日工资 同意 按钮
function AgreeMyDailyWages(IsAgree) {
    ajaxUtil.ajaxByAsyncPost1(null, '{"InterfaceName":"AgreeDayWagesThree","ProjectPublic_PlatformCode":2,"IsAgree":'+ IsAgree +',"UserName":"'+ myUserName +'","UserID":'+ myUserID +'}', function (data) {

        if (data.Result){
            toastUtils.showToast("您已同意日工资契约");
            $("#myDailyWages_Modified a").css('display',"none");
            setPanelBackPage_Fun("contractManage");
        }else {
            toastUtils.showToast("同意失败，请稍后再试");
        }

    }, '正在加载数据...');
}

//@ 加载日工资标准_表格显示
function showDailyWageRules(myDailyWages,initDailyWages) {
    //表头
    var $RulesUl = $('<ul class="recordDetail my-daywage-ctt-three"><li><span> 日工资标准 </span><span> 销量 </span><span> 活跃人数 </span></li></ul>');

    if (initDailyWages.length > 0){
        for(var i = 0; i < initDailyWages.length; i++){
            if(Number(myDailyWages) >= initDailyWages[i].DayWagesProportion){
                var $LiMine = $('<li><span>'+ initDailyWages[i].DayWageStandard +'</span><span>'+initDailyWages[i].DaySales+'</span><span>'+initDailyWages[i].ActiveNumber+'</span></li>');
                $RulesUl.append( $LiMine);
            }
        }
        return $RulesUl;
    }
}