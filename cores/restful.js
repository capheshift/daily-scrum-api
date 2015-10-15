/**
 * capheshfit
 * @author Tw
 */
var utils = require('../config/utilities');
var debug = require('debug')('corerest');

module.exports = function(bll)
{
	/**
	 * method for return only one item
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	var _get = function(req, res, next) {
		var id = req.params._id;
		debug('_get', id);

		bll.findOne({_id: id}).exec().then(
		function(data) {
			res.json(data);
		},
		function(err) {
			res.json(err);
		});
	};

	/**
	 * return a list collection matched with query
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	var _getAll = function(req, res, next) {
		debug('_getAll');

		bll.find({}).exec().then(
		function(data) {
			res.json(data);
		},
		function(err) {
			res.json(err);
		});
	};

	/**
	 * [_find description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	var _find = function(req, res, next) {
		var query = req.params.query;
		debug('_find', query);

		bll.find(query).exec().then(function(data) {
			res.json({data: data});
		}, function(err) {
			res.json({err: err});
		});
	};

	/**
	 * create a new collection
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {collection} new collection return from server
	 */
	var _post = function(req, res, next) {
		var params = req.params;
		var body = req.body;
		debug('_post', params);
		debug('_post', body);

		bll.create(body).then(function(data) {
			res.json({
				data: data
			});
		},
		function(err) {
			res.json({
				err: err
			});
		});
	};

	/**
	 * update a collection
	 * params: id
	 * body: collection attributes
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return new collection from server
	 */
	var _put = function(req, res, next) {
		var id = req.params._id;
		var body = req.body;
		debug('_put', id);
		debug('_put', body);

		bll.findByIdAndUpdate(id, body).exec().then(function(data) {
			res.json({
				data: data
			});
		}, function(err) {
			res.json({
				err: err
			});
		});
	};

	/**
	 * [_delete description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	var _delete = function(req, res, next) {
		var id = req.params._id;
		debug('_delete', id);

		bll.remove({_id: id}).exec().then(function(data) {
			res.json({
				data: data
			});
		}, function(err) {
			res.json({
				err: err
			});
		});
	};

	return {
		_get: _get,
		_getAll: _getAll,
		_find: _find,
		_post: _post,
		_put: _put,
		_delete: _delete
	};
};
