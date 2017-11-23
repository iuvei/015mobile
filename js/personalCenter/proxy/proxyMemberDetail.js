//代理用户名
var username = "";
//代理用户ID
var userid = "";
//代理彩票余额
var lotterymoney = "";
// 代理的最大返点
var myRebate = 0;
// 我的最大返点
var MYRebate0 = 0;
//用户类型
var categoryid;
/*进入panel时调用*/
function proxyMemberDetailLoadedPanel(){
	catchErrorFun("proxyMemberDetailInit();");
}
/*离开panel时调用*/
function proxyMemberDetailUnloadedPanel(){
	 document.getElementById('proxySubmit').style.display = "none";
}
function proxyMemberDetailInit(){
    var proxyMember = JSON.parse(localStorageUtils.getParam("proxyMember"));
     page = 0;
    hasMorePage = true;//默认还有分页
  	//加载滚动
	var indexScroller = $("#proxyMemberDetailScroller").scroller({
    	verticalScroll : false,
        horizontalScroll : false,
        vScrollCSS: "afScrollbar",
        autoEnable : true
    });   
	proxyMemberDetailcroller(indexScroller);   
    couponPage = 0;    

	/*localStorageUtils.setParam("proxyUserName", proxyMember.username);
	localStorageUtils.setParam("proxyUserId", proxyMember.userId);
	localStorageUtils.setParam("proxyparentID", proxyMember.parentID);*/
	username = proxyMember.username;
	userid = proxyMember.userId;
	lotterymoney = proxyMember.lotteryMoney;
	myRebate = proxyMember.myrebate;
	categoryid = proxyMember.category;
	var userCreateTime = proxyMember.createTime;
	MYRebate0 = localStorageUtils.getParam("MYRebate");
	if ((Number(categoryid) & 64) == 64) {
		document.getElementById('proxySubmit').style.display = "";
	}
    proxyMemberDetailList(indexScroller);  
	$("#userNameID").html(username);
	$("#balanceMoneyId").html(lotterymoney);
	$("#userCreateTime").html(userCreateTime);

		//会员转为代理
    $("#proxySubmit").off('click');
	$("#proxySubmit").on('click', function() {
		ajaxUtil.ajaxByAsyncPost(null, '{"InterfaceName":"ModifyCategoryInfo","Type":1,"ProjectPublic_PlatformCode":2,"UID":' + userid + '}', getModifyCategoryInfo, '正在加载数据...');
	});
}

function proxyMemberDetailcroller(myScroller){
	//Scroller add下拉刷新
   // myScroller.addPullToRefresh();
    // myScroller.addInfinite();
    myScroller.runCB=true;
	var hideClose;
	$.unbind(myScroller, "refresh-release");
	$.bind(myScroller, "refresh-release", function () {
	    var that = this;
	    clearTimeout(hideClose);	    
	    hideClose = setTimeout(function () {	
	    	$("#proxyMemberDetailList").empty();    	
	    	couponPage = 0;
	    	proxyMemberDetailList(myScroller);	    	
	        that.hideRefresh();
	    }, 2000);	    
	    return false; //tells it to not auto-cancel the refresh
	});
	//滚动过去，下拉将不再起作用！手动取消拉动刷新
	$.bind(myScroller, "refresh-cancel", function () {
	    clearTimeout(hideClose);
	});
	myScroller.enable();
	/*修复afui refresh事件会触发infinite事件bug*/
	$(document.body).unbind("touchmove");
    $(document.body).bind("touchmove", function(e) {
        if (touch.y1 - touch.y2 <= 0) {
            $("#infinite").hide();
        } else {
            $("#infinite").show();
        }
    });
    $.unbind(myScroller, "infinite-scroll");
    $.bind(myScroller, "infinite-scroll", function () {
        var self = this;
        if(!hasMore){
        	self.clearInfinite();
        	$(self.el).find("#infinite").remove();
            $(self.el).find("#mypopularizeList_noItem")?$(self.el).append(''):$(self.el).append('<div id="mypopularizeList_noItem"><span>没有数据了！</span></div>');
            return;
        }
        if($("#infinite").length==0){
        	$(self.el).append('<div id="infinite"><div class="pullDown loading"><span class="pullDownIcon"></span><span class="pullDownLabel">正在加载...</span></div></div>');
            $.bind(myScroller, "infinite-scroll-end", function () {
            	if(!hasMore){
            		self.clearInfinite();
        			$(self.el).find("#infinite").remove();
            		return false;
            	};
                $.unbind(myScroller, "infinite-scroll-end"); 
                 self.scrollToBottom();               
                setTimeout(function () {
                    $(self.el).find("#infinite").remove();
                    self.clearInfinite();
                    couponPage++;
                    if(couponPage <= totalPage){
                    	proxyMemberDetailList(myScroller);
                    }                  	
                }, 2000);               
            });
        }
    });
}

function proxyMemberDetailList(myScroller){
	ajaxUtil.ajaxByAsyncPost(null, '{"InterfaceName":"GetUsersLoginState","ProjectPublic_PlatformCode":2,"UserIDList":[' + userid + ']}', getUsersLoginState, '正在加载数据...');

	ajaxUtil.ajaxByAsyncPost(null, '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetAllMerchantInfo"}', proxysearchAllSuccessCallBack, '正在加载数据...');
}

//获取用户在线状态回调函数
function getUsersLoginState(data) {
	var info = data.UserLoginStateList;
	var android = info[0].AndroidPhone;
	if (data.SystemState == 64) {
		if (android.OperationTypeEnum == 1) {
			$("#stateId").html("离线");
		} else {
			$("#stateId").html("在线");
		}
		if (android.LoginTime == null) {
			$("#loginTimeId").html("从未登录");
		} else {
			$("#loginTimeId").html(android.LoginTime);
		}

	} else if (data.SystemState == -1) {
		loginAgain();
	} else {
		toastUtils.showToast("当前网络不给力，请稍后再试");
	}
}

/**
 *查询所售彩种回调函数
 */
function proxysearchAllSuccessCallBack(data) {
	$("#proxyMemberDetailList").empty();
    $("#proxyMemberDetailScroller").scroller().scrollToTop();
    $("#proxyMemberDetailScroller").scroller().clearInfinite();		
	var Info = data.LotteryList;
	var maxRebate = data.MaxRebate;
	var minRebate = data.MinRebate;
	var text = "";
	var myRebate_ = 0;
	var proxyRebate_ = 0;
	if (data.ErrorState == "0") {
		for (var i = 0; i < Info.length; i++) {
			myRebate_ = MYRebate0 - (maxRebate - Info[i].MaxRebate);
			proxyRebate_ = myRebate - (maxRebate - Info[i].MaxRebate);
			if (myRebate_ < minRebate) {
				myRebate_ = minRebate;
			} 
			if (proxyRebate_ < minRebate) {
				proxyRebate_ = minRebate;
			}
			var $itemLi = $('<li></li>');
			if (1 == Info[i].SaleState) {
				  $itemLi.append('<a><dl class="orderList"><dd>彩种：&nbsp;' + LotteryInfo.getLotteryNameById(Info[i].LotteryCode) + '</dd><dd>我的最大返奖:&nbsp;<span class="redtext">' + myRebate_ +'</span></dd><dd>' + username + '的最大返奖：&nbsp;'+proxyRebate_+'</dd></dl></a>');
                  $("#proxyMemberDetailList").append($itemLi);
			}
		}
	} else {
		toastUtils.showToast("当前网络不给力，请稍后再试");
	}
}

//会员转代理回调函数
function getModifyCategoryInfo(data) {
	if (data.SystemState == 64) {
		if (data.IsComplete) {
			document.getElementById('proxySubmit').style.display = "none";
			toastUtils.showToast("转为代理成功");
		} else {
		     toastUtils.showToast("转为代理失败");
		}
	} else if (data.SystemState == -1) {
		loginAgain();
	} else {
		toastUtils.showToast("当前网络不给力，请稍后再试");
	}
}