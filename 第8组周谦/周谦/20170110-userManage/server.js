var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
var formidable = require('formidable');
var util = require('util');

var userList = [
    {username:'zq',password:'123',id:1},
    {username:'zq1',password:'123',id:2},
    {username:'zq2',password:'123',id:3}
];
 http.createServer(function(request,response){
    var urlObj = url.parse(request.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        response.setHeader('Content-Type','text/html;charset=utf-8');
        fs.createReadStream('./index.html').pipe(response);

    }else if(pathname == '/upload'){
        // formidable 第三方模块  formidable 强大的
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            // response.writeHead(200, {'content-type': 'text/plain'});
            // response.write('received upload:\n\n');
            // response.end(util.inspect({fields: fields, files: files}));
        });

    }else if(pathname == '/clock'){
        var date = new Date();
        // response.end(date.toLocaleString());
        response.end(JSON.stringify({date:date.toLocaleString()}));
    }else if(pathname=='/userList'){
            response.end(JSON.stringify(userList));
    }else if(pathname == '/addUser'){
        var str = '';
        request.on('data',function(data){
            str+=data;
        });
        request.on('end',function(){
            var user = JSON.parse(str);
            user.id = userList.length? parseInt( userList[userList.length-1].id)+1 : 1;
            userList.push(user);// 不要花蛇添足
            response.end(JSON.stringify(userList));
        });
    }else if(pathname =='/updateUser'){
        var str = '';
        request.on('data',function(data){
            str+=data;
        });
        request.on('end',function(){
            var user = JSON.parse(str);
            for(var i=0;i<userList.length;i++){
                var cur = userList[i];
                if(user.id==cur.id){
                    cur.username = user.username;
                    cur.password = user.password;
                    break;
                }
            }
            response.end(JSON.stringify(userList));
        });
    }else if(pathname == '/deleteUser'){
        var id = urlObj.query.id;
        userList = userList.filter(function(item){
            return item.id!=id;
        });
        response.end(JSON.stringify(userList));
    }else{
      // 静态文件处理
       var filePath = '.'+pathname;
       fs.exists(filePath,function(flag){
            if(flag){
                response.setHeader('Content-Type',mime.lookup(filePath)+';charset=utf-8');
                fs.createReadStream(filePath).pipe(response);
            }else {
                response.statusCode = 404;

                // .end() 内容必须是一个字符串或者buffer
                response.end('Not Found');
            }
       });
    }

}).listen(9000,function(){
    console.log('server start...');
});