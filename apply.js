Function.prototype.apply = (context, args) => {
    if (typeof this !== 'function') {
        throw new TypeError('not a function');
    }
    context = context || window;
    context.fn = this;
    let res = context.fn(...args);
    delete context.fn;
    return res;
}