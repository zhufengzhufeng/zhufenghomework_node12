/*var fs=require('fs');
var path='dir1/dir2/dir3';
createDir(path);
function createDir(path){
var pathAry=path.split('/');
for (var i=0;i<pathAry.length;i++){
   var curPath=pathAry.slice(0,i+1).join('/');
            (function(curPath){
                    fs.exists(curPath,function(exists){
                          if (!exists){
                                      fs.mkdir(curPath,function(){
                                           console.log(curPath+'is created!');
                                      });
                                   }
                      })
                   })(curPath);
             }
     }*/

var fs=require('fs');
function mkdirp(p) {
    var arr = p.split('/');
    var index = 0;
    make(arr[index]);
    function make(p) {
        if (index >= arr.length + 1) {
            return
        }
        fs.mkdir(p, function (err) {
            make(arr.slice(0, ++index + 1).join('/'))
        })
    }
}
mkdirp('a/b/c');