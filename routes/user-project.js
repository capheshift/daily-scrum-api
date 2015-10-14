// capheshift.github.io 2015
// @author: Tw

var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/user-project');

// function for set of collection
router.get('/test', ctrl.test);
router.get('/all', ctrl._getAll);
router.get('/find', ctrl._find);

// functions for special collection
router.get('/:_id/detail', ctrl._get);
router.post('/', ctrl._post);
router.put('/:_id', ctrl._put);
router.delete('/:_id', ctrl._delete);

module.exports = router;
