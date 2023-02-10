<template>
  <div class="container">
    <h3 class="container__title">Password</h3>
    <NotifyText class="container__info">
      <b>Default current password is <i class="accented-text">{{ currentDefaultPass }}</i></b>
    </NotifyText>

    <div v-if="!isPasswordInEdit" class="current-password">
      <span>Current password</span>
      <span>*****</span>
      <IconEdit
        class="current-password__edit-icon"
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
import NotifyText from '@/components/NotifyText.vue';

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
.container {
	margin: 30px auto;

	&__title {
		margin-bottom: 10px;
	}

	&__info {
		margin-bottom: 10px;
	}
}
.current-password {
  display: flex;
  gap: 10px;

	&__edit-icon {
		width: 20px;
	}
}
</style>
