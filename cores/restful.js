/**
 * capheshfit
 * @author Tw
 */

var utils = require('../config/utilities');

module.exports = function(bll)
{
  /**
   * get method: abc/{id}
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  var _get = function(req, res, next) {
    var params = req.params;

    bll.findOne(params).exec().then(
    function(data) {
      res.json(data);
    },
    function(err) {
      res.json(err);
    });
  };

  /**
   * [_getAll description]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  var _getAll = function(req, res, next) {

    bll.find({}).exec().then(
    function(data) {
      res.json(data);
    },
    function(err) {
      res.json(err);
    });
  };

  /**
   * [_post description]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  var _post = function(req, res, next) {
    var params = req.params;
    var body = req.body;
  };

  /**
   * [_put description]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  var _put = function(req, res, next) {
  };

  /**
   * [_delete description]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  var _delete = function(req, res, next) {
  };

  return {
    _get: _get,
    _getAll: _getAll,
    _post: _post,
    _put: _put,
    _delete: _delete
  };
};
