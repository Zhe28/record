# 工厂模式

工厂模式是一种创建型设计模式，它提供了一种创建对象的方式，允许子类决定实例化哪个类。工厂方法将类的实例化延迟到子类。

## 工厂模式的优点

1. **解耦**：工厂模式将对象的创建与使用分离，降低了代码的耦合性。
2. **扩展性**：通过引入新的工厂类，可以很容易地增加新的产品类。
3. **灵活性**：可以通过配置文件等方式动态决定创建哪个产品对象。

## 使用场景

1. **需要大量创建相似对象的场景**

   - 如创建不同类型的表单元素（输入框、按钮、下拉框等）
   - 创建不同类型的图形（圆形、矩形、三角形等）

2. **对象的创建逻辑比较复杂**

   - 对象的创建需要进行大量的配置
   - 对象的创建涉及到复杂的业务逻辑判断

3. **需要根据不同条件创建不同对象**

   - 根据用户权限创建不同的操作界面
   - 根据不同的环境（开发、测试、生产）创建不同的服务实例

4. **框架和库中的应用**
   - Vue/React 中的组件工厂
   - jQuery 的 `$()` 工厂函数
   - DOM 操作中的 `document.createElement()`

## 工厂模式的实现

在 JavaScript 中，工厂模式通常通过函数或类来实现。以下是一个简单的例子：

```javascript
// 产品类
class Button {
  constructor(type) {
    this.type = type;
  }

  render() {
    console.log(`渲染${this.type}按钮`);
  }
}

// 工厂类
class ButtonFactory {
  static createButton(type) {
    switch (type) {
      case "primary":
        return new Button("主要");
      case "danger":
        return new Button("危险");
      case "default":
      default:
        return new Button("默认");
    }
  }
}

// 使用示例
const primaryButton = ButtonFactory.createButton("primary");
primaryButton.render(); // 输出：渲染主要按钮

const dangerButton = ButtonFactory.createButton("danger");
dangerButton.render(); // 输出：渲染危险按钮
```

在这个例子中，`ButtonFactory` 根据传入的类型创建不同样式的按钮，这样使用者就不需要关心按钮是如何被创建的，只需要知道使用哪种类型的按钮即可。

## 工厂模式的示例

<script setup>
  import FactoryPattern from "./code/factory-pattern.vue";
</script>

<FactoryPattern />
