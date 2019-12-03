//TODO: create settings local file, and by user

//var projectListPublic = [];
var projectListPrivate = [];

//const fs = require('fs');
const ini = require('ini');

// LIB
const getIniFileList = require('./get_ini_file_list');
const PublicConfig = require('./config');
var localConfig = new PublicConfig();


// https://nodejs.org/api/os.html
console.log(localConfig);

//process.exit();


getIniFileList(localConfig.project_path, function (FileList) {
    // console.log(FileList);
    FileList.forEach(function (filename, index) {
        // console.log(project_path);

        var config = ini.parse(fs.readFileSync(filename, 'utf-8'));

        console.log('index',index);
        console.log('config');
        console.log(config);
        projectListPrivate.push({
            'url': 'project/private/' + projectListPrivate.length,
            'title': config.title,
            'volume': config.volume,
            'path': config.path,
            'domain': config.domain,
            'files': []
        });
    });
});

console.log(projectListPrivate);
var projectList = {
    'private': projectListPrivate,
    'public': localConfig.projectListPublic,
};

module.exports = projectList;