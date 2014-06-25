var NamePlugin = Backbone.View.extend({
	initialize: function(args) {
		// Keep track of parent workspace
		this.workspace = args.workspace;

		// Create a ID for use as the CSS selector
        this.id = 'namePlugin';
        this.$el.attr({ id: this.id });

		// Binds a number of methods on the object, specified by methodNames, to be run in
		// the context of that object whenever they are invoked. Very handy for binding functions
		// that are going to be used as event handlers, which would otherwise be invoked with a
		// fairly useless this. methodNames are required.
		// link: http://underscorejs.org/#bindAll

		// Maintain `this` in callbacks
		_.bindAll(this, 'add_button', 'show', 'template', 'render', 'process_data', 
                  'event1', 'event2');

		// Add button in workspace toolbar
		this.add_button();
		
		// Add template HTML in workspace
		this.template();

		// Listen to adjust event
		this.workspace.bind('workspace:adjust', this.render);
	},

	add_button: function() {
		var button =
			$('<a href="#namePlugin" class="namePlugin button disabled_toolbar i18n" title="Description namePlugin"></a>')
			.css({ 'background-image': 'url("js/saiku/plugins/NamePlugin/image/plugin.png")',
				   'background-repeat': 'no-repeat',
				   'background-position': '50% 50%',
				   'background-size': '16px'
				});

		var li = $('<li class="seperator"></li>').append(button);
		this.workspace.toolbar.$el.find('ul').append(li);
		this.workspace.toolbar.namePlugin = this.show;
	},

	show: function(event) {
		this.workspace.$el.find('.workspace_results table').toggle();
		this.$el.toggle();
		$(event.target).toggleClass('on');

		// Enable/disabled button `render_table`
		if ($(event.target).hasClass('on')) {
			$('.render_table').toggleClass('on');
			
			// Render results in template HTML
			this.render();
		}
		else {
			$('.render_table').toggleClass('on');
		}
	},

	template: function() {
		// Create template HTML
		this.html = $('<h1>Let\'s Go Rock and Roll :D</h1>');

		// Add template in this.$el
		this.$el.html(this.html);

		// Insert template in workspace results
		$(this.workspace.$el).find('.workspace_results').prepend(this.$el.hide());
	},

	render: function() {
		// Render results
	},

	process_data: function(args) {
		// Process data from the result set
	},

	event1: function() {
		// Hi, you can add one event!! Let's Go :)
	},

	event2: function() {
		// Hi, you can add one event!! Let's Go :)
	}
});

 /**
  * Load file CSS
  * @param {String} file - Path of file css.
  */
function loadCSS(file) {
	var headID    = document.querySelector('head');
	var cssNode   = document.createElement('link');
	cssNode.type  = 'text/css';
	cssNode.rel   = 'stylesheet';
	cssNode.href  = file;
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
}

 /**
  * Load file JavaScript
  * @param {String} file - Path of file js.
  */
function loadJS(file) {
	var headID  = document.querySelector('head');
	var jsNode  = document.createElement('script');
	jsNode.type = 'text/javascript';
	jsNode.src  = file;
	headID.appendChild(jsNode);
}

 /**
  * Start Plugin
  */
Saiku.events.bind('session:new', function() {

	// loadCSS('js/saiku/plugins/NamePlugin/css/plugin.css');	
	// loadJS('js/saiku/plugins/NamePlugin/js/lib.js');

	function new_workspace(args) {
		if (typeof args.workspace.namePlugin === 'undefined') {
			args.workspace.namePlugin = new NamePlugin({ workspace: args.workspace });
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
