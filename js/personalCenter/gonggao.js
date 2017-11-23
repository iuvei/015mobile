var hasMorePage = true;
/*进入panel时调用*/
function gonggaoLoadedPanel(){
	catchErrorFun("gonggaoInit();");
}
/*离开panel时调用*/
function gonggaoUnloadedPanel(){
	$("#gonggaoList").empty();
}
function gonggaoInit(){
    $("#gonggao_backId").off('click');
    $("#gonggao_backId").on('click', function(){
         setPanelBackPage_Fun('lotteryHallPage');
    });

	page = 0;
	hasMorePage = false;//默认还有分页
	//使用滚动条
	var _myScroller = $("#gonggao").scroller({
		verticalScroll : true,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
	});
	_myScroller.scrollToTop();
	_myScroller.clearInfinite();
	addUseScroller(_myScroller,'gonggaoList','getgonggao()');
    //查询充值记录
	getgonggao();
}
/********** 查询充值记录  **********/
function getgonggao(){
        ajaxUtil.ajaxByAsyncPost1(null,'{"ProjectPublic_PlatformCode":2,"CurrentPageIndex":"' + page + '","CurrentPageSize":100,"InterfaceName":"GetNewsInfoFlex"}',function(data){
            log.v(data);
            if (data.SystemState == 64 && data.DataCount !=0) {   
                var Info=data.ModelList;
                //isHasMorePage(Info,20);
                $.each(Info, function(key, val) {
					var $itemLi = $('<li ></li>');
					$itemLi.append('<a  class="recordList"><dl><dt><b>'+val.NewsTittle +'</b></dt><dd><span>'+val.InsertTime+'</span></dd></dl></a>');
				    $itemLi.on('click',function() {
						localStorageUtils.setParam("MerchantNews_ID",val.MerchantNews_ID);
						createInitPanel_Fun('gonggaoDetail');
					});					
			 		$("#gonggaoList").append($itemLi);
			    });
             }else if (data.SystemState == -1) {
					loginAgain();
				}  
        },null);
}