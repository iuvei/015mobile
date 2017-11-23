/* 
* @Author: Administrator
* @Date:   2015-02-08 11:09:41
* @Last Modified by:   Administrator
* @Last Modified time: 2015-12-23 17:35:27
*/
var couponPage = 1;
var newsType = "0";
var hasMore = true;
var totalPage = 0;


function gonggaoDetailLoadedPanel(){
  catchErrorFun("gonggaoDetail_init();");
}

function gonggaoDetail_init(){
  $("#gonggaoDetImg").empty();
  $("#gonggaocontentID").empty();
  var param = '{"ProjectPublic_PlatformCode":2,"newsID":' + localStorageUtils.getParam('MerchantNews_ID') + ',"InterfaceName":"GetNewsDetail"}';
     ajaxUtil.ajaxByAsyncPost(null,param,function(data){
      // console.log("调用查询公告详情返回的数据：" + JSON.stringify(data));
          $("#gonggaotimeID").text(data.InsertTime);
          $("#gonggaotitleID").text(data.NewsTittle);
          $("#gonggaocontentID").append(data.NewsContent);
    },'正在加载数据');
}