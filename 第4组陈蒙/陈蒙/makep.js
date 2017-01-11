var fs = require('fs');
var path = require('path')
function makeP(dirname, callback){
    fs.exists(dirname, function (exists){
        if(exists){
            callback();
        }else{
            console.log(path.dirname(dirname))
            makeP(path.dirname(dirname), function (){
                fs.mkdir(dirname,callback);
            });
        }
    });
}

makeP('a/b/c/d/e');