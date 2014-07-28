var DemoModal = Modal.extend({
    type: 'demoModal',
    
    initialize: function(args) {
        this.options.title = 'Demo Modal';
        this.message = 'Let\'s Go Rock and Roll :D';
        this.bind('open', function() {
       		var self = this;
        	$(self.el).parents('.ui-dialog').css({ width: '550px' });
        });
    }
});