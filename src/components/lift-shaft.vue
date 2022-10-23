<template>
	<div class="lift-shaft" ref="liftShaft">
		<lift-cabin
			class="lift-shaft__lift-cabin"
			:style="{ bottom: liftCabinButton, 'transition-duration': liftCabinDuration}"
			:state="state"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue'
import LiftCabin from '@/components/lift-cabin.vue'; // Кабина лифта
import { StateLift } from '@/enums/bootstrap' // Enum StateLift

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
		// Состояние лифта
		state: {
			type: Number as PropType<StateLift>,
			default: StateLift.ready,
		},
	},
	data(): {
		oldFloor: number, // Предыдущий этаж
		liftCabinDuration: string, // Скорость лифта
		waitingTime: number, // Время ожидание лифта после приезда на этаж
	} {
		return {
			oldFloor: this.floor,
			liftCabinDuration: '1s',
			waitingTime: 2000,
		};
	},
	emits: ['changeState'],
	components: {
		LiftCabin,
	},
	watch: {
		floor() {
			// Высчитываем скорость лифта
			const timeout = Math.abs(this.oldFloor - this.floor);
			this.liftCabinDuration = timeout + 's';
			this.oldFloor = this.floor;

			// Изменяем изменение состояния лифтов по мере прохождения анимации
			this.liftCycleFromMoveToReady(timeout * 1000);
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
	methods: {
		/**
		 * Сообщаем что изменилось состояние лифта
		 */
		changeState(state: StateLift) {
			this.$emit('changeState', state);
		},

		/**
		 * Меняем состояния лифта от начала движения до готовности к новому вызову
		 */
		async liftCycleFromMoveToReady(duration: number) {
			this.changeState(StateLift.move);
			await this.delay(duration);
			this.changeState(StateLift.wait);
			await this.delay(this.waitingTime);
			this.changeState(StateLift.ready);
		},

		/**
		 * Промис ожидание
		 * @param duration - кол-во времени в миллисекундах
		 */
		delay(duration: number): Promise<void> {
			return new Promise((resolve) => {
				setTimeout(resolve, duration);
			});
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