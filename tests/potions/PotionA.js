module.exports = (function () {
    'use strict';

    var alchemy = require('alchemy.js');
    var potionB = require('./PotionB');
    var potionD = require('./PotionD');

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
}());
console.log('loaded PotionA');
