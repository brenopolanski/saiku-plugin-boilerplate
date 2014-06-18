module.exports = function(grunt) {
	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON('saiku.boilerplate.json'),

		// Banner definitions
		meta: {
			banner: '/**\n' +
			        ' * <%= pkg.title || pkg.name %> - <%= pkg.version %>\n' +
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
				dest: 'dist/plugin.js'
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
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.registerTask('default', ['jshint', 'concat']);
	grunt.registerTask('travis', ['jshint']);
};