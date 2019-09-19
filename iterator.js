// 实现对象的 [Symbol.iterator] 属性
function MyIterator() {
    this.vals = [9, 8, 7, 6, 5, 4, 3, 2, 1, 11, 111, 1111];
}

MyIterator.prototype[Symbol.iterator] = function () {
    var self = this;
    return {
        next: function () {
            if (self.vals.length) {
                return {
                    value: self.vals.pop(),
                    done: false,
                };
            } else {
                return {
                    value: undefined,
                    done: true,
                };
            }
        }
    }
};

var iter = new MyIterator();

for (var val of iter) console.log(val);