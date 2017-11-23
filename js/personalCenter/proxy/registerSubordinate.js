//用户名
var userName = "";
var IsAgentType = "true";
//用户ID
var myUserID = "";
var fandian_Register = 0;

/*进入panel时调用*/
function registerSubordinateLoadedPanel(){
	catchErrorFun("registerSubordinateInit();");
}

/*离开panel时调用*/
function registerSubordinateUnloadedPanel(){
 	$("#DfanDianID").empty();
    $("#HYfanDianID").empty();
    $("#usernameid").val("");
    document.getElementById('daiLiID').style.display = "";
    document.getElementById('huiyuanID').style.display = "none";   
    $('#dailiId').removeClass('checkBoxA');
    $('#dailiId').removeClass('checkBox');
    $('#huiyuanId').removeClass('checkBoxA');
    $('#huiyuanId').removeClass('checkBox');  
    $('#huiyuanId').addClass('checkBox');
    $('#dailiId').addClass('checkBoxA');
    IsAgentType = "true";
}

function registerSubordinateInit(){
   ajaxUtil.ajaxByAsyncPost1(null, '{"ProjectPublic_PlatformCode":2,"InterfaceName":"GetUserDetailNew"}', getUserDetail_proxy);
  $("#registerSubmit").off('click');
  $("#registerSubmit").on("click", function() {
            userName = $("#usernameid").val().trim();

            if(IsAgentType=="true"){
               fandian_Register = $("#DfanDianID").val();
            }else{
               fandian_Register = $("#HYfanDianID").val();
            }
            if (userName == "") {
                toastUtils.showToast("用户名不能为空");
                return;
            }else if(/[\':;*?~`!@#$%^&+={}\[\]\<\>\(\),\.]/.test(userName)){
                toastUtils.showToast("用户名只能由汉字、字母、数字中的任意一种或多种组成");
                return;
            } else if (userName.replace(/[^\x00-\xFF]/g, '**').length < 4 || userName.replace(/[^\x00-\xFF]/g, '**').length > 25) {
                toastUtils.showToast("用户名在4-25个字符之间");
                return;
            }
            var passwd = "a123456"; //手动注册默认密码为:a123456

            ajaxUtil.ajaxByAsyncPost(null, '{"ProjectPublic_PlatformCode":2,"InterfaceName":"UserRegist","UserName":"' + userName + '","IsAgent":' + IsAgentType + ',"RegistChild":true,"Password":"' + passwd + '","Rebate":' + fandian_Register + '}', successCallBack_proxy, '正在提交数据中...');
  });
}

function getUserDetail_proxy(data){
    if (data.SystemState == 64) {

        myUserID = data.MyUserID;  //用户ID
        var HRebate = data.HRebate;  //会员返点区间
        var QRebate = data.QRebate;   //前台开户允许范围
        var XRebate = data.XRebate;  //相邻返点差值
        var QARebate = data.QARebate; //前台代理返点
        var UserLevel = data.UserLevel; //当前登录人的代理级别，1:一级；2：二级，依次类推
        var MyRebate = data.MyRebate;  //我的返点

        var Dfandian = "";   //代理返点
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

        $("#DfanDianID").empty();
        $("#HYfanDianID").empty();
        $("#HfanDianID").empty();
        var min_Rebate = parseInt(localStorageUtils.getParam("MinRebate"));  //商户最小返点
        for (var i = Dfandian; min_Rebate <= i; i--) {
            $("#DfanDianID").append('<option value=' + i + '>' + i + '/' + ((i-min_Rebate)/20).toFixed(1) + '</option>');
            $("#HfanDianID").append('<option value=' + i + '>' + i + '/' + ((i-min_Rebate)/20).toFixed(1) + '</option>');
            i = i - 1;
        }
        for (var j = Hfandian; min_Rebate <= j; j--) {
            $("#HYfanDianID").append('<option value=' + j + '>' + j + '/' + ((j-min_Rebate)/20).toFixed(1) + '</option>');
            j = j - 1;
        }
    } else if (data.SystemState == -1) {
        loginAgain();
    } else {
        toastUtils.showToast("当前网络不给力，请稍后再试");
    }
}
/**
 * Description 注册方法回调函数
 * @param
 * @return data 服务端返数据
 */
function successCallBack_proxy(data) {
    if (data.SystemState == 64) {
        if (data.RegisterComplete) {
            $("#usernameid").val("");
            document.getElementById('daiLiID').style.display = "";
            document.getElementById('huiyuanID').style.display = "none";
            $('#dailiId').removeClass('checkBoxA');
            $('#dailiId').removeClass('checkBox');
            $('#huiyuanId').removeClass('checkBoxA');
            $('#huiyuanId').removeClass('checkBox');  
            $('#huiyuanId').addClass('checkBox');
            $('#dailiId').addClass('checkBoxA');
            IsAgentType="true";
            var msg = ' 用户名 : '+ userName +'\n返 点 : '+ fandian_Register +'\n初始密码 : a123456 ';
            //弹框提示--遮罩层
            setTimeout(function () {
                $.ui.popup(
                    {
                        title:"注册成功",
                        message:'<p style="text-align: center;color:#FF9e00;margin:0;">长按以下内容可复制</p><textarea readonly="readonly" style="line-height: 25px;text-align:center;height:100px;resize:none;">'+ msg +'</textarea>',
                        cancelText:"关闭",
                        cancelCallback:
                            function(){
                            },
                        doneText:"确定",
                        doneCallback:
                            function(){
                            },
                        cancelOnly:false
                    })
            },500);

        } else {
             toastUtils.showToast("注册失败");
        }
    } else if (data.SystemState == 128) {
        if (data.ErrorCode == "3") {
            toastUtils.showToast("该用户名已存在");
        }else if(data.ErrorCode == "2"){
            toastUtils.showToast("注册人数已满");
        }else if(data.ErrorCode == "1"){
            toastUtils.showToast("此用户不能创建下级");
        }else if(data.ErrorCode == "-3"){
            toastUtils.showToast("下级返点不能大于上级返点");
        }else{
            toastUtils.showToast("请输入正确的用户名");
        }
    }else if(data.SystemState == "-1"){
        loginAgain();
    } else if(data.SystemState=="2"){
        toastUtils.showToast("无可选返点，不可注册下级");
    } else {
        toastUtils.showToast("网络连接失败");
    }
}

function SubordinateType(id){
        $('#dailiId').removeClass('checkBoxA');
        $('#dailiId').removeClass('checkBox');
        $('#huiyuanId').removeClass('checkBoxA');
        $('#huiyuanId').removeClass('checkBox');        
      if(id == 1){    
        $('#dailiId').addClass('checkBox');
        $('#huiyuanId').addClass('checkBoxA');
        document.getElementById('daiLiID').style.display = "none";
        document.getElementById('huiyuanID').style.display = "";        
        IsAgentType="false";
      }else{
        $('#huiyuanId').addClass('checkBox');
        $('#dailiId').addClass('checkBoxA');
        document.getElementById('daiLiID').style.display = "";
        document.getElementById('huiyuanID').style.display = "none";        
        IsAgentType="true";
      }
}

//比较三个数的大小
function smallest(a, b, c) {
    var min = function(a, b) {
        return b + ((a - b ) & ((a - b ) >> 31 ) );
    };
    return min(a, min(b, c));
}