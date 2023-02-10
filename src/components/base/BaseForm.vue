<template>
  <div class="wrapper">
    <slot name="title" />
    <form class="wrapper__form" @submit="handleSubmit">
      <slot name="content" />
    </form>
  </div>
</template>

<script setup lang="ts">
interface Emits {
	(e: 'form-submit', event: Event): void,
}

const emit = defineEmits<Emits>();
const handleSubmit = (event: Event) => {
  emit('form-submit', event);
};
</script>

<style scoped lang="scss">
.wrapper {
	padding: 15px;
	border-radius: 16px;
	background-color: $blue_300_op_006;
}
</style>
