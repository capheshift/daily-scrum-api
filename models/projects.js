var mongoose = require('mongoose');
var Schema= mongoose.Schema;
var Utilities = require('../config/utilities');
var Config = require('../config/config');

var ProjectSchema = new Schema({

});

module.exports = mongoose.model('Projects',ProjectSchema);