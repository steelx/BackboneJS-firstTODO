(function () {
	
	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	window.template = function (id) {
		return _.template( $('#' + id).html() );
	}

	App.Models.Task = Backbone.Model.extend({});

	App.Collections.Tasks = Backbone.Collection.extend({
		model: App.Models.Task
	});

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul',

		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function (task) {
			//this receives single model ie. task
			var taskView = new App.Views.Task({ model: task });

			//append to root Tasks UL element
			this.$el.append( taskView.render().el );
		}
	});

	App.Views.Task = Backbone.View.extend({
		tagName: 'li',

		render: function () {
			this.$el.html( this.model.get('title') );
			return this;
		}
	});

	var tasks = new App.Collections.Tasks([
		{
			title: "Get BackboneJS",
			priority: 5
		},
		{
			title: "Punch in LoDash",
			priority: 4
		},
		{
			title: "NodeJS on the way",
			priority: 3
		}
	]);

	var tasksView = new App.Views.Tasks({ model: tasks });

	$('.tasks').html(tasksView.render().el);

})();