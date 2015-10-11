var Config = require('./config');
var fs = require('fs');
var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
var chars = '0123456789';

exports.validateObjectId = function(id, callback) {
    return callback(checkForHexRegExp.test(id));
};

exports.response = function(success, data, message, statusCode) {
    return {
        'success': success,
        'statusCode': statusCode ? statusCode : 200,
        'message': message ? message : 'Successfully',
        'data': data ? data : {}
    };
};

exports.getErrorMessage = function(req, err) {
    console.log('error ' + err);
    var errText = '';
    if (!err) {
        errText = 'Server error';
    } else if (err.errors) {
        errText = err.errors[Object.keys(err.errors)[0]] ? err.errors[Object.keys(err.errors)[0]].message : 'Server error';
    } else {
        errText = err.message;
    }
    return errText;
};
