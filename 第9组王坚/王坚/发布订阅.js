function Man() {
    this._events = {};
}
Man.prototype.on = function (eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName].push(callback)
    } else {
        this._events[eventName] = [callback]
    }
};
Man.prototype.emit = function (eventName) {
    var args = [].slice.call(arguments, 1);
    if (this._events[eventName]) {
        this._events[eventName].forEach(function (item) {
            item.apply(this, args);
        }, this)
    }
};
Man.prototype.removeListener = function (eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(function (item, index) {
            return item != callback && item.g != callback;
        })
    }
};
Man.prototype.once = function (eventName, callback) {
    function one() {
        callback.apply(this, arguments);
        this.removeListener(eventName, one)
    }

    one.g = callback;
    this.on(eventName, one);
};
var man = new Man;

function buyPack(who) {
    console.log(`买包给${who}`);
}
function buyCar(who) {
    console.log(`买车给${who}`);
}
man.once('money', buyPack);
man.on('money', buyPack);
man.on('money', buyCar);
man.removeListener('money', buyCar);
man.removeListener('money',buyPack);
man.emit('money', '孩子');
man.emit('money', '孩子');



