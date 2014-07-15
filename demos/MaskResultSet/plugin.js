/**
 * Saiku UI Plugin Boilerplate - v0.1.0
 * A jump-start for Saiku UI plugins development.
 *
 * Made by Breno Polanski
 * Under MIT License
 */
var MaskResultSet = Backbone.View.extend({
	initialize: function(args) {
		// Keep track of parent workspace
		this.workspace = args.workspace;

		// Maintain `this` in callbacks
		_.bindAll(this, 'listener_data', 'mask_data');

		// Listen to result event
		this.workspace.bind('query:result', this.listener_data);
	},

    listener_data: function() {
        return _.delay(this.mask_data, 1000);
    },

	mask_data: function() {
		// add value to be changed
		var DATA = '10,553';

		$('table > tbody .data .datadiv').each(function() {
			if ($(this).html() === DATA) {
				$(this).text('Lorem ipsum');
			}
		});
	}
});

 /**
  * Start Plugin
  */
Saiku.events.bind('session:new', function() {

	function new_workspace(args) {
		if (typeof args.workspace.maskResultSet === 'undefined') {
			args.workspace.maskResultSet = new MaskResultSet({ workspace: args.workspace });
		}
	}

	// Add new tab content
	for (var i = 0, len = Saiku.tabs._tabs.length; i < len; i += 1) {
		var tab = Saiku.tabs._tabs[i];
		new_workspace({
			workspace: tab.content
		});
	}

	// New workspace
	Saiku.session.bind('workspace:new', new_workspace);
});