module.exports = function(grunt) {
	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON('saiku.boilerplate.json'),

		// Banner definitions
		meta: {
			banner: '/**\n' +
			        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
			        ' * <%= pkg.description %>\n' +
			        ' *\n' +
			        ' * Made by <%= pkg.author.name %>\n' +
			        ' * Under <%= pkg.licenses[0].type %> License\n' +
			        ' */\n'
		},

		// Concat definitions
		concat: {
			dist: {
				src: ['src/plugin.js'],
				dest: 'NamePlugin/plugin.js'
			},
			options: {
				banner: '<%= meta.banner %>'
			}
		},

		// Lint definitions
		jshint: {
			files: ['src/plugin.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Copy definitions
		copy: {
			main: {
				src: 'src/image/plugin.png',
				dest: 'NamePlugin/image/plugin.png'
			}
		}
	});

	// These plugins provide necessary tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// By default, lint and run all tests
	grunt.registerTask('default', ['jshint', 'concat', 'copy']);
	grunt.registerTask('travis', ['jshint']);
};