describe('NormalizePath', function () {
    'use strict';

    var normalize = require('../../../src/NormalizePath');

    it('removes double slashes', function () {
        expect(normalize('foo//bar////baz')).toBe('foo/bar/baz');
    });

    it('removes a leading "./"', function () {
        expect(normalize('./foo')).toBe('foo');
        expect(normalize('../foo')).toBe('../foo');
    });

    it('removes double ".js" file endings', function () {
        expect(normalize('foo.js')).toBe('foo.js');
        expect(normalize('../foo/bar.js.js')).toBe('../foo/bar.js');
    });

    it('takes care of the "../" parts', function () {
        console.log(require('path').normalize('../../foo/../../bar'));

        expect(normalize('foo/bar/../baz')).toBe('foo/baz');
        expect(normalize('foo/bar/../../baz')).toBe('baz');


    });
});
