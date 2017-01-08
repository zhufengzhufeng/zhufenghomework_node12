var fs = require('fs');

var path = require('path');
//创建文件夹，需要保证父级存在，才能创建子级；
// fs.mkdirSync('a');
/*function makepSync(paths) {
    var ary= paths.split('/');
    ary.forEach(function (item,index) {
        var cur = ary.slice(0,index+1).join('/');
        if(!fs.existsSync(cur)) {//判断是否存在，存在会返回true，取反；
            fs.mkdirSync(cur);
        }

    })
}
makepSync('a/b/c/d');*/

//写一个异步创建文件夹的方法
/*fs.mkdir('a',function (err) {

});
fs.exists('./c',function (stat) {

});*/
function makeDirs(dirname, callback) {
    fs.exists(dirname, function (stat) {
        if (stat) {
            callback();
        } else {
            makeDirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
}
makeDirs('a/b/c/d/e',function (err) {
    if(err) console.log(err);
});