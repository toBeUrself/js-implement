
// 思路：将要改变 this 指向的方法挂到目标的 this 上执行并返回
Function.prototype.myApply = (context, args) => {
    if (typeof this !== 'function') {
        throw new TypeError('not a function');
    }
    context = context || window;
    context.fn = this;
    let res = context.fn(...args);
    delete context.fn;
    return res;
}