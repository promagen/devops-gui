var getIniFileList = function (path, callback) {
    console.log('path:', path);

    var fsPath = require('fs-path');

    fsPath.find(path, function (filepath, stats, filename) {
        if (stats === 'file' && /\.ini/.test(filename)) {
            //console.log(filename);
            return true;
        }
        return false;
    }, function (err, list) {
        // FileList = list.files;
        if(typeof list === 'undefined'){
            console.log('getIniFileList FILES ARE NOT EXISTING');
            console.log(err);
            return false;
        }
        console.log(list.files);
        callback(list.files.sort());
    });
    // console.log('getFileList', fList);
    // return fList;
    // return FileList;
};

module.exports = getIniFileList;