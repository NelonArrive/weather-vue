<script setup lang="ts">
const props = defineProps<{
	message?: string | null
}>()
</script>

<template>
	<div class="error" v-if="props.message">{{ props.message }}</div>
</template>

<style scoped>
.error {
	font-size: 16px;
	padding: 10px;
	text-align: center;
	background-color: var(--color-bg-card);
	border-radius: 0px 0px 15px 15px;
	margin-top: -30px;
	margin-bottom: 60px;
}
</style>
