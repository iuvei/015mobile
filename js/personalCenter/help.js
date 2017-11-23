
/**
 * @Author:      muchen
 * @DateTime:    2015-1-14
 * @Description: 进入该页面时调用
 */

function playtype_helpPanel(){
	help_playtype_init();
}

function help_playtype_init(){
	var arr=localStorageUtils.getParam("saleLottery").split(",");
	var temp = [];
	for (var i = 0; i < IndexLottery.length;i++) {
		var len = IndexLottery[i].lottery.length;
		for (var z = 0; z < len; z++) {
			if ($.inArray(IndexLottery[i].lottery[z], arr) >= 0) {
				temp.push(IndexLottery[i].lottery[z]);
			}
		}
	}

	$.each(temp,function(index,item){
		var helpName = "lottery_"+LotteryInfo.getLotteryTagById(item)+"_help";
		var func = "createInitPanel_Fun('"+helpName+"')";
		$("#help_playtypeId").append('<li onclick="'+func+'"><a class="recordList">'+LotteryInfo.getLotteryNameById(temp[index])+'</a></li>');
	});
}

/**
 * 离开这个页面时调用
 * @return {[type]} [description]
 */
function playtype_helpUnloadedPanel(){
	$("#help_playtypeId").empty();
}