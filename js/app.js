(function($){

	var Item = Backbone.Model.extend({
		defaults: {
			part1: 'hello',
			part2: 'world'
		}
	});

	var List = Backbone.Collection.extend({
		model: Item
	});

	var ItemView = Backbone.View.extend({
		tagName: 'li',
		initialize: function(){
			_.bindAll(this, 'render');
		},
		render: function(){
			$(this.el).html('<span>' + this.model.get('part1') + ' ' + this.model.get('part2') + '</span>');
			return this; // for chainable calls
		}
	});

	var ListView = Backbone.View.extend({
		el: 'body', // attaches 'this.el' to an existing element

		events: {
			'click button#add': 'addItem'
		},

		initialize: function(){
			_.bindAll(this, 'render', 'addItem', 'appendItem'); // seems not necessary

			this.collection = new List();
			this.collection.bind('add', this.appendItem); // collection event binder

			this.counter = 0; // total number of items added thus far
			this.render();
		},

		render: function(){
			var self = this;

			$(this.el).append("<button id='add'>Add list item</button>");
			$(this.el).append("<ul></ul>");
			_(this.collection.models).each(function(item){ // in case collection is not empty
				self.appendItem(item);
			}, this);
		},

		addItem: function(){
			this.counter++;
			var item = new Item();
			item.set({
				part2: item.get('part2') + this.counter // modify item defaults
			});
			this.collection.add(item); // add item to collection; view is updated via event 'add'
		},

		appendItem: function(item){
			var itemView = new ItemView({
				model: item
			});
			$('ul', this.el).append(itemView.render().el);
		}
	});

	var listView = new ListView();
})(jQuery);