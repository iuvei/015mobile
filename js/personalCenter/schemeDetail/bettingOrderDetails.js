/* 
* @Author: Administrator
* @Date:   2016-01-24 11:34:27
* @Last Modified by:   Administrator
* @Last Modified time: 2016-01-24 11:38:35
*/
//投注模式
var payMode = "";
//返点模式
var fanDianMode = "";
//购买方式： 正常投注/追号投注
// var buyMode = "";
//中奖后是否追号
var winIsStop = "";
//判断来源是哪个页面：投注/中奖
var sourceFlag = "";
//订单ID计数
var sum = 0;
//彩种名称
var lotteryType = "";
//订单ID
var orderId = "";
//期号
var bettingqiHao="";
//流水号
var bettingorderID="";
//投注时间
var insertTime = "";
//IsHistory 默认false  是否是历史记录
var IsHistory=false;
/**
 * 进入页面调用
 * [bettingOrderDetailsLoadedPanel description]
 * @return {[type]} [description]
 */
function bettingOrderDetailsLoadedPanel(){
   catchErrorFun("bettingOrderDetailsInit();");
}

/**
 * 离开页面调用
 * [bettingOrderDetailsUnloadedPanel description]
 * @return {[type]} [description]
 */
function bettingOrderDetailsUnloadedPanel(){
	$("#cardContent").empty();
	unloadAtBettingDetail = false;
}

/**
 * 初始化
 * [bettingOrderDetails description]
 * @return {[type]} [description]
 */
function bettingOrderDetailsInit(){
	sourceFlag = localStorageUtils.getParam("sourceFlag");
	if(!(IsHistory=localStorageUtils.getParam("IsHistory"))){
		IsHistory=false;
	}
	var bettingItem = JSON.parse(localStorageUtils.getParam("scheme"));
	lotteryType = bettingItem.lotteryType; //彩种
	insertTime = bettingItem.tzTime;  //投注时间
	orderId = bettingItem.orderId;   //订单ID
	bettingorderID = bettingItem.bettingorderID;  //流水号
	bettingqiHao = bettingItem.qiHao;	  //期号
	$("#orderDetails_Id").html(bettingItem.orderId);  //订单号
	$("#bettingorderID").html(bettingItem.bettingorderID);
	$("#datetime").html(bettingItem.tzTime);
	searchOrderbettingOrderDetails(lotteryType, bettingorderID);

	//添加滚动条
	 $("#bettingOrderDetailsPage").scroller({
		verticalScroll : true,
		horizontalScroll : false,
		vScrollCSS: "afScrollbar",
		autoEnable : true
	});
}
/**
 * 查询订单详情信息
 * @param lotteryId 彩种ID
 * @param orderId 订单流水号
 */
function searchOrderbettingOrderDetails(lotteryId, orderId) {
	var params='{"InsertTime":"'+insertTime+'","ProjectPublic_PlatformCode":2,"InterfaceName":"GetBetDetailNew","LotteryCode":"' + lotteryId + '","IsHistory":' + IsHistory + ',"OrderID":"' + orderId + '"}';
	ajaxUtil.ajaxByAsyncPost(null, params, searchSuccessbettingOrderDetailsCallBack, '正在加载数据...');
}

/**
 * Description 查询订单记录回调函数
 * @return data 服务端返数据
 */
function searchSuccessbettingOrderDetailsCallBack(data) {
	$("#orderList").empty();
	$("#orderListCard").empty();
	$("#cardContent").empty();

//**** 标题 ****
	$("#orderListCard").append('<li id="cardTitle" style="text-align: left;font-size:15px;font-weight:100;color:#fff;background:#FFC500;background: linear-gradient(#FF9e00,#FFC500); padding:6px 14px;border-radius: 4px;margin:8px 7px 0;">投 注 详 单</li>');

	if (data.SystemState == 64) {
		var info = data.UserBetInfo;
	    var bet = info.Bet;
		if(bet == ""){
			return;
		}	    
		fanDianMode = info.BetRebate;
		payMode = bet[0].BetMode;
		// buyMode = bet[0].BetMode;
		winIsStop = bet[0].BetMode;

		$("#payMode").html(IsLongHuDou(lotteryType,bet[0].PlayCode) ? "元模式" : getPayMode(payMode));

		$("#fanDian").html(IsLongHuDou(lotteryType,bet[0].PlayCode) ? "1800" : fanDianMode);

		if ((Number(winIsStop) & 2) == 2) {
			$("#winIsStop").html("是");
		} else if ((Number(winIsStop) & 4) == 4) {
			$("#winIsStop").html("否");
		} else {
			$("#winIsStop").html("---");
		}

		for (var i = 0; i < bet.length; i++) {
			var text = "";
			var dataSet = new Object();
			dataSet.lotteryType = info.LotteryCode;
			dataSet.betId = bet[i].ChaseOrderID;
			dataSet.orderId = bet[i].ChaseOrderID;
			dataSet.liushuiorderID = bet[i].OrderID;
			dataSet.qiHao = bet[i].IssueNumber;
			dataSet.money = bet[i].BetMoney;
			dataSet.operateType = bet[i].BetOrderState;
			dataSet.betState = bet[i].BetOrderState;  //订单状态
			dataSet.DrawContent = bet[i].DrawContent;  //开奖号码
			dataSet.prizeNum = bet[i].AwContent; //中奖注数
			dataSet.tzZhuShu = bet[i].BetCount; //投注注数
			dataSet.beiShu = bet[i].BetMultiple;  //倍数

			dataSet.prizeMoney = bet[i].AwMoney;//changeTwoDecimal_f(bet[i].AwMoney); //奖金
			dataSet.tzcontent = bet[i].BetContent; //投注号码
			dataSet.ticketType = bet[i].PlayCode; //玩法ID
			dataSet.isDT = bet[i].BetMode;
			dataSet.BetCount = bet[i].BetCount;

			if(bettingqiHao==dataSet.qiHao){
			var listitem = JSON.stringify(dataSet);
			sum++;
			localStorageUtils.setParam("order" + sum, listitem);
				var liId="order"+sum;
			var $itemdetailLi = $('<li id='+liId+'></li>').data('itemdetailLi',dataSet);
				$itemdetailLi.on('click',function() {
					localStorageUtils.setParam("orderIndex",JSON.stringify($(this).data('itemdetailLi')));
					setPanelBackPage_Fun('bettingDetil');
				});

			   var $delete_;
			   var operateType_='';
			   if((Number(dataSet.betState) & 1048577) == 1048577){
                   $delete_=$('<div  class="loginBtn" style="border-radius:3px; margin-top:20px; margin-bottom:20px;" id='+dataSet.liushuiorderID+' onclick="createInitPanel(this);">撤单</div>');
                   operateType_='<span class="perOrderState">购买成功</span>';
			   }else{
				   	if ((Number(dataSet.operateType) & 1) == 1) {
						operateType_='<span class="perOrderState">购买成功</span>';
					} else if ((Number(dataSet.operateType) & 32768) == 32768) {
						operateType_='<span class="perOrderState">已撤奖</span>';
					} else if ((Number(dataSet.operateType) & 64) == 64) {
						operateType_='<span class="perOrderState">已出票</span>';
					} else if ((Number(dataSet.operateType) & 16777216) == 16777216) {
						operateType_='<span class="perOrderState">已派奖</span>';
					} else if ((Number(dataSet.operateType) & 33554432) == 33554432) {
						operateType_='<span class="perOrderState">未中奖</span>';
					} else if ((Number(dataSet.operateType) & 4096) == 4096) {
						operateType_='<span class="perOrderState">已结算</span>';
					} else if ((Number(dataSet.operateType) & 512) == 512) {
						operateType_='<span class="perOrderState">强制结算</span>';
					} else if ((Number(dataSet.operateType) & 4) == 4) {
						operateType_='<span class="perOrderState">已撤单</span>';
					} else {
						operateType_='<span class="perOrderState">订单异常</span>';
					}
			   }

//*******  contentDetails Start ***********
				var $contentDetails=$('<ul class="mylist"><li>投注期号 : <span id="qiHao">'+bettingqiHao+
				'</span></li><li>彩&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 种：<span id="lotteryCodeID">'+LotteryInfo.getLotteryNameById(lotteryType + "")+
				'</span></li><li>玩&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 法：<span id="playCodeID">'+LotteryInfo.getPlayMethodName(lotteryType + "", dataSet.ticketType + "",dataSet.isDT)+
				'</span></li><li>购彩金额：<span id="tzmoney">'+dataSet.money+' 元'+
				'</span></li><li>投注倍数：<span id="beiShu">'+ (IsLongHuDou(lotteryType,dataSet.ticketType)?1:dataSet.beiShu) +
				' 倍</span></li><li>投注注数：<span id="betCount">'+dataSet.tzZhuShu+
				' 注</span></li><li>订单状态：<span id="orderState">'+getOrderState(dataSet.betState)+
				'</span></li><li>中奖注数：<span id="prizeNums" style="white-space:pre-wrap;table-layout:fixed; word-break : break-all; word-wrap : break-word ;">'+prizeNum(dataSet.prizeNum)+
				' 注</span></li><li>奖&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：<span id="prizeMoney">'+dataSet.prizeMoney+' 元'+
				'</span></li><li style="display: inline-block;word-break: break-all;word-wrap:break-word;white-space:normal;">开奖号码：<span id="prizeResult" >'+getPrizeResults(dataSet,lotteryType)+
				'</span></li><li style="word-break: break-all;word-wrap:break-word;white-space:normal;">投注号码：<span id="betContent">'+tzContentToChinese(lotteryType,dataSet.ticketType+"", dataSet.tzcontent+"")+'</span></li></ul>');

//*******  contentDetails End ********

				$("#cardContent").append($contentDetails); // Now
				$("#orderList").append($delete_);//撤单
		  }
	  }
	} else if (data.SystemState == -1) {
		loginAgain();
	} else {
		toastUtils.showToast("当前网络不给力，请稍后再试");
	}
}

//调用--撤掉单条记录回调函数
function createInitPanel(id){
	deleteOrderByOrderId(id);
	event.stopPropagation();
}

/**
 * Description 撤掉单条记录回调函数
 * @return data 服务端返数据
 */
function deleteOrderByOrderId(id) {
  	 var params = '{"InterfaceName":"CancelOrder","ProjectPublic_PlatformCode":2,"Code":"' + lotteryType + '","OrderID":"' + id.id + '"}';
	ajaxUtil.ajaxByAsyncPost(null, params, function(data){
			if (data.SystemState == 64) {
				if (data.CarryStateResult) {
					toastUtils.showToast("撤单成功");
					searchOrderbettingOrderDetails(lotteryType, bettingorderID);
				} else if(data.OrderState == -1){
					toastUtils.showToast("该期已封单，不能撤单！");
				} else {
					toastUtils.showToast("撤单失败");
				}
			} else if (data.SystemState == -1) {
				loginAgain();
			} else {
		        toastUtils.showToast("当前网络不给力，请稍后再试");
			}
	}, '正在加载数据...');   
}

/***** Function for contentDetails *****
** 中奖注数
*/
function prizeNum(num){
	if (num=="") {
		return '0';
	} else {
		return num;
	}
}

// 时时彩的龙虎斗,骰宝，只显示1倍，只显示元模式,返点1800；其他玩法倍数、模式正常显示。
function IsLongHuDou(lotteryId, playId) {
	lotteryId = lotteryId.toString();
	playId = playId.toString();
	var methodId = playId.replace(lotteryId,'');
	var longHuDou = ['109','110','111','112','113','114','115','116','117','118'];
	if ((LotteryInfo.getLotteryTypeById(lotteryId) == "ssc" && $.inArray(methodId,longHuDou) != -1) || LotteryInfo.getLotteryTypeById(lotteryId) == 'tb'){
		return true;
	}else{
		return false;
	}
}
