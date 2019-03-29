var express = require('express');
var router = express.Router();
var projectList = require('../project_list');
var getFileList = require('../get_file_list');

router.get('/p/:project_type/:project_id/:file_id', function (req, res, next) {

    var projectType = req.params.project_type;
    var projectId = req.params.project_id;
    var fileId = req.params.file_id;
    var partition = 'e:';
    var project_path = partition + projectList[projectType][projectId]['path'];

    console.log('project_path');
    console.log(project_path);

    getFileList(project_path, function (FileList) {
        // console.log(FileList);
        FileList.forEach(function (filename, index) {

            // TODO: create filelogs
            console.log(fileId);
            console.log(index);

            console.log('filename');
            console.log(filename);

            if (index == fileId) {
                // var spawn = require('child_process').spawn,
                //     ls = spawn('cmd.exe', ['/c', filename]);

                // var name = filename.replace(/^.*[\\\/]/, '');

                //path.basename('/foo/bar/baz/asdf/quux.html')
                var path = require("path");
                var dir = path.dirname(filename);


                // http://adilapapaya.com/docs/shelljs/
                // https://documentup.com/shelljs/shelljs
                require('shelljs/global');
                var version = exec('node --version', {silent: true}).stdout;

                if (!which('docker')) {
                    var info = 'Sorry, this script requires DOCKER';
                    console.log(info);
                    echo(info);
                    exit(1);
                }
                var stdout = '';

                // var partition = 'e:';
                // var command = 'cd ' + dir + ' && ' + filename;
                // var command = 'bash ' + filename;
                var command = filename;

                console.log('command');
                console.log(command);

                var configs = {};
                // var configs = {silent:true,async:false};

                console.log('dir');
                console.log(dir);

                if (cd(dir).code !== 0) {
                    echo('Error: Change DIR failed');
                    exit(1);
                }

                // stdout = exec( command, configs ).stdout;
                if (exec(command, configs).code !== 0) {
                    echo('Error: Script failed');
                    exit(1);
                }

                // }
                stdout = stdout.replace(/\r\n|\r|\n/, '<br/>');

                // Print out the result
                console.log(stdout);

                res.send(stdout);

            }
        });
    });

});


module.exports = router;