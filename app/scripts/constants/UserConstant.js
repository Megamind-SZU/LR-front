'use static';

var KeyMirror = require('keymirror');
var _ = require('lodash');

var action = KeyMirror({
    ACTION_USER_LOGIN:null,
    ACTION_USER_LOGIN_OUT:null,
    ACTION_USER_REGISTER:null,
    ACTION_USER_INFO_FATCH:null,
    ACTION_USER_INFO_UPDATE:null,
    //ACTION_USER_BIND:null
});

var status = KeyMirror({
    STATUS_USER_LOGINED:null,
    STATUS_USER_REGISTERED:null,
    STATUS_USER_LOGIN_OUT:null
});

module.exports = _.extend(action,status);