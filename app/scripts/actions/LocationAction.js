var dispatcher = require('../dispatcher/Dispatcher');
var LocationContainer = require('../constants/LocationContainer');
var LocationAction = {
    goToMainPage:function(){
        console.log("Location turn to mainpage");
        dispatcher.dispatch({
            actionType:LocationContainer.LOCATION_MAINPAGE,
            url:""
        });
    },
    goToUserGuide:function(){
        console.log("Location turn to userguide");
        dispatcher.dispatch({
            actionType:LocationContainer.LOCATION_USERGUIDE,
            url:""
        })
    }
};

module.exports = LocationAction;