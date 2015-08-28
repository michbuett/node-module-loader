describe('DependencyAnalyzer', function () {
    'use strict';

    var loader = require('./../../../src/DependencyAnalyzer');
    var path = require('path');
    var rootpath = path.resolve(__dirname, '../..');
    var grunt = require('grunt');

    it('can create the dependency map', function () {
        expect(loader.createDependencyMap()).toEqual({});

        expect(loader.createDependencyMap(rootpath, './potions/PotionA')).toEqual({
            'potions/PotionA.js': {
                'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
                './PotionB': 'potions/PotionB.js',
                './PotionD': 'potions/PotionD.js',
            },

            '../node_modules/alchemy.js/lib/core/Alchemy.js': {},

            'potions/PotionB.js': {
                'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
                './PotionC': 'potions/PotionC.js',
            },

            'potions/PotionC.js': {},

            'potions/PotionD.js': {},
        });

        expect(loader.createDependencyMap(rootpath, './potions/PotionB')).toEqual({
            'potions/PotionB.js': {
                './PotionC': 'potions/PotionC.js',
                'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
            },

            '../node_modules/alchemy.js/lib/core/Alchemy.js': {},

            'potions/PotionC.js': {},
        });
    });

    it('supports a path map when creating the dependency map', function () {
        // prepare
        ['PotionA', 'PotionB', 'PotionC', 'PotionD'].forEach(function (f) {
            grunt.file.copy(rootpath + '/potions/' + f + '.js', rootpath + '/../foo/bar/baz/' + f + '.js');
        });

        var pathMap = {
            'potions': '../foo/bar/baz'
        };

        // execute
        var result = loader.createDependencyMap(rootpath, './potions/PotionA', pathMap);

        // verify
        expect(result).toEqual({
            '../foo/bar/baz/PotionA.js': {
                'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
                './PotionB': '../foo/bar/baz/PotionB.js',
                './PotionD': '../foo/bar/baz/PotionD.js',
            },

            '../node_modules/alchemy.js/lib/core/Alchemy.js': {},

            '../foo/bar/baz/PotionB.js': {
                'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
                './PotionC': '../foo/bar/baz/PotionC.js',
            },

            '../foo/bar/baz/PotionC.js': {},

            '../foo/bar/baz/PotionD.js': {},
        });

        grunt.file.delete(rootpath + '/../foo');
    });

    it('returns a list of required scripts for an empty map', function () {
        expect(loader.collectScripts()).toEqual([]);
    });

    it('returns a list of required scripts for non-empty maps', function () {
        var depMap1 = loader.createDependencyMap(rootpath, './potions/PotionA');
        var depMap2 = loader.createDependencyMap(rootpath, './potions/PotionB');

        expect(loader.collectScripts(depMap1)).toEqual([
            '../node_modules/alchemy.js/lib/core/Alchemy.js',
            'potions/PotionD.js',
            'potions/PotionC.js',
            'potions/PotionB.js',
            'potions/PotionA.js',
        ]);

        expect(loader.collectScripts(depMap2)).toEqual([
            '../node_modules/alchemy.js/lib/core/Alchemy.js',
            'potions/PotionC.js',
            'potions/PotionB.js',
        ]);
    });
});
