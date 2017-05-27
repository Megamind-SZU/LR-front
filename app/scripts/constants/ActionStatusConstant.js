'use strict';
var KeyMirror = require('keymirror');

var actionStatus = KeyMirror({
    SUCCESS:null,
    FAIL:null,
    PENDING:null
});

module.exports = actionStatus;