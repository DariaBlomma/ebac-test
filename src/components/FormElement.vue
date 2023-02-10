<template>
  <div class="container">
    <label for="input" class="container__label">
      {{label }}
    </label>

    <div class="container__inputWrapper">
      <slot
        name="input"
        :value="value"
        :listeners="validationListeners"
      >
        <input
          :value="value"
          v-on="validationListeners"
          :type="props.type"
          class="container__input"
          aria-labelledby="#input"
        />
      </slot>
      <div
        v-if="isPassword"
        class="password-view">
        <IconEye
          v-if="isPassword && props.type === 'password'"
          class="password-view__icon"
          @click="emit('showPass');"
        />
        <IconClosedEye
          v-if="isPassword && props.type === 'text'"
          class="password-view__icon"
          @click="emit('hidePass');"
        />
      </div>
    </div>
    <span class="error-message">{{ errorMessage }}</span>
    <span v-if="isRequired" class="container__required-mark">*</span>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  reactive,
  toRef,
} from 'vue';
import { useField } from 'vee-validate';
import IconEye from '@/components/icons/IconEye.vue';
import IconClosedEye from '@/components/icons/IconClosedEye.vue';

interface Props {
  label?: string,
  name: string,
  type?: string,
  isPassword?: boolean,
  isRequired?: boolean,
}

interface Emits {
  (e: 'showPass'): void,
  (e: 'hidePass'): void,
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  type: 'text',
});

const emit = defineEmits<Emits>();

const {
  label, isPassword, isRequired,
} = reactive(props);

const nameRef = toRef(props, 'name');
const { errorMessage, value, handleChange } = useField(nameRef, () => '', {
  validateOnValueUpdate: false,
});

const validationListeners = computed(() => {
  if (!errorMessage.value) {
    return {
      blur: handleChange,
      change: handleChange,
      input: (e: Event) => handleChange(e, false),
    };
  }
  return {
    blur: handleChange,
    change: handleChange,
    input: handleChange,
  };
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  position: relative;
	padding: 15px;
	border-radius: 16px;
	background-color: $blue_300_op_006;

  &__label {
    font-size: 15px;
   }

  &__inputWrapper {
    position: relative;
  }

  &__input {
    padding: 10px 15px;
    border-radius: 8px;
		border: 1px solid white;
    width: 100%;
	  color: $blue_900;
	  transition: var(--input-transition);

	  &:hover {
		  border-color: white;
		  box-shadow: var(--input-hover-shadow);
	  }

	  &:focus {
		  outline: 0;
		  border-color: $blue_300;
		  box-shadow: var(--input-focus-shadow);
	  }
  }

  &__required-mark {
    position: absolute;
    top: 15px;
    right: 15px;
    color: red;
  }
}

.password-view {
  &__icon {
    position: absolute;
    width: 20px;
    top: 25%;
    right: 10px;
    height: fit-content;
  }
}
</style>
