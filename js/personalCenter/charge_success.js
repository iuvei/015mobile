/* 
* @Author: Administrator
* @Date:   2015-02-08 11:26:01
* @Last Modified by:   Administrator
* @Last Modified time: 2015-10-22 11:56:52
*/


/**
 *页面初始化
 */
function charge_successPageLoadedPanel() {
    getCharge();
    $("#querenID").unbind('click');
    $("#querenID").bind('click',function(e){
    var  charge=localStorageUtils.getParam("chargeALI");
      if(localStorageUtils.getParam("checkType") == "ALIPAY"){
    	  formSubmit_ALIPAY();
      }else if(localStorageUtils.getParam("checkType") == "UNIONPAY"){
    	  formSubmit_UNIONPAY();
      }else  if(localStorageUtils.getParam("checkType") == "SDPAY"){
		  formSubmit_SDPAY();
      }else if(localStorageUtils.getParam("checkType") == "JUBAO"){
          formSubmit_JUBAO();
      }
    
    });
}

function charge_successPageUnloadedPanel() {

}

function getCharge(){
    var  charge=localStorageUtils.getParam("chargeALI");
    if(localStorageUtils.getParam("checkType") == "ALIPAY"){
      $("#zhifuID").html("支付宝充值");
       createForm();
     }else if(localStorageUtils.getParam("checkType") == "UNIONPAY"){
      $("#zhifuID").html("银联充值");
      createForm_UNIONPAY();
     }else  if(localStorageUtils.getParam("checkType") == "SDPAY"){
       $("#zhifuID").html("银联充值");
       createForm_SDPAY();
     }else if(localStorageUtils.getParam("checkType") == "JUBAO"){
       $("#zhifuID").html("在线充值");
       createForm_JUBAO();
     }
      $("#jineID").html(charge.total_fee);
}

//创建支付宝form表单
function createForm(){
var  charge=localStorageUtils.getParam("chargeALI");
var　tempForm　=　document.createElement("form");　
  tempForm.name="alipayment";
  tempForm.id="alipayment";
  tempForm.action="/html/personalCenter/charge/alipayapi.jsp";　  
　tempForm.method="post";　
  tempForm.target="_blank";
　document.body.appendChild(tempForm);　
//创建卖家支付宝账户
var　emailInput　=　document.createElement("input");　
 emailInput.name="WIDseller_email";
 emailInput.value=charge.seller_id;
tempForm.appendChild(emailInput);　
//创建商户订单号
var orderInput　=　document.createElement("input");　
 orderInput.name="WIDout_trade_no";
 orderInput.value=charge.out_trade_no;
tempForm.appendChild(orderInput);　
//创建订单名称
var　shopInput　=　document.createElement("input");　
 shopInput.name="WIDsubject";
 shopInput.value=charge.subject;
tempForm.appendChild(shopInput);　
//创建付款金额
var　moneyInput　=　document.createElement("input");　
 moneyInput.name="WIDtotal_fee";
 moneyInput.value=charge.total_fee;
tempForm.appendChild(moneyInput);　
//创建合作身份者ID，以2088开头由16位纯数字组成的字符串
var　partnerInput　=　document.createElement("input");　
 partnerInput.name="WIDpartner";
 partnerInput.value=charge.partner;
tempForm.appendChild(partnerInput);　
// 签名方式，选择项：0001(RSA)、MD5
var　signInput　=　document.createElement("input");　
 signInput.name="WIDtotal_sign";
 signInput.value=charge.sign;
tempForm.appendChild(signInput);　
// 备注
var　bodyInput　=　document.createElement("input");　
 bodyInput.name="WIDtotal_body";
 bodyInput.value=charge.body;
tempForm.appendChild(bodyInput);　
// 字符编码格式 目前支持  utf-8
var　charsetInput　=　document.createElement("input");　
 charsetInput.name="WIDtotal_charset";
 charsetInput.value=charge._input_charset;
tempForm.appendChild(charsetInput);　  
// 返回格式 xml
var　formatInput　=　document.createElement("input");　
 formatInput.name="WIDtotal_format";
 formatInput.value="xml";
tempForm.appendChild(formatInput);　
//请求号  :必填，须保证每次请求都是唯一
var　req_idInput　=　document.createElement("input");　
 req_idInput.name="WIDtotal_req_id";
 req_idInput.value="5655654656565";
tempForm.appendChild(req_idInput);
//服务器异步通知页面路径
var　notify_urlInput　=　document.createElement("input");　
 notify_urlInput.name="WIDnotify_url";
 notify_urlInput.value=charge.notify_url;
tempForm.appendChild(notify_urlInput);
}

//创建银联form表单
function createForm_UNIONPAY(){
	var  charge=localStorageUtils.getParam("chargeALI");
	var　tempForm　=　document.createElement("form");　
	tempForm.name="unionpayment";
	tempForm.id="unionpayment";
	tempForm.action="InitServlet";　  
	tempForm.method="post";　
	tempForm.target="_blank";
	document.body.appendChild(tempForm);　
//创建卖家支付宝账户
	var　emailInput　=　document.createElement("input");　
	emailInput.name="WIDseller_email";
	emailInput.value=charge.seller_id;
	tempForm.appendChild(emailInput);　
//创建商户订单号
	var orderInput　=　document.createElement("input");　
	orderInput.name="WIDout_trade_no";
	orderInput.value=charge.out_trade_no;
	tempForm.appendChild(orderInput);　
//创建订单名称
	var　shopInput　=　document.createElement("input");　
	shopInput.name="WIDsubject";
	shopInput.value=charge.subject;
	tempForm.appendChild(shopInput);　
//创建付款金额
	var　moneyInput　=　document.createElement("input");　
	moneyInput.name="WIDtotal_fee";
	moneyInput.value=charge.total_fee;
	tempForm.appendChild(moneyInput);　
//创建合作身份者ID，以2088开头由16位纯数字组成的字符串
	var　partnerInput　=　document.createElement("input");　
	partnerInput.name="WIDpartner";
	partnerInput.value=charge.partner;
	tempForm.appendChild(partnerInput);　
// 签名方式，选择项：0001(RSA)、MD5
	var　signInput　=　document.createElement("input");　
	signInput.name="WIDtotal_sign";
	signInput.value=charge.sign;
	tempForm.appendChild(signInput);　
// 备注
	var　bodyInput　=　document.createElement("input");　
	bodyInput.name="WIDtotal_body";
	bodyInput.value=charge.body;
	tempForm.appendChild(bodyInput);　
// 字符编码格式 目前支持  utf-8
	var　charsetInput　=　document.createElement("input");　
	charsetInput.name="WIDtotal_charset";
	charsetInput.value=charge._input_charset;
	tempForm.appendChild(charsetInput);　  
// 返回格式 xml
	var　formatInput　=　document.createElement("input");　
	formatInput.name="WIDtotal_format";
	formatInput.value="xml";
	tempForm.appendChild(formatInput);　
//请求号  :必填，须保证每次请求都是唯一
	var　req_idInput　=　document.createElement("input");　
	req_idInput.name="WIDtotal_req_id";
	req_idInput.value="5655654656565";
	tempForm.appendChild(req_idInput);
//服务器异步通知页面路径
	var　notify_urlInput　=　document.createElement("input");　
	notify_urlInput.name="WIDnotify_url";
	notify_urlInput.value=charge.notify_url;
	tempForm.appendChild(notify_urlInput);
}
//创建SDPAY form表单
function createForm_SDPAY(){
	var  SDcharge=localStorageUtils.getParam("chargeALI");
	var　tempForm　=　document.createElement("form");　
	tempForm.name="sdpay";
	tempForm.id="sdpay";
	tempForm.action="http://api.m.sdpay.officenewline.org:11403/PMToService.aspx";　  
	tempForm.method="post";　
	tempForm.target="_blank";
	document.body.appendChild(tempForm);　
//创建卖家支付宝账户
	var　pid　=　document.createElement("input");　
	pid.name="pid";
	pid.value=SDcharge.pid;
	tempForm.appendChild(pid);　
//创建商户订单号
	var des　=　document.createElement("input");　
	des.name="des";
	des.value=SDcharge.des;
	tempForm.appendChild(des);　
}
//创建在线支付form表单
function createForm_JUBAO(){
	var  charge=localStorageUtils.getParam("chargeALI");
	var　tempForm　=　document.createElement("form");　
	tempForm.name="jubao";
	tempForm.id="jubao";
	tempForm.action="/mobile1.8.5/html/personalCenter/charge/goToPay.jsp";　  
	tempForm.method="post";　
	tempForm.target="_blank";
	document.body.appendChild(tempForm);　
//创建商户订单号
	var orderInput　=　document.createElement("input");　
	orderInput.name="payid";
	orderInput.value=charge.out_trade_no;
	tempForm.appendChild(orderInput);　
//创建付款金额
	var　moneyInput　=　document.createElement("input");　
	moneyInput.name="amount";
	moneyInput.value=charge.total_fee;
	tempForm.appendChild(moneyInput);　
//付款人ID(上线后需要改为真正的客户ID)
	var　partnerInput　=　document.createElement("input");　
	partnerInput.name="payerName";
	partnerInput.value=charge.partner;
	tempForm.appendChild(partnerInput);　　
//创建订单名称
	var　shopInput　=　document.createElement("input");　
	shopInput.name="goodsName";
	shopInput.value="在线充值 ";
	tempForm.appendChild(shopInput);　	
}

//提交支付宝表单
function formSubmit_ALIPAY(){
 // document.alipayment.submit(); 
  document.getElementById("alipayment").submit(); 
}
//提交银联表单
function formSubmit_UNIONPAY(){
//	document.unionpayment.submit();
   document.getElementById("unionpayment").submit();  
}
//SDPAY表单
function formSubmit_SDPAY(){
   document.getElementById("sdpay").submit(); 
	//document.sdpay.submit(); 
}
//JUBAO表单
function formSubmit_JUBAO(){
  // document.getElementById("jubao").submit(); 
   document.jubao.submit(); 
}