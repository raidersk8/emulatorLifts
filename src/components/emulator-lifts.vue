<template>
	<div class="emulator-lifts">
		<lift-shaft
			v-for="(lift, index) in lifts"
			:key="index"
			:count-floor="countFloor"
			:floor="lift.floor"
		/>
		<floor-buttons :count-floor="countFloor" @change="handleChangeFloor" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LiftShaft from '@/components/lift-shaft.vue'; // Шахта лифта
import FloorButtons from '@/components/floor-buttons.vue'; // Кнопки с этажами
import emulatorLifts from '@/api/EmulatorLifts'; // Api управления лифтами

export default defineComponent({
	components: {
		LiftShaft,
		FloorButtons,
	},

	props: {
		countLifts: {
			type: Number,
			default: 1,
		},
	},

	data(): {
		countFloor: number,
	} {
		return {
			countFloor: 5,
		};
	},

	setup(props) {
		let { lifts } = emulatorLifts(props.countLifts);
		return {
			lifts,
		};
	},

	methods: {
		/**
		 * Обрабатываю изменение этажа
		 * @param floor - номер этажа
		 */
		handleChangeFloor(floor: number) {
			this.lifts[1].floor = floor;
		},
	},
});
</script>

<style lang="scss">
	.emulator-lifts {
		display: flex;
	}
</style>
