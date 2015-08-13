/* global module */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        availabletasks: {
            tasks: {}
        },

        // ////////////////////////////////////////////////////////////////////
        // JSHint (documented at http://www.jshint.com/docs/) and JSONLint
        jsonlint: {
            all: {
                files: [{
                    src: 'package.json'
                }]
            }
        },

        jshint: {
            files: [
                'Gruntfile.js',
                'src/**/*.js',
                'tests/**/*.js',
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },


        // ////////////////////////////////////////////////////////////////////
        // configure unit tests
        jasmine: {
            options: {
                display: 'short',
                keepRunner: true,
                summary: true,

                helpers: [
                    '_loader.js'
                ],

                specs: [
                    'tests/specs/web/*.spec.js',
                ],
            },

            all: {
                src: [],
            },

        },

        jasmine_node: {
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                useHelpers: true,
                specNameMatcher: 'spec',
            },

            all: [
                'tests/specs/node/'
            ]
        },

        // ////////////////////////////////////////////////////////////////////
        // configure watcher
        watch: {
            json: {
                files: ['**/.json'],
                tasks: ['jsonlint'],
            },

            js: {
                files: ['**/*.js'],
                tasks: ['test'],
            },
        },
    });


    // load grunt plugins
    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jasmine-node-new');
    grunt.loadNpmTasks('grunt-jsonlint');

    // define aliases
    grunt.registerTask('lint', ['jsonlint', 'jshint']);
    grunt.registerTask('test', ['lint', 'jasmine_node:all', 'buildLoader', 'jasmine:all']);
    grunt.registerTask('default', ['availabletasks']);

    grunt.registerTask('buildLoader', function () {
        grunt.log.writeln('Build webloader');

        var path = require('path');
        var fs = require('fs');
        var template = require('lodash.template');
        var creator = require('./src/LoaderCreator');
        var rootpath = path.resolve(__dirname, '');
        var loaderCode = template(fs.readFileSync('src/loader.js.tpl', 'utf8'))({
            moduleList: JSON.stringify(creator.collectScripts(rootpath, './tests/potions/PotionA')),
            dependencyMap: JSON.stringify(creator.createDependencyMap(rootpath, './tests/potions/PotionA')),
        });

        fs.writeFileSync('_loader.js', loaderCode);
    });
};
