import { ref, computed, onMounted } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { StateLift } from '@/enums/bootstrap'

// Структура данных лифта
interface ILift {
	floor: number,
	state: StateLift,
	moveFloor: number, // Номер этажа во время движения
}

// Структура с индексом и разницей этажей 
interface IDifferenceFloor {
	index: number,
	differenceFloor: number,
}

// Данные лифтов
let lifts: Ref<ILift[]>;

// Очередь вызова этажей
const callStack: Ref<number[]> = ref([]);

export default function emulatorLifts(count: number): {
	lifts: Ref<ILift[]>, // Массив лифтов
	setState: (index: number, state: StateLift) => void, // Меняем состояние лифта по индексу
	liftCall: (floor: number) => void, // Логика работы лифтов
	waitFloors: ComputedRef<number[]>, // Стек вызовов только(для чтения)
	setMoveFloor: (index: number, floor: number) => void, // Функция для изменения этажа во время движения
} {
	fillLifts(count);

	// Загружаем данные из sessionStorage
	loadSessionStorage();
	onMounted(() => {
		// Запускаем раздачу задач лифтам
		handingOutFloors();
	});
	return {
		lifts,
		setState,
		liftCall,
		waitFloors: computed(waitFloor),
		setMoveFloor,
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
			moveFloor: 1,
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
	if (!callStack.value.includes(floor)) {
		callStack.value.push(floor);
	}
}

/**
 * Раздаем этажи лифтам
 */
function handingOutFloors():void {
	// Находим лифты в свободном статусе
	const readyLifts = lifts.value.filter((item) => item.state === StateLift.ready);

	// Раздаем этажи ближайшим свободным лифтам
	while(
		callStack.value.length > 0 &&
		readyLifts.length > 0
	) {
		const callFloor: number | undefined = callStack.value.pop();
		if (typeof(callFloor) === 'number') {
			const indexLift: number = nearestLift(readyLifts, callFloor);
			readyLifts[indexLift].floor = callFloor;
			readyLifts.splice(indexLift, 1);
		}
	}

	// Сохраняем состояние приложения
	saveSessionStorage();
}

/**
 * Найти ближайший лифт к этажу и вывести индекс
 * @param lifts - лифты
 * @param floor - этаж
 */
function nearestLift(lifts: ILift[], floor: number): number {
	let minDifferenceFloor: IDifferenceFloor = {
		index: 0,
		differenceFloor:  Math.abs(lifts[0].floor - floor),
	};
	lifts.forEach((lift: ILift, index) => {
		const differenceFloor = Math.abs(lift.floor - floor);
		if (!minDifferenceFloor || minDifferenceFloor.differenceFloor > differenceFloor) {
			minDifferenceFloor = {
				index,
				differenceFloor,
			};
		}
	});
	return minDifferenceFloor.index;
}

/**
 * Получаем список ждущий этажей
 */
function waitFloor(): number[] {
	const filterLifts = lifts.value.filter((lift: ILift) => {
		return (
			!callStack.value.includes(lift.floor) && 
			lift.state === StateLift.move
		);
	});
	const mapLifts = filterLifts.map((lift: ILift) => lift.floor);
	return [...mapLifts, ...callStack.value];
}

/**
 * Сохраняем состояние приложения
 */
function saveSessionStorage() {
	sessionStorage.setItem('emulatorLifts', JSON.stringify({
		lifts: lifts.value,
		callStack: callStack.value,
	}));
}

/**
 * Загружаем состояние приложения (нормально будет работать только если подгружать в created)
 */
function loadSessionStorage(): void {
	const emulatorLiftsData: string | null = sessionStorage.getItem('emulatorLifts');
	if (typeof(emulatorLiftsData) === 'string') {
		const parseData = JSON.parse(emulatorLiftsData);
		lifts.value = parseData.lifts;
		callStack.value = parseData.callStack;
	}
}

/**
 * Меняем этаж во время движения
 * @param index - индекс лифта
 * @param floor - этаж
 */
function setMoveFloor(index: number, floor: number):void {
	lifts.value[index].moveFloor = floor;
	// Сохраняем состояние приложения
	saveSessionStorage();
}
