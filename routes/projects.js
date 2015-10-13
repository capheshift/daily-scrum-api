var express = require('express');
var router = express.Router();
var ProjectsController = require('../controllers/projects');

/*GET*/
router.get('/getProjectById',ProjectsController.getProjectById);
router.get('/getAllProjectByUserId',ProjectsController.getAllProjectByUserId);

/*POST*/
router.post('/createProject',ProjectsController.createProject);

/*PUT*/
router.put('/updateProject',ProjectsController.updateProject);

/*DELETE*/
router.delete('/deleteProject',ProjectsController.deleteProject);