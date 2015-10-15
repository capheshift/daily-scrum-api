var mongoose = require('mongoose');
var Tasks = mongoose.model('Tasks');
var Config = require('../config/config');
var Utilities = require('../config/utilities');

exports.getTaskById = function(req, res) {
	Tasks.findById(req.params.taskId,function(err,task){
		if (err) {
			return res.jsonp(Utilities.response(false,{},'Do not get Task by taskId',404));
		}else{
			return res.jsonp(Utilities.response(true,task));
		}
	})
};

exports.getTaskByUserId = function(req, res) {
    Tasks.find({
        _userId: req.user._id.toString()
    }).populate('_id').exec(function(err, tasks) {
        if (err) {
            return res.jsonp(Utilities.response(false, {}, 'Do not get tasks by userId'));
        } else {
            res.jsonp(Utilities.response(true, tasks));
        }
    });
};

exports.createTask = function(req, res) {
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
    })
};

exports.updateTask = function(req, res) {

};

exports.deleteTask = function(req, res) {
    Tasks.findByIdAndRemove(
        req.user._id.toString(),
        function(err) {
            if (err) {
                return res.jsonp(Utilities.response(false, {}, 'Do not delete Task ', 404));
            } else {
                return res.jsonp(true, 'Deleted');
            }
        });
};
