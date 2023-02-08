<template>
  <FormElement
    :label="props.label"
    :name="props.name"
  >
    <template #input>
      <!--	https://louismazel.github.io/maz-ui-3/components/maz-phone-number-input.html -->
      <MazPhoneNumberInput
        v-model="phone"
        show-code-on-list
        color="info"
        @update="handlePhoneChange"
        :success="phoneData?.isValid"
      />
    </template>
  </FormElement>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormElement from '@/components/FormElement.vue';
import type { Result } from 'maz-ui/components/MazPhoneNumberInput';
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';

interface Props {
	label?: string,
	name: string,
}
interface Emits {
	(e: 'changePhone', data: Result): void,
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const phone = ref<string>();
const phoneData = ref<Result>();

const handlePhoneChange = (event: Result) => {
  phoneData.value = event;
  emit('changePhone', event);
};
</script>

<style scoped>

</style>
