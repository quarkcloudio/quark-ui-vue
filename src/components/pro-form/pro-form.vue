<script setup lang="tsx">
import { reactive } from 'vue';
import { $t } from '@/locales';
import { useAntdForm } from '@/hooks/common/form';

defineOptions({
  name: 'ProForm'
});

const { formRef, validate } = useAntdForm();

const model: any = reactive({
  username: '',
  password: ''
});

async function handleSubmit() {
  await validate();
}
</script>

<template>
  <AForm ref="formRef" :model="model" @keyup.enter="handleSubmit">
    <AFormItem name="username">
      <AInput v-model:value="model.username" size="large" :placeholder="$t('page.login.common.usernamePlaceholder')" />
    </AFormItem>
    <AFormItem name="password">
      <AInputPassword
        v-model:value="model.password"
        size="large"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </AFormItem>
    <ASpace direction="vertical" size="large" class="w-full">
      <AButton type="primary" block size="large" shape="round" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </AButton>
    </ASpace>
  </AForm>
</template>

<style scoped></style>
