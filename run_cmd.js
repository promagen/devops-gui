const path = require("path");
require('shelljs/global');

// http://adilapapaya.com/docs/shelljs/
// https://documentup.com/shelljs/shelljs

function RunCmd(filename, res) {
    var info = '';
    // var spawn = require('child_process').spawn,
    //     ls = spawn('cmd.exe', ['/c', filename]);

    // var name = filename.replace(/^.*[\\\/]/, '');

    //path.basename('/foo/bar/baz/asdf/quux.html')
    var dir = path.dirname(filename);

    var version = exec('node --version', {silent: true}).stdout;

    if (!which('docker')) {
        info = 'Sorry, this script requires DOCKER';
        console.log(info);
        echo(info);
        exit(1);
    }

    if (!which('docker-compose')) {
        info = 'Sorry, this script requires DOCKER';
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

    // var configs = {};
    // var configs = {silent:true,async:false};

    console.log('dir');
    console.log(dir);

    if (cd(dir).code !== 0) {
        echo('Error: Change DIR failed');
        exit(1);
    }
    try {

        var version = exec('node --version', {silent: true}).stdout;

        // var child = exec(command, {async:true});
        // child.stdout.on('data', function(data) {
        //     /* ... do something with data ... */
        // });

        exec(command, function (code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);

            stdout = stdout.replace(/\r\n|\r|\n/, '<br/>');
            stderr = stderr.replace(/\r\n|\r|\n/, '<br/>');
            res.send('<br/>' + stdout + '<br/>' + '<br/>' + stderr + '<br/>');
        });

        // // stdout = exec( command, configs ).stdout;
        // if (exec(command, configs).code !== 0) {
        //     echo('Error: Script failed');
        //     exit(1);
        // }
        echo('--------------------------------------------------------');
    } catch (err) {
        stdout = err.stack;
        // ^ will output the "unexpected" result of: elsewhere has failed
    }

    // Print out the result
    console.log(stdout);

    // stdout = stdout.replace(/\r\n|\r|\n/, '<br/>');
    // res.send(stdout);
}

module.exports = RunCmd;