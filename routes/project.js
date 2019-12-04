const express = require('express');
const router = express.Router();

const PublicConfig = require('../config');
var localConfig = new PublicConfig();
var path = require("path");

console.log('localConfig.os');
console.log(localConfig.os);

var getFileList = require('../get_bat_file_list');
if(localConfig.os === 'Linux'){
    getFileList = require('../get_sh_file_list');
}

var projectList = require('../project_list');

console.log('projectList');
console.log(projectList);



/* get list of projects from folder ini */
router.get('/:project_type/:project_id', function (req, res, next) {

    console.log('------------------------------');
    console.log('GET /:project_type/:project_id');

    // console.log(projectList['0']);
    var projectId = req.params.project_id;
    var projectType = req.params.project_type;


    console.log('projectType');
    console.log(projectType);

    console.log('projectId');
    console.log(projectId);


    var projectVolume = projectList[projectType][projectId]['volume'];
    console.log('projectVolume');
    console.log(projectVolume);


    var project_path = projectVolume + projectList[projectType][projectId]['path'];
    console.log('project_path');
    console.log(project_path);

    console.log('projectList[projectType]');
    console.log(projectList[projectType]);

    console.log('getBatFileList');
    getFileList(project_path, function (FileList) {
        // console.log(FileList);
        var fList = [];
        console.log('fList');

        FileList.forEach(function (filename, fileId) {

            console.log(filename, fileId);

            // TODO: flist to the cache
            fList.push({
                'path': filename,
                'path_dir': path.normalize(path.dirname(filename) + '/'),
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
