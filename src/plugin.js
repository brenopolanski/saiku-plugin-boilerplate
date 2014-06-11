var NamePlugin = Backbone.View.extend({
	initialize: function(args) {
		// Keep track of parent workspace
		this.workspace = args.workspace;

		// Binds a number of methods on the object, specified by methodNames, to be run in
		// the context of that object whenever they are invoked. Very handy for binding functions
		// that are going to be used as event handlers, which would otherwise be invoked with a
		// fairly useless this. methodNames are required.
		// link: http://underscorejs.org/#bindAll

		// Maintain `this` in callbacks
		_.bindAll(this, 'event1', 'event2');

		// Add button in workspace toolbar
		this.add_button();

		this.html = $('<h1>Hello World!!</h1>');

		console.log(this);

		// Append HTML to workspace
		// $(this.workspace.el).find('.workspace_results').prepend($(this.el).hide()).prepend(this.html.hide());
		$(this.workspace.el).find('.workspace_results').prepend(this.html.hide());
	},

	add_button: function() {
		var button =
			$('<a href="#namePlugin" class="namePlugin button disabled_toolbar i18n" title="Description namePlugin"></a>')
			.css({ 'background-image': 'url("js/saiku/plugins/Helloworld/image/plugin.png")',
				   'background-repeat': 'no-repeat',
				   'background-position': '50% 50%',
				   'background-size': '16px'
				});

		var li = $('<li class="seperator"></li>').append(button);
		$(this.workspace.toolbar.el).find('ul').append(li);
		this.workspace.toolbar.namePlugin = this.show;
	},

	show: function(event) {
		// pega alguma informação do workspace

		// oculta table do workspace
		$(this.workspace.el).find('.workspace_results table').toggle();
		$(event.target).toggleClass('on');

		// habilita/desabilita botão modo de tabela
		if ($(event.target).hasClass('on')) {
			$('.render_table').toggleClass('on');
			// this.render();
		}
		else {
			$('.render_table').toggleClass('on');
		}
	},

	render: function() {
		// é chamado para renderizar alguma informação workspcace
	},

	process_data: function(args) {
		// pega informações do result set
	},

	event1: function() {
	},

	event2: function() {
	}
});

// carrega css
function loadCSS(file) {
	var headID    = document.querySelector('head');
	var cssNode   = document.createElement('link');
	cssNode.type  = 'text/css';
	cssNode.rel   = 'stylesheet';
	cssNode.href  = file;
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
}

// carrega js
function loadJS(file) {
	var headID  = document.querySelector('head');
	var jsNode  = document.createElement('script');
	jsNode.type = 'text/javascript';
	jsNode.src  = file;
	headID.appendChild(jsNode);
}

Saiku.events.bind('session:new', function(session) {
	function new_workspace(args) {
		if (typeof args.workspace.namePlugin === 'undefined') {
			args.workspace.namePlugin = new NamePlugin({ workspace: args.workspace });
		}
	}

	// Attach stats to existing tabs
	for (var i = 0, len = Saiku.tabs._tabs.length; i < len; i++) {
		var tab = Saiku.tabs._tabs[i];
		new_workspace({
			workspace: tab.content
		});
	}

	// Attach stats to future tabs
	Saiku.session.bind('workspace:new', new_workspace);
});