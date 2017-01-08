/**
 * Created by lxy on 2017/1/8.
 */




function Man(){
    this.event={};

}
var man=new Man();
Man.prototype.on=function(eventName,callback){
    if(this.event[eventName]){
        this.event[eventName].push(callback)
    }else{
        this.event[eventName]=[callback]
    }
}

Man.prototype.removeListener=function(eventName,callback){
    if(this.event[eventName]){
        this.event[eventName]=this.event[eventName].filter(function(item){
            return item!=callback;
        })
    }
}


Man.prototype.emit=function(eventName){
    var args=[].slice.call(arguments,1);
    if(this.event[eventName]){
        var that=this;
        this.event[eventName].forEach(function(item){
            item.apply(that,args)
        })
    }
}

Man.prototype.once=function(eventName,callback){
    this.on(eventName,one);
    function one(){
        callback.apple(this,arguments);
        this.removeListener(eventName,one)
    }
}






function Man(){
    this.event={}
}
var man=new Man();
Man.prototype.on=function(eventName,callback){
    if(this.event[eventName]){
        this.event[eventName].push(callback)
    }else{
        this.event[eventName]=[callback]
    }
}


Man.prototype.removeListener=function(eventName,callback){
    if(this.event[eventName]){
        this.event[eventName]=this.event[eventName].filter(function(item){
            return item !=callback;
        })
    }
}


Man.prototype.emit=function(eventName){
    var arg=[].slice.call(arguments,1);
    if(this.event[eventName]){
        var that=this;
        this.event[eventName].forEach(function(item){
            item.apply(that,args)
        })
    }
}


Man.prototype.once=function(eventName,callback){
    this.on(eventName,one);
    function one(){
        callback.apply(this,arguments);
        this.removeListener(eventName,one)
    }
}
