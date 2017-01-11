var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mime = require('mime'),
    tempId = null,
    userList = [
        {username: '张三', password: 'dfg', id: 1},
        {username: '李四', password: 'dfgdf', id: 2},
        {username: '王五', password: 'ghg', id: 3},
    ];
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname;
    if (pathname == '/') {
        res.setHeader('Content-Type', 'text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res)
    } else if (pathname == '/getUser') {
        res.end(JSON.stringify(userList));
    } else if (pathname == '/addUser') {
        var str = '';
        req.on('data', function (chunk) {
            str += chunk;
        });
        req.on('end', function () {
            var user = JSON.parse(str);
            user.id = userList.length ? parseFloat(userList[userList.length - 1].id + 1) : 1;
            userList.push((user));
            res.end(JSON.stringify(userList));
        });
    } else if (pathname == '/deleteUser') {
        var id = urlObj.query.id;
        userList = userList.filter(function (item) {
            return item.id != id;
        });
        res.end(JSON.stringify(userList));
    } else if (pathname == '/getUsers') {
        var id = urlObj.query.id;
        tempId = id;
        userList.forEach(function (item, index) {
            if (id == item.id) {
                res.end(JSON.stringify(item));
            }
        });
    } else if (pathname == '/updateInfo') {
        var str1 = '';
        req.on('data', function (chunk) {
            str1 += chunk;

        });
        req.on('end', function () {
            str1 = JSON.parse(str1);
            str1.id = tempId;
            //     userList.forEach(function (item, index) {
            //         if (tempId==item.id) {
            //             item= str1;
            //             res.end(JSON.stringify(userList));
            //         }
            //     });
            // });

            for (var i = 0; i < userList.length; i++) {
                if (tempId == userList[i].id) {
                    userList[i] = str1;
                    res.end(JSON.stringify(userList));
                }
            }
        })
    } else {
        fs.exists('.' + pathname, function (flag) {
            if (flag) {
                res.writeHead(200, {'content-type': mime.lookup(pathname) + ';charset=utf-8'});
                fs.createReadStream('.' + pathname).pipe(res)
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }
        })
    }
}).listen(1234, function () {
    console.log('成功')
});
