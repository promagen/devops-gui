var express = require('express');
var router = express.Router();
// var projectList = [];
var projectList = require('../project_list');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Docker Manager', projects: projectList.public, projects_private: projectList.private});
});

module.exports = router;
