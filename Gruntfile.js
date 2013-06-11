module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'js/main.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    window: true
                }
            }
        },
        less: {
            development: {
                files: {
                    "css/main.css": "css/development/index.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "css/main.min.css": "css/development/index.less"
                }
            }
        },
        uglify: {
            my_target: {
                options: {
                    mangle: {
                        except: ['jQuery', 'Backbone']
                    }
                },
                files: {
                    'js/main.min.js': ['js/vendor/*.js', 'js/main.js']
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>', 'css/development/*.less'],
            tasks: ['jshint', 'less', 'uglify']
        },
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('watch', 'watch');
    grunt.registerTask('default', ['jshint', 'less', 'uglify']);
};