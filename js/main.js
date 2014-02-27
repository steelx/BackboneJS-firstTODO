(function () {
	
	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	window.template = function (id) {
		return _.template( $('#' + id).html() );
	}

	App.Models.Task = Backbone.Model.extend({
		validate: function (attrs) {
			if (! $.trim(attrs.title)) {
				return 'Empty value is not allowed!';
			}
		}
	});

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

		template: template('taskTemplate'),

		initialize: function () {
			this.model.on('change', this.render, this);
			this.model.on('remove', this.remove, this);
		},

		events: {
			'click .edit': 'editTask',
			'click .delete': 'destroyTask'
		},

		editTask: function () {
			var newTaskTitle = prompt("Edit this", this.model.get('title'));

			if (!newTaskTitle) {return};
			this.model.set('title', newTaskTitle);
		},

		destroyTask: function () {
			this.model.destroy();
		},

		remove: function () {
			this.$el.remove();
		},

		render: function () {
			var source = this.template(this.model.toJSON());
			this.$el.html(source);
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

	var tasksView = new App.Views.Tasks({ collection: tasks });

	$('.tasks').html(tasksView.render().el);

})();