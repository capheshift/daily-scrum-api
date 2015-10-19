var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	_user: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'Users'
	},

	_project: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'Projects'
	},

	isCompleted: {
		type: Boolean,
		default: false
	},

	date: {
		type: String
	},

	content: {
		type: String
	},

	estimation: {
		type: Number
	},

	createdDate: {
		type: Date,
		default: Date.now
	},
}, {
	collection: 'tasks'
});

TaskSchema.statics = {
	getPopulateFields: function() {
		return '_user _project';
	}
};

module.exports = mongoose.model('Tasks', TaskSchema);
