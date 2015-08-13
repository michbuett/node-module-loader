console.log('loaded Potion A');
module.exports = require('alchemy.js').cork(function (alchemy) {
    'use strict';

    var potionB = require('./PotionB').brew();
    var potionD = require('./PotionD').brew();

    return alchemy.extend(potionB, {

        name: 'Potion A',

        otherName: 'Potion A (other name)',

        getName: function () {
            return potionB.getName.call(this) + ' (extended A)';
        },

        getOtherName: function () {
            return potionD.getName.call(this);
        }
    });
});
