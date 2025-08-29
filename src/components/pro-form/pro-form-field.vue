<script setup lang="tsx">
import { toRefs } from 'vue';

defineOptions({
  name: 'ProFormField'
});

// 定义 props
const props = defineProps<{
  component: string;
  name: string;
  value?: any;
  rules?: any[];
  fieldProps?: any;
}>();

// 定义 emits
const emit = defineEmits<{
  (e: 'update:value', value: any): void;
}>();

// 初始化变量
const { component, name, rules, fieldProps } = toRefs(props);

// 更新字段值
const updateValue = (value: any) => {
  emit('update:value', value);
};
</script>

<template>
  <AFormItem
    v-if="component === 'input' || component === 'inputField' || component === 'text' || component === 'textField'"
    :name="name"
    :rules="rules"
  >
    <AInput
      :value="value"
      :size="fieldProps?.size"
      :placeholder="fieldProps?.placeholder"
      @update:value="updateValue"
    />
  </AFormItem>
  <AFormItem v-else-if="component === 'password' || component === 'passwordField'" :name="name" :rules="rules">
    <AInputPassword
      :value="value"
      :size="fieldProps?.size"
      :placeholder="fieldProps?.placeholder"
      @update:value="updateValue"
    />
  </AFormItem>
</template>

<style scoped></style>
