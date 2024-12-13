# JavaScript Event Loop

JavaScript 的事件循环是其实现异步编程的核心机制。它使得 JavaScript 能够在单线程环境下处理多个并发操作。

## 基本概念

JavaScript 运行时包含以下几个重要组件：

1. **调用栈（Call Stack）**：执行同步代码的地方
2. **堆（Heap）**：存储对象的内存空间
3. **任务队列（Task Queue）**：
   - 宏任务（Macrotask）队列
   - 微任务（Microtask）队列
4. **Web APIs**：提供异步操作的接口（在浏览器环境中）

## 事件循环的工作流程

```mermaid
flowchart TD
    A[调用栈为空] -->|检查| B{有微任务?}
    B -->|是| C[执行所有微任务]
    B -->|否| D{有宏任务?}
    C --> D
    D -->|是| E[执行一个宏任务]
    D -->|否| A
    E --> A
```

## 详细执行过程

1. 同步代码直接在调用栈中执行
2. 异步代码交给 Web APIs 处理
3. Web APIs 完成后，回调函数被放入相应的任务队列
4. 当调用栈为空时：
   - 先清空微任务队列
   - 然后取出一个宏任务执行

## 任务类型对比

```mermaid
graph LR
    A[任务类型] --> B[宏任务]
    A --> C[微任务]
    B --> D[setTimeout/setInterval]
    B --> E[I/O]
    B --> F[UI渲染]
    C --> G[Promise.then]
    C --> H[MutationObserver]
    C --> I[process.nextTick]
```

## 代码示例

尝试运行以下代码，观察事件循环的执行顺序：

默认示例：

```javascript
console.log("1"); // 同步任务

setTimeout(() => {
  console.log("2"); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // 微任务
});

console.log("4"); // 同步任务
```

## 执行顺序图解

```mermaid
sequenceDiagram
    participant Stack as 调用栈
    participant Micro as 微任务队列
    participant Macro as 宏任务队列
    participant APIs as Web APIs

    Stack->>Stack: console.log('1')
    Stack->>APIs: setTimeout
    APIs->>Macro: 回调函数
    Stack->>Micro: Promise.then
    Stack->>Stack: console.log('4')
    Stack->>Micro: 执行微任务
    Micro->>Stack: console.log('3')
    Stack->>Macro: 执行宏任务
    Macro->>Stack: console.log('2')
```

## 注意事项

1. 微任务优先级高于宏任务
2. 每个宏任务之后都会清空微任务队列
3. `requestAnimationFrame` 在渲染之前执行
4. Node.js 环境下的事件循环与浏览器略有不同

## 实际应用

事件循环机制的理解对于以下场景特别重要：

- 性能优化
- 异步操作处理
- 动画效果实现
- 用户交互响应

理解事件循环有助于我们写出更高效的异步代码，避免阻塞主线程，提供更好的用户体验。
