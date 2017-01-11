~function () {
    var content = document.getElementById('content');
    ajax({
        url: '/getAllList',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function (result) {
            if (result && result.code == 0) {
                bindHTML(result.data);
            }
        }
    });
    function bindHTML(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            str += '<li>';
            str += '<span>' + cur.id + '</span>';
            str += '<span>' + cur.name + '</span>';
            str += '<span>';
            str += '<a href="detail.html?id=' + cur.id + '">修改</a>';
            str += '<a href="javascript:;" data-id="' + cur.id + '">删除</a>';
            str += '</span>';
            str += '</li>';
        }
        content.innerHTML = str;
    }
    content.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement,
            tarTag = tar.tagName.toUpperCase();
        if (tarTag === 'A' && tar.innerHTML === '删除') {
            var customId = tar.getAttribute('data-id'),
                flag = window.confirm('确定要删除编号为 [ ' + customId + ' ] 的客户吗?');
            if (flag) {
                ajax({
                    url: '/removeInfo?id=' + customId,
                    type: 'get',
                    dataType: 'json',
                    success: function (result) {
                        if (result && result.code == 0) {
                            content.removeChild(tar.parentNode.parentNode);
                        }
                    }
                });
            }
        }
    }
}();