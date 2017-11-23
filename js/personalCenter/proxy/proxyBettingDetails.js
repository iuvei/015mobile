//订单状态：1有效，2已撤单，3已出票8已派奖 小于0 订单异常
var betState = "";
//中奖状态：默认是0未知；1中奖，-1 未中奖
var operateType = "";
//开奖内容
var prizeResult = "";
//彩种ID
var lotteryType = "";
//玩法ID
var ticketType = "";
//订单号
var chaseOrderID = "";
//流水号
var orderID = "";
//期号
var bettingqiHao = "";
//投注时间
var insertTime = "";
//IsHistory 默认false  是否是历史记录
var IsHistory=false;
/********** 进入这个页面时调用  **********/
function proxyBettingDetailsLoadedPanel() {
    catchErrorFun("proxyBettingDetailsInit();");
}

/********** 离开这个页面时调用  **********/
function proxyBettingDetailsUnloadedPanel(){
    
}

/********** 页面init **********/
function proxyBettingDetailsInit(){
    var proxyorderItem = JSON.parse(localStorageUtils.getParam("proxyscheme"));
        chaseOrderID = proxyorderItem.orderId;
        orderID = proxyorderItem.bettingorderID;
        lotteryType = proxyorderItem.lotteryType;
        insertTime = proxyorderItem.tzTime;
        bettingqiHao = proxyorderItem.qiHao;
        searchOrder();
}

//@ 查询订单详情信息
function searchOrder() {
    ajaxUtil.ajaxByAsyncPost(null, '{"InsertTime":"' + insertTime + '","ProjectPublic_PlatformCode":2,"InterfaceName":"GetBetDetailNew","LotteryCode":"' + lotteryType + '","IsHistory":' + IsHistory + ',"OrderID":"' + orderID + '"}', proxyDetailoSuccessCallBack, '正在加载数据...');
}

//@ 查询订单记录回调函数
function proxyDetailoSuccessCallBack(data) {
    var info = data.UserBetInfo;
    var bet = info.Bet;
    var betOrderState = "";

    if (data.SystemState == 64) {
        fanDianMode = info.BetRebate;
        payMode = bet[0].BetMode;
        buyMode = bet[0].BetMode;
        winIsStop = bet[0].BetMode;

        $("#payMode_dl").html(getPayMode(payMode));

        $("#betRebateID_dl").html(fanDianMode);

        if ((Number(winIsStop) & 2) == 2) {
            $("#winIsStop_dl").html("是");
        } else if ((Number(winIsStop) & 4) == 4) {
            $("#winIsStop_dl").html("否");
        } else {
            $("#winIsStop_dl").html("---");
        }

        for (var i = 0; i < bet.length; i++) {
            if (bettingqiHao == bet[i].IssueNumber) {
                $("#orderId_dl").html(chaseOrderID);
                $("#liushuiID_dl").html(orderID);
                $("#qiHao_dl").html(bet[i].IssueNumber);
                $("#tzmoney_dl").html(bet[i].BetMoney + " 元");
                $("#beiShu_dl").html(IsLongHuDou(lotteryType,bet[i].PlayCode) ? "1 倍" : (bet[i].BetMultiple +" 倍"));
                $("#lotteryCodeID_dl").html(LotteryInfo.getLotteryNameById(info.LotteryCode));
                $("#playCodeID_dl").html(LotteryInfo.getPlayMethodName(info.LotteryCode, bet[i].PlayCode, bet[i].BetMode));
                $("#zhuShu_dl").html(bet[i].BetCount+ " 注");
                $("#orderState_dl").html(getOrderState(bet[i].BetOrderState + ""));
                $("#prizeMoney_dl").html(bet[i].AwMoney);
                $("#betContentid_dl").html(tzContentToChinese(lotteryType, bet[i].PlayCode.toString(), bet[i].BetContent));
                $("#payMode_dl").html(IsLongHuDou(lotteryType,bet[i].PlayCode) ? "元模式" : getPayMode(bet[i].BetMode));
                $("#betRebateID_dl").html(IsLongHuDou(lotteryType,bet[i].PlayCode) ? "1800" :info.BetRebate);

                if (bet[i].AwContent == "") {
                    $("#prizeNums_dl").html(0+ " 注");
                } else {
                    $("#prizeNums_dl").html(bet[i].AwContent+ " 注");
                }

                if (bet[i].BetOrderState == '18878464') {
                    $("#prizeMoney_dl").html(bet[i].AwMoney + " 元" );
                } else {
                    $("#prizeMoney_dl").html(bet[i].AwMoney + " 元" );
                }
                $("#prizeResult_dl").html(getPrizeResult(info.LotteryCode,bet[i].DrawContent, bet[i].PlayCode));
            }
        }
    }
}
/**
 * 开奖内容显示处理
 * @param prize 开奖号码
 * @param lotteryCode 玩法ID
 * @return 返回处理好的开奖内容以显示
 */
function getPrizeResult(lotteryCode,prize, play) {
    if (prize == "") {
        return "等待开奖";
    } else {
        if(LotteryInfo.getLotteryTypeById(lotteryCode)=="kl8"){
            var arr = prize.split(",");
            arr = arr.slice(0,20);
            prize = arr.join(",");
            return prize;
        }
        return prize;
    }
}
/**
 *获取订单状态
 * @return 返回订单状态中文 显示
 */
function getOrderState(allOrderState) {

    if ((Number(allOrderState) & 1) == 1) {
        return "购彩成功";
    } else if ((Number(allOrderState) & 33554432) == 33554432) {
        return "未中奖";
    } else if ((Number(allOrderState) & 64) == 64) {
        return "已出票";
    } else if ((Number(allOrderState) & 16777216) == 16777216) {
        return "已派奖";
    } else if ((Number(allOrderState) & 32768) == 32768) {
        return "已撤奖";
    } else if ((Number(allOrderState) & 4096) == 4096) {
        return "已结算";
    } else if ((Number(allOrderState) & 512) == 512) {
        return "强制结算";
    } else if ((Number(allOrderState) & 4) == 4) {
        return "已撤单";
    } else {
        return "订单异常";
    }
}