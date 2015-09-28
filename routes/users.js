var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users');
var middleware = require('../config/middleware');

/*GET*/
router.get('/getUserById/:leanUserId',UsersController.getUserById);

/*POST*/
router.post('/signup',UsersController.signup);
router.post('/login',UsersController.login);
router.post('logout',UsersController.logout);

/*PUT*/
router.put('/changePassword/:userId',UsersController.changePassword);

/*DELETE*/
router.param('leanUserId',UsersController.queryLeanUser);//Lean
router.param('userId',UsersController.queryUser);

module.exports = router;
