<script setup lang="ts"></script>

<template>
	<button class="button">
		<slot name="icon" />
		<slot />
	</button>
</template>

<style scoped>
.button {
	min-height: 37px;
	border-radius: 10px;
	background: var(--gradient);
	padding: 10px;
	font-family: var(--font);
	font-size: 16px;
	color: var(--primary);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 7px;
	align-items: center;
	box-shadow: 0 6px 0 rgba(0, 0, 0, 0.25);

	transition: transform 0.2s ease, box-shadow 0.2s ease,
		opacity 0.3s ease-in-out;
}

.button:hover {
	opacity: 0.8;
}

.button:active {
	transform: translateY(4px) scale(0.97);
	box-shadow: 0 2px 0 rgba(0, 0, 0, 0.25);
}
</style>
