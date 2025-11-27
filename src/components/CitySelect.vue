<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import { Button, Input } from '.'
import { cityProvide } from '../constants'

const isEdited = ref(false)

const city = inject<Ref<string>>(cityProvide)
const inputValue = ref(city?.value ?? '')

function select() {
	isEdited.value = false
	if (city) {
		city.value = inputValue.value
	}
}
function edit() {
	isEdited.value = true
}
</script>

<template>
	<div class="city-select">
		<div v-if="isEdited" class="city-input">
			<Button @click="select()">
				<img src="/location.svg" alt="location" />
				Сохранить
			</Button>
			<Input
				v-model="inputValue"
				v-focus
				placeholder="Введите город"
				@keyup.enter="select()"
			/>
		</div>
		<Button v-else @click="edit()">
			<img src="/location.svg" alt="location" />
			Изменить город
		</Button>
	</div>
</template>

<style scoped>
.city-input {
	display: flex;
	gap: 10px;
	align-items: center;
}
.city-select {
	margin-top: 40px;
}
.city-select img {
	width: 27px;
	height: 27px;
}
</style>
