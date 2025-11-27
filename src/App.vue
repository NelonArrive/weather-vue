<script setup lang="ts">
import { onMounted, provide, ref, watch } from 'vue'
import type { WeatherData, WeatherError } from './types'
import { LeftPanel, RightPanel } from './components'
import { API_URL, cityProvide } from './constants'

let data = ref<WeatherData | null>(null)
let error = ref<WeatherError | null>(null)
let activeIndex = ref(0)
let city = ref('Екатеринбург')

provide(cityProvide, city)

watch(city, () => {
	fetchCity(city.value)
})

onMounted(() => {
	fetchCity(city.value)
})

async function fetchCity(city: string) {
	const params = new URLSearchParams({
		q: city,
		lang: 'ru',
		key: import.meta.env.VITE_WEATHER_API_KEY,
		days: '4',
	})
	const res = await fetch(`${API_URL}/forecast.json?${params.toString()}`)
	if (res.status != 200) {
		error.value = await res.json()
		data.value = null
		return
	}
	error.value = null
	data.value = await res.json()
}
</script>

<template>
	<main class="main">
		<div class="left">
			<LeftPanel
				v-if="data"
				:data
				:error
				:dayData="data.forecast.forecastday[activeIndex]"
			/>
		</div>
		<div class="right">
			<RightPanel
				:data
				:error
				:activeIndex
				@selectIndex="i => (activeIndex = i)"
			/>
		</div>
	</main>
</template>

<style scoped>
.main {
	display: flex;
	align-items: center;
	justify-content: center;
}
.right {
	background: var(--color-bg-main);
	padding: 30px 20px;
	border-radius: 0 15px 15px 0;
	width: 450px;
}
.left {
	border: 1px solid #ffffffb8;
	padding: 30px 20px;
	background: var(--gradient-panel);
	width: 400px;
	height: 630px;
	border-radius: 18px;
	display: flex;
	flex-direction: column;
}
</style>
