console.log('loaded Potion B');
module.exports = require('alchemy.js').cork(function (alchemy) {
    'use strict';

    var potionC = require('./PotionC').brew();

    return {

        name: 'Potion B',

        getName: function () {
            return potionC.getName.call(this) + ' (extended B)';
        },
    };
});

