<template>
	<div class="lift-shaft" ref="liftShaft">
		<lift-cabin
			class="lift-shaft__lift-cabin"
			:style="{ bottom: liftCabinButton, 'transition-duration': liftCabinDuration}"
			:state="state"
			:floor="moveFloor"
			:direction="direction"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue'
import LiftCabin from '@/components/lift-cabin.vue'; // Кабина лифта
import { StateLift, DirectionsLift } from '@/enums/bootstrap' // Enum StateLift

export default defineComponent({
	props: {
		// Положение лифта во время анимации
		moveFloor: {
			type: Number,
			default: 1,
		},
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
		direction: DirectionsLift,
		height: number, // Храним высоту шахты в отдельной переменной 
	} {
		return {
			oldFloor: this.floor,
			// Нужно 0, чтобы не было анимации если лифт изначально находиться на каком-то этаже
			liftCabinDuration: '0s',
			waitingTime: 2000,
			direction: DirectionsLift.wait,
			height: 0,
		};
	},
	emits: ['changeState', 'update:moveFloor'],
	components: {
		LiftCabin,
	},
	watch: {
		/**
		 * Действия при изменении этажа
		 */
		floor() {
			// Высчитываем скорость лифта
			const seconds = Math.abs(this.oldFloor - this.floor);
			this.liftCabinDuration = seconds + 's';

			// Определяем направление лифта
			if (this.floor > this.oldFloor) {
				this.direction = DirectionsLift.up;
			} else if (this.floor < this.oldFloor) {
				this.direction = DirectionsLift.down;
			}

			// Помечаем изначальное движение лифта
			this.updateMoveFloor(this.oldFloor);

			this.oldFloor = this.floor;

			// Изменяем изменение состояния лифтов по мере прохождения анимации
			this.liftCycleFromMoveToReady(seconds);
		},
	},
	mounted() {
		// Обновляем высоту шахты при монтировании компонента
		if (this.$refs.liftShaft && this.$refs.liftShaft instanceof HTMLDivElement) {
			this.height = this.$refs.liftShaft.clientHeight;
		}

		// Если лифт в состоянии ожидания то ждем и переводим в статус готов
		if (this.state === StateLift.wait) {
			this.delay(this.waitingTime).then(() => {
				this.changeState(StateLift.ready)
			});
		}

		// TODO: Для продолжения движения нужно доработать компонент отслеживать этаж лифта в движении
		// Если лифт в состоянии движение то просто переводим в состояние ожидания и потом готовности
		if (this.state === StateLift.move) {
			this.changeState(StateLift.wait)
			this.delay(this.waitingTime).then(() => {
				this.changeState(StateLift.ready)
			});
		}
	},
	computed: {
		/**
		 * Получаем положение лифта
		 */
		liftCabinButton(): string {
			return ((this.height / this.countFloor) * (this.floor - 1)) + 'px';
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
		async liftCycleFromMoveToReady(seconds: number): Promise<void> {
			this.changeState(StateLift.move);

			// Каждую секунду меняем этаж
			let moveFloorInterval = setInterval(() => {
				if (this.moveFloor < this.floor) {
					this.updateMoveFloor(Math.min(this.moveFloor + 1, this.floor));
				} else {
					this.updateMoveFloor(Math.max(this.moveFloor - 1, this.floor));
				}
			}, 1000);
			await this.delay(seconds * 1000);
			clearTimeout(moveFloorInterval);
			this.updateMoveFloor(this.floor);
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

		/**
		 * Обновляем изменение этажей во время движения лифта
		 */
		updateMoveFloor(value: number) {
			this.$emit('update:moveFloor', value);
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
			transition: bottom 0s linear;
		}
	}
</style>