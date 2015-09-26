var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users');

/*GET*/
router.get('/getUserById/:leanUserId',UsersController.getUserById);

/*POST*/
router.post('/signup',UsersController.signup);
router.post('/login',UsersController.login);
router.post('logout',UsersController.logout);

/*PUT*/
router.put('/changePassword/:userId',UsersController.changePassword);

/*DELETE*/

module.exports = router;
