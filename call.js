Function.prototype.myCall = (context, ...rest) => {
    if (typeof this !== 'function') {
        throw new TypeError('not a function');
    }
    context = context || window;
    context.fn = this;
    let res = context.fn(...rest);
    delete context.fn;
    return res;
}