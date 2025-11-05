<script setup lang="tsx">
import { toRefs } from 'vue';
import Form from 'ant-design-vue/es/form/Form';

defineOptions({
  name: 'ProFormFile'
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
const { fieldProps, value } = toRefs(props);

// 更新字段值
const updateValue = (newValue: any) => {
  emit('update:value', newValue);
  formItemContext.onFieldChange();
};
</script>

<template>
  <ASelect :value="value" v-bind="{ ...fieldProps, prefix: undefined, options: undefined }" @change="updateValue">
    <ASelectOption v-for="option in fieldProps?.options" :key="option" :value="option">
      <div class="flex items-center gap-2">
        <SvgIcon :icon="option" />
        {{ option.replace('ant-design:', '').replace('-outlined', '') }}
      </div>
    </ASelectOption>
  </ASelect>
</template>

<style scoped></style>
