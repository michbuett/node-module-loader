describe('LoaderCreator', function () {
    'use strict';

    var loader = require('./../../../src/LoaderCreator');
    var path = require('path');
    var rootpath = path.resolve(__dirname, '../..');

    it('returns a list of required scripts', function () {
        expect(loader.collectScripts()).toEqual([]);

        expect(loader.collectScripts(rootpath, './potions/PotionA')).toEqual([
            'potions/PotionA.js',
            '../node_modules/alchemy.js/lib/core/Alchemy.js',
            'potions/PotionB.js'
        ]);

        expect(loader.collectScripts(rootpath, './potions/PotionB')).toEqual([
            'potions/PotionB.js',
            '../node_modules/alchemy.js/lib/core/Alchemy.js',
        ]);
    });
});
