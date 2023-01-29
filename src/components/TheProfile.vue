<template>
  <div class="page">
    <h1 class="primary-title">Profile</h1>
    <UserAvatar />
  </div>
</template>

<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar.vue'; </script>

<style scoped lang="scss">
.page {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.primary-title {
  color: $grey;
}
</style>
