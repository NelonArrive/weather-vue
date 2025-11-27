<script setup lang="ts">
import { computed } from 'vue'
import { CitySelect, DayCard, Error, Stat } from '.'
import type { WeatherData, WeatherError } from '../types'
import { errorMap } from '../constants'

const { error, data, activeIndex } = defineProps<{
	data: WeatherData | null
	error: WeatherError | null
	activeIndex: number
}>()

const emit = defineEmits(['selectIndex', 'selectCity'])

const errorDisplay = computed(() => {
	return error ? errorMap.get(error.error.code) : null
})

const stats = computed(() => {
	if (!data) return []
	const c = data.forecast.forecastday[activeIndex]?.day
	if (!c) return []

	return [
		{ label: 'Температура', stat: `${c.avgtemp_c}°C` },
		{ label: 'Ветер', stat: `${c.maxwind_kph} км/ч` },
		{ label: 'Влажность', stat: c.avghumidity + '%' },
		{ label: 'Видимость', stat: c.avgvis_km + ' км' },
		{ label: 'Осадки', stat: c.totalprecip_mm + ' мм' },
		{ label: 'Снег', stat: c.totalsnow_cm + ' см' },
		{ label: 'Вероятность дождя', stat: c.daily_chance_of_rain + '%' },
		{ label: 'Вероятность снега', stat: c.daily_chance_of_snow + '%' },
	].filter(item => {
		if (item.label === 'Снег' && c.totalsnow_cm === 0) return false
		if (item.label === 'Осадки' && c.totalprecip_mm === 0) return false
		if (item.label === 'Вероятность дождя' && c.daily_chance_of_rain === 0)
			return false
		if (item.label === 'Вероятность снега' && c.daily_chance_of_snow === 0)
			return false
		return true
	})
})
</script>

<template>
	<Error v-if="error" :message="errorDisplay" />
	<div v-if="data?.current" class="stat-data">
		<div class="stat-list">
			<Stat
				v-for="item in stats"
				:key="item.label"
				:label="item.label"
				:stat="item.stat"
			/>
		</div>
		<div class="day-card-list">
			<DayCard
				v-for="(item, i) in data?.forecast.forecastday"
				:key="item.date_epoch"
				:weatherCode="item.day.condition.code"
				:temp="item.day.avgtemp_c"
				:date="new Date(item.date)"
				:icon="item.day.condition.icon"
				:isActive="activeIndex == i"
				@click="() => emit('selectIndex', i)"
			/>
		</div>
	</div>
	<CitySelect />
</template>

<style scoped>
.stat-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 60px;
}
.day-card-list {
	display: flex;
	gap: 2px;
	align-items: center;
}
</style>
