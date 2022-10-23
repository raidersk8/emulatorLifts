<template>
	<div class="floor-buttons">
		<button 
			type="button"
			v-for="floor in countFloor"
			:key="floor"
			:class="{ 'floor-buttons__button--wait': waitFloors.includes(floor) }"
			@click="handleClickFloor(floor)"
		>
			{{ floor }}
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		// Кол-во этажей
		countFloor: Number,
		// Список этаже ждущих лифт
		waitFloors: Array as PropType<number[]>,
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

<style lang="scss">
	.floor-buttons {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-around;
		height: 300px;

		&__button {
			&--wait {
				background: red;
			}
		}
	}
</style>
