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

	App.Views.Task = Backbone.View.extend({
		tagName: 'li',

		render: function () {
			var source = template('taskTemplate')
			this.$el.html(source(this.model.attributes));
			return this;
		}
	});

	var task = new App.Models.Task({
		title: "Get going buddy",
		priority: 5
	});

	var taskView = new App.Views.Task({ model: task });

	$('.tasks').html(taskView.render().el);

})();