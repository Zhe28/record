<script setup lang="ts">
import { watch, useTemplateRef } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  logs: {
    type: Array<ILog>,
    required: true,
  },
});

const logContent = useTemplateRef<HTMLElement>("logContent");

// 监听 logs 变化，自动滚动到底部
watch(
  () => props.logs,
  () => {
    setTimeout(() => {
      if (logContent.value) {
        logContent.value.scrollTop = logContent.value.scrollHeight;
      }
    }, 0);
  },
  { deep: true },
);
</script>

<template>
  <div class="log-container">
    <div class="log-header">
      <i class="fas fa-terminal"></i>
      日志输出
    </div>
    <div
      class="log-content"
      ref="logContent"
    >
      <div
        v-for="log in logs"
        :key="log.date"
        class="log-item"
      >
        <span class="log-timestamp">[{{ log.date }}]</span>
        <span class="log-type">[{{ log.name }}]</span>
        <span class="log-message">{{ log.message }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.log-container {
  border: 1px solid #eaeaea;
  border-radius: 6px;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 300px;
}

.log-header {
  background: #f8f9fa;
  padding: 12px 16px;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  gap: 8px;
}

.log-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  font-family: "Fira Code", monospace;
  font-size: 14px;
  line-height: 1.5;
  background: #1e1e1e;
  color: #d4d4d4;
}

.log-content::-webkit-scrollbar {
  width: 8px;
}

.log-content::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.log-content::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

.log-content::-webkit-scrollbar-thumb:hover {
  background: #666;
}

.log-item {
  margin-bottom: 4px;
  white-space: pre-wrap;
  word-break: break-all;
}

.log-timestamp {
  color: #569cd6;
  margin-right: 6px;
}

.log-type {
  color: #4ec9b0;
  margin-right: 6px;
}

.log-message {
  color: #ce9178;
}

@media (max-width: 600px) {
  .log-container {
    height: 200px;
  }

  .log-content {
    font-size: 12px;
  }
}
</style>
