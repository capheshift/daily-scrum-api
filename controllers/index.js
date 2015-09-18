
var allowCors;

allowCors = function(request, response, next) {
  response.set('Access-Control-Allow-Origin', 'http://localhost:1010');
  response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Credentials', true);
  return next();
};

module.exports = function(app) {
  app.all('*', allowCors);
  require('./user')(app);
};
