<template>
  <div class="avatar">
    <img
      :src="imgUrl"
      alt="user photo"
      class="avatar__image"
    />
    <input
      id="file-input"
      class="avatar__input"
      type="file"
      name="file"
      aria-labelledby="#file-input"
      @change="handleFileInputChange"
    >
    <div class="avatar__icons">
      <label for="file-input">
        <IconEdit />
      </label>

      <IconTrashBin
        v-if="imgUrl !== getDynamicImgUrl(defaultUrl)"
        class="avatar__icon"
        @click="handleIconTrashBinClick"
      />
    </div>
  </div>
  <span class="error-message">{{ error }}</span>
</template>

<script setup lang="ts">
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrashBin from '@/components/icons/IconTrashBin.vue';
import { getDynamicImgUrl } from '@/helpers';

import { ref } from 'vue';
import defaultUrl from '../assets/images/user.png';

type FileEventTarget = EventTarget & { files: FileList };

const error = ref('');

const imgUrl = ref(getDynamicImgUrl(defaultUrl));

const isFileValid = (file: File): boolean => {
  const KBInMB = 1024;
  const bitesInKB = 1024;
  const maxMB = 5;
  const maxFileSize = maxMB * KBInMB * bitesInKB;
  if (file.size > maxFileSize) {
    error.value = 'You can upload max 5 MB';
    return false;
  }
  if ((file.type !== 'image/png') && (file.type !== 'image/jpeg')) {
    error.value = 'You can upload only JPG or PNG files';
    return false;
  }
  error.value = '';
  return true;
};

const handleFileInputChange = (event: Event) => {
  const file = (event.target as FileEventTarget).files[0];

  const isValid = isFileValid(file);
  if (!isValid) return;
  const url = URL.createObjectURL(file);
  imgUrl.value = getDynamicImgUrl(url);
};

const handleIconTrashBinClick = () => {
  imgUrl.value = getDynamicImgUrl(defaultUrl);
  error.value = '';
};
</script>

<style scoped lang="scss">
.avatar {
  position: relative;
  width: 150px;
  height: 150px;

  &__image {
    width: 100%;
	  height: 100%;
    border-radius: 50%;
  }

  &__icons {
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    gap: 5px;
    width: 100%;
  }

  &__input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    position: absolute;
    z-index: -10;
  }

	&__icon {
		width: 30px;
		height: 30px;
	}
}

.error-message {
  color: darkred;
}
</style>
