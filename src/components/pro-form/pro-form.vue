<script setup lang="tsx">
import { reactive } from 'vue';
import { $t } from '@/locales';
import { useAntdForm } from '@/hooks/common/form';

defineOptions({
  name: 'ProForm'
});

const { formRef, validate } = useAntdForm();
const model: any = reactive({});

const props = defineProps<{
  componentkey: string;
  body?: any;
}>();

async function handleSubmit() {
  await validate();
}
</script>

<template>
  <AForm ref="formRef" @keyup.enter="handleSubmit">
    <ProFormField
      v-for="field in props.body"
      :key="field.componentkey"
      v-model:value="model[field.name]"
      :component="field.component"
      :name="field.name"
      :label="field.label"
      :rules="field.frontendRules"
      :field-props="{ ...field }"
    />
    <ASpace direction="vertical" size="large" class="w-full">
      <AButton type="primary" block size="large" shape="round" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </AButton>
    </ASpace>
  </AForm>
</template>

<style scoped></style>
