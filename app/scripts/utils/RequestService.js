var _RequestService = require('./_RequestService');
var Crypto = require('crypto-js');
var RequestService = function(){
    return this;
};

RequestService.prototype.login = function(name,password){
    password_md5 = Crypto.MD5(password);
    return _RequestService.post('',{username,password_md5});
};

module.exports = new RequestService();