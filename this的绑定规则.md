# 这里记录一下 js 中 this 的绑定规则(可怜七秒的记忆)

> 每个函数的 this 是在调用时被绑定的，完全取决于函数的调用位置（也就是函数的调用方法）。只有仔细分析调用位置才能知道 this 引用的是什么，这里有四种绑定规则。

最重要的是要分析 **调用栈**（就是为了到达当前执行位置所调用的所有函数）。我们关心的调用位置就在当前所正在执行的函数的前一个调用中。

---

+ 默认绑定

首先介绍的是最常用的函数调用类型：函数独立调用。可以把这条规则看作是无法应用其他规则时的默认规则。

``` javascript
function foo() {
    console.log(this.a);
}

var a = 2;

foo(); // 2
```

*这里调用 foo 时，this.a 被解析成了全局变量。因为在这里，函数调用时，应用了 this 的默认绑定，因此 this 指向全局对象。*

为什么说这里应用了**默认绑定**呢？可以通过分析调用位置来看看 foo() 是如何调用的。在代码中， foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。

**注意：** 在严格模式下，不能将全局对象用于默认绑定，因此 this 会绑定到 undefined。

+ 隐式绑定

另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。

``` javascript
function foo() {
    cosole.lof(this.a);
}

var obj = {
    a: 2,
    foo: foo,
};

obj.foo(); // 2
```

*调用位置会使用 obj 上下文来引用函数，因此你可以说函数被调用时 obj 对象'拥有'或者'包含'函数 foo,当 foo() 被调用时，它的前面确实加上了对 obj 的引用。当函数引用上下文对象时，隐式绑定 规则会把函数调用中的 this 绑定到这个上下文对象。*

因为调用 foo() 时 this 被绑定到 obj，所以 this.a 和 obj.a 是一样的。

**注意：** 隐式丢失

*一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。*

``` javascript
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
    foo: foo,
};

var bar = obj.foo; // 函数别名！

var a = "oops, global"; // a 是全局对象的属性

bar(); // "oops, global"
```

*虽然 bar 是 obj.foo 的一个引用， 但是实际上， 它引用的是 foo 函数本身， 因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。*

回调中有更微妙，更常见并且出乎意料的情况：

``` javascript
function foo() {
    console.log(this.a);
}

function doFoo(fn) {
    // fn 其实引用的是 foo
    fn();
}

var obj = {
    a: 2,
    foo: foo,
};

var a = "oops, global";

doFoo(obj.foo); // "oops, global"
```

*参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值。*

+ 显示绑定

可以使用函数的 call(...) 和 apply(...) 方法在某个对象上强制调用函数。(严格来说，Javascript 的宿主环境有时会提供一些非常特殊的函数，他们并没有这两个方法。很罕见。)

``` javascript
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
};

foo.call(obj); // 2
```

*通过 foo.call(...)，可以在调用 foo 时强制把它的 this 绑定到 obj 上。*

**注意：** 如果传入一个原始值（字符串，布尔或者数字）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式，就是装箱。

显示绑定仍然无法解决之前提出的丢失绑定问题。

- 硬绑定

但是显示绑定的一个变种可以解决这个问题。

``` javascript
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
};

var bar = function () {
    foo.call(obj);
}

bar(); // 2

setTimeout(bar, 100); // 2

// 硬绑定的 bar 不可能在修改它的 this
bar.call(window); // 2
```

创建一个可以重复使用的辅助函数。

``` javascript
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

// 简单的辅助绑定函数
function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    }
}

var obj = {
    a: 2
};

var bar = bind(foo, obj);

var b = bar(3); // 2 3
console.log(b); // 5
```

*由于硬绑定是一种非常常用的模式，所以 ES5 提供了内置的方法 Function.prototype.bind 。*

+ new 绑定

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[Prototype]] 连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

**此外：** ES6 中的箭头函数本身是没有 this 和 arguments 的，在箭头函数中引用 this 实际上是调用定义时的上一层作用域的 this。

*这里强调的上一层作用域，是因为对象不能形成独立的作用域。*

``` javascript
var obj = {
    pro: {
        getPro: () => {
            console.log(this);
        }
    }
};

obj.pro.getPro(); // this => window
```

因为箭头函数定义时，getPro 的上一级是 pro，是一个对象，不能形成单独的作用域，所以指向 window。

····

以上就是 js 中 this 绑定问题的所有规则。
