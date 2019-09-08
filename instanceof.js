// 思路：右边变量的原型存在于左边变量的原型链上
function MyInstanceOf (leftVal, rightVal) {
    let leftProto = leftVal.__proto__;
    let rightProto = rightVal.prototype;

    while(true) {
        if (!leftProto) {
            return false;
        } else if (leftProto === rightProto) {
            return true;
        }
        leftProto = leftProto.__proto__;
    }
}