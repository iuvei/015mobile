
/*进入panel时调用*/
function teamGameReportSubordinateDetailLoadedPanel(){
    catchErrorFun("teamGameReportSubordinateDetailInit();");
}
/*离开panel时调用*/
function teamGameReportSubordinateDetailUnloadedPanel(){
    $("#teamGameReportSubordinateDetailUlId").empty();
}
function teamGameReportSubordinateDetailInit(){
    $("#teamGameReportSubordinateDetailUlId").empty();
    var $SubordinateDetailUl=$('<ul class="recordDetail"><li>用户名：<span id="grd_username"></span></li><li>类 型：<span id="grd_type"></span></li><li>投注金额：<span id="grd_cost"></span></li> <li>中奖金额：<span id="grd_get"></span></li><li>房 费：<span id="grd_room_fee"></span></li><li>对战类盈亏：<span id="grd_playIncome"></span></li><li>电子类盈亏：<span id="grd_systemIncome"></span></li></ul>');
    $("#teamGameReportSubordinateDetailUlId").append($SubordinateDetailUl);
    var teamGameReportSubordinate = JSON.parse(localStorageUtils.getParam("teamGameReportSubordinate"));

    if(parseInt(teamGameReportSubordinate.ChildNum) > 0){
        $("#teamGameReportSubordinateDetail_back").show();
    }else{
        $("#teamGameReportSubordinateDetail_back").hide();
    }

    var subordinateId = teamGameReportSubordinate.userId;
    $("#grd_username").html(teamGameReportSubordinate.userName);
    $("#grd_type").html(teamGameReportSubordinate.category);

    $("#grd_cost").html(Number(teamGameReportSubordinate.GamePay.toFixed(3).slice(0,-1)));
    $("#grd_get").html(Number(teamGameReportSubordinate.GameGet.toFixed(3).slice(0,-1)));
    $("#grd_room_fee").html(Number(teamGameReportSubordinate.RoomFee.toFixed(3).slice(0,-1)));
    $("#grd_playIncome").html(Number(teamGameReportSubordinate.PlayIncome.toFixed(3).slice(0,-1)));
    $("#grd_systemIncome").html(Number(teamGameReportSubordinate.SystemIncome.toFixed(3).slice(0,-1)));

    $("#teamGameReportSubordinateDetail_back").unbind('click');
    $("#teamGameReportSubordinateDetail_back").bind('click', function(event) {
        localStorageUtils.setParam("gameSubordinateId", subordinateId);
        setPanelBackPage_Fun('teamGameReportSubordinate');
    });

}