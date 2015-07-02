module.exports = require('alchemy.js').cork(function (alchemy) {
    'use strict';

    return {

        name: 'Potion B',

        getName: function () {
            return this.name;
        },
    };
});

