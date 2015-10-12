var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Crypto = require('crypto');
var Utilities = require('../config/utilities');
var Config = require('../config/config');
var async = require('async');

var validateUserName = function(value, callback) {
    return callback(value && (value.length >= 3) && (value.length <= 32));
};

var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


var validateUniqueEmail = function(value, callback) {
    mongoose.model('Users').find({
        'email': value
    }, function(err, users) {
        return callback(err || (users.length === 0));
    });
};

var validatePassword = function(value, callback) {
    return callback(value && value.length);
};

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        trim: true,
        validate: [validateUserName, 'Username must be 3-32 characters']
    },
    email: {
        type: String,
        unique: true,
        match: [emailRegex, 'Please enter a valid email'],
        validate: [validateUniqueEmail, 'E-mail address is already in-use']
    },
    hashed_password: {
        type: String,
        require: true,
        validate: [validatePassword, 'Password cannot be blank']
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    birthday: {
        type: Date
    },
    avatar: {
        type: String,
        defaults: 'son.png'
    },
    role: {
        type: String
    },
    createdDate: {
        type: Date,
        defaults: Date.now
    },
    status: String,
    salt: String
}, {
    collection: ' users'
});

UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.hashPassword(password, this.salt);
}).get(function() {
    return this._password;
});

// Encrypt password
function encrypt(password, salt) {
    var saltHash = new Buffer(salt, 'base64');
    return Crypto.pbkdf2Sync(password, saltHash, 10000, 64).toString('base64');
}

//Document methods
UserSchema.methods = {
    makeSalt: function() {
        return Crypto.randomBytes(16).toString('base64');
    },
    hashPassword: function(password, salt) {
        if (!password || !salt) {
            return '';
        }
        return encrypt(password, salt);
    },
    checkLogin: function(password) {
        return (encrypt(password, this.salt) === this.hashed_password);
    }
};

//Statics
UserSchema.statics = {
    getFullInformations: function(user, userId, callback) {
        var data = {
            'username': user.username,
            'email': user.email,
            'firstname': user.firstname,
            'lastname': user.lastname
        };
        return callback(data);
    },
    getInfomationById:function(targetId,userId,callback){
        var that =this;
        that.findOne({
            '_id':targetId
        }).select(Config.Populate.User).lean().exec(function(err,u){
            if (err) {
                return callback({});
            }else{
                that.getFullInformations(u,userId,function(user){
                    return callback(user);
                });
            }
        });
    }
};

//Pre-save hook
UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this._isNew = true;
    }
    next();
});

//Post-remove hook
UserSchema.post('remove', function(user) {
    console.log('Removed user ' + user._id);
});

//UserSchema.plugin(passportLocal);
module.exports = mongoose.model('Users', UserSchema);
