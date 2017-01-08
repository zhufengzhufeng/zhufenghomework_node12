/**
 * Created by dell on 2017/1/7.
 */
var fs=require('fs');
var path = require("path");

//创建文件夹需要保证父级存在 才能创建子级
//同步方法
//fs.mkdirSync('a/b');
/*function makepSync(paths){
    var arrs=paths.split('/');
    //['a','b','c','d','e','f']
    arrs.forEach(function (item,index) {
        var cur=arrs.slice(0,index+1).join('/');
        if(!fs.existsSync(cur)){ //创建之前下判断文件是否存在
            fs.mkdir(cur) //a a/b a/b/c
        }

    })
}
makepSync('a/b/c/d/e/f');*/
//fs.existsSync


//作业：写一个异步的创建文件夹
//作业：增删改查 对用户的增删改查
//fs.exists
/*fs.mkdir('a', function (err) { //err错误对象

});

fs.exists('./a', function (state) { //state状态 true false

})*/
//异步方法
function mkdirs(dirname, callback) {
    fs.exists(dirname, function (state) { //state状态 true false
        console.log(state)
        if(state){
            callback();
        }else{
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    })
}
mkdirs("./a/b/c/d/e/f", function (err) {
    console.log('error')
});
//rmdir rmdirSync 删除目录
//readdir
//unlink