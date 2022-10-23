<template>
	<div class="emulator-lifts">
		<lift-shaft v-for="liftNum in countLifts" :key="liftNum" />
		<floor-buttons :count-floor="countFloor" />
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
	} {
		return {
			countFloor: 5,
		};
	},
});
</script>

<style type="scss">
	.emulator-lifts {
		display: flex;
	}
</style>
