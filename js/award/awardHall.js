/* 
* @Author: Administrator
* @Date:   2015-02-08 11:13:06
* @Last Modified by:   Administrator
* @Last Modified time: 2015-03-31 11:11:40
*/
var merchantCode;
/*进入panel时调用*/
function awardHallPageLoadedPanel(){
	catchErrorFun("awardHallPageInit();");
}
/*离开panel时调用*/
function awardHallPageUnloadedPanel(){
	$("#awardList").empty();
}
function awardHallPageInit(){
	$("#awardList").empty();
	 merchantCode = localStorageUtils.getParam("MerchantCode");
	var awardScroller = $("#awardHallPage").scroller({
		verticalScroll : true,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
	});
    useawardScroller(awardScroller);
	getff();
}
function useawardScroller(myScroller){
	//Scroller add下拉刷新
    myScroller.addPullToRefresh();
	var hideClose;

	$.unbind(myScroller, "refresh-release");
	$.bind(myScroller, "refresh-release", function () {
		$("#awardList").empty();
	    var that = this;
	    clearTimeout(hideClose);
	    hideClose = setTimeout(function () {
			getff();
	        that.hideRefresh();
	    }, 2000);
	    return false; //tells it to not auto-cancel the refresh
	});
	//滚动过去，下拉将不再起作用！手动取消拉动刷新
	$.unbind(myScroller, "refresh-cancel");
	$.bind(myScroller, "refresh-cancel", function () {
	    clearTimeout(hideClose);
	});
	myScroller.enable();
}

function getff(){
    // var lotteryId = localStorageUtils.getParam("prizeLottery");
	var lotteryIdFC = localStorageUtils.getParam("FCLottery");
	var lotteryMmc=localStorageUtils.getParam("MmcLottery");
	var fc=lotteryIdFC.split(",");
	//需要显示的彩种
	var arr=localStorageUtils.getParam("saleLottery").split(",");
	var lotteryId = [];
	for (var i = 0; i < IndexLottery.length;i++) {
		var len = IndexLottery[i].lottery.length;
		for (var z = 0; z < len; z++) {
			if ($.inArray(IndexLottery[i].lottery[z], arr) >= 0) {
				lotteryId.push(IndexLottery[i].lottery[z]);
			}
		}
	}
	getData(lotteryId,fc);

	if(lotteryMmc == "50"){
		getLotteryMmc();
	}
}

function getData(id,fc){
	 ajaxUtil.ajaxByAsyncPost1(null, '{"IsSelf":false,"ProjectPublic_PlatformCode":2,"reType":3,"InterfaceName":"GetHisNumber","CZID":"' +  id + '"}',successCallBack_award1, '正在加载数据...'); }

//获取竞速竞速秒秒彩开奖
function getLotteryMmc(){
	var datetime = new Date();
	var endTime = new Date();
	datetime.setHours(0, 0, 0);
	endTime.setHours(23, 59, 59);
	datetime.setDate(datetime.getDate() - 3);
    var  startDateTime = datetime.Format("yyyy/MM/dd hh:mm:ss");
    var  endDateTime = endTime.Format("yyyy/MM/dd hh:mm:ss");
    ajaxUtil.ajaxByAsyncPost(null,'{"InterfaceName":"GetLotteryDrawPageFlx","CurrentPageSize":5,"LotteryCode":"50","BeginTime":"' + startDateTime + '","ProjectPublic_PlatformCode":2,"EndTime":"' + endDateTime + '","CurrentPageIndex":0}',successCallBack_award3, '正在加载数据...');
}

function successCallBack_award1(data){
   if (data == null || data == "" || data.length == 0 || typeof(data) == "undefined") {
   	    toastUtils.showToast("当前没有可用数据!");
		return;
	}
	if(data.SystemState == -1){
			loginAgain();
	}
	$.each(data, function(key, val) {
		var $li = $("<li></li>");
		$li.bind('click', function(event) {
			localStorageUtils.setParam("historyLottery",val.CzType);
			localStorageUtils.setParam("historyBack","awardHall");
			createInitPanel_Fun('awardHistory',true);
		});
		var $a = $('<a></a>');
		$a.append('<h3 class="subTitle"><b>'+ LotteryInfo.getLotteryNameById(val.CzType) +'</b><span class="marL6 gray">第'+val.CzPeriod+'期</span></h3>');
		var $ul = $("<ul class='ResultNew marL10'></ul>");

		var _resultS = val.CzNum;
		var _resultA = _resultS.split(",");
		if(LotteryInfo.getLotteryTypeById(val.CzType) == 'kl8'){
			_resultA = _resultA.slice(0,20);  //The first 20.
		}
		for(var i = 0; i < _resultA.length; i++){
			$ul.append('<li>' + _resultA[i] + "</li>");
		}
		var $span = $("<span class='btnRight'></span>");
		var $img = $("<img src="+LotteryInfo.getLotteryLogoById(val.CzType)+">"); //Logo src
		var $table=$("<table></table>");
		var $tr=$("<tr></tr>");
		var $td1=$("<td></td>");
		var $td2=$("<td></td>");
		$a.append($ul);
		$td1.append($img);
		$td2.append($a);
		$tr.append($td1);
		$tr.append($td2);
		$table.append($tr);
		$li.append($table);
		$("#awardList").append($li);
	});
}

// 竞速秒秒彩开奖
function successCallBack_award3(data){
   if (data == null || data == "" || data.length == 0 || typeof(data) == "undefined") {
		toastUtils.showToast("当前没有可用数据!");
		return;
	}
	if(data.SystemState == -1){
			loginAgain();
		}
	if(data.IssueModlst == null){
      return;
	}
	var lotteryId = "50";
		$.each(data.IssueModlst, function(key, val) {
			if(key == 0){
				var $li = $("<li></li>");

					$li.bind('click', function(event) {
						localStorageUtils.setParam("historyLottery",lotteryId);
						localStorageUtils.setParam("historyBack","awardHall");
						createInitPanel_Fun('awardHistory',true);
					});
					var $a = $('<a></a>');
					$a.append('<h3 class="subTitle"><b>'+LotteryInfo.getLotteryNameById(lotteryId)+'</b><span class="marL6 gray">第'+val.IssueNumber1+'期</span></h3>');
					var $ul = $("<ul class='ResultNew marL10'></ul>");

					var _resultS = val.DrawResult1;
					var _resultA = _resultS.split(",");
					for(var i = 0; i < _resultA.length; i++){
						$ul.append('<li>' + _resultA[i] + "</li>");
					}
					var $span = $("<span class='btnRight'></span>");
					var $img = $("<img src="+LotteryInfo.getLotteryLogoById(lotteryId)+">"); //Logo src
				    var $table=$("<table></table>");
				    var $tr=$("<tr></tr>");
				    var $td1=$("<td></td>");
				    var $td2=$("<td></td>");
				    $a.append($ul);
				    $td1.append($img);
				    $td2.append($a);
				    $tr.append($td1);
				    $tr.append($td2);
				    $table.append($tr);
				    $li.append($table);
				    $("#awardList").append($li);
			}
		});	
}