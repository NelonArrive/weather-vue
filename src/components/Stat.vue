<script setup lang="ts">
const { label = 'Не задан', stat = '-' } = defineProps({
	label: String,
	stat: String,
})
</script>

<template>
	<div class="stat">
		<div class="label">{{ label }}</div>
		<div class="value">{{ stat }}</div>
	</div>
</template>

<style scoped>
.stat-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 12px;
}

.stat {
	padding: 12px;
	background: var(--color-bg-card);
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.stat .label {
	color: #aaa;
	font-size: 13px;
}

.stat .value {
	color: white;
	font-size: 18px;
	font-weight: 600;
}
</style>
