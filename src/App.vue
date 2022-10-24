<template>
	<emulator-lifts :count-lifts="5" :count-floor="7" />
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
