(function () {
    'use strict';

    var moduleToFile = {
        './potions/PotionA': 'potions/PotionA.js',
        './potions/PotionB': 'potions/PotionB.js',
        './PotionB': 'potions/PotionB.js',
        'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
    };
    var potions = {};
    var requestedUrls = {};

    window.module = window.module || {};
    window.require = function (moduleName) {
        var url = moduleToFile[moduleName];
        var potion = potions[url];

        return potion;
    };

    loadModule('alchemy.js', function () {
        for (var moduleName in moduleToFile) {
            if (!moduleToFile.hasOwnProperty(moduleName)) {
                continue;
            }

            loadModule(moduleName);
        }
    });

    function loadModule(moduleName, cb) {
        var url = moduleToFile[moduleName];
        if (requestedUrls[url]) {
            return;
        }

        requestedUrls[url] = true;

        var script = document.createElement('script');
        script.src = url;
        script.onload = createOnModuleLoaded(url, cb);
        document.head.appendChild(script);
    }

    function createOnModuleLoaded(url, cb) {
        return function (e) {
            console.log('module loaded');
            potions[url] = module.exports;

            if (typeof cb === 'function') {
                cb();
            }
        };
    }
}());
