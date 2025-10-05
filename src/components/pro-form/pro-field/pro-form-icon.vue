<script setup lang="tsx">
import { toRefs } from 'vue';
import Form from 'ant-design-vue/es/form/Form';

defineOptions({
  name: 'ProFormIcon'
});

// 定义 props
const props = defineProps<{
  value?: any;
  fieldProps?: any;
}>();

// 定义 emits
const emit = defineEmits<{
  (e: 'update:value', value: any): void;
}>();

const formItemContext = Form.useInjectFormItemContext();

// 初始化变量
const { fieldProps } = toRefs(props);

// 更新字段值
const updateValue = (value: any) => {
  emit('update:value', value);
  formItemContext.onFieldChange();
};
</script>

<template>
  <ASelect :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @change="updateValue(value)">
    <ASelectOption v-for="option in fieldProps?.options" :key="option" :value="option">
      <SvgIcon :icon="option" />
      {{ option }}
    </ASelectOption>
  </ASelect>
</template>

<style scoped></style>
