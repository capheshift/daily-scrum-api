// @capheshift.github.io 2015
// @author

var _ = require('lodash');
var mongoose = require('mongoose');
var Tasks = mongoose.model('Tasks');
var Config = require('../config/config');
var Utilities = require('../config/utilities');
var RestApi = require('../cores/restful');

module.exports = exports = _.assign(RestApi(Tasks), {

    getTaskById: function(req, res) {
        Tasks.findById(req.params.taskId, function(err, task) {
            if (err) {
                return res.jsonp(Utilities.response(false, {}, 'Do not get Task by taskId', 404));
            } else {
                return res.jsonp(Utilities.response(true, task));
            }
        });
    },

    getTaskByUserId: function(req, res) {
        Tasks.find({
            _userId: req.user._id.toString()
        }).populate('_id').exec(function(err, tasks) {
            if (err) {
                return res.jsonp(Utilities.response(false, {}, 'Do not get tasks by userId'));
            } else {
                res.jsonp(Utilities.response(true, tasks));
            }
        });
    },

    createTask: function(req, res) {
        console.log(req.body);
        var task = new Tasks({
            '_userId': req.user._id.toString(),
            'isCompleted': req.body.isCompleted,
            'date': req.body.date,
            'content': req.body.content,
            'estimation': req.body.estimation
        });
        console.log(task);
        task.save(function(err, task) {
            if (err) {
                return res.jsonp(Utilities.response(false, {}, 'Do not save Task to Database', 404));
            } else {
                return res.jsonp(Utilities.response(true, task));
            }
        });
    },

    updateTask: function(req, res) {
        Tasks.findByIdAndUpdate(req.params.taskId, req.body, function(err, note) {
            if (err) {
                return res.jsonp(Utilities.response(false, {}, 'Do not delete Task ', 404));
            } else {
                return res.jsonp(true, 'Deleted');
            }
        });

    },

    deleteTask: function(req, res) {
        Tasks.findByIdAndRemove(
            req.user._id.toString(),
            function(err) {
                if (err) {
                    return res.jsonp(Utilities.response(false, {}, 'Do not delete Task ', 404));
                } else {
                    return res.jsonp(true, 'Deleted');
                }
            });
    }
});

// <<<<<<< HEAD
// exports.getTaskById = function(req, res) {
//     Tasks.findById(req.params.taskId, function(err, task) {
//         if (err) {
//             return res.jsonp(Utilities.response(false, {}, 'Do not get Task by taskId', 404));
//         } else {
//             return res.jsonp(Utilities.response(true, task));
//         }
//     })
// };

// exports.getTaskByUserId = function(req, res) {
//     Tasks.find({
//         _userId: req.user._id.toString()
//     }).populate('_id').exec(function(err, tasks) {
//         if (err) {
//             return res.jsonp(Utilities.response(false, {}, 'Do not get tasks by userId'));
//         } else {
//             res.jsonp(Utilities.response(true, tasks));
//         }
//     });
// };

// exports.createTask = function(req, res) {
//     console.log(req.body);
//     var task = new Tasks({
//         '_userId': req.user._id.toString(),
//         'isCompleted': req.body.isCompleted,
//         'date': req.body.date,
//         'content': req.body.content,
//         'estimation': req.body.estimation
//     });
//     console.log(task);
//     task.save(function(err, task) {
//         if (err) {
//             return res.jsonp(Utilities.response(false, {}, 'Do not save Task to Database', 404));
//         } else {
//             return res.jsonp(Utilities.response(true, task));
//         }
//     })
// };

// exports.updateTask = function(req, res) {
//     Tasks.findByIdAndUpdate(req.params.taskId, req.body, function(err, note) {
//         if (err) {
//             return res.jsonp(Utilities.response(false, {}, 'Do not delete Task ', 404));
//         } else {
//             return res.jsonp(true, 'Deleted');
//         }
//     });
// };

// exports.deleteTask = function(req, res) {
//     Tasks.findByIdAndRemove(
//         req.params.taskId,
//         function(err) {
//             if (err) {
//                 return res.jsonp(Utilities.response(false, {}, 'Do not delete Task ', 404));
//             } else {
//                 return res.jsonp(true, 'Deleted');
//             }
//         });
// };
// =======
// >>>>>>> d2b1b857d82314ac6ff1f1333af3e6e688953d88
