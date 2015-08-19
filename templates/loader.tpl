(function () {
    'use strict';

    var moduleList = <%= moduleList %>;
    var moduleHashes = <%= moduleHashes %>;
    var dependencyMap =  <%= dependencyMap %>;
    var modules = {};
    var onLoad = window.onload || function () {};
    var counter = moduleList.length;
    var currentScriptName = moduleList[0];

    window.module = {
        get exports() {
            return null;
        },

        set exports(exp) {
            // console.log('register', exp, HashCode(exp));
            modules[currentScriptName] = exp;
        },
    };

    window.require = function (name) {
        var moduleName;

        if (currentScriptName) {
            var dependencies = dependencyMap[currentScriptName];

            moduleName = dependencies[name];
        } else {
            moduleName = (name + '.js').replace(/^(\.\/)?(\.\.\/)*/, '').replace(/\.js\.js$/, '.js');
        }

        return modules[moduleName];
    };


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
