var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users');
var middleware = require('../config/middleware');

/*GET*/
router.get('/', function(req, res) {
    res.jsonp('Daily-Scrum-api Users index');
});
router.get('/getUserById/:leanUserId', UsersController.getUserById);

/*POST*/
router.post('/signup', UsersController.signup);
router.post('/login', UsersController.login);
router.post('/logout', UsersController.logout);

/*PUT*/
router.put('/changePassword/:userId',middleware.isAuthentication, UsersController.changePassword);

/*DELETE*/
router.delete('/inactiveUserById/:userId',middleware.isAuthentication,UsersController.inactiveUserById);

/*PARAM*/
router.param('leanUserId', UsersController.queryLeanUser); //Lean
router.param('userId', UsersController.queryUser);

module.exports = router;
