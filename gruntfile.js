module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                livereload: false,
            },
            css: {
                files: ['./layouts/sass/*.scss'],
                tasks: ['css'],
            }
        },
        sass: {
            dist: {
                options: {
                },
                files: {
                    './layouts/style.css': './layouts/sass/style.scss'
                }
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({ browsers: 'last 2 versions' }),
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: './layouts/style.css'
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['**/*.{html}', './layouts/style.css']
                },
                options: {
                    server: {
                        baseDir: "./layouts",
                    },
                    watchTask: true,
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('css', ['sass', 'postcss']);
    grunt.registerTask('up', ['browserSync', 'watch']);
};
