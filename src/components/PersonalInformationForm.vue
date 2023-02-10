<template>
  <div class="container">
    <BaseForm
      @form-submit="handleFormSubmit"
    >
      <template #title>
        <h3 class="container__title">Personal Information</h3>
      </template>
      <template #content>
        <div class="form-content">
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

          <div class="form-content__footer">
            <BaseButton
              type='submit'
              text="Save"
              :is-disabled="!(meta.valid && meta.dirty && isPhoneValid)"
              class="form-content__submit-btn"
            />
          </div>
        </div>
      </template>
    </BaseForm>
  </div>
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

<style scoped lang="scss">
//desktop first
.container {
	margin-top: 20px;
}

.form-content {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 20px;

	&__footer {
		grid-column: span 2;
	}

	&__submit-btn {
		display: block;
		width: 48%;
		margin-left: auto;
	}
}

@media(max-width: 900px) {
	.form-content {
		display: flex;
		flex-direction: column;

		&__submit-btn {
			width: 100%;
			margin-left: 0;
		}
	}
}
</style>
