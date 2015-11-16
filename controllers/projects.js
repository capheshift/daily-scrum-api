// capheshift.github.io 2015
// @author: Tw

var _ = require('lodash');
var mongoose = require('mongoose');
var Projects = mongoose.model('Projects');
var UserProject = mongoose.model('UserProject');
var Utilities = require('../config/utilities');
var Config = require('../config/config');
var RestApi = require('../cores/restful');

var async = require('async');
var utils = require('../config/utilities');
var debug = require('debug')('ctrl00');

module.exports = exports = _.assign(RestApi(Projects), {
	// more custom function will be here
	_getAll: function(req, res) {
		debug('_getAll 2');

		Projects.find({}).populate(Projects.getPopulateFields()).exec().then(
		function(projectList) {
			var result = [];

			async.each(projectList, function(item, callback) {
				// debug('item', item);
				var model = _.clone(item)._doc;
				UserProject.find({_project: item._id}).populate('_user').exec()
				.then(function(nData) {
					model.members = nData;
					result.push(model);
					debug('DONE', model.name, model.members.length);
					callback();
				});
			}, function(err) {
				res.jsonp(utils.response(true, result));
			});
		},
		function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	},

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
