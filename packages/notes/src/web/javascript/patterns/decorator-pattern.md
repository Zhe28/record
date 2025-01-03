# 装饰器模式

装饰器模式（Decorator Pattern）是一种结构型设计模式，它允许向一个现有的对象添加新的功能，同时又不改变其结构。这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

## 主要特点

1. 装饰器模式通过组合而非继承来扩展对象的功能
2. 可以动态地添加或删除对象的职责
3. 遵循开闭原则，对扩展开放，对修改关闭
4. 支持递归组合，可以创建多层装饰

## 适用场景

1. 需要在运行时动态地给对象添加额外的职责
2. 不能采用继承的方式对系统进行扩充或者采用继承不利于系统扩展维护的情况

## 代码示例

在示例中，我们将创建一个咖啡订单系统。基础咖啡可以添加不同的配料（装饰器），如牛奶、糖、奶泡等，每种配料都会增加一定的成本。

<<< ./code/decorator-pattern.ts

## 实现分析

1. **基础组件**：

   - `Coffee` 接口定义了基本的行为：获取成本和描述
   - `SimpleCoffee` 类实现了基本的咖啡，提供了基础价格和描述

2. **装饰器基类**：

   - `CoffeeDecorator` 是所有装饰器的抽象基类
   - 它实现了 `Coffee` 接口，并持有一个被装饰的 `Coffee` 对象
   - 默认情况下，它会将所有操作委托给被装饰的对象

3. **具体装饰器**：

   - `MilkDecorator`：为咖啡添加牛奶，价格 +2
   - `SugarDecorator`：为咖啡添加糖，价格 +1
   - `WhipDecorator`：为咖啡添加奶泡，价格 +3
   - 每个装饰器都扩展了基础功能，增加了自己的价格和描述

4. **动态性**：
   - 装饰器可以动态组合，顺序不限
   - 每个装饰器都保持了接口的一致性
   - 可以随时添加新的装饰器而不影响现有代码

## 优点

1. 比继承更灵活，对象的功能可以动态增强
2. 遵循单一职责原则，每个装饰器专注于一个功能
3. 遵循开闭原则，可以在不修改现有代码的情况下添加新功能
4. 装饰类和被装饰类可以独立发展，互不耦合

## 缺点

1. 使用装饰器模式会产生很多小对象，增加系统的复杂度
2. 装饰器模式会导致设计中出现许多相似的类
3. 装饰器顺序不同可能导致不同的结果

## 装饰器模式的示例

<script setup>
import DecoratorPattern from "./code/decorator-pattern.vue"
</script>

<DecoratorPattern />
