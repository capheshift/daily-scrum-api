var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var async = require('async');
var Utilities = require('../config/utilities');
var jwt = require('jsonwebtoken');
var Config = require('../config/config');

//lean userId
exports.queryLeanUser = function(req, res, next, id) {
    Utilities.validateObjectId(id, function(isValid) {
        if (!isValid) {
            return res.status(404).jsonp(Utilities.response(false, {}, 'Invalid user id', 404));
        } else {
            var populateFields = (req.user._id === id) ? Config.Populate.UserFull : Config.Populate.User;
            Users.findOne({
                '_id': id
            }).lean().select(populateFields).exec(function(err, user) {
                if (err) {
                    return res.jsonp(Utilities.response(false, {}, Utilities.getErrorMessage(req, err)));
                } else if (!user) {
                    return res.status(404).jsonp(Utilities.response(false, {}, 'User not found', 404));
                } else {
                    req.userData = user;
                    return next();
                }
            });
        }
    });
};

//param with userId
exports.queryUser = function(req, res, next, id) {
    Utilities.validateObjectId(id, function(isValid) {
        if (!isValid) {
            return res.status(404).jsonp(Utilities.response(false, {}, 'Invalid user id', 404));
        } else {
            Users.findOne({
                '_id': id
            }).exec(function(err, user) {
                if (err) {
                    return res.jsonp(Utilities.response(false, {}, Utilities.getErrorMessage(req, err)));
                } else if (!user) {
                    return res.status(404).jsonp(Utilities.response(false, {}, 'User not found', 404));
                } else {
                    req.userData = user;
                    return next();
                }
            });
        }
    });
    Utilities.validateObjectId(id, function(isValid) {
        if (!isValid) {
            return res.status(404).jsonp(Utilities.response(false, {}, 'Invalid user id', 404));
        } else {
            Users.findOne({
                '_id': id
            }).exec(function(err, user) {
                if (err) {
                    return res.jsonp(Utilities.response(false, {}, Utilities.getErrorMessage(req, err)));
                } else if (!user) {
                    return res.status(404).jsonp(Utilities.response(false, {}, 'User not found', 404));
                } else {
                    req.userData = user;
                    return next();
                }
            });
        }
    });
};

//Get User by userId
exports.getUserById = function(req, res) {
    var userId = req.user ? req.user._id.toString() : '';
    Users.getFullInformations(req.userData, userId, function(data) {
        return res.jsonp(Utilities.response(true, data));
    })
};

exports.signup = function(req, res) {
    var user;
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
                username: user.username,
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

//User login and response info of user to client
exports.login = function(req, res) {
    var username = req.body.username ? req.body.username.toString() : '';
    var password = req.body.password ? req.body.password.toString() : '';
    //Trim username
    username = username.trim();
    // console.log(username);
    // console.log(password);
    var user;
    async.series({
        findUser: function(cb) {
            async.parallel({
                findByUserId: function(cb1) {
                    Users.findOne({
                            'username': username
                        })
                        .select('-accType -socialProfile')
                        .exec(function(err, u) {
                            if (u) {
                                user = u;
                            }
                            return cb1();
                        });
                }
            }, function() {
                return cb(!user, 'Incorrect username or password');
            });
        },
        checkPassword: function(cb) {
            return cb(!user.checkLogin(password), 'Incorrect username or password');
        },
        getUserInformations: function(cb) {
                Users.getFullInformations(user, null, function(data) {
                    user = data;
                    return cb(null);
                });
            }
            // createToken: function(cb) {
            //     var profile = {
            //         _id: user._id,
            //         username: user.username,
            //         role: user.role
            //     };
            //     //Create token
            //     var token = jwt.sign(profile, Config.JWTSecret);
            //     user.token = token;
            //     return cb(null);
            // }
    }, function(err, results) {
        if (err) {
            var keys = Object.keys(results);
            var last = keys[keys.length - 1];
            return res.jsonp(Utilities.response(false, {}, results[last]));
        } else {
            return res.jsonp(Utilities.response(true, user));
        }
    });
};

//Logout user
exports.logout = function(req, res) {
    return res.jsonp(Utilities.response(true));
};

//Change password
exports.changePassword = function(req, res) {
    var oldPassword = req.body.oldPassword ? req.body.oldPassword.toString() : '';
    var newPassword = req.body.newPassword ? req.body.newPassword.toString() : '';
    var user = req.userData;

    //Check login old password , if not correct, return
    if (!user.checkLogin(oldPassword)) {
        return res.jsonp(Utilities.response(false, {}, 'Old password was not correct'));
    } else {
        //Generate new password hash
        var newHashedPassword = user.hashPassword(newPassword, user.salt);
        user.update({
            'hashed_password': newHashedPassword
        }, function(err) {
            if (err) {
                return res.jsonp(Utilities.response(false, {}, Utilities.getErrorMessage(req, err)));
            } else {
                return res.jsonp(Utilities.response(true, {}, 'Change password successfully'));
            }
        });
    }

};

//Inactive user by userId
exports.inactiveUserById = function(req, res) {
	var user  = req.userData;
	// user.update
  res.json({});
};

exports.test = function(req, res) {
  res.jsonp({
    statusCode: '0',
    data: 'hello world !'
  });
};
