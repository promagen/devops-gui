var express = require('express');
var router = express.Router();
var projectList = require('../project_list');
var getFileList = require('../get_file_list');

/* GET home page. */
router.get('/:project_id', function (req, res, next) {

    // console.log(projectList['0']);
    var projectId = req.params.project_id;
    var project_path = projectList[projectId]['path'];

    getFileList(project_path, function (FileList) {
        // console.log(FileList);
        var fList = [];

        FileList.forEach(function (filename, fileId) {

            console.log(filename, fileId);
            var path = require("path");

            // TODO: flist to the cache
            fList.push({
                'path': filename,
                'path_dir': path.dirname(filename) + '\\',
                'name': filename.replace(/^.*[\\\/]/, ''),
                'url': 'bat/p/' + projectId + '/' + fileId,
                'domain': projectList[projectId]['domain']
            });
        });

        console.log(fList);
        return res.json(fList);

        // res.send({
        //     projects: projectList
        // });
    });
    // return res.render(project_path + 'not exist');
});


module.exports = router;
