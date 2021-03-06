/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [ 'build/latest.css' ]
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['styles']
                },
                files: {
                    'build/latest.css': 'main.less'
                }
            },
            production: {
                options: {
                    paths: ['styles'],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
                        new (require('less-plugin-clean-css'))({advanced:true, compatibility: 'ie8'})
                    ],
                    modifyVars: {
                        imgPath: '"http://static.bbc.co.uk/"',
                        bgColor: 'red'
                    }
                },
                files: {
                    'build/latest.css': 'main.less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');

    grunt.registerTask('default', ['less:development']);
    grunt.registerTask('build', ['less:production', 'usebanner:dist']);

};
