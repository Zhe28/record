<script lang="ts" setup></script>

<template>
  <div class="container"></div>
  <br />点击" ctrl+shift+c "按键查看元素占位大小<br />
  如果显示不是相应的结果，请检查屏幕缩放设置。此项会影响CSS效果。
</template>

<style scoped>
.container {
  width: 100px;
  height: 100px;
  background: #ccc;
}

.container::before {
  content: "";
  width: 100px;
  height: 100px;
  /* background:#ccc; */
  border: 1px solid red;
}
</style>
