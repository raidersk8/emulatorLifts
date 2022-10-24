<template>
	<div class="lift-cabin" :class="classes">
		{{ floor }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue'
import { StateLift, DirectionsLift } from '@/enums/bootstrap' // Enum StateLift

export default defineComponent({
	props: {
		floor: Number,
		state: {
			type: Number as PropType<StateLift>,
			default: StateLift.ready,
		},
		direction: {
			type: Number as PropType<DirectionsLift>,
			default: DirectionsLift.wait,
		}
	},

	computed: {
		isWait(): boolean {
			return this.state === StateLift.wait; 
		},

		classes() {
			return {
				'lift-cabin--wait': this.isWait,
				'lift-cabin--up': this.direction === DirectionsLift.up && this.state === StateLift.move,
				'lift-cabin--down': this.direction === DirectionsLift.down && this.state === StateLift.move,
			}
		}
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
		text-align: center;

		&::before {
			content: '▲';
			display: block;
			color: black;
		}

		&::after {
			content: '▼';
			display: block;
			color: black;
		}

		&--wait {
			background: blue;
		}

		&--up {
			&::before {
				color: yellow;
			}
		}

		&--down {
			&::after {
				color: yellow;
			}
		}
	}
</style>