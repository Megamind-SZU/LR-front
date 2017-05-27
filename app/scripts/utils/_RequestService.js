var $ = require('jquery');
var toastr = require('toastr');
var SERVER_URL = 'http://localhost:9000';
var UtilConstant = require('../constants/UtilConstant');

toastr.options = UtilConstant.TOASTR_OPTIONS;
toastr.options.timeOut = 3000;

var _RequestService = function(){
    return this;
};

_RequestService.prototype.reportError = function(err,uri){
  var msg = "";
  var json = err.responseJSON;
  console.log("RestClientService error ::",err);
  if(err.status == 404){
      msg = msg + "Page not found.\n";
      toastr.error(msg);
  }else if(err.status == 403){
      if(err.responseText === 'Signature has expired'){
        toastr.error(err.responseText);
      }else if(err.responseText === 'wrong password'){
        toastr.error(err.responseText);
      }else{
        toastr.error(err.responseText);
      }
  }else if(err.status == 502){
      msg = "The request timed out";
      toastr.error(msg);
  }
};

_RequestService.prototype.get = function(uri){
    var _this = this;
    var jwt = localStorage.getItem('jwt');
    var auth = jwt?'JWT'+jwt:'null';
    return $.ajax({
        url:SERVER_URL　+ uri,
        type:'GET',
        headers:{'Authorization':auth},
        error:function(err){
            _this.reportError(err,uri);
            return err;
        }
    });
};

_RequestService.prototype.post = function(uri,data){
    var _this = this;
    var jwt = localStorage.getItem('jwt');
    var auth = jwt?'JWT'+jwt:'null';
    return $.ajax({
        url:SERVER_URL + uri,
        type:'POST',
        headers:{'Authorization':auth},
        data:data,
        error:function(err){
            _this.reportError(err,uri);
            return err;
        }
    });
};

module.exports = new _RequestService();