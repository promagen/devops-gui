var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/project/:projectId', function (req, res) {
    var projectId = req.param('projectId');
    var project_path = projectList[projectId]['path'];

    getFileList(project_path, function (FileList){
        // console.log(FileList);
        var fList = [];

        FileList.forEach(function (filename, fileId) {

            console.log(filename, fileId);
            var path = require("path");

            // TODO: flist to the cache
            fList.push({
                'path': filename,
                'path_dir':  path.dirname(filename) + '\\',
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
