<script setup lang="tsx">
import { onMounted, ref, toRefs } from 'vue';
import { fetchLoginCaptcha } from '@/service/api';

defineOptions({
  name: 'ProFormImageCaptcha'
});

// 定义 props
const props = defineProps<{
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
const { name, rules, fieldProps } = toRefs(props);
const captchaRef = ref<Api.Auth.LoginCaptcha>({
  uuid: '',
  img: '',
  captchaEnabled: false
});

const refreshCaptcha = async () => {
  const { data, error } = await fetchLoginCaptcha(fieldProps?.value?.captchaUrl);
  if (!error) {
    captchaRef.value = data;
  }
};

onMounted(() => {
  refreshCaptcha();
});

// 更新字段值
const updateValue = (value: any) => {
  emit('update:value', {
    value,
    uuid: captchaRef.value.uuid
  });
};
</script>

<template>
  <AFormItem :name="name" :label="label" :rules="rules">
    <AInputGroup compact>
      <AInput
        :value="value?.value"
        v-bind="{ ...fieldProps, prefix: undefined }"
        style="width: 60%"
        @update:value="updateValue"
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
      <AButton
        type="primary"
        size="large"
        ghost
        style="width: 40%; border-color: rgb(229, 231, 235); padding: 0"
        @click="refreshCaptcha"
      >
        <img v-if="captchaRef.captchaEnabled" class="h-100% w-100%" :src="'data:image/png;base64,' + captchaRef.img" />
      </AButton>
    </AInputGroup>
  </AFormItem>
</template>

<style scoped></style>
