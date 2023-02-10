<template>
  <div class="new-password">
    <BaseForm
      @form-submit="handleFormSubmit"
    >
      <template #content>
        <div class="requirements">
          <h4 class="title-4">Password requirements:</h4>
          <ul class="requirements__list">
            <li
              v-for="elem in requirementsList"
              :key="elem.id"
              class="requirements__item"
              :class="{ 'requirements__item--valid': isRequirementValid(elem) }"
            >
              {{ elem.text }}
            </li>
          </ul>
        </div>
        <FormElement
          label="Current password"
          name="current_pass"
          :type="currentPassInputType"
          is-password
          is-required
          @showPass="togglePassVisibility('current', 'text')"
          @hidePass="togglePassVisibility('current', 'password')"
        />
        <FormElement
          label="New password"
          name="new_pass"
          :type="newPassInputType"
          is-password
          is-required
          @showPass="togglePassVisibility('new', 'text')"
          @hidePass="togglePassVisibility('new', 'password')"
        />
        <FormElement
          label="Confirm new password"
          name="confirm_pass"
          :type="confirmPassInputType"
          is-password
          is-required
          @showPass="togglePassVisibility('confirm', 'text')"
          @hidePass="togglePassVisibility('confirm', 'password')"
        />
        <BaseButton
          type='submit'
          text="Save"
          :is-disabled="!(meta.valid && meta.dirty)"
          class="form__btn"
        />
      </template>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import BaseForm from '@/components/base/BaseForm.vue';
import FormElement from '@/components/FormElement.vue';
import { useForm } from 'vee-validate';
import {
  reactive,
  ref,
} from 'vue';

import {
  passMinLength,
  requirementsList,
} from '@/constants';

import type {
  ChangePasswordPassInputNames,
  PasswordInputType,
  PasswordRequirementItem,
} from '@/types';
import BaseButton from '@/components/base/BaseButton.vue';

interface Emits {
  (e: 'save', password: string): void
}

interface Props {
  currentPass: string,
}

const props = defineProps<Props>();
const { currentPass } = reactive(props);

const emit = defineEmits<Emits>();

const currentPassInputType = ref<PasswordInputType>('password');
const newPassInputType = ref<PasswordInputType>('password');
const confirmPassInputType = ref<PasswordInputType>('password');

const confirmPassValue = ref('');
const newPassValue = ref('');

const isMinLengthValid = ref(false);
const isLatinValid = ref(false);
const isNumberValid = ref(false);

const isRequirementValid = (elem: PasswordRequirementItem) => {
  switch (elem.id) {
    case 1: return isMinLengthValid.value;
    case 2: return isLatinValid.value;
    case 3: return isNumberValid.value;
    default: throw new Error('changePasswordForm/isRequirementValid - did you forget to add a new case ?');
  }
};

const simpleSchema = {
  current_pass(value: string) {
    if (!value) {
      return 'This field is required';
    }

    if (value.trim() !== currentPass) {
      return 'Wrong password';
    }

    return true;
  },
  new_pass(value: string) {
    if (!value) {
      isMinLengthValid.value = false;
      isLatinValid.value = false;
      isNumberValid.value = false;
      return 'This field is required';
    }

    newPassValue.value = value.trim();

    if (value.trim().length < passMinLength) {
      isMinLengthValid.value = false;
      return `Minimum ${passMinLength} characters `;
    }

    isMinLengthValid.value = true;

    const latinReg = /(?=.*[a-z])/gi;
    const numberReg = /(?=.*\d)/gi;

    if (!latinReg.test(value.trim())) {
      isLatinValid.value = false;
      return 'Must contain latin letters';
    }

    isLatinValid.value = true;

    if (!numberReg.test(value.trim())) {
      isNumberValid.value = false;
      return 'Must contain at least one number';
    }

    isNumberValid.value = true;

    if (confirmPassValue.value && value.trim() !== confirmPassValue.value) {
      return 'New passwords do not match';
    }

    return true;
  },
  confirm_pass(value: string) {
    if (!value) {
      return 'This field is required';
    }
    confirmPassValue.value = value;

    if (newPassValue.value && value.trim() !== newPassValue.value) {
      return 'New passwords do not match';
    }

    return true;
  },
};

const { meta } = useForm({
  validationSchema: simpleSchema,
  initialValues: {
    current_pass: '',
    new_pass: '',
    confirm_pass: '',
  },
});

const togglePassVisibility = (
  inputName: ChangePasswordPassInputNames,
  inputType: PasswordInputType,
) => {
  switch (inputName) {
    case 'current': {
      currentPassInputType.value = inputType;
      break;
    }
    case 'new': {
      newPassInputType.value = inputType;
      break;
    }

    case 'confirm': {
      confirmPassInputType.value = inputType;
      break;
    }
    default: throw new Error('changePasswordForm/togglePassVisibility - did you forget to add a new case ?');
  }
};

const handleFormSubmit = (event: Event) => {
  event.preventDefault();
  currentPassInputType.value = 'password';
  newPassInputType.value = 'password';
  confirmPassInputType.value = 'password';
  emit('save', newPassValue.value);
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  row-gap: 10px;

	&__btn {
		display: block;
		margin: 15px auto 0;
		width: 100%;
	}
}

.requirements {
	&__list {
		margin-left: 35px;
	}

  &__item {
    color: red;
    &--valid {
      color: green;
    }
  }
}
</style>
