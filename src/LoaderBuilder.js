'use strict';

var fs = require('fs');
var path = require('path');
var template = require('lodash.template');
var analyzer = require('./DependencyAnalyzer');
var loaderTpl = path.resolve(__dirname, '../templates/loader.tpl');
var normalize = require('./NormalizePath');

module.exports = {

    build: function buildLoader(cfg) {
        var rootpath = cfg.root;
        var startModules = cfg.modules;
        var targetName = cfg.target;
        var dependencyMap = analyzer.createDependencyMap(rootpath, startModules);
        var moduleList = analyzer.collectScripts(dependencyMap);
        var loaderScript = template(fs.readFileSync(loaderTpl, 'utf8'))({
            sourcePath: cfg.sourcePath || '',
            normalize: normalize.toString().replace(/([\)\(\{\}\,\;])\s+/g, '$1'),
            moduleList: JSON.stringify(moduleList),
            dependencyMap: JSON.stringify(dependencyMap),
        });

        fs.writeFileSync(targetName, loaderScript);
    },
};
