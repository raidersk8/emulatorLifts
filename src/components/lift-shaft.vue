<template>
	<div class="lift-shaft">
		<lift-cabin />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LiftCabin from '@/components/lift-cabin.vue';

export default defineComponent({
	components: {
		LiftCabin,
	},
});
</script>


<style type="scss">
	.lift-shaft {
		position: relative;
		border: 1px solid red;
		width: 100px;
		height: 300px;
	}
</style>