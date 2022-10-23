<template>
	<div class="emulator-lifts">
		<lift-shaft
			v-for="liftNum in countLifts"
			:key="liftNum"
			:count-floor="countFloor"
			:floor="floor"
		/>
		<floor-buttons :count-floor="countFloor" @change="handleChangeFloor" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LiftShaft from '@/components/lift-shaft.vue';
import FloorButtons from '@/components/floor-buttons.vue';

export default defineComponent({
	components: {
		LiftShaft,
		FloorButtons,
	},

	props: {
		countLifts: Number,
	},

	data(): {
		countFloor: number,
		floor: number,
	} {
		return {
			countFloor: 5,
			floor: 1,
		};
	},

	methods: {
		/**
		 * Обрабатываю изменение этажа
		 * @param floor - номер этажа
		 */
		handleChangeFloor(floor: number) {
			this.floor = floor;
		}
	}
});
</script>

<style lang="scss">
	.emulator-lifts {
		display: flex;
	}
</style>
