<template>
  <FormElement
    :label="props.label"
    :name="props.name"
    type="date"
  >
    <template #input>
      <el-date-picker
        v-model="date"
        type="date"
        :disabled-date="props.disabledDates"
        @change="handleChange"
      />
    </template>
  </FormElement>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElDatePicker } from 'element-plus';

interface Props {
	label?: string,
	name: string,
	disabledDates?: () => boolean,
}

interface Emits {
	(e: 'dateChange', val: Date): void,
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const date = ref<Date>(new Date());

const handleChange = (val: Date) => {
  emit('dateChange', val);
};
</script>

<style scoped lang="scss">
</style>
