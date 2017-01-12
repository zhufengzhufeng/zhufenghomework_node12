var fs = require("fs");
var path = require("path");

function mkdirs(dirname, callback) {
    fs.exists(dirname, function(exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), function() {
                fs.mkdir(dirname, callback);
            });
        }
    });
}
mkdirs('a/b/c/d/e/f', function() { console.log("文件夹已经存在") })
