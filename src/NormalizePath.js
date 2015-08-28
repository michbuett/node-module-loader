module.exports = function normalize(path, mapping) {
    'use strict';

    var cleaned = path.replace(/\/+/g, '/').replace(/^(\.\/)?/, '').replace(/\.js\.js$/, '.js');
    var parts = cleaned.split('/');
    var result = [];
    var i, l;

    for (i = 0, l = parts.length; i < l; i++) {
        var nextPart = parts[i];
        var lastPart = result[result.length - 1];

        if (nextPart === '..' && lastPart && lastPart !== '..') {
            result.pop();
        } else {
            result.push(nextPart);
        }
    }

    result = result.join('/');

    if (mapping && typeof mapping === 'object') {
        Object.keys(mapping).forEach(function (searchKey) {
            var replacement = mapping[searchKey];
            var searchExp = new RegExp('^' + searchKey);
            result = result.replace(searchExp, replacement);
        });
    }

    return result;
};
