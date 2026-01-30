<script setup lang="tsx">
import { ref, toRefs, watch } from 'vue';
import type { FormItemProps } from 'ant-design-vue/es/form';
import { useEngine } from '@/hooks/common/engine';
import tplEngine from '@/utils/template';
import type { ProFormImageCaptchaRef } from './pro-field/pro-form-image-captcha.vue';

defineOptions({
  name: 'ProFormField'
});

const props = defineProps<
  {
    component: string;
    model: any;
    value?: any;
    fieldProps?: any;
    data?: any;
  } & Partial<FormItemProps>
>();

const { setEngineImageCaptchaRef } = useEngine();

const captchaComponentRef = ref<ProFormImageCaptchaRef>();

const emit = defineEmits<{
  (e: 'update:value', value: any): void;
}>();

const { component, fieldProps, model } = toRefs(props);

watch(
  captchaComponentRef,
  newVal => {
    if (newVal) {
      setEngineImageCaptchaRef(newVal);
    }
  },
  { immediate: true }
);

const baseProps = (currentProps: any) => {
  return {
    name: currentProps?.name,
    label: currentProps?.label,
    tooltip: currentProps?.tooltip,
    rules: currentProps?.rules,
    colon: currentProps?.colon,
    extra: currentProps?.extra,
    required: currentProps?.required,
    help: currentProps?.help,
    wrapperCol: currentProps?.wrapperCol
  };
};

// 更新字段值
const updateValue = (value: any) => emit('update:value', value);
</script>

<template>
  <!-- 输入框 -->
  <AFormItem v-if="['input', 'inputField', 'text', 'textField'].includes(component)" v-bind="{ ...baseProps(props) }">
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
  <AFormItem v-else-if="['password', 'passwordField'].includes(component)" v-bind="{ ...baseProps(props) }">
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
  <AFormItem v-else-if="['textArea', 'textAreaField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ATextarea :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- 数字输入 -->
  <AFormItem v-else-if="['inputNumber', 'inputNumberField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <AInputNumber :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- ID 隐藏域 -->
  <AFormItem v-else-if="['id', 'idField'].includes(component)" hidden v-bind="{ ...baseProps(props) }">
    <AInput :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- 图标选择 -->
  <AFormItem v-else-if="['icon', 'iconField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ProFormIcon :value="value" v-bind="{ ...fieldProps }" @update:value="updateValue" />
  </AFormItem>

  <!-- 隐藏域 -->
  <AFormItem v-else-if="['hidden', 'hiddenField'].includes(component)" hidden v-bind="{ ...baseProps(props) }">
    <AInput :value="value" @update:value="updateValue" />
  </AFormItem>

  <!-- 复选框 -->
  <AFormItem v-else-if="['checkbox', 'checkboxField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ACheckboxGroup :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- 单选框 -->
  <AFormItem v-else-if="['radio', 'radioField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ARadioGroup :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <!-- 图片上传 -->
  <AFormItem v-else-if="['image', 'imageField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ProFormImage :value="value" v-bind="{ ...fieldProps }" @update:value="updateValue" />
  </AFormItem>

  <!-- 下拉框 -->
  <AFormItem v-else-if="['select', 'selectField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ASelect :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue">
      <ASelectOption v-for="item in fieldProps?.options || []" :key="item.value" :value="item.value">
        {{ item.label }}
      </ASelectOption>
    </ASelect>
  </AFormItem>

  <AFormItem v-else-if="['treeSelect', 'treeSelectField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ATreeSelect :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <AFormItem v-else-if="['tree', 'treeField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ATree :value="value" v-bind="{ ...fieldProps, prefix: undefined }" @update:value="updateValue" />
  </AFormItem>

  <AFormItem v-else-if="['cascader', 'cascaderField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ProFormCascader :value="value" v-bind="{ ...fieldProps }" @update:value="updateValue" />
  </AFormItem>

  <AFormItem v-else-if="['date', 'dateField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ADatePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['week', 'weekField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ADatePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      picker="week"
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['month', 'monthField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ADatePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      picker="month"
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['quarter', 'quarterField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ADatePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      picker="quarter"
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['year', 'yearField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ADatePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      picker="year"
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['datetime', 'datetimeField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ADatePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      show-time
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['dateRange', 'dateRangeField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ARangePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['datetimeRange', 'datetimeRangeField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ARangePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      show-time
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['time', 'timeField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ATimePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['timeRange', 'timeRangeField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ATimeRangePicker
      :value="value"
      v-bind="{ ...fieldProps, prefix: undefined, valueFormat: fieldProps?.format }"
      @update:value="updateValue"
    />
  </AFormItem>

  <AFormItem v-else-if="['display', 'displayField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span :style="fieldProps.style && fieldProps.style" v-html="tplEngine(fieldProps.value, props.data)" />
  </AFormItem>

  <AFormItem v-else-if="['editor', 'editorField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ProFormEditor :value="value" v-bind="{ ...fieldProps }" @update:value="updateValue" />
  </AFormItem>

  <AFormItem v-else-if="['search', 'searchField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ProFormSearch :value="value" v-bind="{ ...fieldProps }" @update:value="updateValue" />
  </AFormItem>

  <AFormItem v-else-if="['selects', 'selectsField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ProFormSelects :value="value" v-bind="{ ...fieldProps }" @update:value="updateValue" />
  </AFormItem>

  <!-- 开关 -->
  <AFormItem v-else-if="['switch', 'switchField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ASwitch
      :checked="value === 1 || value === '1' || value === true || value === 'true'"
      v-bind="{ ...fieldProps, prefix: undefined }"
      @update:checked="updateValue"
    />
  </AFormItem>

  <!-- 图形验证码 -->
  <AFormItem v-else-if="['imageCaptcha', 'imageCaptchaField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ProFormImageCaptcha
      ref="captchaComponentRef"
      :value="value"
      v-bind="{ ...fieldProps }"
      @update:value="updateValue"
    />
  </AFormItem>

  <!-- 穿梭框 -->
  <AFormItem v-else-if="['transfer', 'transferField'].includes(component)" v-bind="{ ...baseProps(props) }">
    <ProFormTransfer :value="value" v-bind="{ ...fieldProps }" @update:value="updateValue" />
  </AFormItem>

  <!-- 分组 -->
  <ProFormGroup v-else-if="['group', 'groupField'].includes(component)">
    <template #default>
      <ProFormField
        v-if="Object.hasOwn(fieldProps?.body ?? {}, 'component')"
        :key="fieldProps?.body?.componentkey"
        :model="model"
        :component="fieldProps?.body?.component"
        v-bind="{ ...baseProps(fieldProps?.body) }"
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
          v-bind="{ ...baseProps(field) }"
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
      <template v-if="fieldProps.when">
        <template v-for="item in fieldProps.when.items">
          <template v-if="tplEngine(item.condition, values) === 'true'">
            <template v-if="Array.isArray(item.body)">
              <ProFormField
                v-for="subItem in item.body"
                :key="subItem?.componentkey"
                :model="model"
                :component="subItem.component"
                v-bind="{ ...baseProps(subItem) }"
                :rules="subItem.frontendRules"
                :value="model[subItem.name]"
                :field-props="{ ...subItem }"
                @update:value="val => (model[subItem.name] = val)"
              />
            </template>
            <template v-else>
              <ProFormField
                :key="item?.body?.componentkey"
                :model="model"
                :component="item?.body?.component"
                v-bind="{ ...baseProps(item?.body) }"
                :rules="item?.body?.frontendRules"
                :value="model[item?.body?.name]"
                :field-props="{ ...item?.body }"
              />
            </template>
          </template>
        </template>
      </template>
    </template>
  </ProFormDependency>
</template>
