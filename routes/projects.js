var express = require('express');
var router = express.Router();
var controllers = require('../controllers/projects');

router.get('/', controllers._get);
router.get('/getAll', controllers._getAll);
router.get('/test', controllers.test);

router.post('/', controllers._post);
router.put('/', controllers._put);
router.delete('/', controllers._delete);

module.exports = router;

// /*GET*/
// router.get('/getProjectById',ProjectsController.getProjectById);
// router.get('/getAllProjectByUserId',ProjectsController.getAllProjectByUserId);

// /*POST*/
// router.post('/createProject',ProjectsController.createProject);

// /*PUT*/
// router.put('/updateProject',ProjectsController.updateProject);

// /*DELETE*/
// router.delete('/deleteProject',ProjectsController.deleteProject);
