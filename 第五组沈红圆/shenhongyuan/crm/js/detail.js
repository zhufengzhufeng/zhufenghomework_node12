~function (pro) {
    function queryURLParameter() {
        var reg = /([^?&=#]+)=([^?&=#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);

~function () {
    var userName = document.getElementById('userName'),
        submit = document.getElementById('submit');
    var curURL = window.location.href,
        urlObj = curURL.queryURLParameter(),
        customId = urlObj['id'];
    if (typeof customId !== 'undefined') {
        ajax({
            url: '/getInfo?id=' + customId,
            type: 'get',
            dataType: 'json',
            cache: false,
            success: function (result) {
                if (result && result.code == 0) {
                    userName.value = result["data"]["name"];
                }
            }
        });
    }
    submit.onclick = function () {
        var value = userName.value;
        if (typeof customId !== 'undefined') {
            ajax({
                url: '/updateInfo',
                type: 'post',
                dataType: 'json',
                data: {id: customId, name: value},
                success: function (result) {
                    if (result && result.code == 0) {
                        window.location.href = 'index.html';
                    }
                }
            });
            return;
        }
        ajax({
            url: '/addInfo',
            type: 'post',
            dataType: 'json',
            data: {name: value},
            success: function (result) {
                if (result && result.code == 0) {
                    window.location.href = 'index.html';
                }
            }
        });
    }
}();