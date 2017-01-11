function ajax(options) {
    var _default = {
        url: null,
        type: 'get',
        dataType: 'text',
        async: true,
        cache: true,
        success: null,
        data: null
    };
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key];
        }
    }
    var xhr = new XMLHttpRequest;
    if (/^(get|delete|head)$/i.test(_default.type)) {
        if (_default.cache === false) {
            var char = _default.url.indexOf('?') > -1 ? '&' : '?';
            _default.url += char + '_=' + Math.random();
        }
    }
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var result = xhr.responseText;
            switch (_default.dataType) {
                case 'json':
                    result = JSON.parse(result);
                    break;
                case 'xml':
                    result = xhr.responseXML;
            }
            _default.success && _default.success.call(xhr, result);
        }
    };
    if (/^(post|put)$/i.test(_default.type)) {
        if (typeof _default.data === 'object') {
            _default.data = JSON.stringify(_default.data);
        }
        xhr.send(_default.data);
    } else {
        xhr.send(null);
    }
}