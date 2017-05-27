var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/Dispatcher.js');

var CHANGE_EVENT = 'change';

class BaseStore extends EventEmitter{
    constructor(){
        this._dispatchToken = null;
    }
    emitChange(){
        this.emit(CHANGE_EVENT);
    }
    addChangeListener(callback){
        this.on(CHANGE_EVENT,callback);
    }
    removeChangeListener(callback){
        this.removeChangeListener(CHANGE_EVENT,callback);
    }
    subscribe(actionSubscribe){
        this._dispatchToken = Dispatcher.register(actionSubscribe());
    }
    getDispatcherToken(){
        return this._dispatchToken;
    }
}
