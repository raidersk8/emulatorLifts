<template>
	<div class="lift-shaft" ref="liftShaft">
		{{ floor }}
		<lift-cabin
			class="lift-shaft__lift-cabin"
			:style="{ bottom: liftCabinButton, 'transition-duration': liftCabinDuration}"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LiftCabin from '@/components/lift-cabin.vue'; // Кабина лифта

export default defineComponent({
	props: {
		// Этаж
		floor: {
			type: Number,
			default: 1,
		},
		// Кол-во этажей
		countFloor: {
			type: Number,
			default: 1,
		},
	},
	data(): {
		oldFloor: number, // Предыдущий этаж
		liftCabinDuration: string, // Скорость лифта
	} {
		return {
			oldFloor: this.floor,
			liftCabinDuration: '1s',
		};
	},
	components: {
		LiftCabin,
	},
	watch: {
		floor() {
			// Высчитываем скорость лифта
			this.liftCabinDuration = Math.abs(this.oldFloor - this.floor) + 's';
			this.oldFloor = this.floor;
		},
	},
	computed: {
		/**
		 * Получаем скорость
		 */
		liftCabinButton(): string {
			let liftShaftHeight = 1;
			if (this.$refs.liftShaft && this.$refs.liftShaft instanceof HTMLDivElement) {
				liftShaftHeight = this.$refs.liftShaft.clientHeight;
			}
			return ((liftShaftHeight / this.countFloor) * (this.floor - 1)) + 'px';
		},
	},
});
</script>

<style lang="scss">
	.lift-shaft {
		position: relative;
		border: 1px solid red;
		width: 100px;
		height: 300px;

		&__lift-cabin {
			transition: bottom 1s linear;
		}
	}
</style>