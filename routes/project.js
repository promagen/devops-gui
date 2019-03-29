var express = require('express');
var router = express.Router();
var projectList = require('../project_list');
var getFileList = require('../get_file_list');

console.log('project');


/* GET home page. */
router.get('/:project_type/:project_id', function (req, res, next) {

    // console.log(projectList['0']);
    var projectId = req.params.project_id;
    var projectType = req.params.project_type;
    console.log('projectType');
    console.log(projectType);

    console.log('projectId');
    console.log(projectId);

    console.log(projectList[projectType]);

    var partition = 'e:';
    var project_path = partition + projectList[projectType][projectId]['path'];

    console.log('project_path');
    console.log(project_path);

    console.log('getFileList');
    getFileList(project_path, function (FileList) {
        // console.log(FileList);
        var fList = [];
        console.log('fList');

        FileList.forEach(function (filename, fileId) {

            console.log(filename, fileId);
            var path = require("path");

            // TODO: flist to the cache
            fList.push({
                'path': filename,
                'path_dir': path.dirname(filename) + '\\',
                'name': filename.replace(/^.*[\\\/]/, ''),
                'url': 'bat/p/' + projectType + '/' + projectId + '/' + fileId,
                'domain': projectList[projectType][projectId]['domain']
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
