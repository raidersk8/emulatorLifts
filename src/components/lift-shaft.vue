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
		finishFloor: number, // Для движения лифта к этажу до перезагрузки
		liftCabinDuration: string, // Скорость лифта
		waitingTime: number, // Время ожидание лифта после приезда на этаж
		direction: DirectionsLift,
		height: number, // Храним высоту шахты в отдельной переменной 
		isSkipLiftCycle: boolean, // Пропускаем изменения состояния лифта от начала движения до готовности 
	} {
		return {
			oldFloor: this.floor,
			finishFloor: this.floor,
			// Нужно 0, чтобы не было анимации если лифт изначально находиться на каком-то этаже
			liftCabinDuration: '0s',
			waitingTime: 2000,
			direction: DirectionsLift.wait,
			height: 0,
			isSkipLiftCycle: false,
		};
	},
	emits: ['changeState', 'update:floor', 'update:moveFloor'],
	components: {
		LiftCabin,
	},
	watch: {
		/**
		 * Действия при изменении этажа
		 */
		floor() {
			this.changeFloor();
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

		// Если лифт в состоянии движение то просто переводим в состояние ожидания и потом готовности
		if (this.state === StateLift.move) {
			// Помечаем что не надо проходить все этапы движения лифта
			this.isSkipLiftCycle = true;

			// обновляем этаж, чтобы лифт начал с точки где двигался до перезагрузки
			this.updateFloor(this.moveFloor);
			this.oldFloor = this.moveFloor;

			// В следующем тике возражаем значение этажа чтобы продолжилось движение
			this.$nextTick(() => {
				this.isSkipLiftCycle = false;
				setTimeout(() => {
					this.updateFloor(this.finishFloor);
				}, 100);
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
			let moveFloorInterval: number = this.intervalMoveFloor();
			await this.delay(seconds * 1000);
			clearTimeout(moveFloorInterval);
			this.updateMoveFloor(this.floor);
			this.changeState(StateLift.wait);
			await this.delay(this.waitingTime);
			this.changeState(StateLift.ready);
		},

		/**
		 * Каждую секунду меняем этаж
		 */
		intervalMoveFloor(): number {
			return setInterval(() => {
				if (this.moveFloor < this.floor) {
					this.updateMoveFloor(Math.min(this.moveFloor + 1, this.floor));
				} else {
					this.updateMoveFloor(Math.max(this.moveFloor - 1, this.floor));
				}
			}, 1000);
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

		/**
		 * Обновляем этаж лифта
		 */
		updateFloor(value: number) {
			this.$emit('update:floor', value);
		},

		/**
		 * Действия при изменении этажа
		 */
		changeFloor() {
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

			if (!this.isSkipLiftCycle) {
				// Изменяем изменение состояния лифтов по мере прохождения анимации
				this.liftCycleFromMoveToReady(seconds);
			}
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