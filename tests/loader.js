(function () {
    'use strict';

    var moduleList = [
        'node_modules/alchemy.js/lib/core/Alchemy.js',
        'tests/potions/PotionD.js',
        'tests/potions/PotionC.js',
        'tests/potions/PotionB.js',
        'tests/potions/PotionA.js',
    ];

    var dependencyMap =  {
        'tests/potions/PotionA.js': {
            'alchemy.js': 'node_modules/alchemy.js/lib/core/Alchemy.js',
            './PotionB': 'tests/potions/PotionB.js',
            './PotionD': 'tests/potions/PotionD.js',
        },

        'node_modules/alchemy.js/lib/core/Alchemy.js': {},

        'tests/potions/PotionB.js': {
            'alchemy.js': 'node_modules/alchemy.js/lib/core/Alchemy.js',
            './PotionC': 'tests/potions/PotionC.js',
        },

        'tests/potions/PotionC.js': {
            'alchemy.js': 'node_modules/alchemy.js/lib/core/Alchemy.js',
        },

        'tests/potions/PotionD.js': {
            'alchemy.js': 'node_modules/alchemy.js/lib/core/Alchemy.js',
        },
    };

    var modules = {};
    window.modules = modules; // for debugging;

    window.module = {
        get exports() {
            return null;
        },

        set exports(exp) {
            modules[currentScriptName] = exp;
        },
    };

    window.require = function (name) {
        var moduleName;

        if (currentScriptName) {
            var dependencies = dependencyMap[currentScriptName];

            moduleName = dependencies[name];
        } else {
            moduleName = (name + '.js').replace(/^\.\//, '').replace(/\.js\.js$/, '.js');
        }

        return modules[moduleName];
    };

    var onLoad = window.onload || function () {};
    var counter = moduleList.length;
    var currentScriptName = moduleList[0];

    window.onload = null; // allow trigger when ready

    moduleList.forEach(function (moduleName, i) {
        var script = document.createElement('script');

        script.dataset.name = moduleName;
        script.src = moduleName;
        script.async = false; // preserve execution order
        script.onload = function () {
            counter--;

            currentScriptName = moduleList[i + 1];

            if (counter === 0) {
                onLoad();
            }
        };

        document.head.appendChild(script);
    });
}());
