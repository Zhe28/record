<script setup lang="ts">
import { ref } from "vue";
import { logs, Observer, Subject } from "./observer-pattern";
import { watch } from "fs";
import dayjs from "dayjs";

const message = ref();
const observerName = ref();

// 实例初始化被观察者
const subject = new Subject();
// 实例初始化观察者
const observer = new Observer("observer");
// 增加观察者
subject.attach(observer);
//推送消息
subject.notify(message.value ?? "hello world");

function attachObserverHandler() {
  if (!observerName.value) {
    alert("请输入正确的观察者名称");
    return;
  } else
    logs.value.push({
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      name: "添加用户",
      message: "用户的名称为 : " + observerName.value,
    });

  subject.attach(new Observer(observerName.value));
}

function notifyHandler() {
  subject.notify(message.value ?? "hello world");
}
</script>

<template>
  <div>
    <label
      >发送通知 :
      <input
        style="border: 1px solid; border-radius: 8px; width: 300px"
        type="text"
        v-model="message"
        @keydown.enter="notifyHandler"
    /></label>
    <button @click="notifyHandler">发送</button>
  </div>

  <div>
    <label
      >添加观察者 :
      <input
        style="border: 1px solid; border-radius: 8px; width: 300px"
        type="text"
        v-model="observerName"
        @keydown.enter="attachObserverHandler"
    /></label>
    <button @click="attachObserverHandler">确定</button>
  </div>
  <div>添加了一个观察者</div>
  <div>
    下面是 日志输出 的区域 [有一个默认的推送消息]
    <hr />
  </div>

  <div
    v-for="log in logs"
    :key="log.date"
  >
    <span style="color: goldenrod">[{{ log.date }}]</span>
    <span style="color: red">[{{ log.name }}]</span> {{ log.message }}
  </div>
</template>

<style lang="scss" scoped></style>
