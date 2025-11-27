<script setup lang="ts">
const { date, temp, icon } = defineProps({
	temp: Number,
	date: Date,
	icon: String,
	isActive: Boolean,
})
</script>

<template>
	<button class="card" :class="{ active: isActive }">
		<img :src="`https:${icon}`" alt="weather icon" width="48" height="48" />

		<div class="day">
			{{ date?.toLocaleDateString('ru-RU', { weekday: 'long' }) }}
		</div>

		<div class="temp">{{ temp }} °C</div>
	</button>
</template>

<style scoped>
.card {
	width: 25%;
	border-radius: 10px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
	color: var(--color-primary);
	padding: 15px 10px;
	background-color: var(--color-bg-card);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 15px;
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease,
		background-color 0.2s ease;
}
.card:hover {
	transform: translateY(-4px) scale(1.02);
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
	background-color: var(--color-bg-card-hover);
}
.card.active {
	background-color: var(--color-primary);
	color: var(--color-primary-inverted);
}
.day {
	font-weight: 18px;
}
.temp {
	font-weight: 700;
	font-size: 17px;
}
</style>
