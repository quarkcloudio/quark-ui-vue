<script setup lang="tsx">
import { onMounted, ref, toRefs } from 'vue';
import Form from 'ant-design-vue/es/form/Form';
import { fetchLoginCaptcha } from '@/service/api';

defineOptions({
  name: 'ProFormImageCaptcha'
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
  formItemContext.onFieldChange();
};
</script>

<template>
  <AInputGroup compact>
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
</template>

<style scoped></style>
