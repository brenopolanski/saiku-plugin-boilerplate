var NamePlugin = Backbone.View.extend({
	initialize: function(args) {
		// Keep track of parent workspace
		this.workspace = args.workspace;

		// Binds a number of methods on the object, specified by methodNames, to be run in
		// the context of that object whenever they are invoked. Very handy for binding functions
		// that are going to be used as event handlers, which would otherwise be invoked with a
		// fairly useless this. methodNames are required.
		// link: http://underscorejs.org/#bindAll

		// Maintain "this" in callbacks
		_.bindAll(this, 'event1', 'event2');

		// Add button in workspace toolbar
		this.add_button();
	},

	add_button: function() {
		var button =
			$('<a href="#namePlugin" class="namePlugin button disabled_toolbar i18n" title="Description namePlugin"></a>')
			.css({ 'background-image': 'url("js/saiku/plugins/NamePlugin/namePlugin.png")',
				   'background-repeat': 'no-repeat',
				   'background-position': '50% 50%',
				   'background-size': '16px'
				});

		var li = $('<li class="seperator"></li>').append(button);
		$(this.workspace.toolbar.el).find('ul').append(li);
		// this.workspace.toolbar.namePlugin = this.show;
	}

	event1: function() {
	},

	event2: function() {
	}
});

Saiku.events.bind('session:new', function(session) {
	function newWorkspace(args) {
		if (typeof args.workspace.namePlugin === 'undefined') {
			args.workspace.namePlugin = new NamePlugin({ workspace: args.workspace });
		}
	}

	// Attach stats to existing tabs
	for (var i = 0, len = Saiku.tabs._tabs.length; i < len; i++) {
		var tab = Saiku.tabs._tabs[i];
		newWorkspace({
			workspace: tab.content
		});
	}

	// Attach stats to future tabs
	Saiku.session.bind("workspace:new", newWorkspace);
});
