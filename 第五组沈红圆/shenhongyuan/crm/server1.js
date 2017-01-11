var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    var customData = fs.readFileSync('./json/custom.json', 'utf-8');
    customData = customData.length === 0 ? '[]' : customData;
    customData = JSON.parse(customData);
    var result = {code: 1, msg: 'error', data: null};
    if (pathname == '/') {
        res.setHeader('Content-Type', 'text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    } else if (pathname === '/getAllList') {
        if (customData.length > 0) {
            result = {
                code: 0,
                msg: 'success',
                data: customData
            };
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    } else if (pathname === '/addInfo') {
        var requestStr = '';
        req.on('data', function (chunk) {
            requestStr += chunk;
        });
        req.on('end', function () {
            requestStr = JSON.parse(requestStr);
            requestStr['id'] = customData.length === 0 ? 1 : parseFloat(customData[customData.length - 1]['id']) + 1;
            customData.push(requestStr);
            fs.writeFileSync('./json/custom.json', JSON.stringify(customData), 'utf-8');
            result = {
                code: 0,
                msg: 'success'
            };
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        });
        return;
    } else if (pathname === '/updateInfo') {
        requestStr = '';
        req.on('data', function (chunk) {
            requestStr += chunk;
        });
        var flag = false;
        req.on('end', function () {
            requestStr = JSON.parse(requestStr);
            customData.forEach(function (item, index) {
                if (requestStr['id'] == item['id']) {
                    customData[index] = requestStr;
                    flag = true;
                    return false;
                }
            });
            fs.writeFileSync('./json/custom.json', JSON.stringify(customData), 'utf-8');
            result = {
                code: 0,
                msg: 'success'
            };
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        });
        return;
    } else if (pathname === '/getInfo') {
        var customId = query['id'];
        customData.forEach(function (item, index) {
            if (item['id'] == customId) {
                result = {
                    code: 0,
                    msg: 'success',
                    data: customData[index]
                };
                return false;
            }
        });
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    } else if (pathname === '/removeInfo') {
        customId = query['id'];
        customData.forEach(function (item, index) {
            if (item['id'] == customId) {
                customData.splice(index, 1);
                fs.writeFileSync('./json/custom.json', JSON.stringify(customData), 'utf-8');
                result = {
                    code: 0,
                    msg: 'success'
                };
                return false;
            }
        });
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
    } else {
        fs.exists('.' + pathname, function (flag) {
            if (flag) {
                res.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf8');
                fs.createReadStream('.' + pathname).pipe(res);
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }
        })

    }
}).listen(52233, function () {
    console.log('Opening serves successfully 52233')
});
