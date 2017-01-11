var fs = require('fs');
var path = require('path');
function mkdirs(dirname,callback) {
    fs.exists(dirname,function (exists) {
        if(exists){
            if (!callback){
                console.log('文件夹已创建');
                return;
            }
            callback();
        }else{
            mkdirs(path.dirname(dirname),function () {
                fs.mkdir(dirname,callback);
            });
        }
    });
}
mkdirs('a/b/c/d');