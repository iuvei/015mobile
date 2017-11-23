
'use strict';
//@ 进入页面时
function sendEmailLoadedPanel() {
    catchErrorFun("sendEmail_init();");
}
//@ 离开页面时
function sendEmailUnloadedPanel() {

}

//@ 入口函数
function sendEmail_init() {
    username = localStorageUtils.getParam("username");
    var checkedPerson = localStorageUtils.getParam("checkedPerson");  //From receiverLists.js
    checkedPerson = jsonUtils.toObject(checkedPerson);
    if (!checkedPerson || checkedPerson.length == 0){
        $("#emailReceiver").html("点击添加联系人");
    }else{
        var checkedList = new Array();
        var receiverId = new Array();
        $.each(checkedPerson,function (val,key) {
            var receiverName = key.name;
            checkedList.push(receiverName);
            receiverId.push(key.id);
        });
        checkedList = checkedList.join(", ");
        $("#emailReceiver").html(checkedList);  //显示已选定的联系人
        // Show the Theme of Email when reply a Email
        if (checkedPerson[0].theme){
            $("#sendEmailTit").val("Re: "+checkedPerson[0].theme);
        }
    }
    //点击添加联系人
    $("#emailReceiver").off('click');
    $("#emailReceiver").on('click',function () {
        if (checkedPerson && checkedPerson.length >0){
            localStorageUtils.setParam("receiverId",receiverId);
        }
        setPanelBackPage_Fun('receiverLists');
    });
    //Submit content
    $("#sendEmailSubmit").off('click');
    $("#sendEmailSubmit").on('click', function () {
        var receiver = receiverId ? receiverId.join(",") : "";
        var emailTitle = $("#sendEmailTit").val().trim();
        var writed = $("#writeEmail").val().trim();

         if(receiver == ''){
            toastUtils.showToast("请添加收件人");
            return;
         }
        if(emailTitle == ''){
            toastUtils.showToast("请输入主题");
            return;
        }
        if(writed == ''){
            toastUtils.showToast("请输入内容");
            return;
        }
        //标题和内容编码
        emailTitle = encodeURIComponent(emailTitle);
        writed = encodeURIComponent(writed);

        var param = '{"ProjectPublic_PlatformCode":2,"InterfaceName":"SendStationEmail","SendPserson":"'+ username +'","Title":"' + emailTitle + '","Content":"' + writed + '","SendRange":10,"ReceivePerson":"'+ receiver +'"}';
        ajaxUtil.ajaxByAsyncPost1(null, param, sendEmailCallBack,null);
    });
    //点击返回按钮
    $("#sendEmail_back").off('click');
    $("#sendEmail_back").on('click',function () {
        goBack.EmailLists();
        localStorageUtils.removeParam("checkedPerson");
        $("#sendEmailTit").val('');
        $("#writeEmail").val('');
    });
}

function sendEmailCallBack(data) {
    if (data.SystemState == 64){
        if (data.Result > 0){
            toastUtils.showToast('发送成功');
            $("#sendEmailTit").val("");
            $("#writeEmail").val("");
            localStorageUtils.removeParam("checkedPerson");
            localStorageUtils.setParam("emailSource",1); //跳到发件箱
            setPanelBackPage_Fun('EmailLists');
        }else if (data.Result == -1){
            toastUtils.showToast('用户不存在');
        }else{
            toastUtils.showToast('发送失败，请稍后再试');
        }
    }else if(data.SystemState == -1){
        loginAgain();
    } else{
        toastUtils.showToast("获取数据失败");
    }
}
