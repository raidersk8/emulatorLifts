<template>
	<emulator-lifts :count-lifts="2" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EmulatorLifts from '@/components/emulator-lifts.vue'

export default defineComponent({
	name: 'App',
	components: {
		EmulatorLifts,
	},
});
</script>
