/**
 * Created by Kathy on 2017/1/7.
 */
var fs = require('fs');
function makeP(paths) {
    var ary = paths.split('/');
    ary.forEach(function (item, index) {
        //var cur = ary.slice(0, index + 1).join('/');
        (function (index) {
            var cur = ary.slice(0, index + 1).join('/');
            fs.exists(cur, function (state) {
                console.log(state);
                if(!state){
                    fs.mkdir(cur, function (err) {
                        console.log(err);
                        fs.mkdir(cur,function (err) {
                            console.log(err);
                        })
                    })
                }
            })
        })(index);
    });
}
makeP('a/b/c/d/e/f');
