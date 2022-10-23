<template>
	<div class="floor-buttons">
		<button v-for="floor in countFloor" :key="floor">{{ floor }}</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		countFloor: Number,
	},
});
</script>

<style type="scss">
	.floor-buttons {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-around;
		height: 300px;
	}
</style>
