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

// Очередь вызова этажей
const callStack: number[] = [];

export default function emulatorLifts(count: number): {
	lifts: Ref<ILift[]>, // Массив лифтов
	setState: (index: number, state: StateLift) => void, // Меняем состояние лифта по индексу
	liftCall: (floor: number) => void, // Логика работы лифтов 
} {
	fillLifts(count);
	return {
		lifts,
		setState,
		liftCall,
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
	handingOutFloors();
}

/**
 * Логика работы лифтов
 * @param floor - этаж
 */
function liftCall(floor: number): void {
	// Проверяем есть ли лифт на выбранном этаже или направляется туда
	if (liftsAlreadyOnTheFloor(floor)) {
		return;
	}
	addFloorToStack(floor);
	handingOutFloors();
}

/**
 * Лифт уже на этаже или направляется к этажу?
 * @param floor - этаж
 * @returns - true если отвечает на вопрос описания функции
 */
function liftsAlreadyOnTheFloor(floor: number): boolean {
	return lifts.value.some((item) => item.floor === floor);
}

/**
 * Добавляем этаж в стек этажей
 * @param floor - Этаж
 */
function addFloorToStack(floor: number) {
	if (!callStack.includes(floor)) {
		callStack.push(floor);
	}
}

/**
 * Раздаем этажи лифтам или очереди вызовов
 */
function handingOutFloors():void {
	// Находим лифты в свободном статусе
	const readyLifts = lifts.value.filter((item) => item.state === StateLift.ready);

	// Раздаем этажи свободным лифтам
	readyLifts.forEach((item: ILift) => {
		if (callStack.length > 0) {
			// Удаляем этаж из очереди вызовов
			const floor = callStack.pop();
			if (typeof(floor) === 'number') {
				item.floor = floor;
			}
		}
	});
}
