<template>
	<div class="emulator-lifts">
		<lift-shaft
			v-for="(lift, index) in lifts"
			:key="index"
			:count-floor="countFloor"
			:floor="lift.floor"
			:state="lift.state"
			@changeState="handleChangeStateLift($event, index)"
		/>
		<floor-buttons :count-floor="countFloor" @change="handleChangeFloor" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LiftShaft from '@/components/lift-shaft.vue'; // Шахта лифта
import FloorButtons from '@/components/floor-buttons.vue'; // Кнопки с этажами
import emulatorLifts from '@/api/EmulatorLifts'; // Api управления лифтами
import { StateLift } from '@/enums/bootstrap' // Enum StateLift

export default defineComponent({
	components: {
		LiftShaft,
		FloorButtons,
	},

	props: {
		// Кол-во лифтов
		countLifts: {
			type: Number,
			default: 1,
		},
	},

	data(): {
		countFloor: number, // Кол-во этажей
	} {
		return {
			countFloor: 5,
		};
	},

	setup(props) {
		let { lifts, setState, liftCall } = emulatorLifts(props.countLifts);
		return {
			lifts,
			setState,
			liftCall,
		};
	},

	methods: {
		/**
		 * Обрабатываю изменение этажа
		 * @param floor - номер этажа
		 */
		handleChangeFloor(floor: number):void {
			this.liftCall(floor);
		},

		/**
		 * Обработка изменения состояния лифта
		 * @param state - состояние лифта
		 * @param index - индекс
		 */
		handleChangeStateLift(state: StateLift, index: number): void {
			this.setState(index, state);
		},
	},
});
</script>

<style lang="scss">
	.emulator-lifts {
		display: flex;
	}
</style>
