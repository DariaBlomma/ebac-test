<template>
  <h3 class="title-3">Personal Information</h3>
  <form class="form" @submit="handleFormSubmit">
    <FormElement
      label="Name"
      name="name"
      is-required
    />
    <FormElement
      label="Surname"
      name="surname"
      is-required
    />
    <FormElement
      label="Patronymic"
      name="patronymic"
      is-required
    />
    <DatePicker
      label="Date of birth"
      name="date_birth"
      :disabled-dates="disabledBirthDates"
      @dateChange="handleDateChange"
    />

    <FormElement
      label="Email"
      name="email"
      is-required
    />
    <FormElement
      label="City"
      name="city"
    />
    <PhoneInput
      label="Phone"
      name="phone"
      @changePhone="handlePhoneChange"
    />

    <MultipleSelect
      label="Languages"
      name="languages"
      @changeSelect="handleLanguagesSelectChange"
    />

    <BaseButton
      type='submit'
      text="Save"
      :is-disabled="!(meta.valid && meta.dirty && isPhoneValid)"
      class="form__btn"
    />
  </form>
</template>

<script setup lang="ts">
import FormElement from '@/components/FormElement.vue';
import PhoneInput from '@/components/PhoneInput.vue';
import { useForm } from 'vee-validate';
import {
  reactive,
  ref,
} from 'vue';
import type { Result } from 'maz-ui/components/MazPhoneNumberInput';

const disabledBirthDates = (time: Date) => time.getTime() > Date.now();

const simpleSchema = {
  name(value: string) {
    if (!value) {
      return 'This field is required';
    }

    return true;
  },
  surname(value: string) {
    if (!value) {
      return 'This field is required';
    }

    return true;
  },
  patronymic(value: string) {
    if (!value) {
      return 'This field is required';
    }

    return true;
  },
  email(value: string) {
    if (!value) {
      return 'This field is required';
    }

    return true;
  },
};

interface PersonalInfoForm {
	name: string,
	surname: string,
	patronymic: string,
	email: string,
	city: string,
	phone: string,
	languages: string[] | [],
	date_birth: Date,
}
const { meta, values } = useForm<PersonalInfoForm>({
  validationSchema: simpleSchema,
});

const isPhoneValid = ref(false);

const formData = reactive(values);

const handleDateChange = (val: Date) => {
  formData.date_birth = val;
};

const handleLanguagesSelectChange = (list: string[] | []) => {
  formData.languages = list;
};

const handlePhoneChange = (data: Result) => {
  if (!data) return;
  const {
    formatInternational, nationalNumber, isValid,
  } = data;
  formData.phone = formatInternational || '';
  const isEmpty = !nationalNumber;
  isPhoneValid.value = isEmpty ? true : isValid;
};

const handleFormSubmit = (event: Event) => {
  event.preventDefault();
  alert('Submit is successful');
  console.log('formData', formData);
};
</script>

<style scoped>

</style>
