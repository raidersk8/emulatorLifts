<template>
	<div class="floor-buttons">
		<div
			class="floor-buttons__wrap-button"
			v-for="floor in countFloor"
			:key="floor"
		>
			<button 
				type="button"
				:class="{ 'floor-buttons__button--wait': waitFloors.includes(floor) }"
				@click="handleClickFloor(floor)"
			>
				{{ floor }}
			</button>
		</div>
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

		&__wrap-button {
			height: 100%;

			&::before {
				content: '';
				display: block;
				position: absolute;
				width: 100%;
				border-bottom: 1px solid black;
				left: 0;
			}
		}

		&__button {
			&--wait {
				background: red;
			}
		}
	}
</style>
