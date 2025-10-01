import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import type { FormInstance } from 'ant-design-vue';
import { SetupStoreId } from '@/enum';

export const useEngineStore = defineStore(SetupStoreId.Engine, () => {
  const engineApi = ref('');
  const engineComponent = reactive({});
  const engineFormApi = ref('');
  const engineFormRef = ref<FormInstance | null>(null);

  const setEngineApi = (api: string) => {
    engineApi.value = api;
  };

  const setEngineComponent = (component: Api.Engine.EngineComponent | null) => {
    Object.assign(engineComponent, component);
  };

  const setEngineFormApi = (api: string) => {
    engineFormApi.value = api;
  };

  const setEngineFormRef = (formRef: FormInstance | null) => {
    engineFormRef.value = formRef;
  };

  const resetStore = () => {
    engineApi.value = '';
    Object.assign(engineComponent, {});
    engineFormRef.value = null;
  };

  return {
    engineApi,
    engineComponent,
    engineFormApi,
    engineFormRef,
    setEngineApi,
    setEngineComponent,
    setEngineFormApi,
    setEngineFormRef,
    resetStore
  };
});
