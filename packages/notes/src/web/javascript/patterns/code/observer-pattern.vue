<template>
  <div class="observer-pattern-container">
    <div class="control-section">
      <div class="section-header">
        <i class="fas fa-broadcast-tower"></i>
        主题管理
      </div>
      <div class="control-panel">
        <div class="input-group">
          <label>消息内容:</label>
          <input
            v-model="message"
            @keypress.enter="notify"
            type="text"
            class="input-field"
            placeholder="输入要发送的消息"
          />
          <button
            class="btn primary"
            @click="notify"
          >
            <i class="fas fa-paper-plane"></i>
            发送消息
          </button>
        </div>
      </div>
    </div>

    <div class="observer-section">
      <div class="section-header">
        <i class="fas fa-users"></i>
        观察者管理
      </div>
      <div class="control-panel">
        <div class="input-group">
          <label>观察者名称:</label>
          <input
            v-model="observerName"
            @keypress.enter="addObserver"
            type="text"
            class="input-field"
            placeholder="输入观察者名称"
          />
          <button
            class="btn success"
            @click="addObserver"
          >
            <i class="fas fa-user-plus"></i>
            添加观察者
          </button>
        </div>
      </div>

      <div class="observers-list">
        <div class="section-header secondary">
          <i class="fas fa-list"></i>
          已添加的观察者
        </div>
        <div class="observer-items">
          <div
            v-for="observer in observers"
            :key="observer.name"
            class="observer-item"
          >
            <span class="observer-name">{{ observer.name }}</span>
            <button
              class="btn danger small"
              @click="removeObserver(observer)"
            >
              <i class="fas fa-user-minus"></i>
              移除
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="log-section">
      <Log :logs="logs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { logs, Observer, Subject } from "./observer-pattern";
import Log from "./Log.vue";

const message = ref();
const observerName = ref();
const observers = ref<Observer[]>([]);

const subject = new Subject();

// 初始化第一个默认的观察者
observerName.value = "默认观察者";
addObserver();
// 初始化默认消息
message.value = "不要惊讶,这是一个默认消息";
notify();

function notify() {
  if (!message.value) return;
  subject.notify(message.value);
  message.value = "";
}

function addObserver() {
  if (!observerName.value) return;
  const observer = new Observer(observerName.value);
  subject.attach(observer);
  observers.value.push(observer);
  observerName.value = "";
}

function removeObserver(observer: Observer) {
  console.log(observer);

  subject.detach(observer);
  observers.value = observers.value.filter((o) => o !== observer);
}
</script>

<style scoped>
.observer-pattern-container {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-section,
.observer-section {
  background: white;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #eaeaea;
}

.section-header {
  background: #f8f9fa;
  padding: 12px 16px;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-header.secondary {
  background: #f1f3f5;
  font-size: 14px;
}

.control-panel {
  padding: 16px;
}

.input-group {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.input-group label {
  font-weight: 500;
  color: #2c3e50;
  min-width: 80px;
}

.input-field {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #4a90e2;
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

.btn.small {
  padding: 4px 8px;
  font-size: 12px;
}

.primary {
  background: #4a90e2;
  color: white;
}

.success {
  background: #2ecc71;
  color: white;
}

.danger {
  background: #e74c3c;
  color: white;
}

.observers-list {
  border-top: 1px solid #eaeaea;
}

.observer-items {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.observer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.observer-item:hover {
  background: #f1f3f5;
}

.observer-name {
  font-weight: 500;
  color: #2c3e50;
}

.log-section {
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .input-group {
    flex-direction: column;
    align-items: stretch;
  }

  .input-group label {
    margin-bottom: 4px;
  }

  .input-field {
    width: 100%;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .observer-item {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
