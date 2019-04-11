/**********************
*******2019.2.12*******
*******   page  *******
**********************/

var API = new importAPI();

function importAPI () {
	var _self = this;
	var requestDomain = location.href.indexOf("seventh") == -1 ? "http://127.1.1.1/API/" : "/API/";

	function _Ajax(opts){
	    icom.loadingShow();

	    $.ajax({
	        type: 'POST',
	        url: requestDomain + opts.API,
	        dataType: 'json',
	        async: true,
	        data: opts.data,
	        success: function(data){
	        	icom.loadingHide();
		        if (opts.Type) {
		            if (opts.onSuccess) opts.onSuccess(data);
		        } else {
		            if (data.errcode == 0) {
		                if (opts.onSuccess) opts.onSuccess(data.result);
		            } else {
		                alert(data.errmsg)
		            }
		        }
	        },
	        error: function(){
	        	alert("网络可能存在问题，请刷新试试！");
	        }
	    });
	}

	/**
	 * 获取wxjsdk验证数据
	 */
	_self.GetJSDKdata = function(data,onSuccess){
		_Ajax({
            API:"wxjsdk/wxjsdk.php",
            data:data,
            onSuccess:onSuccess,
            Type:false
        });
	}//end func
}//end import