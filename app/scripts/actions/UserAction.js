'use strict';
var dispatcher = require('../dispatcher/Dispatcher');
var UserConstant = require('../constants/UserConstant');
var Request = require('../utils/RequestService');
var ActionStatus = require('../constants/ActionStatusConstant');

var asyncLoginAction = function(actionType,promise){
    dispatcher.dispatch({
        actionType:actionType,
        state:ActionStatus.PENDING
    });
    return promise.then(function(response){
        var jwt = response.id_token;
        dispatcher.dispatch({
            actionType:actionType,
            state:ActionStatus.SUCCESS,
            jwt:jwt
        });
        return response;
    }).fail(function(err){
        dispatcher.dispatch({
            actionType:actionType,
            state:ActionStatus.FAIL
        });
        return err;
    });
};

var LoginAction = {

    loginout:function(){
        dispatcher.dispatch({
            actionType:UserConstant.ACTION_USER_LOGIN_OUT
        });
    },

    login:function(username,password){
        return asyncLoginAction(
            UserConstant.ACTION_USER_LOGIN,
            Request.login(username,password)
        );
    }

}