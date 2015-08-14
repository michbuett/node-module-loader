describe('DependencyAnalyzer', function () {
    'use strict';

    var loader = require('./../../../src/LoaderBuilder');
    var path = require('path');
    var rootpath = path.resolve(__dirname, '../..');
    var fs = require('fs');
    var target = '_DependencyAnalyzer_test_loader.js';

    it('creates the loader script', function () {
        // prepare

        // execute
        loader.build({
            root: rootpath,
            modules: ['./potions/PotionA'],
            target: target
        });

        // verify
        var loaderScript = fs.readFileSync(target, 'utf8');
        expect(typeof loaderScript).toBe('string');
        expect(loaderScript).not.toBe('');
    });
});
