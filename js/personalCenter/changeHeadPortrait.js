/*进入panel时调用*/
function changeHeadPortraitLoadedPanel(){
	catchErrorFun("changeHeadPortraitInit();");
}
/*离开panel时调用*/
function changeHeadPortraitUnloadedPanel(){
	$("#headPorShow td span").empty();
}
function changeHeadPortraitInit(){
	var headPorNow = localStorageUtils.getParam("headPorNow");
	var tdWidth = $("#headIcon"+headPorNow+"").parent('td').css('width');
	var leftDistance = (parseInt(tdWidth)-74)/2;
	var $selectedBack = $('<span style="position: absolute;left:'+leftDistance+'px;top:7%;"><img src="././images/headIcons/selectedIcon.png" style="width:74px;height:74px;z-index: 10"></span>');
	$("#headIcon"+headPorNow+"").parent('td').append($selectedBack);
	//点击设置
	$("#headPorShow td img").off('click');
    $("#headPorShow td img").on('click',function () {
		var selected = $(this).context.id;
		$("#"+selected+"").parent('td').append($selectedBack);
		var iconId = selected.replace("headIcon","");
			$.ajax({
				type : "post",
				url : "/accountInfo/setHeadIcon",
				data : {"headIcon":iconId},
				async : false,  //同步获取数据
				success : function(data){
					data = jsonUtils.toObject(data);
					if (data.SystemState == 64) {
						if (data.SetState == 1){
							toastUtils.showToast('设置成功');
							setPanelBackPage_Fun('myLottery');
						}
					}else if (data.SystemState=="-1"){
						toastUtils.showToast("请重新登录");
					} else {
						toastUtils.showToast("当前网络不给力，请稍后再试");
					}
				}
			});
	});
}
