import { ref } from 'vue'
import type { Ref } from 'vue'
import { StateLift } from '@/enums/bootstrap'

// Структура данных лифта
interface ILift {
	floor: number,
	state: StateLift,
}

// Данные лифтов
let lifts: Ref<ILift[]>;

export default function emulatorLifts(count: number): {
	lifts: Ref<ILift[]>, // Массив лифтов
	setState: (index: number, state: StateLift) => void, // Меняем состояние лифта по индексу
} {
	fillLifts(count);
	return {
		lifts,
		setState,
	};
}
/**
 * Заполняем массив лифтов
 * @param count - кол-во лифтов
 */
function fillLifts(count: number):void {
	lifts = ref([]);
	for(let i = 0; i < count; i++) {
		lifts.value[i] = {
			floor: 1,
			state: StateLift.ready,
		};
	}
}

/**
 * Меняем состояние лифта по индексу
 * @param index Индекс лифта
 * @param state Состояние лифта
 */
function setState(index: number, state: StateLift):void {
	lifts.value[index].state = state;
}
