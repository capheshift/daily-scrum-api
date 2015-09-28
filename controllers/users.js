var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var async = require('async');
var Utilities = require('../config/utilities');
var jwt = require('jsonwebtoken');
var Config = require('../config/config');

//Get User by userId
exports.getUserById = function(req, res) {

};

exports.signup = function(req, res) {
    var user;
    console.log(req.body);
    async.series({
        createUserObject: function(cb) {
            user = new Users(req.body);
            return cb(null);
        },
        save: function(cb) {
            user.save(function(err) {
                if (err) {
                    return cb(true, Utilities.getErrorMessage(req, err));
                } else {
                    return cb(null);
                }
            });
        },
        token: function(cb) {
            var profile = {
                _id: user._id,
                userName: user.userName,
                role: user.role
            };
            //Create token
            token = jwt.sign(profile, Config.JWTSecret);
            return cb(null, token);
        }
    }, function(err, results) {
        if (err) {
            var keys = Object.keys(results);
            var last = keys[keys.length - 1];
            // console.log(results);
            return res.jsonp(Utilities.response(false, {}, results[last]));
        } else {
            return res.jsonp(Utilities.response(true, {
                '_id': user._id,
                'token': results.token
            }));
        }
    });
};

exports.login = function(req, res) {

};

exports.logout = function(req, res) {

};

exports.changePassword = function(req, res) {

};

exports.queryLeanUser = function(req, res, next, id) {

};

exports.queryUser = function(req, res, next, id) {

};
