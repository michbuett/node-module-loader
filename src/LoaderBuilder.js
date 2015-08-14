'use strict';

// var path = require('path');
var fs = require('fs');
var template = require('lodash.template');
var analyzer = require('./DependencyAnalyzer');

module.exports = {

    build: function buildLoader(cfg) {
        var rootpath = cfg.root;
        var startModules = cfg.modules;
        var targetName = cfg.target;
        var moduleList = analyzer.collectScripts(rootpath, startModules);
        var dependencyMap = analyzer.createDependencyMap(rootpath, startModules);
        var loaderScript = template(fs.readFileSync('templates/loader.tpl', 'utf8'))({
            moduleList: JSON.stringify(moduleList),
            dependencyMap: JSON.stringify(dependencyMap),
        });

        fs.writeFileSync(targetName, loaderScript);
    },
};
