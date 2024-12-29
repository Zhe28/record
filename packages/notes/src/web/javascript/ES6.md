# ES6 数组的扩展

<script setup lang='ts'>
import { ref } from "vue";

// 为每个示例创建独立的日志数组
const spreadLogs = ref<ILog[]>([]);
const fromLogs = ref<ILog[]>([]);
const ofLogs = ref<ILog[]>([]);
const copyWithinLogs = ref<ILog[]>([]);
const includesLogs = ref<ILog[]>([]);
const findLogs = ref<ILog[]>([]);
const fillLogs = ref<ILog[]>([]);
const entriesLogs = ref<ILog[]>([]);
const emptyLogs = ref<ILog[]>([]);
const sortLogs = ref<ILog[]>([]);

// 变量声明关键字示例
const variableDeclarationLogs = ref<ILog[]>([]);
try{
  variableDeclarationLogs.value.push({
    name: "变量声明",
    message: `a: ${typeof a}` 
  });
  var a;
  
  console.log(b); // 这时候会导致报错 tdz， 因为变量还没有赋值
  b=1;


}catch(e){
  variableDeclarationLogs.value.push({
    name: "变量声明",
    message: e.message
  });

  try{
      console.log(c); // 这时候会导致报错 tdz， 因为变量还没有赋值
  } catch(e){
      variableDeclarationLogs.value.push({
    name: "变量声明",
    message: e.message
  });
  }
}

// 模板字符串示例
const templateStringLogs = ref<ILog[]>([]);
templateStringLogs.value.push({
  name: "模板字符串",
  message: "hello world"
});

// 扩展运算符示例
console.vlog = (...args) => {
  spreadLogs.value.push({
    name: "spread",
    message: args.join(" ")
  });
};


const numbers = [4, 38];
function add(x, y) {
  return x + y;
}
console.vlog(add(...numbers));

// Array.from 示例
console.vlog = (...args) => {
  fromLogs.value.push({
    name: "from",
    message: args.join(" ")
  });
};

console.vlog(Array.from('hello'));
console.vlog(Array.from(new Set(['a', 'b'])));
console.vlog(Array.from([1, 2, 3], x => x * x));

// Array.of 示例
console.vlog = (...args) => {
  ofLogs.value.push({
    name: "of",
    message: args.join(" ")
  });
};

console.vlog(Array.of(3, 11, 8));
console.vlog(Array.of(3));
console.vlog(Array.of());
console.vlog(Array.of(undefined));

// copyWithin 示例
console.vlog = (...args) => {
  copyWithinLogs.value.push({
    name: "copyWithin",
    message: args.join(" ")
  });
};

console.vlog([1, 2, 3, 4, 5].copyWithin(0, 3));
console.vlog([1, 2, 3, 4, 5].copyWithin(0, -2));
console.vlog([1, 2, 3, 4, 5].copyWithin(0, 3, 4));

// includes 示例
console.vlog = (...args) => {
  includesLogs.value.push({
    name: "includes",
    message: args.join(" ")
  });
};

console.vlog([1, 2, 3].includes(3, 3));
console.vlog([1, 2, 3].includes(3, -1));
console.vlog([1, 2, NaN].includes(NaN));

// find 和 findIndex 示例
console.vlog = (...args) => {
  findLogs.value.push({
    name: "find",
    message: args.join(" ")
  });
};

console.vlog([1, 4, -5, 10].find(n => n < 0));
console.vlog([1, 5, 10, 15].find(value => value > 9));
console.vlog([1, 5, 10, 15].findIndex(value => value > 9));

// fill 示例
console.vlog = (...args) => {
  fillLogs.value.push({
    name: "fill",
    message: args.join(" ")
  });
};

console.vlog(['a', 'b', 'c'].fill(7));
console.vlog(new Array(3).fill(7));

// entries, keys, values 示例
console.vlog = (...args) => {
  entriesLogs.value.push({
    name: "entries",
    message: args.join(" ")
  });
};

const arr = ['a', 'b'];
for (let index of arr.keys()) {
  console.vlog(`keys: ${index}`);
}
for (let elem of arr.values()) {
  console.vlog(`values: ${elem}`);
}
for (let [index, elem] of arr.entries()) {
  console.vlog(`entries: ${index} ${elem}`);
}

// 空位示例
console.vlog = (...args) => {
  emptyLogs.value.push({
    name: "empty",
    message: args.join(" ")
  });
};

console.vlog(Array.from(['a',,'b']));
console.vlog([...['a',,'b']]);
console.vlog(new Array(3).fill('a'));

// 排序稳定性示例
console.vlog = (...args) => {
  sortLogs.value.push({
    name: "sort",
    message: args.join(" ")
  });
};

const fruits = ["peach", "straw", "apple", "spork"];

const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

console.vlog('稳定排序前:', fruits);
console.vlog('稳定排序后:', [...fruits].sort(stableSorting));

const unstableSorting = (s1, s2) => {
  if (s1[0] <= s2[0]) return -1;
  return 1;
};

console.vlog('不稳定排序后:', [...fruits].sort(unstableSorting));
</script>

## 声明变量关键字

- let 声明的基础变量可以被重新赋值，不可重复声明
- const 声明的基础变量不可以被重新赋值，不可重复声明
- var 声明的基础变量可以被重新赋值，可重复声明

他们三者的区别：

let 和 var 的主要区别在于作用域的不同。

var 声明的变量没有块级作用域，只有函数作用域和全局作用域。let 声明的变量有块级作用域，只有函数作用域、全局作用域和块级作用域。let 声明的变量会导致 TDZ (Temporal Dead Zone 临时死区)。而 var 声明的变量会临时提升到当前作用域的顶部。值是 `undefined`。

let 和 const 声明的都是一样的， 主要就只有一点， let 声明的变量是不可变的，但是 const 声明的变量是可变的。如以下的例子

```js
console.log(a); // 这时候不会报错，因为变量默认被提升到当前作用域的顶部，但是值是 undefined
var a;
console.log(b); // 这时候会导致报错 tdz， 因为变量还没有赋值
let b = 1;
console.log(b); // 这时候不会报错，因为变量已经被赋值
// const 的同理
console.log(c);
const b = 1;
console.log(c);
```

<Log :logs="variableDeclarationLogs"/>
## 扩展运算符

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```js
function add(x, y) {
  return x + y;
}
const numbers = [4, 38];
add(...numbers);
```

<Log :logs="spreadLogs" />

该运算符主要用于函数调用。

## 箭头函数

箭头函数是一种更简洁的函数表达式。它的语法如下：

```js
(...args) => {
  /* 函数体 */
};
```

## 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```js
`Hello, ${name}!`;
```

模板字符串还有个使用方式，在前方可以添加一个函数，默认传的参数是字符串。

```js
const say = append`hello`;
/**
 * @param {string[]} value
 */
function append(value) {
  return value.join("") + "world";
}
```

<Log :logs="templateStringLogs" />
## 数组方法
### Array.from()

Array.from 可以将各种类型的值转为真正的数组：

```js
Array.from("hello");
Array.from(new Set(["a", "b"]));
Array.from([1, 2, 3], x => x * x);
```

<Log :logs="fromLogs" />

### 3. Array.of()

Array.of 方法用于将一组值转换为数组：

```js
Array.of(3, 11, 8);
Array.of(3);
Array.of();
Array.of(undefined);
```

<Log :logs="ofLogs" />

### 4. copyWithin()

copyWithin() 方法会在当前数组内部，将指定位置的成员复制到其他位置：

```js
[1, 2, 3, 4, 5].copyWithin(0, 3);
[1, 2, 3, 4, 5].copyWithin(0, -2);
[1, 2, 3, 4, 5].copyWithin(0, 3, 4);
```

<Log :logs="copyWithinLogs" />

### 5. includes()

includes() 方法用于判断数组是否包含给定的值：

```js
[1, 2, 3].includes(3, 3);
[1, 2, 3].includes(3, -1);
[1, 2, NaN].includes(NaN);
```

<Log :logs="includesLogs" />

### 6. find() 和 findIndex()

find() 方法用于找出第一个符合条件的数组成员，findIndex() 方法返回第一个符合条件的数组成员的位置：

```js
[1, 4, -5, 10].find(n => n < 0);
[1, 5, 10, 15].find(value => value > 9);
[1, 5, 10, 15].findIndex(value => value > 9);
```

<Log :logs="findLogs" />

### 7. fill()

fill() 方法使用给定值，填充一个数组：

```js
["a", "b", "c"].fill(7);
new Array(3).fill(7);
```

<Log :logs="fillLogs" />

### 8. entries(), keys() 和 values()

entries(), keys() 和 values() 用于遍历数组：

```js
const arr = ["a", "b"];
for (let index of arr.keys()) {
  console.log(index);
}
for (let elem of arr.values()) {
  console.log(elem);
}
for (let [index, elem] of arr.entries()) {
  console.log(index, elem);
}
```

<Log :logs="entriesLogs" />

### 9. 数组的空位

ES6 将空位转为 undefined：

```js
Array.from(["a", , "b"]);
[...["a", , "b"]];
new Array(3).fill("a");
```

<Log :logs="emptyLogs" />

### 10. Array.prototype.sort() 的排序稳定性

排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变。

```js
const fruits = ["peach", "straw", "apple", "spork"];

const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

console.log("稳定排序前:", fruits);
console.log("稳定排序后:", [...fruits].sort(stableSorting));

const unstableSorting = (s1, s2) => {
  if (s1[0] <= s2[0]) return -1;
  return 1;
};

console.log("不稳定排序后:", [...fruits].sort(unstableSorting));
```

<Log :logs="sortLogs" />

上面代码中，stableSorting 是稳定排序，unstableSorting 是不稳定排序。稳定排序中，straw 和 spork 的顺序不变，但是在不稳定排序中，它们的顺序发生了改变。
