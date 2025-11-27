<script setup lang="ts">
const data = defineModel({ type: String, required: true })
</script>

<template>
	<input class="input" v-model="data" />
</template>

<style scoped>
.input {
	width: 260px;
	min-height: 37px;
	font-size: 16px;
	padding: 15px 20px;
	color: var(--color-primary);
	border-radius: 10px;
	background: var(--color-bg-card);
	box-shadow: 1px 2px 4px 0px var(--color-bg-main);
}
.input::placeholder {
	color: #ffffff49;
}
</style>
