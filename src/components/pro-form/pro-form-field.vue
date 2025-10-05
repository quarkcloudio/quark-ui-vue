<script setup lang="tsx">
import { toRefs } from 'vue';

defineOptions({
  name: 'ProFormField'
});

// 定义 props
const props = defineProps<{
  component: string;
  name: string;
  label?: string;
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
    :label="label"
    :rules="rules"
  >
    <AInput :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue">
      <template #prefix>
        <div v-if="typeof fieldProps.prefix === 'object'">
          <SvgIcon :icon="fieldProps?.prefix?.type" v-bind="fieldProps?.prefix" />
        </div>
        <div v-else>
          {{ fieldProps.prefix }}
        </div>
      </template>
    </AInput>
  </AFormItem>
  <AFormItem
    v-else-if="component === 'password' || component === 'passwordField'"
    :name="name"
    :label="label"
    :rules="rules"
  >
    <AInputPassword :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue">
      <template #prefix>
        <div v-if="typeof fieldProps.prefix === 'object'">
          <SvgIcon :icon="fieldProps?.prefix?.type" v-bind="fieldProps?.prefix" />
        </div>
        <div v-else>
          {{ fieldProps.prefix }}
        </div>
      </template>
    </AInputPassword>
  </AFormItem>
  <AFormItem
    v-else-if="component === 'textArea' || component === 'textAreaField'"
    :name="name"
    :label="label"
    :rules="rules"
  >
    <ATextarea :value="value" v-bind="fieldProps" @update:value="updateValue" />
  </AFormItem>
  <AFormItem
    v-else-if="component === 'inputNumber' || component === 'inputNumberField'"
    :name="name"
    :label="label"
    :rules="rules"
  >
    <AInputNumber :value="value" v-bind="fieldProps" @update:value="updateValue" />
  </AFormItem>
  <AFormItem v-if="component === 'id' || component === 'idField'" hidden :name="name" :label="label" :rules="rules">
    <AInput :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue">
      <template #prefix>
        <div v-if="typeof fieldProps.prefix === 'object'">
          <SvgIcon :icon="fieldProps?.prefix?.type" v-bind="fieldProps?.prefix" />
        </div>
        <div v-else>
          {{ fieldProps.prefix }}
        </div>
      </template>
    </AInput>
  </AFormItem>
  <AFormItem v-else-if="component === 'icon' || component === 'iconField'" :name="name" :label="label" :rules="rules">
    <ProFormIcon :value="value" :field-props="fieldProps" @update:value="updateValue" />
  </AFormItem>
  <AFormItem v-else-if="component === 'imageCaptcha' || component === 'imageCaptchaField'" :name="name" :rules="rules">
    <ProFormImageCaptcha :value="value" :field-props="fieldProps" @update:value="updateValue" />
  </AFormItem>
</template>

<style scoped></style>
