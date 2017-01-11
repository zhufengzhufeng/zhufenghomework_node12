var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime');
var userList = [
    {username: '张三', password: 1234, id: 1},
    {username: '李四', password: 1234, id: 2}
];
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    if (pathname === '/') {
        res.setHeader('content-type', 'text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    } else if (pathname === '/getUsers') {
        res.end(JSON.stringify(userList))
    } else if (pathname === '/addUser') {
        var str = '';
        req.on('data', function (chunk) {
            str += chunk;
        });
        req.on('end', function () {
            var data = JSON.parse(str);
            data['id'] = userList.length == 0 ? 1 : parseInt(userList[userList.length - 1]['id']) + 1
            userList.push(data);
            res.end(JSON.stringify(userList))
        })
    } else if (pathname === '/delUser') {
        var id = query['id'];
        userList = userList.filter(function (item) {
            return item.id != id
        });
        res.end(JSON.stringify(userList))

    } else if (pathname === '/getUser') {
        id = query['id'];
        var info = userList.find(function (item) {
            if (item.id == id) {
                return true;
            }
        });
        res.end(JSON.stringify(info))
    } else if (pathname === '/updateUser') {
        str = '';
        req.on('data', function (chunk) {
            str += chunk
        });
        req.on('end', function () {
            data = JSON.parse(str);
            userList.forEach(function (item, index) {
                if (item.id == data.id) {
                    userList[index] = data;
                    return false
                }
            });
            res.end(JSON.stringify(userList))
        })
    } else {
        fs.exists('.' + pathname, function (flag) {
            if (flag) {
                res.setHeader('content-type', mime.lookup(pathname) + ';charset=utf8');
                fs.createReadStream('.' + pathname).pipe(res)
            } else {
                res.statusCode = 404;
                res.end('Not Found')
            }
        })
    }
}).listen(8090);
