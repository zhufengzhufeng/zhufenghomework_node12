/**
 * Created by Administrator on 2017/1/9.
 */
var http=require('http');
var fs=require('fs');
var url=require('url');
var mime=require('mime');
var userList = [
    {username:'张三',password:'xxxx',id:1},
];
http.createServer(function(req,res){
    var urlObj=url.parse(req.url,true);
    var pathname=urlObj.pathname;
    if(pathname=='/'){
        res.setHeader('Content-Type','text/html;charset=utf-8');
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname=='/getUsers'){
        res.end(JSON.stringify(userList));
    }else if(pathname=='/addUser'){
        var str='';
        req.on('data',function(chunk){
            str+=chunk;
        });
        req.on('end',function(){
            str=JSON.parse(str);
            str.id=userList.length?userList[userList.length-1].id+1:1;
            userList.push(str);
            res.end(JSON.stringify(userList));

        })
    }else if(pathname=='/deleteUser'){
        var curId=urlObj.query.id;
        userList=userList.filter(function(item){
            return item.id!=curId;
        });
        res.end(JSON.stringify(userList));
    }else if(pathname=='/infoUser'){
        curId=urlObj.query.id;
        var newList=userList.find(function(item){
            if(curId==item['id']){
                return true;
            }
        });
        console.log(newList);
        res.end(JSON.stringify(newList));
    }else if(pathname=='/amendUser'){

        var str1='';
        req.on('data',function (chunk) {
            str1+=chunk;
        });
        req.on('end',function () {
            str1=JSON.parse(str1);
            userList.forEach(function (item,index) {
                if(item.id==str1.id){
                    userList[index]=str1;

                }
            });
            res.end(JSON.stringify(userList));
        })
    }else{
        fs.exists('./'+pathname,function(flag){
            if(flag){
                res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf-8');
                fs.createReadStream('.'+pathname).pipe(res);
            }else{
                res.statusCode=404;
                res.end('not found')
            }
        })
    }
}).listen(80);