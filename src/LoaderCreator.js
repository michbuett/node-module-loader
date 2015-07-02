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
    if (/^.*\/Alchemy\.js$/.test(filepath)) {
        // no further parsing of alchemy core which is not neccessary
        return [];
    }

    var dirname = path.dirname(filepath);
    var code = fs.readFileSync(filepath, 'utf8').replace(/\n/g, ' ');
    var matches = code.match(/require\(\'.*?\'\)/g) || [];

    return matches.map(function (match) {
        var moduleName = match.replace(/^require\((\'|\")/, '').replace(/(\'|\")\)$/, '');
        return resolve.sync(moduleName, { basedir: dirname });
    });
}
