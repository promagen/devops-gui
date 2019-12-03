var getIniFileList = function (path, callback) {
    var fsPath = require('fs-path');

    fsPath.find(path, function (filepath, stats, filename) {
        if (stats === 'file' && /\.ini/.test(filename)) {
            //console.log(filename);
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

module.exports = getIniFileList;