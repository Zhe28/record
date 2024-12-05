// 咖啡接口
interface Coffee {
  getCost(): number;
  getDescription(): string;
}

// 基础咖啡类
class SimpleCoffee implements Coffee {
  getCost(): number {
    return 10;
  }

  getDescription(): string {
    return "简单咖啡";
  }
}

// 装饰器基类
abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost();
  }

  getDescription(): string {
    return this.coffee.getDescription();
  }
}

// 具体装饰器：牛奶
class MilkDecorator extends CoffeeDecorator {
  getCost(): number {
    return this.coffee.getCost() + 2;
  }

  getDescription(): string {
    return this.coffee.getDescription() + ", 加牛奶";
  }
}

// 具体装饰器：糖
class SugarDecorator extends CoffeeDecorator {
  getCost(): number {
    return this.coffee.getCost() + 1;
  }

  getDescription(): string {
    return this.coffee.getDescription() + ", 加糖";
  }
}

// 具体装饰器：奶泡
class WhipDecorator extends CoffeeDecorator {
  getCost(): number {
    return this.coffee.getCost() + 3;
  }

  getDescription(): string {
    return this.coffee.getDescription() + ", 加奶泡";
  }
}

// 使用示例
let coffee: Coffee = new SimpleCoffee();
console.log(coffee.getDescription()); // 输出：简单咖啡
console.log(coffee.getCost()); // 输出：10

// 加牛奶
coffee = new MilkDecorator(coffee);
console.log(coffee.getDescription()); // 输出：简单咖啡, 加牛奶
console.log(coffee.getCost()); // 输出：12

// 加糖
coffee = new SugarDecorator(coffee);
console.log(coffee.getDescription()); // 输出：简单咖啡, 加牛奶, 加糖
console.log(coffee.getCost()); // 输出：13

// 加奶泡
coffee = new WhipDecorator(coffee);
console.log(coffee.getDescription()); // 输出：简单咖啡, 加牛奶, 加糖, 加奶泡
console.log(coffee.getCost()); // 输出：16
