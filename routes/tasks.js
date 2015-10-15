var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/tasks');

router.get('/getTaskById/:taskId', ctrl.getTaskById);
router.get('/getTaskByUserId', ctrl.getTaskByUserId);
router.post('/createTask', ctrl.createTask);
router.put('/updateTask', ctrl.updateTask);
router.delete('/deleteTask', ctrl.deleteTask);

// function for set of collection
router.get('/all', ctrl._getAll);
router.get('/find', ctrl._find);
router.get('/:_id/detail', ctrl._get);
// functions for special collection
router.post('/', ctrl._post);
router.put('/:_id', ctrl._put);
router.delete('/:_id', ctrl._delete);

module.exports = router;
