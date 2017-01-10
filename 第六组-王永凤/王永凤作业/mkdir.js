/**
 * Created by Administrator on 2017/1/10.
 */
var fs = require('fs');
var path = require('path');


/*function makep(paths, fn) {
    var arrs = paths.split('/');
    arrs.forEach(function (item, index) {
        var cur = arrs.slice(0, index + 1).join('/');
        if (fs.exists(cur, function (flag) {
                if (flag) {
                    fs.mkdir(cur, function () {
                        fn();
                    })
                } else {
                    makep(path.dirname(paths), function () {
                        fs.mkdir(paths, fn);
                    })
                }
            })) {

        }
    });
}*/
/*
 makep('a/b/c/d', function (err) {

 })*/

function makdirs(p, fn) {
    fs.exists(p, function (flag) {
        if (flag) {
            fn();
        } else {
            makdirs(path.dirname(p), function () {
                fs.mkdir(p, fn);
            })
        }
    })
}

makdirs('a/b/c/d', function (err) {

})
