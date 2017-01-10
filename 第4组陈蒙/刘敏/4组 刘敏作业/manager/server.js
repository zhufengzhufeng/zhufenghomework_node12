var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
var userList = [
    {username:'张三',password:'xxxx',id:1},
];
http.createServer(function (req,res) {
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname == '/getUsers'){
        res.end(JSON.stringify(userList));
    }else if(pathname == '/addUser'){
        var str = '';
        req.on('data',function (data) {
            str += data;
        });
        req.on('end',function () {
            var user = JSON.parse(str);
            user.id = userList.length?parseInt(userList[userList.length-1].id)+1:1;
            userList.push(user);
            res.end(JSON.stringify(userList));
        });
    }else if(pathname == '/deleteUser'){
        var id = urlObj.query.id;
        userList = userList.filter(function (item) {
            return item.id !=id;
        });
        res.end(JSON.stringify(userList));
    }else{
        fs.exists('.'+pathname,function (flag) {
            if(flag){
                res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf8');
                fs.createReadStream('.'+pathname).pipe(res);
            }else{
                res.statusCode = 404;
                res.end('Not Found');
            }
        });
    }
}).listen(3000);
