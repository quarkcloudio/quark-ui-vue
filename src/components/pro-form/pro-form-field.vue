<script setup lang="tsx">
import { toRefs } from 'vue';

defineOptions({
  name: 'ProFormField'
});

const props = defineProps<{
  component: string;
  model: any;
  name: string;
  label?: string;
  value?: any;
  rules?: any[];
  fieldProps?: any;
}>();

const emit = defineEmits<{
  (e: 'update:value', value: any): void;
}>();

const { component, name, rules, fieldProps, model } = toRefs(props);

// 更新字段值
const updateValue = (value: any) => emit('update:value', value);
</script>

<template>
  <!-- 输入框 -->
  <AFormItem
    v-if="['input', 'inputField', 'text', 'textField'].includes(component)"
    :name="name"
    :label="label"
    :rules="rules"
  >
    <AInput :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue">
      <template #prefix>
        <div v-if="typeof fieldProps?.prefix === 'object'">
          <SvgIcon :icon="fieldProps?.prefix?.type" v-bind="fieldProps?.prefix" />
        </div>
        <template v-else>{{ fieldProps?.prefix }}</template>
      </template>
    </AInput>
  </AFormItem>

  <!-- 密码框 -->
  <AFormItem v-else-if="['password', 'passwordField'].includes(component)" :name="name" :label="label" :rules="rules">
    <AInputPassword :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue">
      <template #prefix>
        <div v-if="typeof fieldProps?.prefix === 'object'">
          <SvgIcon :icon="fieldProps?.prefix?.type" v-bind="fieldProps?.prefix" />
        </div>
        <template v-else>{{ fieldProps?.prefix }}</template>
      </template>
    </AInputPassword>
  </AFormItem>

  <!-- 多行输入 -->
  <AFormItem v-else-if="['textArea', 'textAreaField'].includes(component)" :name="name" :label="label" :rules="rules">
    <ATextarea :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- 数字输入 -->
  <AFormItem
    v-else-if="['inputNumber', 'inputNumberField'].includes(component)"
    :name="name"
    :label="label"
    :rules="rules"
  >
    <AInputNumber :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- ID 隐藏域 -->
  <AFormItem v-else-if="['id', 'idField'].includes(component)" hidden :name="name" :label="label" :rules="rules">
    <AInput :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- 图标选择 -->
  <AFormItem v-else-if="['icon', 'iconField'].includes(component)" :name="name" :label="label" :rules="rules">
    <ProFormIcon :value="value" :field-props="fieldProps" @update:value="updateValue" />
  </AFormItem>

  <!-- 隐藏域 -->
  <AFormItem v-else-if="['hidden', 'hiddenField'].includes(component)" :name="name" hidden>
    <AInput :value="value" @update:value="updateValue" />
  </AFormItem>

  <!-- 复选框 -->
  <AFormItem v-else-if="['checkbox', 'checkboxField'].includes(component)" :name="name" :label="label" :rules="rules">
    <ACheckboxGroup :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- 单选框 -->
  <AFormItem v-else-if="['radio', 'radioField'].includes(component)" :name="name" :label="label" :rules="rules">
    <ARadioGroup :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- 下拉框 -->
  <AFormItem v-else-if="['select', 'selectField'].includes(component)" :name="name" :label="label" :rules="rules">
    <ASelect :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue">
      <ASelectOption v-for="item in fieldProps?.options || []" :key="item.value" :value="item.value">
        {{ item.label }}
      </ASelectOption>
    </ASelect>
  </AFormItem>

  <!-- 开关 -->
  <AFormItem v-else-if="['switch', 'switchField'].includes(component)" :name="name" :label="label" :rules="rules">
    <ASwitch
      :checked="value === 1 || value === '1' || value === true || value === 'true'"
      v-bind="{ ...fieldProps, prefix: undefined }"
      @update:checked="updateValue"
    />
  </AFormItem>

  <!-- 图形验证码 -->
  <AFormItem v-else-if="['imageCaptcha', 'imageCaptchaField'].includes(component)" :name="name" :rules="rules">
    <ProFormImageCaptcha :value="value" :field-props="fieldProps" @update:value="updateValue" />
  </AFormItem>

  <!-- 分组 -->
  <ProFormGroup v-else-if="['group', 'groupField'].includes(component)">
    <template #default>
      <ProFormField
        v-if="Object.hasOwn(fieldProps?.body ?? {}, 'component')"
        :key="fieldProps?.body?.componentkey"
        :model="model"
        :component="fieldProps?.body?.component"
        :name="fieldProps?.body?.name"
        :label="fieldProps?.body?.label"
        :rules="fieldProps?.body?.frontendRules"
        :value="model[fieldProps?.body?.name]"
        :field-props="{ ...fieldProps?.body }"
        @update:value="val => (model[fieldProps?.body?.name] = val)"
      />

      <!-- 用 template 包裹 v-else 分支 -->
      <template v-else>
        <ProFormField
          v-for="field in fieldProps?.body"
          :key="field?.componentkey"
          :model="model"
          :component="field.component"
          :name="field.name"
          :label="field.label"
          :rules="field.frontendRules"
          :value="model[field.name]"
          :field-props="{ ...field }"
          @update:value="val => (model[field.name] = val)"
        />
      </template>
    </template>
  </ProFormGroup>

  <!-- 依赖字段 -->
  <ProFormDependency v-else-if="['dependency', 'dependencyField'].includes(component)" :name="fieldProps?.names">
    <template #default="{ values }">
      <div>{{ values }}</div>
    </template>
  </ProFormDependency>
</template>
