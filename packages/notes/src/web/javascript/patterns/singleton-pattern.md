# 单例模式 singleton pattern

单例模式确保一个对象只有**一个实例**，并提供一个全局访问点。

```javascript
let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCounter() {
    return counter;
  }

  increment() {
    ++counter;
  }

  decrement() {
    --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance()); // false
```

在这个代码中，我们创建了一个 Counter 类，并使用 getInstance 方法来获取实例。从结果来看，counter1 和 counter2 是两个不同的实例，因此 他们两个的 getInstance 方法返回的实例是不同的。

所以，这个代码并不是单例模式。

所谓单例模式，就是无论创建多少次实例，返回的实例都是同一个。

所以，我们需要改造一下代码：

```javascript
// 保存实例
let instance; // [!code ++]
let counter = 0;

class Counter {
  constructor() {
    // [!code ++:7]
    if (instance) {
      console.warn("Counter is a singleton class");
      return instance;
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCounter() {
    return counter;
  }

  increment() {
    ++counter;
  }

  decrement() {
    --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance()); // true
```

## 优化

在我们创建完成的时候，我们可以通过修改这个实例的属性，来破坏单例模式的属性。这不是我们想要的，因此，我们可以使用 `Object.freeze` 来冻结这个实例，来防止实例的属性被修改。

```javascript
// 保存实例
let instance;
let counter = 0;

class Counter {
  // ...
}

export const singletonCounter = Object.freeze(new Counter()); // [!code ++]
```

## 优劣势

将实例化限制为一个实例可能会节省大量内存空间。我们不必每次都为新实例设置内存，而只需为该实例设置内存，该实例在整个应用程序中都会被引用。但是，单例实际上被认为是一种反模式，在 JavaScript 中可以（或应该）避免使用。在许多编程语言中，例如 Java 或 C++，无法像在 JavaScript 中那样直接创建对象。在这些面向对象的编程语言中，我们需要创建一个类，然后创建一个对象。创建的对象具有类实例的值，就像 JavaScript 示例中的实例值一样。但是，上面示例中显示的类实现实际上有点矫枉过正。由于我们可以在 JavaScript 中直接创建对象，因此我们可以简单地使用常规对象来实现完全相同的结果。让我们介绍一下使用单例的一些缺点！

### 优势

#### 状态统一

在单例模式中，所有的实例都共享同一个状态。所以修改实例的状态，会影响到所有的实例。

### 劣势

#### 测试困难

测试依赖于单例的代码可能会变得很棘手。由于我们无法每次都创建新实例，因此所有测试都依赖于对前一个测试的全局实例的修改。在这种情况下，测试的顺序很重要，一个小的修改可能会导致整个测试套件失败。测试结束后，我们需要重置整个实例，以便重置测试所做的修改。

#### 依赖隐藏

当导入另一个模块时，该模块导入 Singleton 可能并不明显。在其他文件中（例如本例中的 index.js），我们可能会导入该模块并调用其方法。这样，我们就会意外修改 Singleton 中的值。这可能会导致意外行为，因为 Singleton 的多个实例可以在整个应用程序中共享，这些实例也会被修改。

#### 全局状态

> 我不知道这个写不写，书上有。 我认为这个同样是依赖隐藏的一种。

单例模式可能会导致全局状态，这可能会导致意外行为。由于所有代码都可以访问和修改单例的状态，因此很难调试和维护。

#### 难以扩展

由于单例模式限制了实例的数量，因此很难扩展应用程序。如果我们需要多个实例，则必须重构代码以支持多个实例。
