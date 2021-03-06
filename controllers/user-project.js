// capheshift.github.io 2015
// @author: Tw

var _ = require('lodash');
var mongoose = require('mongoose');
var UserProject = mongoose.model('UserProject');
var Utilities = require('../config/utilities');
var Config = require('../config/config');
var RestApi = require('../cores/restful');

module.exports = exports = _.assign(RestApi(UserProject), {
	// more custom function will be here
	/**
	 * getAll: function() {
	 *   return {};
	 * }
	 */
	test: function(req, res) {
		res.json({
			status: 'OK'
		});
	}
});
