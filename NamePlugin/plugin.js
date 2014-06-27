/**
 * Saiku UI Plugin Boilerplate - v0.1.0
 * A jump-start for Saiku UI plugins development.
 *
 * Made by Breno Polanski
 * Under MIT License
 */
var NamePlugin = Backbone.View.extend({
	initialize: function(args) {
		// Keep track of parent workspace
		this.workspace = args.workspace;

		// Create a ID for use as the CSS selector
        this.id = 'namePlugin';
        this.$el.attr({ id: this.id });

		// Maintain `this` in callbacks
		_.bindAll(this, 'add_button', 'show', 'template', 'render', 'receive_data', 
			      'process_data', 'event1', 'event2');

		// Add button in workspace toolbar
		this.add_button();
		
		// Add template HTML in workspace
		this.template();

		// Listen to result event
		this.workspace.bind('query:result', this.receive_data);

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
		this.workspace.$el.find('.workspace_results').prepend(this.$el.hide());
	},

	render: function() {
		// Render results...
	},

    receive_data: function(args) {
        return _.delay(this.process_data, 1000, args);
    },

    type_validation: function(value)	{
    	if (typeof(value) !== 'number' && isNaN(value.replace(/[^a-zA-Z 0-9.]+/g,''))) {
    		return 'String';
    	}
    	else {
    		return 'Numeric';
    	}
    },

	process_data: function(args) {
		var ROWS = args.data.cellset.length,
			COLUMNS = args.data.cellset[0].length;

		this.data = {
        	metadata: [],
        	resultset: [],
        	width: 0,
        	height: 0
        };

        if (args.data.cellset && args.data.cellset.length > 0) {
        	var row,
        		column,
        		lowestLevel = 0;
        	for (row = 0; row < ROWS; row += 1) {
        		if (args.data.cellset[row][0].type === 'ROW_HEADER_HEADER') {
        			this.data.metadata = [];
        			for (column = 0; column < COLUMNS; column += 1) {
        				if (args.data.cellset[row][column].type === 'ROW_HEADER_HEADER') {
        					this.data.metadata.shift();
        					lowestLevel = column;
        				}

        				this.data.metadata.push({
        					colIndex: column,
        					colType: this.type_validation(args.data.cellset[row + 1][column].value),
        					colName: args.data.cellset[row][column].value
        				});
        			}
        		}
        		else if (args.data.cellset[row][0].value !== 'null' && args.data.cellset[row][0].value !== '') {
        			var record = [];
        			this.data.width = COLUMNS;
        			for (column = lowestLevel; column < COLUMNS; column += 1) {
        				var value = args.data.cellset[row][column].value;

        				// check if the resultset contains the raw value, 
        				// if not try to parse the given value

        				if (args.data.cellset[row][column].properties.raw && 
        					args.data.cellset[row][column].properties.raw !== 'null' && column > 0) {

        					value = parseFloat(args.data.cellset[row][column].properties.raw);
        				}
        				else if (typeof(args.data.cellset[row][column].value) !== 'number' &&
                        	parseFloat(args.data.cellset[row][column].value.replace(/[^a-zA-Z 0-9.]+/g,'')) && column > 0) {

        					value = parseFloat(args.data.cellset[row][column].value.replace(/[^a-zA-Z 0-9.]+/g,''));
        				}
        				record.push(value);
        			}
        			this.data.resultset.push(record);
        		}
        	}
        	this.data.height = this.data.resultset.length;

        	// Render results
        	this.render();
        }
        else {
        	this.$el.text('No results');
        }
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
