
var User, app, express, fs, mongoose, passport;

express = require('express');
passport = require('passport');
mongoose = require('mongoose');
fs = require('fs');

app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({
  secret: 'madoka'
}));

app.use(passport.initialize());
app.use(passport.session());

require('./controllers')(app);

User = mongoose.model('User');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/daily-scrum');
app.listen(3001);
console.log('Listening on port 3001...');
