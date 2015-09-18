
var User, create, getAll, getById, update;
User = require('../models/user');

create = function(data) {
  return User.create(data);
};

update = function(id, data) {
  return User.findByIdAndUpdate(id, data).exec();
};

getById = function(id) {
  return User.getById(id).exec();
};

getAll = function() {
  return User.find({}).exec();
};

module.exports = {
  create: create,
  update: update,
  getById: getById,
  getAll: getAll
};
