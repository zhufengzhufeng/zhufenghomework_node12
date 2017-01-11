let http = require('http');
let fs = require('fs');
let url = require('url');
let mime = require('mime');
let userList = [
    {username: 'zhangsan', password: '123', id: 1},
    {username: 'lisi', password: '123123', id: 2}
];
http.createServer(function (req, res) {
    let urlObj = url.parse(req.url, true);
    let pathname = urlObj.pathname;
    let query = urlObj.query;
    if (pathname == '/') {
        res.setHeader('content-type', 'text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }
    //获取客户信息
    else if (pathname == '/getInfo') {
        res.end(JSON.stringify(userList));
    }
    //增加客户信息
    else if (pathname == '/addInfo') {
        let str = '';
        req.on('data', function (chunk) {
            str += chunk;
        });
        req.on('end', function () {
            str = JSON.parse(str);
            str.id = userList.length?userList[userList.length - 1].id + 1:1;
            userList.push(str);
            res.end(JSON.stringify(userList));
        });
    }
    //修改信息
    else if (pathname == '/updateInfo') {
        let strReq = '';
        req.on('data', function (chunk) {
            strReq += chunk;
        });
        req.on('end', function () {
            let str = JSON.parse(strReq);
            userList.forEach(function (item, index) {
                if (str.id == item.id) {
                    userList[index] = str;
                }
            });
            res.end(JSON.stringify(userList));
        });
    }
//删除信息
    else if (pathname == '/deleteInfo') {
        let id = query.id;
        userList = userList.filter(function (item) {
            return item.id != id;
        });
        res.end(JSON.stringify(userList));
    }

    else
    {
        fs.exists('.' + pathname, function (status) {
            if (status) {
                res.setHeader('content-type', mime.lookup(pathname) + ';charset=utf8');
                fs.createReadStream('.' + pathname).pipe(res);
            } else {
                res.statusCode = 404;
                res.end('File is not found');
            }
        });

    }

}).listen('80', function () {
    console.log('perfect');
});