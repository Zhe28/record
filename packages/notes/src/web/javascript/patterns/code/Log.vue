<script setup lang="ts">
defineProps({
  logs: {
    type: Array<ILog>,
    required: true,
  },
});
</script>

<template>
  <div
    v-for="log in logs"
    :key="log.date"
  >
    <span style="color: goldenrod">[{{ log.date }}]</span>
    <span style="color: red">[{{ log.name }}]</span> {{ log.message }}
  </div>
</template>

<style lang="scss" scoped></style>
