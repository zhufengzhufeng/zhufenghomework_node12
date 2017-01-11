let oul = document.getElementById('oul');
let btn = document.getElementById('btn');
let username = document.getElementById('username');
let password = document.getElementById('password');
let update = document.getElementById('update');
function showList(data) {
    let str = '';
    data.forEach(function (item, index) {
        str += `<li class="list-group-item">
           ID:${item.id}  用户名：${item.username}  密码：${item.password}
            <button type="button" class="bth btn-danger pull-right btn-xs" onclick="del(${item.id})">删除</button>
            <button type="button" class="bth btn-warning pull-right btn-xs" style="margin-right: 10px" data-name="${item.username}" data-pwd="${item.password}"   onclick="upDate(${item.id},this)">修改</button>
        </li>`;
    });
    oul.innerHTML = str;
}
//获取信息
let xhr = new XMLHttpRequest;
xhr.open('get', '/getInfo', true);
xhr.responseType = 'json';
xhr.onload = function () {
    showList(xhr.response)
};
xhr.send();
update.onclick = function () {
    let id = this.getAttribute('data-id');
    let flag = window.confirm(`确定要修改ID为${id}的信息吗？`);
    if (flag) {
        let xhr = new XMLHttpRequest;
        xhr.open('post', '/updateInfo?id='+id, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            let data = xhr.response;
            showList(data);
        };
        xhr.send(JSON.stringify({username: username.value, password: password.value,id:id}));
    }
};
//增加信息
btn.onclick = function () {
    if (!username.value || !password.value) {
        alert('请输入用户名或者密码');
    } else {
        let xhr = new XMLHttpRequest;
        xhr.open('post', '/addInfo', true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            username.value = password.value = '';
            showList(xhr.response)
        };
        xhr.send(JSON.stringify({username: username.value, password: password.value}));
    }

};
//删除信息
function del(id) {
    let xhr = new XMLHttpRequest;
    xhr.open('delete', '/deleteInfo?id=' + id, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let data = xhr.response;
        showList(data)
    };
    xhr.send();
}
//修改信息
function upDate(id,that) {
    username.value = that.getAttribute('data-name');
    password.value = that.getAttribute('data-pwd');
    update.setAttribute('data-id',id)
}
