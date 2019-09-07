Function.prototype.myBind = (context, ...rest) => {
    if (typeof this !== 'function') {
        throw new TypeError('not a function');
    }
    let _self = this;
    return function F() {
        // 处理函数使用 new 的情况
        if (this instanceof F) {
            return new _self(...rest, ...arguments);
        }
        return _self.apply(context, rest);
    }
};