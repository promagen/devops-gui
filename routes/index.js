const express = require('express');
const router = express.Router();
// var projectList = [];
var projectList = require('../project_list');
var title = 'Docker Manager Linux';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: title, projects: projectList.public, projects_private: projectList.private});
});

module.exports = router;
