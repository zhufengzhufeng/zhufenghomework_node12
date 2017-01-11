var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime');
var userList = [{
    username: '郑三',
    password: '123456',
    id: 1
}, {
    username: '张三',
    password: '123456',
    id: 2
}, {
    username: '王三',
    password: '123456',
    id: 3
}]
http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname;
    if (pathname == '/') {
        res.setHeader('Content-type', 'text/html;charset=utf8');
        fs.createReadStream('./manger.html').pipe(res);
    } else if (pathname == '/clock') {
        var data = { 'time': new Date().toLocaleString() };
        res.end(JSON.stringify(data));
    } else if (pathname == '/getUser') {
        res.end(JSON.stringify(userList));
    } else if (pathname == '/addUser') {
        var str = '';
        req.on('data', function(data) {
            str += data;
        });
        req.on('end', function() {
            var user = JSON.parse(str);
            user.id = userList.length ? parseInt(userList[userList.length - 1].id) + 1 : 1;
            userList.push(user);
            res.end(JSON.stringify(userList));
        });
    } else if (pathname == '/updateUser') {
        var str = '';
        req.on('data', function(data) {
            str += data;
        });
        req.on('end', function() {
            var user = JSON.parse(str);
            userList.forEach(function(item, index) {
                if (item.id == user.id) {
                    item.username = user.username;
                    item.password = user.password;
                }
            });
        });
        console.log(userList);
        res.end(JSON.stringify(userList));
    } else if (pathname == '/deleteUser') {
        var id = urlObj.query.id;
        userList = userList.filter(function(item) {
            return item.id != id;
        });
        res.end(JSON.stringify(userList));
    } else {
        fs.exists('.' + pathname, function(flag) {
            if (flag) {
                res.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf8');
                fs.createReadStream('.' + pathname).pipe(res);
            } else {
                res.statusCode = 404;
                res.end('not found');
            }
        })
    }
}).listen(8080);
