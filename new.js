/**
1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[Prototype]] 连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。
 */
function myNew (func) {
    // 创建一个新对象且将其隐式原型指向构造函数原型
    let newObj = {
        __proto__: func.prototype,
    };
    // 执行构造函数
    func.call(newObj, arguments);
    return newObj;
}