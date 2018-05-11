var express = require('express');
var router = express.Router();
var projectList = require('../project_list');
var getFileList = require('../get_file_list');

router.get('/p/:project_id/:file_id', function (req, res, next) {

    var projectId = req.params.project_id;
    var fileId = req.params.file_id;
    var project_path = projectList[projectId]['path'];

    // console.log(req);
    getFileList(project_path, function (FileList) {
        // console.log(FileList);
        FileList.forEach(function (filename, index) {

            // TODO: create filelogs
            console.log(fileId);
            console.log(index);
            console.log(filename);

            if (index == fileId) {
                // var spawn = require('child_process').spawn,
                //     ls = spawn('cmd.exe', ['/c', filename]);
                var name = filename.replace(/^.*[\\\/]/, '');
                //path.basename('/foo/bar/baz/asdf/quux.html')
                var path = require("path");
                var dir = path.dirname(filename);

                require('shelljs/global');
                // config.fatal = true;
                var stdout = '';
                // var version = exec('node --version', {silent:true}).stdout;
                // stdout = exec('docker ps');
                console.log(name);
                // if(name == 'init.bat'){
                // } else {
                //     stdout = exec(filename).stdout;
                stdout = exec('cd ' + dir + ' && ' + filename).stdout;
                // }
                stdout = stdout.replace(/\r\n|\r|\n/, '<br/>');

                res.send(stdout);

            }
        });
    });

});


module.exports = router;