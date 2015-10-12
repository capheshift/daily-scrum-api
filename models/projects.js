var mongoose = require('mongoose');
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
    defaults: Date.now
  }
});

module.exports = mongoose.model('Projects', ProjectSchema);
