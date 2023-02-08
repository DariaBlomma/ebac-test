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

<style scoped>

</style>
