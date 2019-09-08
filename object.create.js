// 思路：将传入的对象作为原型
function myCreate(obj) {
    function F() { }
    F.prototype = obj;
    return new F();
}