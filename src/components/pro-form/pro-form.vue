<script setup lang="tsx">
import { reactive, ref, watch } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { useEngineStore } from '@/store/modules/engine';

defineOptions({
  name: 'ProForm'
});

interface Props {
  body?: any;
  buttonWrapperCol?: any;
  colon?: boolean;
  componentkey: string;
  disabled?: boolean;
  hideRquiredMark?: boolean;
  labelAlign?: 'left' | 'right';
  labelCol?: any;
  labelWrap?: boolean;
  layout?: 'horizontal' | 'inline' | 'vertical';
  name?: string;
  scrollToFirstError?: boolean;
  wrapperCol?: any;
  actions?: any[];
}
const formRef = ref<FormInstance | null>(null);
const { setEngineFromRef } = useEngineStore();
const model: any = reactive({});
const {
  body,
  buttonWrapperCol,
  colon,
  componentkey,
  disabled,
  hideRquiredMark,
  labelAlign,
  labelCol,
  labelWrap,
  layout,
  name,
  scrollToFirstError,
  wrapperCol,
  actions
} = defineProps<Props>();

async function handleSubmit() {
  await formRef?.value?.validate();
}

watch(
  formRef,
  newVal => {
    if (newVal) {
      setEngineFromRef(formRef.value);
    }
  },
  { immediate: true }
);
</script>

<template>
  <AForm
    ref="formRef"
    :key="componentkey"
    :model="model"
    :colon="colon"
    :disabled="disabled"
    :hide-rquired-mark="hideRquiredMark"
    :label-align="labelAlign"
    :label-col="labelCol"
    :label-wrap="labelWrap"
    :layout="layout"
    :name="name"
    :scroll-to-first-error="scrollToFirstError"
    :wrapper-col="wrapperCol"
    @keyup.enter="handleSubmit"
  >
    <ProFormField
      v-for="field in body"
      :key="field.componentkey"
      v-model:value="model[field.name]"
      :component="field.component"
      :name="field.name"
      :label="field.label"
      :rules="field.frontendRules"
      :field-props="{ ...field }"
    />
    <AFormItem :wrapper-col="buttonWrapperCol">
      <ASpace class="w-full">
        <Action v-for="action in actions" :key="action.componentkey" v-bind="action" />
      </ASpace>
    </AFormItem>
  </AForm>
</template>

<style scoped></style>
