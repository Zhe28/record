<template>
  <div>
    <h2>咖啡订单系统</h2>
    <div class="coffee-container">
      <div class="coffee-base">
        <h3>基础咖啡</h3>
        <p>价格: {{ baseCoffee.getCost() }}元</p>
        <p>描述: {{ baseCoffee.getDescription() }}</p>
      </div>

      <div class="decorators">
        <h3>添加配料</h3>
        <div class="decorator-buttons">
          <button
            @click="addMilk"
            :disabled="hasMilk"
          >
            加牛奶 (+2元)
          </button>
          <button
            @click="addSugar"
            :disabled="hasSugar"
          >
            加糖 (+1元)
          </button>
          <button
            @click="addWhip"
            :disabled="hasWhip"
          >
            加奶泡 (+3元)
          </button>
        </div>
      </div>

      <div class="result">
        <h3>当前咖啡</h3>
        <p>总价: {{ currentCoffee.getCost() }}元</p>
        <p>描述: {{ currentCoffee.getDescription() }}</p>
      </div>

      <button
        class="reset-btn"
        @click="reset"
      >
        重置
      </button>
      <button
        class="submit-btn"
        @click="reset"
      >
        提交
      </button>
    </div>
  </div>
  <Log :logs="logs" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Log from "./Log.vue";
import dayjs from "dayjs";

const logs = ref<ILog[]>([]);

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

const baseCoffee = new SimpleCoffee();
const currentCoffee = ref<Coffee>(new SimpleCoffee());

const hasMilk = ref(false);
const hasSugar = ref(false);
const hasWhip = ref(false);

const addMilk = () => {
  currentCoffee.value = new MilkDecorator(currentCoffee.value);
  logs.value.push({
    date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    name: "咖啡订单系统",
    message: "添加牛奶",
  });
  hasMilk.value = true;
};

const addSugar = () => {
  currentCoffee.value = new SugarDecorator(currentCoffee.value);
  logs.value.push({
    date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    name: "咖啡订单系统",
    message: "添加糖",
  });
  hasSugar.value = true;
};

const addWhip = () => {
  currentCoffee.value = new WhipDecorator(currentCoffee.value);
  logs.value.push({
    date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    name: "咖啡订单系统",
    message: "添加奶泡",
  });
  hasWhip.value = true;
};

const reset = () => {
  currentCoffee.value = new SimpleCoffee();
  logs.value.push({
    date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    name: "咖啡订单系统",
    message: "重置咖啡配料内容",
  });
  hasMilk.value = false;
  hasSugar.value = false;
  hasWhip.value = false;
};
</script>

<style scoped>
.coffee-container {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.coffee-base,
.decorators,
.result {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.decorator-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.reset-btn {
  background-color: #f44336;
  width: 100%;
  margin-top: 10px;
}

.reset-btn:hover {
  background-color: #da190b;
}

.submit-btn {
  background-color: #4caf50;
  width: 100%;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #45a049;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

h3 {
  color: #666;
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
  color: #555;
}
</style>
