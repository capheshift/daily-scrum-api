var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var fs = require('fs');
var expressJwt = require('express-jwt');


if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

var app = express();

//Connect database with mongoDB
console.log('target-', config.Env[process.env.NODE_ENV].Database);
console.log('env-', process.env.NODE_ENV);
mongoose.connect(config.Env[process.env.NODE_ENV].Database);

//Bootstrap models
fs.readdirSync('./models').forEach(function(file) {
    if (~file.indexOf('.js')) {
        require('./models/' + file);
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/*', expressJwt({
    secret: config.JWTSecret
}).unless({
    path: ['/users/test', '/users/login', '/users/logout', '/users/signup']
}));

// CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, CONNECT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

    // Intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Bootstrap models
fs.readdirSync('./models').forEach(function(file) {
    if (~file.indexOf('.js')) {
        require('./models/' + file);
    }
});

var users = require('./routes/users');
var tasks = require('./routes/tasks');
var projects =require('./routes/projects');


app.use('/users', users);
app.use('/tasks', tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    return res.status(404).json({
        'statusCode': 404,
        'success': false,
        'message': 'Route not found',
        'data': {}
    });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log('***********');
        console.log(err);
        if (err.constructor.name === 'UnauthorizedError') {
            res.status(401).jsonp({
                'statusCode': 401,
                'success': false,
                'message': err.message,
                'data': {}
            });
        } else {
            return res.status(err.status || 500).json({
                'statusCode': err.status || 500,
                'success': false,
                'message': err.message ? err.message : 'Server error',
                'data': {}
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).jsonp({
            'statusCode': 401,
            'success': false,
            'message': err.message,
            'data': {}
        });
    } else {
        return res.status(err.status || 500).json({
            'statusCode': 404,
            'success': false,
            'message': 'Route not found',
            'data': {}
        });
    }
});


module.exports = app;
