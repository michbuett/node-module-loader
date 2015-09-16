module.exports = (function () {
    'use strict';

    var alchemy = require('alchemy.js');
    var potionC = require("./PotionC");

    return alchemy.extend(potionC, {

        name: 'Potion B',

        getName: function () {
            return potionC.getName.call(this) + ' (extended B)';
        },
    });
}());
console.log('loaded PotionB');

