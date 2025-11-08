<script setup lang="tsx">
import { toRefs } from 'vue';
import Form from 'ant-design-vue/es/form/Form';
import type { SelectProps } from 'ant-design-vue';

defineOptions({
  name: 'ProFormIcon'
});

// 定义 props
const props = defineProps<
  {
    value?: any;
    options?: string[];
  } & SelectProps
>();

// 定义 emits
const emit = defineEmits<{
  (e: 'update:value', value: any): void;
}>();

const formItemContext = Form.useInjectFormItemContext();

// 初始化变量
const { defaultValue, disabled, value, placeholder, size, allowClear, showSearch, options } = toRefs(props);

// 更新字段值
const updateValue = (newValue: any) => {
  emit('update:value', newValue);
  formItemContext.onFieldChange();
};
</script>

<template>
  <ASelect
    :value="value"
    :disabled="disabled"
    :default-value="defaultValue"
    :placeholder="placeholder"
    :size="size"
    :allow-clear="allowClear"
    :show-search="showSearch"
    @change="updateValue"
  >
    <ASelectOption v-for="option in options" :key="option" :value="option">
      <div class="flex items-center gap-2">
        <SvgIcon :icon="option" />
        {{ option.replace('ant-design:', '').replace('-outlined', '') }}
      </div>
    </ASelectOption>
  </ASelect>
</template>

<style scoped></style>
