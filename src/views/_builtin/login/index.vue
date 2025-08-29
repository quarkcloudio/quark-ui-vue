<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { getColorPalette, mixColor } from '@sa/utils';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { fetchLoginComponent } from '@/service/api';
import { useAntdForm, useFormRules } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';

const appStore = useAppStore();
const themeStore = useThemeStore();
const authStore = useAuthStore();
const { formRef, validate } = useAntdForm();

const bgThemeColor = computed(() =>
  themeStore.darkMode ? getColorPalette(themeStore.themeColor, 7) : themeStore.themeColor
);

const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';
  const ratio = themeStore.darkMode ? 0.5 : 0.2;

  return mixColor(COLOR_WHITE, themeStore.themeColor, ratio);
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules } = useFormRules();

  return {
    userName: formRules.userName,
    password: formRules.pwd
  };
});

const loginComponent = ref<Api.Auth.LoginComponent>({});

interface FormModel {
  userName: string;
  password: string;
}

const model: FormModel = reactive({
  userName: '',
  password: ''
});

onMounted(async () => {
  const { data, error } = await fetchLoginComponent();
  if (!error) {
    loginComponent.value = data;
  }
});

async function handleSubmit() {
  await validate();
  await authStore.login(model.userName, model.password);
}
</script>

<template>
  <div class="relative size-full flex-center" :style="{ backgroundColor: bgColor }">
    <WaveBg :theme-color="bgThemeColor" />
    <ACard class="relative z-4">
      <div class="w-400px lt-sm:w-300px">
        <header class="flex-y-center justify-between">
          <SystemLogo class="text-64px text-primary lt-sm:text-48px" />
          <h3 class="text-28px text-primary font-500 lt-sm:text-22px">
            {{ loginComponent.title ?? $t('system.title') }}
          </h3>
          <div class="i-flex-col">
            <ThemeSchemaSwitch
              :theme-schema="themeStore.themeScheme"
              :show-tooltip="false"
              class="text-20px lt-sm:text-18px"
              @switch="themeStore.toggleThemeScheme"
            />
            <LangSwitch
              :lang="appStore.locale"
              :lang-options="appStore.localeOptions"
              :show-tooltip="false"
              @change-lang="appStore.changeLocale"
            />
          </div>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">{{ $t('page.login.pwdLogin.title') }}</h3>
          <div class="animation-slide-in-left pt-24px">
            <Transition :name="themeStore.page.animateMode" mode="out-in" appear>
              <AForm ref="formRef" :model="model" :rules="rules" @keyup.enter="handleSubmit">
                <ProFormField
                  v-model:value="model.userName"
                  component="input"
                  name="userName"
                  :field-props="{ size: 'large', placeholder: $t('page.login.common.userNamePlaceholder') }"
                />
                <ProFormField
                  v-model:value="model.password"
                  component="password"
                  name="password"
                  :field-props="{ size: 'large', placeholder: $t('page.login.common.passwordPlaceholder') }"
                />
                <ASpace direction="vertical" size="large" class="w-full">
                  <div class="flex-y-center justify-between">
                    <ACheckbox>{{ $t('page.login.pwdLogin.rememberMe') }}</ACheckbox>
                  </div>
                  <AButton
                    type="primary"
                    block
                    size="large"
                    shape="round"
                    :loading="authStore.loginLoading"
                    @click="handleSubmit"
                  >
                    {{ $t('common.confirm') }}
                  </AButton>
                </ASpace>
              </AForm>
            </Transition>
          </div>
        </main>
      </div>
    </ACard>
  </div>
</template>

<style scoped></style>
