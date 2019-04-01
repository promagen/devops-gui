const express = require('express');

var basePath = '/xampp/htdocs/';
var projectListPublic = [];
var projectListPrivate = [];

const fs = require('fs');
const ini = require('ini');
const osHomedir = require('os-homedir');
// https://nodejs.org/api/os.html
// console.log(config);

var getFileList = function (path, callback) {
    var fsPath = require('fs-path');

    fsPath.find(path, function (filepath, stats, filename) {
        if (stats === 'file' && /\.ini/.test(filename)) {
            console.log(filename);
            return true;
        }
        return false;
    }, function (err, list) {
        // FileList = list.files;
        callback(list.files.sort());
    });
    // console.log('getFileList', fList);
    // return fList;
    // return FileList;
};



// Create menu from devops
let devops_path = '~\\WebstormProjects\\devops\\windows\\10';
devops_path = devops_path.replace(/^~/, osHomedir());
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


let project_path = '~/devops-gui-projects';
// console.log(osHomedir());
project_path = project_path.replace(/^~/, osHomedir());
// console.log(project_path);

getFileList(project_path, function (FileList) {
    // console.log(FileList);
    FileList.forEach(function (filename, index) {
        // console.log(project_path);

        var config = ini.parse(fs.readFileSync(filename, 'utf-8'));

        console.log(index);
        projectListPrivate.push({
            'url': 'project/private/' + projectListPrivate.length,
            'title': config.title,
            'path': config.path,
            'domain': config.domain,
            'files': []
        });
    });
});
console.log(projectListPrivate);
var projectList = {
    'private': projectListPrivate,
    'public': projectListPublic,
};

module.exports = projectList;