
var UserBLL, create, getAll;
UserBLL = require('../business/user');

create = function(req, res) {
  var data;
  data = req.body;

  UserBLL.create(data).then(function() {
    res.send('created');
  });
};

getAll = function(req, res) {
  UserBLL.getAll().then(function(data) {
    res.send(data);
  });
};

module.exports = function(app) {
  app.post('/user/create', create);
  app.get('/user/getAll', getAll);
};
