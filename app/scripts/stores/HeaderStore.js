var BaseStore = require('./BaseStore');
var LocationContainer = require('../contants/LocationContainer');
var ReactDom = require('react-dom');
var MainPageView = require('../view/MainPageView');
var UserGuideView = require('../view/UserGuideView');

class HeaderStore extends BaseStore{
    constructor(){
        this.subscribe(()=>this._registerToActions.bind(this));
    }

    _registerToActions(action){
        switch(action.actionType){
            case LocationContainer.LOCATION_MAINPAGE:
                goTo('mainpage');
                break;
            case LocationContainer.LOCATION_USERGUIDE:
                goTo('userguide');
                break;
        }
    }

    goTo(url){
        if(url=='mainpage'){
            ReactDom.render(
                <MainPageView />,
                document.getElementById('content')
            );
        }else{
            ReactDom.render(
                <UserGuideView />,
                document.getElementById('content')
            );
        }
    }
}
module.exports = new HeaderStore();