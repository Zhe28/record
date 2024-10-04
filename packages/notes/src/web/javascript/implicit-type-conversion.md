---
title: 隐式类型转换
editLink: true
---

> reference: [JavaScript 中的隐式类型转换](https://www.freecodecamp.org/chinese/news/javascript-implicit-type-conversion/)

# 数学运算符中的类型转换

因为 JS 并没有类型声明，所以任意两个变量或字面量，都可以做加减乘除。

## 减、乘、除

我们在对各种非Number类型运用数学运算符(- \* /)时，会先将非Number类型转换为Number类型。

```javascript
1 - true; // 0， 首先把 true 转换为数字 1， 然后执行 1 - 1
1 - null; // 1,  首先把 null 转换为数字 0， 然后执行 1 - 0
1 * undefined; //  NaN, undefined 转换为数字是 NaN
2 * ["5"]; //  10， ['5']首先会变成 '5', 然后再变成数字 5
```

上面例子中的 ['5']的转换，涉及到拆箱操作

## 加

加法的特殊性

- 当一侧为String类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型。
- 当一侧为Number类型，另一侧为原始类型，则将原始类型转换为Number类型。
- 当一侧为Number类型，另一侧为引用类型，将引用类型和Number类型转换成字符串后拼接。

```javascript
123 + "123"; // 123123   （规则1）
123 + null; // 123    （规则2）
123 + true; // 124    （规则2）
123 + {}; // 123[object Object]    （规则3）
```

## 逻辑语句中的类型转换

当我们使用 if while for 语句时，我们期望表达式是一个Boolean，所以一定伴随着隐式类型转换。而这里面又分为两种情况：

1. 单个变量⭐️如果只有单个变量，会先将变量转换为Boolean值。
2. 使用 == 比较中的5条规则虽然我们可以严格使用 ===，不过了解==的习性还是很有必要的。
   1. NaN和其他任何类型比较永远返回false（包括和他自己）。
   2. Boolean 和其他任何类型比较，Boolean 首先被转换为 Number 类型。
   3. String和Number比较，先将String转换为Number类型。
   4. null == undefined比较结果是true，除此之外，null、undefined和其他任何结果的比较值都为false。
   5. 原始类型和引用类型做比较时，引用类型会依照ToPrimitive规则转换为原始类型。

```javascript
null == undefined; // true
null == ""; // false
null == 0; // false
null == false; // false
undefined == ""; // false
undefined == 0; // false
undefined == false; // false

"[object Object]" == {};
// true, 对象和字符串比较，对象通过 toString 得到一个基本类型值
"1,2,3" == [1, 2, 3];
// true, 同上  [1, 2, 3]通过 toString 得到一个基本类型值
```

附录1：类型转换表这个表老实用了，在执行上面提到的转换规则时，可以参考这个对照表。

| 类型 | 值 | toBoolean | toNumber | toString |
| --- | --- | --- | --- | --- |
| Boolean | true | true | 1 | "true" |
| Boolean | false | false | 0 | "false" |
| Number | 123 | true | 123 | "123" |
| Number | infinity | true | Infinity | "Infinity" |
| Number | 0 | false | 0 | "0" |
| Number | NaN | false | NaN | "NaN" |
| String | '' | false | 0 | "" |
| String | '123' | true | 123 | "123" |
| String | '123abc' | true | NaN | "123abc" |
| String | 'abc' | true | NaN | "abc" |
| Null | null | false | 0 | "null" |
| Undefined | undefined | false | NaN | "undefined" |
| Function | function(){} | true | NaN | "function(){}" |
| Object | {} | true | NaN | "[object Object]" |
| Array | [] | true | 0 | "" |
| Array | ['abc'] | true | 0 | "abc" |
| Array | ['123'] | true | 123 | "123" |
| Array | ['abc', 123] | true | NaN | "abc,123" |

附录2：ToPrimitive

ToPrimitive 是一个抽象操作，它负责将引用类型转换为基本类型。

ToPrimitive 接收两个参数，hint 表示要转换的基本类型的类型，默认为 string。

```javascript
var obj = {
  valueOf: function () {
    return 2;
  },
  toString: function () {
    return "1";
  }
};

obj + "1"; // 3
```

ToPrimitive 首先会尝试 valueOf 方法，然后尝试 toString 方法，最后尝试使用 Object.prototype.toString 方法。

## 附录

### 拆箱操作

拆箱操作（boxing）是将基本类型转换为对应的引用类型的操作。

```javascript
const a = 1;
const b = new Number(a);

a === b; // false
a == b; // true
```
