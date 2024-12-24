<script setup lang="ts">
import { watch, useTemplateRef, ref } from "vue";

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

const clearLogs = () => {
  props.logs.length = 0;
};
</script>

<template>
  <div class="log-container">
    <div class="log-header">
      <i class="fas fa-terminal"></i>
      日志输出
      <div
        class="clear-button"
        @click="clearLogs"
        title="清除所有日志"
      >
        <i class="fas fa-trash"></i>
      </div>
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
        <span class="log-timestamp">[{{ log.date ?? new Date().toLocaleTimeString() }}]</span>
        <span class="log-type">[{{ log.name }}]</span>
        <span class="log-message">{{
          typeof log.message === "function" ? log.message() : log.message
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.log-container {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: #f8f9fa;
}

.log-header {
  padding: 8px 12px;
  background: #e9ecef;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  display: flex;
  align-items: center;
  position: relative;
}

.log-header i {
  margin-right: 8px;
}

.clear-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.clear-button:hover {
  color: #dc3545;
}

.log-content {
  padding: 8px;
  max-height: 300px;
  overflow-y: auto;
  font-family: monospace;
}

.log-item {
  padding: 4px 0;
  font-size: 14px;
  line-height: 1.4;
}

.log-timestamp {
  color: #666;
  margin-right: 8px;
}

.log-type {
  color: #0066cc;
  margin-right: 8px;
}

.log-message {
  color: #333;
}

/* 滚动条样式 */
.log-content::-webkit-scrollbar {
  width: 6px;
}

.log-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.log-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.log-content::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
