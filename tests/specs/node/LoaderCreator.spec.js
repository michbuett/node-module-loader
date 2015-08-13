describe('LoaderCreator', function () {
    'use strict';

    var loader = require('./../../../src/LoaderCreator');
    var path = require('path');
    var rootpath = path.resolve(__dirname, '../..');

    it('returns a list of required scripts', function () {
        expect(loader.collectScripts()).toEqual([]);

        expect(loader.collectScripts(rootpath, './potions/PotionA')).toEqual([
            '../node_modules/alchemy.js/lib/core/Alchemy.js',
            'potions/PotionB.js',
            'potions/PotionA.js',
        ]);

        expect(loader.collectScripts(rootpath, './potions/PotionB')).toEqual([
            '../node_modules/alchemy.js/lib/core/Alchemy.js',
            'potions/PotionB.js',
        ]);
    });

    it('can create the dependency map', function () {
        expect(loader.createDependencyMap()).toEqual({});

        expect(loader.createDependencyMap(rootpath, './potions/PotionA')).toEqual({
            'potions/PotionA.js': {
                'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
                './PotionB': 'potions/PotionB.js',
            },
            '../node_modules/alchemy.js/lib/core/Alchemy.js': {},
            'potions/PotionB.js': {
                'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
            },
        });

        expect(loader.createDependencyMap(rootpath, './potions/PotionB')).toEqual({
            'potions/PotionB.js': {
                'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
            },
            '../node_modules/alchemy.js/lib/core/Alchemy.js': {},
        });
    });
});
