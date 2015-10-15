var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/users');
var middleware = require('../config/middleware');

/*GET*/
router.get('/getUserById/:leanUserId', ctrl.getUserById);
/*POST*/
router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);
/*PUT*/
router.put('/changePassword/:userId', middleware.isAuthentication, ctrl.changePassword);
/*DELETE*/
router.delete('/inactiveUserById/:userId', middleware.isAuthentication, ctrl.inactiveUserById);
/*PARAM*/
router.param('leanUserId', ctrl.queryLeanUser); //Lean
router.param('userId', ctrl.queryUser);

// function for set of collection
router.get('/all', ctrl._getAll);
router.get('/find', ctrl._find);
router.get('/:_id/detail', ctrl._get);
router.put('/:_id', ctrl._put);

module.exports = router;
