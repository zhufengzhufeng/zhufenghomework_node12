function Man() {
    this._events = {};
}
var man = new Man;
Man.prototype.on = function (eventName,callback) {
    if (this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }
};
Man.prototype.emit = function (eventName) {
    var args = [].slice.call(arguments,1);
    if(this._events[eventName]){
        this._events[eventName].forEach(function (item) {
            item.apply(this,args);
        },this);
    }
};
Man.prototype.removeListener = function (eventName,callback) {
    if (this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(function (item) {
            return (item != callback) && (item.cb != callback);
        });
    }
};
Man.prototype.once = function (eventName,callback) {
    function one() {
        callback.apply(this,arguments);
        this.removeListener(eventName,one);
    }
    one.cb = callback;
    this.on(eventName,one);
};

function buyPack(who) {
    console.log(`买包给${who}`);
}
function buyCar(who) {
    console.log(`买车给${who}`);
}
man.once('有钱了',buyCar);
//man.on('有钱了',buyCar);
man.on('有钱了',buyPack);
man.removeListener('有钱了',buyCar);
man.removeListener('有钱了',buyPack);
man.emit('有钱了','妹子');
man.emit('有钱了','妹子');
man.emit('有钱了','妹子');
/*

/!*---------------*!/
function Man() {
    this._events = {};
}
Man.prototype.on = function (eventName,callback) {
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }
};
Man.prototype.emit = function (eventName) {
    var args = [].slice.call(arguments,1);
    if (this._events[eventName]){
        this._events[eventName].forEach(function (item) {
            item.apply(this,args);
        },this);
    }
};
Man.prototype.removeListener = function (eventName,callback) {
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(function (item) {
            return (item != callback) && (item.cb != callback);
        });
    }
};
Man.prototype.once = function (eventName,callback) {
    function one() {
        callback.apply(this,arguments);
        this.removeListener(eventName,one);
    }
    one.cb = callback;
    this.on(eventName,one);
};

/!*-------------------*!/

function Man() {
    this._events = {};
}

Man.prototype.on = function (eventName,callback) {
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }
};
Man.prototype.emit = function (eventName) {
    var args = [].slice.call(arguments,1);
    if(this._events[eventName]){
        this._events[eventName].forEach(function (item) {
            item.apply(this,args);
        },this);
    }
};
Man.prototype.removeListener = function (eventName,callback) {
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(function (item) {
            return (item != callback) && (item.cb != callback);
        });
    }
};

Man.prototype.once = function (eventName,callback) {
    function one() {
        callback.apply(this,arguments);
        this.removeListener(eventName,one);
    }
    one.cb = callback;
    this.on(eventName,one);
};*/
