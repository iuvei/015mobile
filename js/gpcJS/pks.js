
//定义PK拾玩法标识
var pks_playType = 0;
var pks_playMethod = 0;
var pks_sntuo = 0;
var pks_rebate;
var pksScroll;

//进入这个页面时调用
function pksPageLoadedPanel() {
    catchErrorFun("pks_init();");
}

//离开这个页面时调用
function pksPageUnloadedPanel(){
    $("#pksPage_back").off('click');
    $("#pks_queding").off('click');
    $("#pks_ballView").empty();
    $("#pksSelect").empty();
    var $select = $('<select class="cs-select cs-skin-overlay" id="pksPlaySelect"></select>');
    $("#pksSelect").append($select);
}

//入口函数
function pks_init(){
    $("#pks_title").html(LotteryInfo.getLotteryNameByTag("pks"));
    for(var i = 0; i< LotteryInfo.getPlayLength("pks");i++){
        var $play = $('<optgroup label="'+LotteryInfo.getPlayName("pks",i)+'"></optgroup>');
        for(var j = 0; j < LotteryInfo.getMethodLength("pks");j++){
            if(LotteryInfo.getMethodTypeId("pks",j) == LotteryInfo.getPlayTypeId("pks",i)){
                var name = LotteryInfo.getMethodName("pks",j);
                if(i == pks_playType && j == pks_playMethod){
                    $play.append('<option value="pks'+LotteryInfo.getMethodIndex("pks",j)+'" selected="selected">' + name +'</option>');
                }else{
                    $play.append('<option value="pks'+LotteryInfo.getMethodIndex("pks",j)+'">' + name +'</option>');
                }
            }
        }
        $("#pksPlaySelect").append($play);
    }

    [].slice.call( document.getElementById("pksSelect").querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
        new SelectFx(el, {
            stickyPlaceholder: true,
            onChange:pksChangeItem
        });
    });

    //添加滑动条
    new IScroll('.cs-options',{
        click:true,
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true
    });

    GetLotteryInfo("pks",function (){
        pksChangeItem("pks"+pks_playMethod);
    });

    //添加滑动条
    if(!pksScroll){
        pksScroll = new IScroll('#pksContent',{
            click:true,
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        });
    }

    //获取期号
    getQihao("pks",LotteryInfo.getLotteryIdByTag("pks"));

    //获取上一期开奖
    queryLastPrize("pks");

    //获取单挑和单期最高奖金
    getLotteryMaxBonus('pks');

    //机选选号
    $("#pks_random").on('click', function(event) {
        pks_randomOne();
    });

    //返回
    $("#pksPage_back").on('click', function(event) {
        pks_playType = 0;
        pks_playMethod = 0;
        localStorageUtils.removeParam("playMode");
        localStorageUtils.removeParam("playBeiNum");
        localStorageUtils.removeParam("playFanDian");
        $("#pks_ballView").empty();
        pks_qingkongAll();
        setPanelBackPage_Fun('lotteryHallPage');
    });

    qingKong("pks");//清空
    pks_submitData();
}

function pksResetPlayType(){
    pks_playType = 0;
    pks_playMethod = 0;
}

function pksChangeItem(val) {
    pks_qingkongAll();
    var temp = val.substring("pks".length,val.length);
    if(val == 'pks0'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 0;
        pks_playMethod = 0;

        createOneLineLayout("pks","请至少选择1个",1,10,true,function(){
            pks_calcNotes();
        });
    }else if(val == 'pks1'){
        $("#pks_random").show();
        var tip1 = "冠军：可选1-10个";
        var tip2 = "亚军：可选1-10个";
        var tips = [tip1,tip2];
        pks_sntuo = 0;
        pks_playType = 1;
        pks_playMethod = 1;
        createTwoWinner("pks",tips,1,10,true,function(){
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks2'){
        $("#pks_random").hide();
        pks_sntuo = 3;
        pks_playType = 1;
        pks_playMethod = 2;
        pks_qingkongAll();
        var tips = "<p>格式说明<br/>冠亚军单式:01 02<br/>1)每注必须是2个号码,每个号码之间以空格分割;2)每注之间以逗号、分号、换行符分割;3)只支持单式.</p>";
        createSingleLayout("pks",tips);
    }else if(val == 'pks3'){
        $("#pks_random").show();
        var tip1 = "冠军：可选1-10个";
        var tip2 = "亚军：可选1-10个";
        var tip3 = "季军：可选1-10个";
        var tips = [tip1,tip2,tip3];
        pks_sntuo = 0;
        pks_playType = 2;
        pks_playMethod = 3;
        createThreeWinner("pks",tips,1,10,true,function(){
            pks_calcNotes();
        });
        pks_qingkongAll();
    } else if(val == 'pks4'){
        $("#pks_random").hide();
        pks_sntuo = 3;
        pks_playType = 2;
        pks_playMethod = 4;
        pks_qingkongAll();
        var tips = "<p>格式说明<br/>猜前三名单式:01 02 03<br/>1)每注必须是3个号码，每个号码之间以空格分割;2)每注之间以逗号、分号、换行符分割;3)只支持单式.</p>";
        createSingleLayout("pks",tips);
    }else if(val == 'pks5'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 3;
        pks_playMethod = 5;
        var tips = ["冠军","亚军","季军","第四名","第五名"];
        createFiveWinner("pks",tips,1,10,true,function(){
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks6'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 3;
        pks_playMethod = 6;
        var tips = ["第六名","第七名","第八名","第九名","第十名"];
        createFiveWinner("pks",tips,1,10,true,function(){
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks7'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 4;
        pks_playMethod = 7;
        var num = ["大","小"];
        createNonNumLayout("pks",pks_playMethod,num,function(){
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks8'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 4;
        pks_playMethod = 8;
        var num = ["大","小"];
        createNonNumLayout("pks",pks_playMethod,num,function(){
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks9'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 4;
        pks_playMethod = 9;
        var num = ["大","小"];
        createNonNumLayout("pks",pks_playMethod,num,function(){
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks10'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 5;
        pks_playMethod = 10;
        var num = ["单", "双"];
        createNonNumLayout("pks", pks_playMethod, num, function () {
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks11'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 5;
        pks_playMethod = 11;
        var num = ["单", "双"];
        createNonNumLayout("pks", pks_playMethod, num, function () {
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks12'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 5;
        pks_playMethod = 12;
        var num = ["单", "双"];
        createNonNumLayout("pks", pks_playMethod, num, function () {
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks13'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 6;
        pks_playMethod = 13;
        var num = ["龙", "虎"];
        createNonNumLayout("pks", pks_playMethod, num, function () {
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks14'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 6;
        pks_playMethod = 14;
        var num = ["龙", "虎"];
        createNonNumLayout("pks", pks_playMethod, num, function () {
            pks_calcNotes();
        });
        pks_qingkongAll();
    }else if(val == 'pks15'){
        $("#pks_random").show();
        pks_sntuo = 0;
        pks_playType = 6;
        pks_playMethod = 15;
        var num = ["龙", "虎"];
        createNonNumLayout("pks", pks_playMethod, num, function () {
            pks_calcNotes();
        });
        pks_qingkongAll();
    }

    if(pksScroll){
        pksScroll.refresh();
    }

    initFooterData("pks",temp);
    hideRandomWhenLi("pks",pks_sntuo,pks_playMethod);
    pks_calcNotes();
}

/**
 * [pks_initFooterButton 初始化底部Button显示隐藏]
 * @return {[type]} [description]
 */
function pks_initFooterButton(){
    if(pks_playMethod == 1){
        if (LotteryStorage["pks"]["line1"].length > 0 || LotteryStorage["pks"]["line2"].length > 0) {
            $("#pks_qingkong").css("opacity",1.0);
        }else{
            $("#pks_qingkong").css("opacity",0.4);
        }
    }else if(pks_playMethod == 3){
        if (LotteryStorage["pks"]["line1"].length > 0 || LotteryStorage["pks"]["line2"].length > 0
            || LotteryStorage["pks"]["line3"].length > 0) {
            $("#pks_qingkong").css("opacity",1.0);
        }else{
            $("#pks_qingkong").css("opacity",0.4);
        }
    }else if(pks_playType == 3){
        if (LotteryStorage["pks"]["line1"].length > 0 || LotteryStorage["pks"]["line2"].length > 0
            || LotteryStorage["pks"]["line3"].length > 0 || LotteryStorage["pks"]["line4"].length > 0 || LotteryStorage["pks"]["line5"].length > 0) {
            $("#pks_qingkong").css("opacity",1.0);
        }else{
            $("#pks_qingkong").css("opacity",0.4);
        }
    }else if(pks_playType == 4 || pks_playType == 5 || pks_playType == 6){
        if(LotteryStorage["pks"]["line1"].length > 0){
            $("#pks_qingkong").css("opacity",1.0);
        }else{
            $("#pks_qingkong").css("opacity",0.4);
        }
    }else{
        $("#pks_qingkong").css("opacity",0);
    }

    if($("#pks_qingkong").css("opacity") == "0"){
        $("#pks_qingkong").css("display","none");
    }else{
        $("#pks_qingkong").css("display","block");
    }

    if($('#pks_zhushu').html() > 0){
        $("#pks_queding").css("opacity",1.0);
    }else{
        $("#pks_queding").css("opacity",0.4);
    }
}

/**
 * @Author:      muchen
 * @DateTime:    2014-12-13 14:40:19
 * @Description: 清空所有记录
 */
function pks_qingkongAll(){
    $("#pks_ballView span").removeClass('redBalls_active');
    LotteryStorage["pks"]["line1"] = [];
    LotteryStorage["pks"]["line2"] = [];
    LotteryStorage["pks"]["line3"] = [];
    LotteryStorage["pks"]["line4"] = [];
    LotteryStorage["pks"]["line5"] = [];
    localStorageUtils.removeParam("pks_line1");
    localStorageUtils.removeParam("pks_line2");
    localStorageUtils.removeParam("pks_line3");
    localStorageUtils.removeParam("pks_line4");
    localStorageUtils.removeParam("pks_line5");

    $('#pks_zhushu').text(0);
    $('#pks_money').text(0);
    clearAwardWin("pks");
    pks_initFooterButton();
}

/**
 * [pks_calcNotes 计算注数]
 * @return {[type]} [description]
 */
function pks_calcNotes(){
    var notes = 0;

    if(pks_playMethod == 0 || pks_playType == 4 || pks_playType == 5 || pks_playType == 6){
        notes = LotteryStorage["pks"]["line1"].length;
    }else if(pks_playMethod == 1 ) {
        for(var i = 0;i < LotteryStorage["pks"]["line1"].length; i++){
            var flag = false;
            for(var j = 0;j < LotteryStorage["pks"]["line2"].length; j++){
                if(LotteryStorage["pks"]["line1"][i] == LotteryStorage["pks"]["line2"][j]){
                    flag = true;
                }
            }
            if(flag){
                notes += (LotteryStorage["pks"]["line2"].length - 1);
            }else{
                notes += LotteryStorage["pks"]["line2"].length;
            }
        }
    }else if(pks_playType == 3){
        notes = LotteryStorage["pks"]["line1"].length + LotteryStorage["pks"]["line2"].length + LotteryStorage["pks"]["line3"].length
            + LotteryStorage["pks"]["line4"].length + LotteryStorage["pks"]["line5"].length;
    }else if(pks_playMethod == 3){
        for(var i = 0;i < LotteryStorage["pks"]["line1"].length; i++){
            for(var j = 0;j < LotteryStorage["pks"]["line2"].length; j++){
                for(var k = 0;k < LotteryStorage["pks"]["line3"].length; k++){
                    if(LotteryStorage["pks"]["line1"][i] != LotteryStorage["pks"]["line2"][j] &&
                        LotteryStorage["pks"]["line1"][i] != LotteryStorage["pks"]["line3"][k]
                        && LotteryStorage["pks"]["line2"][j] != LotteryStorage["pks"]["line3"][k]){
                        notes++;
                    }
                }
            }
        }
    }else{//单式
       notes = pksValidateData('onblur');
    }

    hideRandomWhenLi("pks",pks_sntuo,pks_playMethod);

    //验证是否为空
    if( $("#pks_beiNum").val() =="" || parseInt($("#pks_beiNum").val()) == 0){
        $("#pks_beiNum").val(1);
    }

    //验证慢彩最大倍数为9999
    if($("#pks_beiNum").val() > 9999){
        $("#pks_beiNum").val(9999);
    }
    if(notes > 0) {
        $('#pks_zhushu').text(notes);
        if($("#pks_modeId").val() == "8"){
            $('#pks_money').text(bigNumberUtil.multiply(notes * parseInt($("#pks_beiNum").val()),0.002));
        }else if ($("#pks_modeId").val() == "2"){
            $('#pks_money').text(bigNumberUtil.multiply(notes * parseInt($("#pks_beiNum").val()),0.2));
        }else if ($("#pks_modeId").val() == "1"){
            $('#pks_money').text(bigNumberUtil.multiply(notes * parseInt($("#pks_beiNum").val()),0.02));
        }else{
            $('#pks_money').text(bigNumberUtil.multiply(notes * parseInt($("#pks_beiNum").val()),2));
        }

    } else {
        $('#pks_zhushu').text(0);
        $('#pks_money').text(0);
    }
    pks_initFooterButton();
    // 计算奖金盈利
    calcAwardWin('pks',pks_playMethod);
}

/**
 * [pks_randomOne 随机一注]
 * @return {[type]} [description]
 */
function pks_randomOne(){
    pks_qingkongAll();
    if(pks_playType == 0){
        var number = mathUtil.getRandomNum(1,11);
        LotteryStorage["pks"]["line1"].push(number > 9 ? number+"" : "0"+number);

        $.each(LotteryStorage["pks"]["line1"], function(k, v){
            $("#" + "pks_line1" + parseInt(v)).toggleClass("redBalls_active");
        });
    }else if(pks_playMethod == 1){
        var redBallArray = mathUtil.getInts(1,10);
        var array = mathUtil.getDifferentNums(2,redBallArray);
        LotteryStorage["pks"]["line1"].push(array[0] > 9 ? array[0]+"" : "0"+array[0]);
        LotteryStorage["pks"]["line2"].push(array[1] > 9 ? array[1]+"" : "0"+array[1]);
        $.each(LotteryStorage["pks"]["line1"], function(k, v){
            $("#" + "pks_line1" + parseInt(v)).toggleClass("redBalls_active");
        });
        $.each(LotteryStorage["pks"]["line2"], function(k, v){
            $("#" + "pks_line2" + parseInt(v)).toggleClass("redBalls_active");
        });
    }else if(pks_playMethod == 3){
        var redBallArray = mathUtil.getInts(1,10);
        var array = mathUtil.getDifferentNums(3,redBallArray);
        LotteryStorage["pks"]["line1"].push(array[0] > 9 ? array[0]+"" : "0"+array[0]);
        LotteryStorage["pks"]["line2"].push(array[1] > 9 ? array[1]+"" : "0"+array[1]);
        LotteryStorage["pks"]["line3"].push(array[2] > 9 ? array[2]+"" : "0"+array[2]);
        $.each(LotteryStorage["pks"]["line1"], function(k, v){
            $("#" + "pks_line1" + parseInt(v)).toggleClass("redBalls_active");
        });
        $.each(LotteryStorage["pks"]["line2"], function(k, v){
            $("#" + "pks_line2" + parseInt(v)).toggleClass("redBalls_active");
        });
        $.each(LotteryStorage["pks"]["line3"], function(k, v){
            $("#" + "pks_line3" + parseInt(v)).toggleClass("redBalls_active");
        });
    }else if(pks_playType == 3){
        var line = mathUtil.getRandomNum(1,6);
        var number = mathUtil.getRandomNum(1,11);
        LotteryStorage["pks"]["line"+line].push(number > 9 ? number+"" : "0"+number);

        $.each(LotteryStorage["pks"]["line"+line], function(k, v){
            $("#" + "pks_line"+line + parseInt(v)).toggleClass("redBalls_active");
        });
    }else if(pks_playType == 4 || pks_playType == 5 || pks_playType == 6){
        var number = mathUtil.getRandomNum(0,2);
        LotteryStorage["pks"]["line1"].push(number > 9 ? number+"" : "0"+number);

        $.each(LotteryStorage["pks"]["line1"], function(k, v){
            $("#" + "pks_line1" + parseInt(v)).toggleClass("redBalls_active");
        });
    }
    pks_calcNotes();
}

/**
 * 出票机选
 * @param playMethod
 */
function pks_checkOutRandom(playMethod){
    var obj = new Object();
    if(pks_playType == 0){
        var number = mathUtil.getRandomNum(1,11);
        obj.nums = number < 10 ? "0"+number : number;
        obj.notes = 1;
    }else if(pks_playMethod == 1){
        var redBallArray = mathUtil.getInts(1,10);
        var array = mathUtil.getDifferentNums(2,redBallArray);
        $.each(array,function(index){
            if(array[index] < 10){
                array[index] = "0"+array[index];
            }
        });
        obj.nums = array.join("|");
        obj.notes = 1;
    }else if(pks_playMethod == 3){
        var redBallArray = mathUtil.getInts(1,10);
        var array = mathUtil.getDifferentNums(3,redBallArray);
        $.each(array,function(index){
            if(array[index] < 10){
                array[index] = "0"+array[index];
            }
        });
        obj.nums = array.join("|");
        obj.notes = 1;
    }else if(pks_playType == 3){
        var line = mathUtil.getRandomNum(1,6);
        var number = mathUtil.getRandomNum(1,11);
        number = number < 10 ? "0"+number : number;
        if(line == 1){
            obj.nums = number + "|*|*|*|*";
        }else if(line == 2){
            obj.nums = "*|"+ number +"|*|*|*";
        }else if(line == 3){
            obj.nums = "*|*|"+number +"|*|*";
        }else if(line == 4){
            obj.nums = "*|*|*|"+ number +"|*";
        }else if(line == 5){
            obj.nums = "*|*|*|*|" + number;
        }
        obj.notes = 1;
    }else if(pks_playType == 4){
        var number = mathUtil.getRandomNum(0,2);
        obj.nums = number == 0 ? "大" : "小";
        obj.notes = 1;
    }else if(pks_playType == 5){
        var number = mathUtil.getRandomNum(0,2);
        obj.nums = number == 0 ? "单" : "双";
        obj.notes = 1;
    }else if(pks_playType == 6){
        var number = mathUtil.getRandomNum(0,2);
        obj.nums = number == 0 ? "龙" : "虎";
        obj.notes = 1;
    }
    obj.sntuo = pks_sntuo;
    obj.multiple = 1;
    obj.rebates = pks_rebate;
    obj.playMode = "4";
    obj.money = bigNumberUtil.multiply(obj.notes,2).toString();
    calcAwardWin('pks',pks_playMethod,obj);  //机选奖金计算
    obj.award = $('#pks_minAward').html();     //奖金
    obj.maxAward = $('#pks_maxAward').html();  //多级奖金
    return obj;
}


/**
 * [pks_submitData 确认提交数据]
 * @return {[type]} [description]
 */
function pks_submitData(){
    var submitParams = new LotterySubmitParams();
    $("#pks_queding").bind('click', function(event) {
        pks_rebate = $("#pks_fandian option:last").val();
        if(parseInt($('#pks_zhushu').html()) <= 0 || Number($("#pks_money").html()) <= 0){
            toastUtils.showToast('请至少选择一注');
            return;
        }
        pks_calcNotes();

        if(parseInt($('#pks_modeId').val()) == 8){
            if (Number($('#pks_money').html()) < 0.02){
                toastUtils.showToast('请至少选择0.02元');
                return;
            }
        }

        //提示单挑奖金
        getDanTiaoBonus('pks',pks_playMethod);

        submitParams.lotteryType = "pks";
        var playType = LotteryInfo.getPlayName("pks",pks_playType);
        submitParams.playType = playType;
        submitParams.playMethod = LotteryInfo.getMethodName("pks",pks_playMethod);
        submitParams.playTypeIndex = pks_playType;
        submitParams.playMethodIndex = pks_playMethod;
        var selectedBalls = [];

        if (pks_playType == 0 || pks_playType == 4 || pks_playType == 5 || pks_playType == 6) {
            $("#pks_ballView div.ballView").each(function(){
                $(this).find("span.redBalls_active").each(function(){
                    selectedBalls.push($(this).text());
                });
            });
            submitParams.nums = selectedBalls.join(",");
        }else if(pks_playType == 1 || pks_playType == 2){
            if(pks_playMethod == 1 || pks_playMethod == 3){
                $("#pks_ballView div.ballView").each(function(){
                    var arr = [];
                    $(this).find("span.redBalls_active").each(function(){
                        arr.push($(this).text());
                    });
                    selectedBalls.push(arr.join(","));
                });
                submitParams.nums = selectedBalls.join("|");
            }else{//单式
                var arr = $("#pks_single").val().split(",");
                var str = arr.join(',').replace(new RegExp(/\s+/g),'|').replace(new RegExp(/,+/g),' ');
                submitParams.nums = str;
            }
        }else if(pks_playType == 3) {
            $("#pks_ballView div.ballView").each(function(){
                var arr = [];
                $(this).find("span.redBalls_active").each(function(){
                    arr.push($(this).text());
                });
                if (arr.length == 0) {
                    selectedBalls.push("*");
                }else{
                    selectedBalls.push(arr.join(","));
                }
            });
            submitParams.nums = selectedBalls.join("|");
        }else{
            var arr = $("#pks_single").val().split(",");
            var str = arr.join(',').replace(new RegExp(/\s+/g),'|').replace(new RegExp(/,+/g),' ');
            submitParams.nums = str;
        }
        localStorageUtils.setParam("playMode",$("#pks_modeId").val());
        localStorageUtils.setParam("playBeiNum",$("#pks_beiNum").val());
        localStorageUtils.setParam("playFanDian",$("#pks_fandian").val());
        submitParams.notes = $('#pks_zhushu').html();
        submitParams.sntuo = pks_sntuo;
        submitParams.multiple = $('#pks_beiNum').val();  //requirement
        submitParams.rebates = $('#pks_fandian').val();  //requirement
        submitParams.playMode = $('#pks_modeId').val();  //requirement
        submitParams.money = $('#pks_money').html();  //requirement
        submitParams.award = $('#pks_minAward').html();  //奖金
        submitParams.maxAward = $('#pks_maxAward').html();  //多级奖金
        submitParams.submit();
        $("#pks_ballView").empty();
        pks_qingkongAll();
    });
}

/**
 * [pksValidateData 单式数据验证]
 */
function pksValidateData(type){
    if (typeof type == "undefined"){type = "onblur"}
    var textStr = $("#pks_single").val();
    var str = textStr.replace(new RegExp(/,+|，+|;+|；+|\n+/g),',');
    var result,
        content = {};
    if(pks_playMethod == 2){
        content.str = str;
        content.weishu = 5;
        content.zhiXuan = true;
        content.maxNum = 10;
        result = handleSingleStr_deleteErr(content,type);
    }else if(pks_playMethod == 4){
        content.str = str;
        content.weishu = 8;
        content.zhiXuan = true;
        content.maxNum = 10;
        result = handleSingleStr_deleteErr(content,type);
    }

    $('#pks_delRepeat').off('click');
    $('#pks_delRepeat').on('click',function () {
        content.str = $('#pks_single').val() ? $('#pks_single').val().replace(new RegExp(/,+|，+|;+|；+|\n+/g),',') : '';
        var rptResult = handleSingleStr_deleteRepeat(content);
        var array = rptResult.num || [];
        notes = rptResult.length;
        pksShowFooter(true,notes);
        $("#pks_single").val(array.join(","));
    });
    
    $("#pks_single").val(result.num.join(","));
    var notes = result.length;
    pksShowFooter(true,notes);
    return notes;
}

function pksShowFooter(isValid,notes){
    $('#pks_zhushu').text(notes);
    if($("#pks_modeId").val() == "8"){
        $('#pks_money').text(bigNumberUtil.multiply(notes * parseInt($("#pks_beiNum").val()),0.002));
    }else if ($("#pks_modeId").val() == "2"){
        $('#pks_money').text(bigNumberUtil.multiply(notes * parseInt($("#pks_beiNum").val()),0.2));
    }else if ($("#pks_modeId").val() == "1"){
        $('#pks_money').text(bigNumberUtil.multiply(notes * parseInt($("#pks_beiNum").val()),0.02));
    }else{
        $('#pks_money').text(bigNumberUtil.multiply(notes * parseInt($("#pks_beiNum").val()),2));
    }
    if(!isValid){
        toastUtils.showToast('格式不正确');
    }
    pks_initFooterButton();
    calcAwardWin('pks',pks_playMethod);  //计算奖金和盈利
}