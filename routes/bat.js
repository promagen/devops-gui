const express = require('express');
var router = express.Router();
var projectList = require('../project_list');
var RunCmd = require('../run_cmd');
const PublicConfig = require('../config');
var localConfig = new PublicConfig();

console.log('localConfig.os');
console.log(localConfig.os);

var getFileList = require('../get_bat_file_list');
if (localConfig.os === 'Linux') {
    getFileList = require('../get_sh_file_list');
}


/* get list of executable files from project folder */
router.get('/p/:project_type/:project_id/:file_id', function (req, res, next) {

    console.log('GET /p/:project_type/:project_id/:file_id');

    var projectType = req.params.project_type;
    console.log('projectType');
    console.log(projectType);


    var projectId = req.params.project_id;
    console.log('projectId');
    console.log(projectId);


    //TODO: Should be an int
    var fileId = req.params.file_id;
    console.log('fileId');
    console.log(fileId);


    var projectVolume = projectList[projectType][projectId]['volume'];
    console.log('projectVolume');
    console.log(projectVolume);


    var project_path = projectVolume + projectList[projectType][projectId]['path'];

    console.log('project_path');
    console.log(project_path);

    getFileList(project_path, function (FileList) {
        console.log(FileList);

        FileList.forEach(function (filename, index) {

            // TODO: create filelogs
            console.log('filename');
            console.log(filename);

            console.log(fileId);
            console.log(index);
            console.log(index == fileId);

            if (index == fileId) {
                RunCmd(filename, res);
            }
        });
    });
});



module.exports = router;