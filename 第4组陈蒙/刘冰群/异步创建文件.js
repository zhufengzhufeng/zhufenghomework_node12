var fs = require('fs');
makeDir('a/b/c/d/e');
function makeDir(paths){
    var ary=paths.split('/');
    var path=[];
    ary.forEach(function(item,index){
        var temp=ary.slice(0,index+1).join('/');
        path.push(temp);
    })
    console.log(path)
    mkSingleDir(path);
}
function mkSingleDir(curPath){
    fs.mkdir(curPath[0],function(){
       fs.exists(curPath[0],function(flag){
           if(flag){
               curPath.shift(0);//如果已经存在，就删除掉
               if(curPath.length==0) return;
               mkSingleDir(curPath);
           }
           else{
               mkSingleDir(curPath);
           }
       })
    })
}
