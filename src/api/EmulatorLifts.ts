import { ref } from 'vue'
import type { Ref } from 'vue'
interface ILift {
	floor: number,
}
let lifts: Ref<ILift[]>;
export default function emulatorLifts(count: number): {
	lifts: Ref<ILift[]>, // Массив лифтов
} {
	fillLifts(count);
	return {
		lifts,
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
		};
	}
}
