<template>
  <div class="factory-pattern-container">
    <div class="button-factory">
      <div class="factory-header">
        <i class="fas fa-industry"></i>
        按钮工厂
      </div>
      <div class="factory-controls">
        <button
          class="factory-btn primary"
          @click="ButtonFactory.createButton('primary').render()"
        >
          <i class="fas fa-plus-circle"></i>
          创建主要按钮
        </button>
        <button
          class="factory-btn danger"
          @click="ButtonFactory.createButton('danger').render()"
        >
          <i class="fas fa-exclamation-circle"></i>
          创建危险按钮
        </button>
        <button
          class="factory-btn success"
          @click="ButtonFactory.createButton('default').render()"
        >
          <i class="fas fa-check-circle"></i>
          创建默认按钮
        </button>
      </div>
    </div>

    <div class="preview-section">
      <div class="preview-header">
        <i class="fas fa-eye"></i>
        预览区域
      </div>
      <div
        ref="renderTemplate"
        class="button-preview"
      >
        <!-- 按钮将被渲染在这里 -->
      </div>
    </div>

    <div class="log-section">
      <Log :logs="logs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Log from "./Log.vue";
import dayjs from "dayjs";

const renderTemplate = ref<HTMLElement | null>(null);

class Button {
  constructor(private type: ButtonType) {}

  render() {
    const styles = {
      primary: {
        background: "#4a90e2",
        color: "white",
      },
      danger: {
        background: "#e74c3c",
        color: "white",
      },
      default: {
        background: "#2ecc71",
        color: "white",
      },
    };

    const button = document.createElement("button");
    const style = styles[this.type];
    Object.assign(button.style, {
      padding: "8px 16px",
      margin: "5px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      background: style.background,
      color: style.color,
      transition: "all 0.3s ease",
    });

    button.textContent = `${this.type} 按钮`;
    button.addEventListener("mouseover", () => {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
    });
    button.addEventListener("mouseout", () => {
      button.style.transform = "translateY(0)";
      button.style.boxShadow = "none";
    });

    renderTemplate.value?.appendChild(button);

    logs.value.push({
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      name: "按钮工厂",
      message: `创建了一个 ${this.type} 按钮`,
    });
  }
}

const logs = ref<ILog[]>([]);

// 工厂类
class ButtonFactory {
  static createButton(type: ButtonType) {
    return new Button(type);
  }
}

type ButtonType = "primary" | "danger" | "default";
</script>

<style scoped>
.factory-pattern-container {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.button-factory,
.preview-section {
  background: white;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #eaeaea;
}

.factory-header,
.preview-header {
  background: #f8f9fa;
  padding: 12px 16px;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  gap: 8px;
}

.factory-controls {
  padding: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.factory-btn {
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

.factory-btn:hover {
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

.button-preview {
  padding: 16px;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
}

.log-section {
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .factory-controls {
    flex-direction: column;
  }

  .factory-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
