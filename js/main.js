(function () {
	
	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {}
	};

	window.template = function (id) {
		return _.template( $('#' + id).html() );
	}

	App.Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'account': 'account',
			'*other': 'default'
		},

		index: function(){
			console.log('Welcome to Homepage.');
		},

		account: function(){
			console.log('Edit your account settings.');
		},

		default: function(){
			console.log('404 page!!!');
		}
	});

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

		initialize: function(){
			this.collection.on('add', this.addOne, this);
		},

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

	App.Views.AddTask = Backbone.View.extend({
		el: '#addTaskForm',

		initialize: function () {
			// body...
		},

		events: {
			'submit': 'submit'
		},

		submit: function (e) {
			e.preventDefault();
			var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();
			$(e.currentTarget).find('input[type=text]').val('')

			// if(! newTaskTitle){return};
			var newTask = new App.Models.Task({
				title: newTaskTitle
			});

			this.collection.add(newTask);

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

	var newTaskView = new App.Views.AddTask({ collection: tasks });

	var tasksView = new App.Views.Tasks({ collection: tasks });

	$('.tasks').html(tasksView.render().el);

	new App.Router;
	Backbone.history.start();

})();