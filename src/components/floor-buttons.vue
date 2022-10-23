<template>
	<div class="floor-buttons">
		<button 
			type="button"
			v-for="floor in countFloor"
			:key="floor"
			@click="handleClickFloor(floor)"
		>
			{{ floor }}
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		countFloor: Number,
	},
	emits: ['change'],
	methods: {
		/**
		 * Обработка выбора этажа
		 * @param floor - этаж
		 */
		handleClickFloor(floor: number) {
			this.$emit('change', floor);
		}
	},
});
</script>

<style type="scss">
	.floor-buttons {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-around;
		height: 300px;
	}
</style>
