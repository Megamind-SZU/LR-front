var BaseStore = require('./BaseStore');
var UserConstant = require('../constants/UserConstant');
var jwtDecode = require('jwt-decode');
var ActionStatus = require('../constants/ActionStatusConstant');

class LoginStore extends BaseStore{
    constructor(){
        this.user = null;
        this.status = UserConstant.STATUS_USER_LOGIN_OUT;
        this.isActive = null;
        this.subscribe(()=>this._registerToActions.bind(this));
    }

    getUser(){
        return this.user;
    }

    getStatus(){
        return this.status;
    }

    isLogined(){
        return (!!this.user) && this.user.isActive;
    }

    login(jwt){
        var token = this.getJwt(jwt);
        var user = jwtDecode(token);
        if(!this.user && user){
            this.status = UserConstant.STATUS_USER_LOGINED;
        }
        this.user = user;
        this.emitChange();
    }

    loginout(){
        this.user = null;
        this.status = UserConstant.STATUS_USER_LOGIN_OUT;
        localStorage.removeItem('jwt');
        this.emitChange();
    }

    getJwt(jwt){
        var savedJwt = localStorage.getItem('jwt');
        var token;
        if(jwt){
            localStorage.setItem('jwt',jwt);
            token = jwt;
        }else{
            token = savedJwt;
        }
        return token;
    }

    _registerToActions(action){
        switch(action.actionType){
            case UserConstant.ACTION_USER_LOGIN:
                if(action.state === ActionStatus.SUCCESS){
                    this.login(action.jwt);
                }
                break;
            case UserConstant.ACTION_USER_LOGIN_OUT:
                this.loginout();
        }
    }

    

}