<template>
  <div class="password-block">
    <h3 class="title-3">Password</h3>
    <b>Default current password is <i>{{ currentDefaultPass }}</i></b>
    <div v-if="!isPasswordInEdit" class="current-password">
      <span>Current password</span>
      <span>*****</span>
      <IconEdit
        class="edit-icon"
        @click="handleIconEditClick"
      />
    </div>
    <ChangePasswordForm
      v-else
      :current-pass="currentPassValue"
      @save="handleFormSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import ChangePasswordForm from '@/components/ChangePasswordForm.vue';
import { currentDefaultPass } from '@/constants';

const currentPassValue = ref(currentDefaultPass);
const isPasswordInEdit = ref(false);

const handleIconEditClick = () => {
  isPasswordInEdit.value = true;
};

const handleFormSave = (newPass: string) => {
  isPasswordInEdit.value = false;
  currentPassValue.value = newPass;
};
</script>

<style scoped lang="scss">
.current-password {
  display: flex;
  gap: 10px;
}

.edit-icon {
  width: 20px;
}
</style>
