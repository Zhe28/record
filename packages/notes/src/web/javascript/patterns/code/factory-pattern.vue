<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import Log from "./Log.vue";
import dayjs from "dayjs";

const renderTemplate = useTemplateRef("renderTemplate");

class Button {
  constructor(private type: ButtonType) {}

  render() {
    const mappedType = {
      primary: "bule",
      danger: "red",
      default: "green",
    };
    const button = document.createElement("button");
    button.style.color = mappedType[this.type];
    button.textContent = this.type;
    renderTemplate.value?.appendChild(button);

    logs.value.push({
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      name: "渲染按钮",
      message: `渲染${this.type}按钮`,
    });
  }
}

const logs = ref<ILog[]>([]);
// 工厂类
class ButtonFactory {
  static createButton(type: ButtonType) {
    switch (type) {
      case "primary":
        return new Button("primary");
      case "danger":
        return new Button("danger");
      case "default":
      default:
        return new Button("default");
    }
  }
}

type ButtonType = "primary" | "danger" | "default";
</script>

<template>
  <div class="text-red">
    <button
      style="margin: 5px; border: 2px solid blue"
      @click="ButtonFactory.createButton('primary').render()"
    >
      渲染主要按钮
    </button>
    <button
      style="margin: 5px; border: 2px solid red"
      @click="ButtonFactory.createButton('danger').render()"
    >
      渲染危险按钮
    </button>
    <button
      style="margin: 5px; border: 2px solid green"
      @click="ButtonFactory.createButton('default').render()"
    >
      渲染默认按钮
    </button>
  </div>
  <div ref="renderTemplate"></div>
  <div>
    <Log :logs="logs" />
  </div>
</template>

<style lang="scss" scoped></style>
