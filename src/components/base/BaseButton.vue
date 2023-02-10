<template>
  <button
    :type="props.type"
    class="btn"
    :disabled="isDisabled"
  >
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
import type { NativeButtonType } from '@/types';

interface Props {
	type?: NativeButtonType,
	isDisabled?: boolean,
	text: string,
}
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
});
</script>

<style scoped lang="scss">
.btn {
	width: fit-content;
	font-family: Roboto, sans-serif;
	font-size: 12px;
	font-weight: 700;
	line-height: 14px;
	letter-spacing: 0;
	text-align: center;
	white-space: nowrap;
	padding: 8px 20px;
	border-radius: 6px;
	background: $green;
	color: $blue_900;
	border: none;
	transition: all ease-in 0.3s;

	&:hover {
		background: $green_100;
		cursor: pointer;
	}

	&:disabled {
		opacity: 0.25;
		pointer-events: none;
	}
}
</style>
