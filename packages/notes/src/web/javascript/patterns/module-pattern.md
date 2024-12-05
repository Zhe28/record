# 模块模式

模块模式是一种用于实现封装和命名空间的设计模式。它可以将代码组织成独立的、可重用的模块，并提供了一种创建私有和公共变量与方法的方式。

## 模块模式的优点

1. **封装性**：可以隐藏内部实现细节，只暴露必要的接口
2. **避免命名冲突**：通过模块作用域，避免全局命名空间污染
3. **代码组织**：提供了一种清晰的代码组织方式
4. **可维护性**：模块化的代码更容易维护和测试

## 使用场景

1. **需要封装私有变量和方法的场景**

   - 实现数据私有化
   - 控制对内部状态的访问

2. **需要组织大型应用代码的场景**

   - 将相关功能组织到一个模块中
   - 管理模块间的依赖关系

3. **需要避免命名冲突的场景**

   - 多人协作开发
   - 使用第三方库时

4. **单例对象的实现**
   - 需要一个统一的状态管理
   - 配置管理模块

## 模块模式的实现

在 JavaScript 中，模块模式通常通过立即执行函数表达式（IIFE）和闭包来实现：

```javascript
const Counter = (function () {
  // 私有变量
  let count = 0;

  // 私有方法
  function validate(value) {
    return typeof value === "number" && value >= 0;
  }

  // 返回公共接口
  return {
    // 获取当前计数
    getCount: function () {
      return count;
    },

    // 增加计数
    increment: function () {
      return ++count;
    },

    // 设置计数
    setCount: function (value) {
      if (validate(value)) {
        count = value;
        return true;
      }
      return false;
    }
  };
})();

// 使用示例
console.log(Counter.getCount()); // 0
Counter.increment(); // 1
Counter.setCount(5); // true
console.log(Counter.getCount()); // 5
```

在这个例子中：

- `count` 是一个私有变量，外部无法直接访问
- `validate` 是一个私有方法，只在模块内部使用
- `getCount`、`increment` 和 `setCount` 是公共方法，可以被外部访问

## 现代 JavaScript 中的模块

在现代 JavaScript 中，我们可以使用 ES6 模块语法来实现模块模式：

```javascript
// counter.js
let count = 0;

function validate(value) {
  return typeof value === "number" && value >= 0;
}

export function getCount() {
  return count;
}

export function increment() {
  return ++count;
}

export function setCount(value) {
  if (validate(value)) {
    count = value;
    return true;
  }
  return false;
}
```

使用示例：

```javascript
// main.js
import { getCount, increment, setCount } from "./counter.js";

console.log(getCount()); // 0
increment(); // 1
setCount(5); // true
console.log(getCount()); // 5
```

ES6 模块的优点：

1. 原生支持模块化
2. 静态导入导出
3. 更好的依赖管理
4. 支持树摇（tree-shaking）

## 模块模式的示例

<script setup>
  import ModulePattern from "./code/module-pattern.vue";
</script>

<ModulePattern />
