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
  <AFormItem v-else-if="component === 'hidden' || component === 'hiddenField'" :name="name" hidden>
    <AInput :value="value" @update:value="updateValue" />
  </AFormItem>
  <AFormItem
    v-else-if="component === 'checkbox' || component === 'checkboxField'"
    :name="name"
    :label="label"
    :rules="rules"
  >
    <ACheckboxGroup :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>
  <AFormItem v-else-if="component === 'radio' || component === 'radioField'" :name="name" :label="label" :rules="rules">
    <ARadioGroup :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>
  <AFormItem
    v-else-if="component === 'select' || component === 'selectField'"
    :name="name"
    :label="label"
    :rules="rules"
  >
    <ASelect :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue">
      <template v-for="item in fieldProps.options" :key="item.value">
        <ASelectOption :value="item.value">{{ item.label }}</ASelectOption>
      </template>
    </ASelect>
  </AFormItem>
  <AFormItem
    v-else-if="component === 'switch' || component === 'switchField'"
    :name="name"
    :label="label"
    :rules="rules"
  >
    <ASwitch
      :checked="value === 1 || value === '1' || value === true || value === 'true' ? true : false"
      v-bind="{ ...fieldProps, prefix: undefined }"
      @change="updateValue"
    />
  </AFormItem>
  <AFormItem v-else-if="component === 'imageCaptcha' || component === 'imageCaptchaField'" :name="name" :rules="rules">
    <ProFormImageCaptcha :value="value" :field-props="fieldProps" @update:value="updateValue" />
  </AFormItem>
</template>

<style scoped></style>
