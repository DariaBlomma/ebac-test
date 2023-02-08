<template>
  <FormElement
    :label="props.label"
    :name="props.name"
  >
    <template #input>
      <el-select
        v-model="chosenLanguages"
        multiple
        @change="handleChange"
      >
        <el-option
          v-for="item in languagesOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
  </FormElement>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormElement from '@/components/FormElement.vue';
import 'element-plus/es/components/select/style/css';
import {
  ElOption,
  ElSelect,
} from 'element-plus';
import { languagesOptions } from '@/constants';

interface Props {
	label?: string,
	name: string,
}
interface Emits {
	(e: 'changeSelect', list: string[]): void,
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const chosenLanguages = ref<string[] | []>([]);

const handleChange = (list: string[]) => {
  emit('changeSelect', list);
};
</script>

<style scoped>

</style>
