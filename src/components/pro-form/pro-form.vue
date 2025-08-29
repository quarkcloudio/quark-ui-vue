<script setup lang="tsx">
import { reactive } from 'vue';
import { $t } from '@/locales';
import { useAntdForm } from '@/hooks/common/form';

defineOptions({
  name: 'ProForm'
});

const { formRef, validate } = useAntdForm();

const model: any = reactive({
  userName: '',
  password: ''
});

async function handleSubmit() {
  await validate();
}
</script>

<template>
  <AForm ref="formRef" :model="model" @keyup.enter="handleSubmit">
    <AFormItem name="userName">
      <AInput v-model:value="model.userName" size="large" :placeholder="$t('page.login.common.userNamePlaceholder')" />
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
