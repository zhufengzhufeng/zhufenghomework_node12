//递归创建目录 同步方法
var fs = require('fs');
function makeP(dirname, callback){
    fs.exists(dirname, function (exists){
        if(exists){
            callback();
        }else{
            makeP(path.dirname(dirname), function (){
                fs.mkdir(dirname,callback);
            });
        }
    });
}
makeP('a/b/c/d');
