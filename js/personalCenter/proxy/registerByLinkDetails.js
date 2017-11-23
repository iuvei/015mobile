
var IsAgent = "true";  //是否给下级设为代理


/*@ 进入panel时调用*/
function registerByLinkDetailsLoadedPanel(){
	catchErrorFun("registerByLinkDetailsInit();");
}

/*@ 离开panel时调用*/
function registerByLinkDetailsUnloadedPanel(){
    $("#setReb_proxy").empty();
    $("#setReb_member").empty();
    $("#teamName").val("");
    $("#linkQQ").val("");
    $("#hyperlinkid").css("display","none");
    document.getElementById('linkRebate_proxy').style.display = "";
    document.getElementById('linkRebate_member').style.display = "none";
    $('#linkReg_proxy').removeClass('checkBoxA');
    $('#linkReg_proxy').removeClass('checkBox');
    $('#linkReg_member').removeClass('checkBoxA');
    $('#linkReg_member').removeClass('checkBox');
    $('#linkReg_member').addClass('checkBox');
    $('#linkReg_proxy').addClass('checkBoxA');
    IsAgent = true;
}
//@ 入口函数
function registerByLinkDetailsInit(){
   ajaxUtil.ajaxByAsyncPost1(null, '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetUserDetailNew"}', getUserDetail_link,'正在加载数据...');
   //Submit
   $("#btnHyperlink").off('click');
   $("#btnHyperlink").on("click", function() {
       //判断是否已够10条链接
       myUserID = Number(localStorageUtils.getParam("myUserID"));
       var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetUserRegistUrlList","UserID":"'+ myUserID +'"}';
       ajaxUtil.ajaxByAsyncPost1(null, param, function (data) {
           if (data.SystemState == 64 ){
               if(data['UserRegistUrlList'].length > 9){
                   toastUtils.showToast('注册链接最多可以添加10条，请先处理闲置链接!');
                   setPanelBackPage_Fun('registerByLink');
               }else{
                   addNewLink();
               }
           }
       },null);
});}

//@ 发送添加链接请求
function addNewLink() {
    var teamName = $("#teamName").val();
    var fandian=0;
    var linkQQ = $("#linkQQ").val();
    //代理或者会员
    if(IsAgent=="true"){
        fandian = $("#setReb_proxy").val();
    }else{
        fandian = $("#setReb_member").val();
    }
    //团队名称
    if (teamName == "") {
        toastUtils.showToast("请输入团队名称");
        return;
    }else if(/[\':;*?~`!@#$%^&+={}\[\]\<\>\(\),\.]/.test(teamName)){
        toastUtils.showToast("团队名称由4-25个汉字、数字或字母组成");
        return;
    } else if (teamName.replace(/[^\x00-\xFF]/g, '**').length < 4 || teamName.replace(/[^\x00-\xFF]/g, '**').length > 25) {
        toastUtils.showToast("团队名称由4-25个汉字、数字或字母组成");
        return;
    }
    //QQ号
    if (linkQQ == ""){
        toastUtils.showToast("请输入QQ号码");
        return;
    }else if (!/^\d{5,13}$/.test(linkQQ)){
        toastUtils.showToast("QQ号码由5-13位数字组成");
        return;
    }
    ajaxUtil.ajaxByAsyncPost(null, '{"ProjectPublic_PlatformCode":2,"InterfaceName":"AddUserRegistUrl","Rebate":' + fandian + ',"IsAgent":'+IsAgent+',"TeamName":"'+ teamName +'","QQ":"'+ linkQQ +'"}', SetUserPromotionRebate, '正在提交数据中...');
}

//@ 用户信息返回数据
function getUserDetail_link(data){
    if (data.SystemState == 64) {

        myUserID = data.MyUserID;  //用户ID
        var HRebate = data.HRebate;  //会员返点区间
        var QRebate = data.QRebate;   //前台开户允许范围
        var XRebate = data.XRebate;  //相邻返点差值
        var QARebate = data.QARebate; //前台代理返点
        var UserLevel = data.UserLevel; //当前登录人的代理级别，1:一级；2：二级，依次类推
        var MyRebate = data.MyRebate;  //我的返点

        var Dfandian = "";  //代理返点
        var Hfandian = "";  //会员返点

        var rebate = smallest(QRebate, MyRebate, HRebate); // 取三者最小值，用于前台显示的会员返点的最大值，

        var pingJi = true; //true:可平级; false:不可平级
        if (pingJi){
            Hfandian = rebate; //@ 会员返点限制
            Dfandian = Math.min(parseInt(MyRebate), parseInt(QARebate)); //代理返点限制
            if (UserLevel == 1 || UserLevel == 2){  //登录用户等级为一级，二级，开户返点最高为1958
                Hfandian = Math.min(Hfandian, 1958);
                Dfandian = Math.min(Dfandian, 1958);
            }else{  //当前登录为三级及以下，最高只能开到1956
                Hfandian = Math.min(Hfandian, 1956);
                Dfandian = Math.min(Dfandian, 1956);
            }
        }else{
            Hfandian = (rebate == MyRebate) ? rebate - XRebate : rebate; //@ 会员返点限制
            Dfandian = parseInt(MyRebate) > parseInt(QARebate) ? QARebate : MyRebate - XRebate; //代理返点限制
        }

        $("#setReb_proxy").empty();
        $("#setReb_member").empty();

        var min_Rebate = parseInt(localStorageUtils.getParam("MinRebate"));  //商户最小返点
        for (var i = Dfandian; min_Rebate <= i; i--) {
            $("#setReb_proxy").append('<option value=' + i + '>' + i + '</option>');
            i = i - 1;
        }
        for (var j = Hfandian; min_Rebate <= j; j--) {
            $("#setReb_member").append('<option value=' + j + '>' + j + '</option>');
            j = j - 1;
        }
    } else if (data.SystemState == -1) {
        loginAgain();
    } else {
        toastUtils.showToast("当前网络不给力，请稍后再试");
    }
}

//@ 链接注册下级时-返回数据
function SetUserPromotionRebate(data) {
if (data.SystemState == 64) {
    if (data.CompleteStatus) {
        document.getElementById('hyperlinkid').style.display = "";
        $("#hyperlinkid").val(getShortLink(data.RegistUrlCode));
        $("#teamName").val("");
        $("#linkQQ").val("");

        //弹框提示--遮罩层
        setTimeout(function () {
            $.ui.popup(
                {
                    title:"注册链接添加成功",
                    message:'注册地址：'+ getShortLink(data.RegistUrlCode) +'',
                    cancelText:"关闭",
                    cancelCallback:
                        function(){
                        },
                    doneText:"确定",
                    doneCallback:
                        function(){
                            setPanelBackPage_Fun('registerByLink');
                        },
                    cancelOnly:false
                })
        },500);
    }
    } else if (data.SystemState == 2) {
     toastUtils.showToast("生成链接失败");
    } else {
     toastUtils.showToast("网络连接失败");
    }
}

/*@ 页面选择是代理还是会员 */
function SubordinateType_link(id){
    $('#linkReg_proxy').removeClass('checkBoxA');
    $('#linkReg_proxy').removeClass('checkBox');
    $('#linkReg_member').removeClass('checkBoxA');
    $('#linkReg_member').removeClass('checkBox');
    if(id == 1){
        $('#linkReg_proxy').addClass('checkBox');
        $('#linkReg_member').addClass('checkBoxA');
        $('#linkRebate_proxy').hide();
        $('#linkRebate_member').show();
        IsAgent="false";
    }else if (id == 0){
        $('#linkReg_member').addClass('checkBox');
        $('#linkReg_proxy').addClass('checkBoxA');
        $('#linkRebate_proxy').show();
        $('#linkRebate_member').hide();
        IsAgent="true";
    }
}
