console.log('loaded Potion C');
module.exports = require('alchemy.js').cork(function (alchemy) {
    'use strict';

    return {

        name: 'Potion C',

        getName: function () {
            return this.name;
        },
    };
});


