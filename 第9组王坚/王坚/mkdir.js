var fs = require('fs');
var index = 0;
function makeP(paths,callback) {
    var cur = paths.split('/').slice(0,index++).join('/');
    fs.exists(cur,function (flag) {
        if (!flag){
            fs.mkdir(cur,function () {
                makeP(paths)
            })
        }
    });
    if (cur==paths){
        return;
    }
}
//callback不知道用在哪里了
makeP('a/b/c/d',function () {

});