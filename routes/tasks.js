var express = require('express');
var router = express.Router();
var TasksController = require('../controllers/tasks');

/*GET*/
router.get('/getTaskById',TasksController.getTaskById);
router.get('/getTaskByUserId',TasksController.getTaskByUserId);

/*POST*/
router.post('/createTask',TasksController.createTask);

/*PUT*/
router.put('/updateTask',TasksController.updateTask);

/*DELETE*/
router.delete('/deleteTask',TasksController.deleteTask);

module.exports = router;
