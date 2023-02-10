<template>
  <div class="wrapper">
    <IconInfo />
    <slot>Some text</slot>
  </div>
</template>

<script setup lang="ts">
import IconInfo from '@/components/icons/IconInfo.vue'; </script>

<style scoped lang="scss">
.wrapper {
	display: flex;
	gap: 10px;
	align-items: center;
}
</style>
