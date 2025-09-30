import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import type { FormInstance } from 'ant-design-vue';
import { SetupStoreId } from '@/enum';

export const useEngineStore = defineStore(SetupStoreId.Engine, () => {
  const engineApi = ref('');
  const engineComponent = reactive({});
  const engineFromRef = ref<FormInstance | null>(null);

  const setEngineApi = (api: string) => {
    engineApi.value = api;
  };

  const setEngineComponent = (component: Api.Engine.EngineComponent | null) => {
    Object.assign(engineComponent, component);
  };

  const setEngineFromRef = (formRef: FormInstance | null) => {
    Object.assign(engineFromRef, formRef);
  };

  const resetStore = () => {
    engineApi.value = '';
    Object.assign(engineComponent, {});
    engineFromRef.value = null;
  };

  return {
    engineApi,
    engineComponent,
    engineFromRef,
    setEngineApi,
    setEngineComponent,
    setEngineFromRef,
    resetStore
  };
});
