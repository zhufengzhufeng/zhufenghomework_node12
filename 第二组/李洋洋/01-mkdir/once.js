function Man() {
    this._events = {}
}
Man.prototype.on = function(eve, cb) {
    if (this._events[eve]) {
        this._events[eve].push(cb)
    } else {
        this._events[eve] = [cb]
    }
};
Man.prototype.once = function(eve, cb) {
    this.on(eve, cb);
    var _this = this;
    Man.prototype.one = function() {
        //cb.apply(this,arguments) ;
        _this.removeListener(eve, cb)
    }
};
Man.prototype.removeListener = function(eve, cb) {
    this._events[eve] = this._events[eve].filter(function(item) {
        return item != cb;
    });

};
Man.prototype.emit = function(eve) {
    var args = [].slice(arguments, 1);
    if (this._events[eve]) {
        this._events[eve].forEach(function(item, index) {
            item.apply(this, args);

        }, this);
        this.one()
    }
};

var man = new Man();

function buy1(who) {
    console.log(1)
}

function buy2(who) {
    console.log(2)
}
man.once('事件', buy1);
man.on('事件', buy2);
man.removeListener('事件', buy1);
man.emit('事件');
man.emit('事件');
