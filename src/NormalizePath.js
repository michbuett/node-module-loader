module.exports = function normalize(path) {
    'use strict';

    var cleaned = path.replace(/\/+/g, '/').replace(/^(\.\/)?/, '').replace(/\.js\.js$/, '.js');
    var parts = cleaned.split('/');
    var result = [];

    for (var i = 0, l = parts.length; i < l; i++) {
        var nextPart = parts[i];
        var lastPart = result[result.length - 1];

        if (nextPart === '..' && lastPart && lastPart !== '..') {
            result.pop();
        } else {
            result.push(nextPart);
        }
    }

    return result.join('/');
};
