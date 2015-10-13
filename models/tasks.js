var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
});

module.exports = mongoose.model('Tasks',TaskSchema);
