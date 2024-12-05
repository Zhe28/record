<template>
  <div class="module-pattern-container">
    <div class="control-panel">
      <button
        class="btn primary"
        @click="increment()"
      >
        <i class="fas fa-plus"></i>
        增加计数
      </button>
      <button
        class="btn danger"
        @click="reset()"
      >
        <i class="fas fa-undo"></i>
        重置计数
      </button>
      <div class="input-group">
        <input
          v-model="inputValue"
          type="number"
          class="number-input"
          placeholder="请输入数字"
        />
        <button
          class="btn success"
          @click="setCount(Number(inputValue))"
        >
          <i class="fas fa-save"></i>
          设置计数
        </button>
      </div>
    </div>
    <div class="counter-display">
      当前计数：<span class="count-value">{{ count }}</span>
    </div>
    <div class="log-container">
      <Log :logs="logs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import Log from "./Log.vue";

// 创建一个计数器模块
const Counter = (function () {
  // 私有变量
  let count = ref(0);
  const logs = ref<ILog[]>([]);

  // 私有方法
  function validate(value: number) {
    return typeof value === "number" && value >= 0;
  }

  function addLog(message: string) {
    logs.value.push({
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      name: "计数器",
      message,
    });
  }

  // 返回公共接口
  return {
    count,
    logs,
    increment() {
      count.value++;
      addLog(`计数增加到 ${count.value}`);
    },
    reset() {
      count.value = 0;
      addLog("计数重置为 0");
    },
    setCount(value: number) {
      if (validate(value)) {
        count.value = value;
        addLog(`计数设置为 ${value}`);
        return true;
      }
      addLog(`设置计数失败：无效的值 ${value}`);
      return false;
    },
  };
})();

// 导出公共接口
const { count, logs, increment, reset, setCount } = Counter;
const inputValue = ref("0");
</script>

<style scoped>
.module-pattern-container {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.control-panel {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.primary {
  background: #4a90e2;
  color: white;
}

.danger {
  background: #e74c3c;
  color: white;
}

.success {
  background: #2ecc71;
  color: white;
}

.input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.number-input {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  width: 100px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.number-input:focus {
  outline: none;
  border-color: #4a90e2;
}

.counter-display {
  font-size: 18px;
  margin: 20px 0;
  padding: 15px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.count-value {
  font-weight: bold;
  color: #4a90e2;
  font-size: 24px;
}

.log-container {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 响应式设计 */
@media (max-width: 600px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .input-group {
    flex-direction: column;
  }

  .number-input {
    width: 100%;
  }
}
</style>
