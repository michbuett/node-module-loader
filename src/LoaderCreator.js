'use strict';

var fs = require('fs');
var path = require('path');
var resolve = require('resolve');
var each = require('pro-singulis');

module.exports = {
    collectScripts: collectScripts,
    createDependencyMap: createDependencyMap,
};

/** @private */
function collectScripts(root, initial) {
    function findNext(map) {
        var scripts = Object.keys(map);

        for (var i = 0, l = scripts.length; i < l; i++) {
            var module = scripts[i];

            if (Object.keys(map[module]).length === 0) {
                return module;
            }
        }

        throw 'Cannot find module without dependencies';
    }

    function removeModule(dependencies, name) {
        if (name === module) {
            return;
        }

        return each(dependencies, function (moduleB) {
            if (moduleB !== module) {
                return moduleB;
            }
        });
    }

    var map = createDependencyMap(root, initial);
    var result = [];
    var module;

    while (Object.keys(map).length > 0) {
        module = findNext(map);
        map = each(map, removeModule);
        result.push(module);
    }

    return result;
}

/** @private */
function findRequired(filepath) {
    var code = fs.readFileSync(filepath, 'utf8').replace(/\n/g, ' ');
    var matches = code.match(/require\(\'.*?\'\)/g) || [];

    return matches.map(function (match) {
        return match.replace(/^require\((\'|\")/, '').replace(/(\'|\")\)$/, '');
    });
}

/** @private */
function createDependencyMap(root, initial) {
    var visited = {};
    var unresolved = (initial ? [].concat(initial) : []).map(function (moduleName) {
        return path.relative(root, resolve.sync(moduleName, {
            basedir: root
        }));
    });


    while (unresolved.length > 0) {
        var filepath = unresolved.shift();
        if (visited[filepath]) {
            continue;
        }

        var map = createMapForModule(root, filepath);

        unresolved = unresolved.concat(values(map));
        visited[filepath] = map;
    }

    return visited;
}

/** @private */
function createMapForModule(root, module) {
    var filepath = root + '/' + module;
    var required = findRequired(filepath);
    var result = {};
    var dirname = path.dirname(filepath);

    for (var i = 0, l = required.length; i < l; i++) {
        var key = required[i];
        var absPath = resolve.sync(key, { basedir: dirname });
        result[key] = path.relative(root, absPath);
    }

    return result;
}

/** @private */
function values(object) {
    var result = [];

    each(object, function (val) {
        if (result.indexOf(val) < 0) {
            result.push(val);
        }
    });

    return result;
}
