var Schema, UserSchema, mongooes, passportLocal;
mongooes = require('mongoose');
passportLocal = require('passport-local-mongoose');
Schema = mongooes.Schema;

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

UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        require: true,
        trim:true,
        validate:[validateUserName,'Username must be 3-32 characters']
    },
    email: {
        type: String,
        unique: true,
        match: [emailRegex, 'Please enter a valid email'],
        validate: [validateUniqueEmail, 'E-mail address is already in-use']
    },
    firstName: {
        type: String
    },
    lastName: {
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
    }
});

UserSchema.plugin(passportLocal);
module.exports = mongooes.model('Users', UserSchema);
