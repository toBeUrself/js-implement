function EventEmitter() {
    this.events = {};
}

EventEmitter.prototype.addListener = function (type, fn) {
    if (!this.events[type]) {
        this.events[type] = [fn];
    } else {
        this.events[type].push(fn); // to do 去重
    }
}

EventEmitter.prototype.emit = function (type, ...args) {
    if (!this.events[type]) {
        throw new Error('no listener.');
    }
    this.events[type].forEach(function (f) {
        f.apply(this, args);
    });
}

var event = new EventEmitter();
event.addListener('click', function(greeting){
    console.log(greeting);
});
event.emit('click', 'hello Tim');