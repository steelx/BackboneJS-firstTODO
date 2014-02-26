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

})();