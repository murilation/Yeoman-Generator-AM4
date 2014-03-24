'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        <% if (includeConcat) { %>
        concat: {
            dist: {
                src: [
                    'assets/js/libs/*.js',
                    'assets/js/global.js'
                ],
                dest: 'scripts/scripts.js',
            }
        }, <% } %>
        <% if (includeUglify) { %>
        uglify: {
            build: {
                src: 'scripts/scripts.js',
                dest: 'scripts/scripts.min.js'
            }
        },
        <% } %>
        <% if (includeImgMin) { %>
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/'
                }]
            }
        },
        <% } %>
        <% if (includeSass) { %>
        sass: {
            dist: {
                options: {
                    style: 'compact'
                },
                files: {
                    'css/estilo.css': 'assets/sass/estilo.sass'
                }
            }
        },
        <% } %>
        <% if (includeCSSmin) { %>
        cssmin: {
            build: {
                src: 'css/estilo.css',
                dest: 'css/estilo.min.css'
            }
        },
        <% } %>
        <% if (includeWatch) { %>
        watch: {
        	<% if (includeConcat || includeUglify) { %>
            scripts: {
                files: ['assets/js/*.js'],
                tasks: [<% if (includeConcat) { %>'concat', <% } if (includeUglify) { %>'uglify'<% } %>],
                options: {
                    spawn: false,
                },
            },
            <% } %>
            <% if (includeImgMin) { %>
            images: {
                files: ['assets/images/**/*.{png,jpg,gif}', 'assets/images/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                }
            },
            <% } %>
            <% if (includeSass || includeCSSmin) { %>
            css: {
                <% if (includeSass) { %>files: ['assets/sass/*.sass', 'assets/sass/*/*.sass'],<% } %>
                tasks: [<% if (includeSass) { %>'sass', <% } if (includeCSSmin){ %>'cssmin'<% } %>],
                options: {
                    spawn: false,
                }
            },
            <% } %>
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            }
        },
        <% } %>
        bowerInstall: {
            app: {
                src: ['page/index.aspx']
            }
        }
    });

	<% if (includeConcat) { %>
	grunt.loadNpmTasks('grunt-contrib-concat');
	<% } if (includeUglify) { %>
    grunt.loadNpmTasks('grunt-contrib-uglify');
    <% } if (includeImgMin) { %>
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    <% } if (includeWatch) { %>
    grunt.loadNpmTasks('grunt-contrib-watch');
    <% } if (includeSass) { %>
    grunt.loadNpmTasks('grunt-contrib-sass');
    <% } if (includeCSSmin) { %>
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    <% } %>
    grunt.loadNpmTasks('grunt-bower-install');

    grunt.registerTask('default', [<% if (includeConcat) { %>'concat', <% } if (includeUglify) { %>'uglify', <% } if (includeImgMin) { %>'imagemin', <% } if(includeCSSmin) { %>'cssmin', <% } if(includeSass) { %>'sass', <% } if (includeWatch) { %>'watch'<% } %>]);
}