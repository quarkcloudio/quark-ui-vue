<script setup lang="tsx">
import { onMounted, ref, toRefs } from 'vue';
import { Form } from 'ant-design-vue';
import type { InputProps } from 'ant-design-vue';
import { fetchLoginCaptcha } from '@/service/api';

defineOptions({
  name: 'ProFormImageCaptcha'
});

// 定义 props
const props = defineProps<
  {
    value?: any;
    captchaUrl: string;
    maxLength: number;
  } & InputProps
>();

// 定义 emits
const emit = defineEmits<{
  (e: 'update:value', value: any): void;
}>();

const formItemContext = Form.useInjectFormItemContext();

// 初始化变量
const {
  addonAfter,
  addonBefore,
  allowClear,
  defaultValue,
  disabled,
  id,
  maxLength,
  showCount,
  status,
  prefix,
  size,
  suffix,
  type,
  value,
  placeholder,
  captchaUrl
} = toRefs(props);
const captchaRef = ref<Api.Auth.LoginCaptcha>({
  uuid: '',
  img: '',
  captchaEnabled: false
});

const refreshCaptcha = async () => {
  const { data, error } = await fetchLoginCaptcha(captchaUrl.value);
  if (!error) {
    captchaRef.value = data;
  }
};

onMounted(() => {
  refreshCaptcha();
});

// 更新字段值
const updateValue = (newValue: any) => {
  emit('update:value', {
    value: newValue,
    uuid: captchaRef.value.uuid
  });
  formItemContext.onFieldChange();
};
</script>

<template>
  <AInputGroup compact>
    <AInput
      :id="id"
      :value="value?.value"
      :addon-after="addonAfter"
      :addon-before="addonBefore"
      :allow-clear="allowClear"
      :default-value="defaultValue"
      :disabled="disabled"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :show-count="showCount"
      :status="status"
      :size="size"
      :suffix="suffix"
      :type="type"
      style="width: 60%"
      @change="updateValue($event.target.value)"
    >
      <template #prefix>
        <div v-if="typeof prefix === 'object'">
          <SvgIcon :icon="prefix?.type" v-bind="prefix" />
        </div>
        <div v-else>
          {{ prefix }}
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
