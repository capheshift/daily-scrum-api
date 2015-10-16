// capheshift.github.io 2015
// @author: Tw

var mongoose = require('mongoose');
var utils = require('../config/utilities');
var config = require('../config/config');
var Schema = mongoose.Schema;

var UserProjectSchema = new Schema({

	_project: {
		type: Schema.Types.ObjectId,
		ref: 'Projects'
	},

	_user: {
		type: Schema.Types.ObjectId,
		ref: 'Users'
	},

	createdDate: {
		type: Date,
		default: Date.now
	}
});

UserProjectSchema.statics = {
	getPopulateFields: function() {
		return '_user _project';
	}
};

module.exports = mongoose.model('UserProject', UserProjectSchema);
