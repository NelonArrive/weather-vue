<script setup lang="ts">
import { computed, inject } from 'vue'
import type { ForecastDay, WeatherData, WeatherError } from '../types'
import { cityProvide } from '../constants'

const { error, data, dayData } = defineProps<{
  data: WeatherData | null
  error: WeatherError | null
  dayData?: ForecastDay
}>()

const city = inject(cityProvide)

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const day = computed(() => {
  const dateStr = dayData?.date || new Date().toISOString()
  const weekday = new Date(dateStr).toLocaleDateString('ru-RU', { weekday: 'long' })
  return capitalize(weekday)
})

const date = computed(() => {
  const dateStr = dayData?.date || new Date().toISOString()
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const tempC = computed(() => dayData?.day.avgtemp_c ?? 0)
const maxTempC = computed(() => dayData?.day.maxtemp_c ?? 0)
const minTempC = computed(() => dayData?.day.mintemp_c ?? 0)
const windKph = computed(() => dayData?.day.maxwind_kph ?? 0)
const humidity = computed(() => dayData?.day.avghumidity ?? 0)
const visibility = computed(() => dayData?.day.avgvis_km ?? 0)
const precipitation = computed(() => dayData?.day.totalprecip_mm ?? 0)
const conditionText = computed(() => dayData?.day.condition?.text ?? '-')
const conditionIcon = computed(() => dayData?.day.condition?.icon ?? '')
</script>

<template>
  <div v-if="error" class="error-block">
    <p>
      ❌ Произошла ошибка:
      {{ error.error?.message || 'Не удалось получить данные' }}
    </p>
  </div>
  <div v-else-if="!data || !dayData" class="empty-block">
    <p>⚠️ Данных о погоде нет</p>
  </div>
  <div v-else class="weather-block">
    <div class="top">
      <div class="week">{{ day }}</div>
      <div class="date">{{ date }}</div>
      <div class="city">
        <img src="/location.svg" alt="location">
        {{ data.location.country }},
        {{ city }}
      </div>
    </div>
    <div class="bottom">
      <div class="main-info">
        <img :src="conditionIcon" class="icon" />
        <div class="temp">{{ tempC }}°C</div>
        <div class="temp-range">{{ minTempC }}° / {{ maxTempC }}°</div>
        <div class="desc">{{ conditionText }}</div>
      </div>
      <div class="cards">
        <div class="card">
          🌡️ Температура: <span>{{ minTempC }}° / {{ maxTempC }}°</span>
        </div>
        <div class="card">
          🌬 Ветер: <span>до {{ windKph }} км/ч</span>
        </div>
        <div class="card">
          💧 Влажность: <span>{{ humidity }}%</span>
        </div>
        <div class="card">
          👁️ Видимость: <span>{{ visibility }} км</span>
        </div>
        <div class="card" v-if="precipitation > 0">
          🌧️ Осадки: <span>{{ precipitation }} мм</span>
        </div>
        <div class="card">
          🌡️ По Фаренгейту: <span>{{ dayData.day.avgtemp_f }} °F</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-block {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.top {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
}
.week {
  font-size: 28px;
  font-weight: 700;
}
.city {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  font-size: 18px;
  color: var(--color-primary);
}
.city img {
  width: 27px;
  height: 27px;
}
.icon {
  width: 100px;
  height: 100px;
}
.temp {
  font-size: 34px;
  font-weight: 700;
}
.temp-range {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-top: -4px;
}
.desc {
  font-size: 18px;
}
.bottom {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: auto;
}
.main-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.card {
  background: var(--color-bg-card);
  padding: 14px 16px;
  border-radius: 14px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 0 4px #0003;
  transition: 0.2s;
}
.card:hover {
  background: var(--color-bg-card-hover);
}
.card span {
  font-weight: 600;
  color: var(--color-primary);
}
</style>