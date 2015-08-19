'use strict';

var fs = require('fs');
var path = require('path');
var template = require('lodash.template');
var analyzer = require('./DependencyAnalyzer');
var loaderTpl = path.resolve(__dirname, '../templates/loader.tpl');

module.exports = {

    build: function buildLoader(cfg) {
        var rootpath = cfg.root;
        var startModules = cfg.modules;
        var targetName = cfg.target;
        var dependencyMap = analyzer.createDependencyMap(rootpath, startModules);
        var moduleList = analyzer.collectScripts(dependencyMap);
        var moduleHashes = analyzer.collectHashes(moduleList);
        var loaderScript = template(fs.readFileSync(loaderTpl, 'utf8'))({
            moduleList: JSON.stringify(moduleList),
            moduleHashes: JSON.stringify(moduleHashes),
            dependencyMap: JSON.stringify(dependencyMap),
        });

        fs.writeFileSync(targetName, loaderScript);
    },
};
