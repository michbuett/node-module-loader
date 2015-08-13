(function () {
    'use strict';

    var moduleToFile = {
        './potions/PotionA': '../tests/potions/PotionA.js',
        'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',

        // './potions/PotionA': 'potions/PotionA.js',
        // './potions/PotionB': 'potions/PotionB.js',
        // './PotionB': 'potions/PotionB.js',
        // './PotionC': 'potions/PotionC.js',
        // 'alchemy.js': '../node_modules/alchemy.js/lib/core/Alchemy.js',
    };
    var potions = {};
    var requestedUrls = {};

    window.module = window.module || {};
    window.require = function (moduleName) {
        var url = moduleToFile[moduleName];
        var potion = potions[url];

        return potion;
    };

    // var onLoad = window.onload;
    window.onload = null; // allow trigger when ready

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
        if (!url || requestedUrls[url]) {
            return;
        }

        requestedUrls[url] = true;

        var script = document.createElement('script');
        script.src = url;
        script.async = false; // preserve execution order
        script.onload = createOnModuleLoaded(url, cb);
        document.head.appendChild(script);

        console.log('load ' + url);
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
