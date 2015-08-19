/**
 * Javascript HashCode v1.0.0
 * This function returns a hash code (MD5) based on the argument object.
 * http://pmav.eu/stuff/javascript-hash-code
 *
 * Example:
 *  var s = "my String";
 *  alert(HashCode.value(s));
 *
 * pmav, 2010
 */
var HashCode = function () {
    'use strict';

    function serialize(object) {
        var type = typeof object;
        var serializedCode = [];

        if (type === 'object') {
            var element;

            for (element in object) {
                serializedCode.push('[', element, ':', serialize(object[element]), ']');
            }

        } else if (type === 'function') {
            serializedCode.push('[', object.toString(), ']');
        } else {
            serializedCode.push('[', object, ']');
        }

        return serializedCode.join('');
    }

    return function (object) {
        return MD5(serialize(object));
    };
}();
