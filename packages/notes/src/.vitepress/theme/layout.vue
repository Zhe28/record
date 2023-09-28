<template>
	<Layout>
		<template #aside-outline-before> My custom sidebar top content </template>
	</Layout>
</template>

<script setup lang="ts">
import { useData } from "vitepress";

console.log(123);
const { page, frontmatter } = useData();
</script>

<style lang="scss" scoped></style>
