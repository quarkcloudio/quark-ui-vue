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
  <AInput
    :value="value?.value"
    v-bind="{ ...fieldProps, prefix: undefined }"
    style="width: 60%"
    @change="updateValue($event.target.value)"
  >
    <template #prefix>
      <div v-if="typeof fieldProps.prefix === 'object'">
        <SvgIcon :icon="fieldProps?.prefix?.type" v-bind="fieldProps?.prefix" />
      </div>
      <div v-else>
        {{ fieldProps.prefix }}
      </div>
    </template>
  </AInput>
</template>

<style scoped></style>
