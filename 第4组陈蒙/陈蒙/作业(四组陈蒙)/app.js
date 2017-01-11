/*
 /!**
 * Created by chenmeng on 2017/1/9.
 *!/
 var http = require('http')
 var fs = require('fs')
 var url = require('url')
 var mime = require('mime');
 var server = http.createServer(function (req, res) {
 var urlObj = url.parse(req.url, true),
 pathname = urlObj.pathname,
 query = urlObj.query;
 if (pathname == '/') {
 res.setHeader('Content-Type', 'text/html;charset=uft8');
 fs.createReadStream('./index.html').pipe(res);
 } else if (pathname == '/getAllList') {
 fs.createReadStream('./json/data.json').pipe(res);
 } else if (pathname == '/addInfo') {

 } else if (pathname == '/getInfo') {
 } else if (pathname == '/updateInfo') {
 } else if (pathname == '/removeInfo') {
 } else {
 fs.exists('.' + pathname, function (flag) {
 if (flag) {
 res.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf8');
 fs.createReadStream('.' + pathname).pipe(res);
 } else {
 res.statusCode = 404;
 res.end('not found')
 }
 })
 }


 })
 server.listen(3000, function () {
 console.log('有人来了')
 })*/
var http = require('http')
var url = require('url')
var fs = require('fs')
var server = http.createServer(function (req, res) {
    console.log('有人来访问我')
    var urlObj = url.parse(req.url, true)
    var pathname = urlObj.pathname;
    var query = urlObj.query;

    var reg = /\.([\da-z]+)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1]
            .toUpperCase();
        var suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
            case 'CSS':
                suffixMIME = 'text/css'
                break;
        }
        var conFile = 'not found a file';
        var status = 404;
        try {
            conFile = fs.readFileSync('.' + pathname, 'utf-8');
            status = 200;
        } catch (e) {
        }

        res.writeHead(status, {'content-type': suffixMIME + ';charset=utf-8'});
        res.end(conFile);
        return;
    }


    //APIj接口编写

    var studentData = fs.readFileSync('./json/student.json', 'utf-8');
    studentData = studentData.length == 0 ? [] : JSON.parse(studentData);
    var result = {
        code: 1,
        msg: 'error'
    };
    //获取当前页客户数据
    if (pathname == '/getAllList') {
        var n = query.n;
        var arr = [];
        for (var i = (n - 1) * 10; i <= (n * 10 - 1); i++) {
            if (i >= studentData.length)break;
            arr.push(studentData[i]);
        }
        result = {
            code: 0,
            msg: '',
            total: Math.ceil(studentData.length / 10),
            data: arr
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify(result));
        return;
    }

    if (pathname == '/addInfo') {
        var resultStr = '';
        req.on('data', function (chunk) {
            resultStr += chunk;
        });
        req.on('end', function () {
            console.log(resultStr)
            resultStr = JSON.parse(resultStr);
            resultStr.id = studentData.length == 0 ? 1 : parseFloat(studentData[studentData.length - 1]['id']) + 1;
            resultStr.sex = resultStr.sex == '男' ? 0 : 1;
            studentData.push(resultStr);
            fs.writeFileSync('./json/student.json', JSON.stringify(studentData), 'utf-8');
            result = {
                code: 0,
                msg: ''
            }
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
            res.end(JSON.stringify(result));
            return;
        })
    }

    if (pathname == '/getInfo') {
        var n = query.n;
        var studentId = query.id;
        for (var i = (n - 1) * 10; i <= n * 10 - 1; i++) {
            if (studentData[i].id == studentId) {
                result = {
                    code: 0,
                    msg: '',
                    data: studentData[i]
                }
            }
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify(result));
        return;
    }
    if (pathname == '/updateInfo') {
        var resultStr = '';
        req.on('data', function (chunk) {
            resultStr += chunk
        })
        req.on('end', function () {
            resultStr = JSON.parse(resultStr)
            resultStr.sex = resultStr.sex == '男' ? 0 : 1;
            for (var i = 0; i < studentData.length; i++) {
                if (studentData[i].id == resultStr.id) {
                    studentData[i] = resultStr
                }
            }
            result = {
                code: 0,
                msg: ''
            }
            fs.writeFileSync('./json/student.json', JSON.stringify(studentData), 'utf-8');
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
            res.end(JSON.stringify(result));
            return;
        })
    }

    if (pathname == '/removeInfo') {
        var n = query.n;
        var studentId = query.id;
        for (var i = 0; i < studentData.length; i++) {
            if (studentData[i]['id'] == studentId) {
                studentData.splice(i, 1);
                break;
            }
        }
        result = {
            code: 0,
            msg: ''
        }
        fs.writeFileSync('./json/student.json', JSON.stringify(studentData), 'utf-8');
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify(result));
        return;
    }
})
server.listen(80, function () {
    console.log('就监听80端口')
})

