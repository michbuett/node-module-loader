module.exports = require('alchemy.js').cork(function (alchemy) {
    'use strict';

    var potionB = require('./PotionB').brew();

    return alchemy.extend(potionB, {

        name: 'Potion A',

        getName: function () {
            return potionB.getName.call(this) + ' (extended version)';
        },
    });
});
