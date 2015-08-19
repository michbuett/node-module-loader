(function () {
    'use strict';

    var moduleList = <%= moduleList %>;
    var dependencyMap =  <%= dependencyMap %>;
    var sourcePath = '<%= sourcePath %>';
    var normalize = <%= normalize %>;
    var modules = {};
    var onLoad = window.onload || function () {};
    var counter = moduleList.length;
    var currentScriptName = moduleList[0];

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
            moduleName = normalize(sourcePath + name.replace(/^(\.\/)?(\.\.\/)*/, '') + '.js');
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

            if (counter === 0) {
                currentScriptName = null;
                onLoad();
            } else {
                currentScriptName = moduleList[i + 1];
            }
        };

        document.head.appendChild(script);
    });
}());
