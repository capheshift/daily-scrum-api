// capheshift.github.io 2015
// @author: Tw

var mongoose = require('mongoose');
var utils = require('../config/utilities');
var config = require('../config/config');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	name: {
		type: String,
		require: true,
		trim: true
	},

	scrumMaster: {
		type: Schema.Types.ObjectId,
		ref: 'Users'
	},

	createdDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Projects', ProjectSchema);
