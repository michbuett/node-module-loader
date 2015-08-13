console.log('loaded Potion D');
module.exports = require('alchemy.js').cork(function (alchemy) {
    'use strict';

    return {

        otherName: 'Potion D',

        getName: function () {
            return this.otherName;
        },
    };
});


