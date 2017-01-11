var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
var tempId=null;
var userList = [
    {username: '张三', password: 'zhangsan', id: 1},
    {username: '李四', password: 'lisi', id: 2},
    {username: '王武', password: 'wangwu', id: 3}
];
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        res.setHeader('Content-Type', 'text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    } else if (pathname == '/getUsers') {
        res.end(JSON.stringify(userList));
    } else if (pathname == '/addUser') {
        var str = '';
        req.on('data', function (data) {
            str += data;
        });
        req.on('end', function () {
            var user = JSON.parse(str);
            //取数组的最后一项的id+1防止重复
            user.id = userList.length ? parseInt(userList[userList.length - 1].id) + 1 : 1;
            userList.push(user);
            res.end(JSON.stringify(userList));
        });
    } else if (pathname == '/deleteUser') {
        var id = urlObj.query.id;
        userList = userList.filter(function (item) {
            return item.id != id;
        });
        res.end(JSON.stringify(userList));
    } else if(pathname=='/getUser'){//获取指定的用户信息
        var id1 = urlObj.query.id;
        tempId=id1;
        for(var i=0;i<userList.length;i++){
            if(id1==userList[i].id) {
                //console.log(id1,'get')
                res.end(JSON.stringify(userList[i]))
            }
        }
    }
    else if(pathname=='/changeUser'){
        //修该用户信息
        var strC='';
        req.on('data',function(data){
            strC+=data;
            strC=JSON.parse(strC);
            strC.id=tempId;
        });
        req.on('end',function(){
            for(var i=0;i<userList.length;i++){
                if(tempId==userList[i].id) {
                    userList[i]=strC;
                    res.end(JSON.stringify(userList));
                }
            }
        })
    }
    else {
        fs.exists('.' + pathname, function (flag) {
            if (flag) {
                res.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf8');
                fs.createReadStream('.' + pathname).pipe(res);//等同于var conFile=res.readFileSync('.'+pathname) ;res.end(conFile)
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }
        });
    }
}).listen(80,function(){
    console.log('80 port is listening')
});
