<template>
	<div class="lift-cabin" :class="{ 'lift-cabin--wait': isWait }">{{ state }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue'
import { StateLift } from '@/enums/bootstrap' // Enum StateLift

export default defineComponent({
	props: {
		state: {
			type: Number as PropType<StateLift>,
			default: StateLift.ready,
		},
	},

	computed: {
		isWait(): boolean {
			return this.state === StateLift.wait; 
		},
	},
});
</script>

<style lang="scss">
	.lift-cabin {
		position: absolute;
		height: 60px;
		background: green;
		bottom: 0;
		width: 100%;

		&--wait {
			background: blue;
		}
	}
</style>