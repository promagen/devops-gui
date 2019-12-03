const osHomedir = require('os-homedir');

let project_path = '~/devops-gui-projects';
// console.log(osHomedir());
project_path = project_path.replace(/^~/, osHomedir());
// console.log(project_path);


// Create menu from devops - apicra projects
let devops_path = '~\\devops\\windows\\10';
devops_path = devops_path.replace(/^~/, osHomedir());
// LINUX
devops_path = devops_path.replace(/^\\/, '/');

console.log(devops_path);
projectListPublic = {};
/*
fs.readdirSync(devops_path).forEach(file => {
    console.log(file);
    projectListPublic.push({
        'url': 'project/public/' + projectListPublic.length,
        'title': file,
        'path': devops_path + '\\' + file,
        'domain': 'localhost',
        'files': []
    });
});
 */
console.log(projectListPublic);

const os = require('os');


module.exports = function () {
    return {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        project_path: project_path,
        projectListPublic: projectListPublic,


        // web server port
        port: 3001,


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // SYSTEM OS
        os: os.type(),

    }
}