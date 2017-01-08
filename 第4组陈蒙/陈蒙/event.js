/**
 * Created by chenmeng on 2017/1/8.
 */
function Man() {
    this._events = {}
}
Man.prototype.on = function (eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName].push(callback)
    }
    else {
        this._events[eventName] = [callback]
    }
}
Man.prototype.emit = function (eventName) {
    var args = [].slice.call(arguments, 1);
    if (this._events[eventName]) {
        this._events[eventName].forEach(function (item) {
            item.apply(this, args);
        }, this)
    }
}
Man.prototype.once = function (eventName, callback) {
    this.on(eventName, one);
    function one() {
        callback.apply(this, arguments);
        this.removeListener(eventName, one);
    }

    one.g = callback;
}
Man.prototype.removeListener = function (eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(function (item) {
            return item != callback && item.g != callback;
        })
    }
}

var man = new Man();
function buyCar(who) {
    console.log(`买包${who}`)
}
function buyHome(who) {
    console.log(`买房${who}`)
}
man.on('有钱', buyCar);
man.once('有钱',buyHome)
man.removeListener('有钱', buyCar)
man.emit('有钱', '妹子')
man.emit('有钱', '妹子')
man.emit('有钱', '妹子')
man.emit('有钱', '妹子')
