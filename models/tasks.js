var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	_userId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'Users'
	},
	isCompleted: {
		type: Boolean,
		default: false
	},
	date: String,
	content: String,
	createAt: {
		type: Date,
		default: Date.now
	},
	estimation: Number
}, {
	collection: 'users'
});

module.exports = mongoose.model('Tasks', TaskSchema);
