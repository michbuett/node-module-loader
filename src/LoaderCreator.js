'use strict';

var fs = require('fs');
var path = require('path');
var resolve = require('resolve');

module.exports = {
    collectScripts: collectScripts
};

/** @private */
function collectScripts(root, initial) {
    var visited = {};
    var unresolved = (initial ? [].concat(initial) : []).map(function (moduleName) {
        return resolve.sync(moduleName, {
            basedir: root
        });
    });


    while (unresolved.length > 0) {
        var filepath = unresolved.shift();
        if (visited[filepath]) {
            continue;
        }

        visited[filepath] = true;
        unresolved = unresolved.concat(findDepencies(filepath));
    }

    return Object.keys(visited).map(function (absPath) {
        return path.relative(root, absPath);
    });
}

/** @private */
function findDepencies(filepath) {
    var dirname = path.dirname(filepath);
    var code = fs.readFileSync(filepath, 'utf8').replace(/\n/g, ' ');
    var matches = code.match(/require\(\'.*?\'\)/g) || [];

    var dependencies = matches.map(function (match) {
        return match.replace(/^require\((\'|\")/, '').replace(/(\'|\")\)$/, '');
    }).filter(function (module) {
        return module !== 'alchemy.js'; // TODO: support alchemy
    }).map(function (moduleName) {
        return resolve.sync(moduleName, { basedir: dirname });
    });

    return dependencies;
}
