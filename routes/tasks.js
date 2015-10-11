var express = require('express');
var router = express.Router();
var TasksController = require('../controllers/tasks'); 

/*GET*/
/*POST*/
router.post('/createTask',TasksController.createTask);